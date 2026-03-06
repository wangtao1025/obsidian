# 函数与作用域

← [语法手册总览](/python/python语法手册) | [上一章 内置数据结构](/python/python语法手册-02-内置数据结构) | [下一章 异常](/python/python语法手册-03-异常)

本章面向“已经会写函数，但面试时容易说不清”的场景，重点补：**参数形态、返回值、LEGB 作用域、`global`/`nonlocal`、`lambda`、闭包、为什么 Python 没有函数重载**。

---

## 一、函数基础

### 1.1 定义、调用、返回值

```python
def add(a, b):
    return a + b

result = add(2, 3)  # 5
```

- `def` 用来定义函数。
- `return` 用来把结果“带出函数”。
- 不写 `return` 时，函数默认返回 `None`。

```python
def greet(name):
    print(f"你好，{name}")

print(greet("Tom"))
# 先打印：你好，Tom
# 再打印：None
```

### 1.2 参数类型速记

```python
def demo(a, b=10, *args, **kwargs):
    return a, b, args, kwargs
```

- **位置参数**：按位置传，如 `a`。
- **默认参数**：可不传，如 `b=10`。
- **`*args`**：收集多余的位置参数，得到元组。
- **`**kwargs`**：收集多余的关键字参数，得到字典。

### 1.3 面试时最常见的两个坑

- **不要把可变对象写成默认参数**：
```python
def append_item(item, bucket=[]):
    bucket.append(item)
    return bucket
```
这会导致多次调用共享同一个列表。应改成：
```python
def append_item(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket
```

- **链式赋值给可变对象会共享引用**：`a = b = []` 不安全。

---

## 二、作用域：LEGB 规则

Python 查变量名时，按 **LEGB** 顺序向外找：

- **L（Local）**：当前函数内部
- **E（Enclosing）**：外层函数
- **G（Global）**：模块全局
- **B（Builtins）**：内置作用域，如 `len`、`sum`

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()
    print(x)

outer()
print(x)
# local
# enclosing
# global
```

### 2.1 `global` 与 `nonlocal`

```python
count = 0

def inc_global():
    global count
    count += 1
```

- `global`：明确要改的是**模块级全局变量**。

```python
def outer():
    count = 0

    def inner():
        nonlocal count
        count += 1
        return count

    return inner
```

- `nonlocal`：明确要改的是**外层函数中的局部变量**。

### 2.2 为什么会报 `UnboundLocalError`

```python
x = 10

def bad():
    print(x)
    x += 1
```

因为函数里一旦对 `x` 赋值，Python 就把它当作局部变量；但你在赋值前先读它，所以报错。

---

## 三、`lambda`：适合“一次性的小函数”

### 3.1 基本写法

```python
square = lambda x: x * x
print(square(5))  # 25
```

等价于：

```python
def square(x):
    return x * x
```

### 3.2 典型使用场景

- 作为 `sorted()` / `max()` / `min()` 的 `key`
- 配合 `map()` / `filter()`
- 写特别短的回调函数

```python
students = [
    {"name": "A", "score": 80},
    {"name": "B", "score": 95},
]

print(sorted(students, key=lambda x: x["score"], reverse=True))
```

### 3.3 什么时候不用 `lambda`

- 逻辑有多步
- 需要注释
- 需要复用
- 表达式太长导致可读性差

这时改成普通 `def` 更清晰。

---

## 四、闭包（Closure）

### 4.1 一句话理解

**函数返回另一个函数，而内层函数还记住了外层函数中的变量。**

```python
def make_counter():
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter

c = make_counter()
print(c())  # 1
print(c())  # 2
```

### 4.2 闭包常见用途

- 计数器
- 延迟绑定配置
- 简单工厂函数
- 装饰器底层原理

### 4.3 闭包 vs 普通函数

- 普通函数：调用结束后，局部变量通常不再被外部访问。
- 闭包：外层函数结束后，内层函数仍“携带”外层变量继续工作。

---

## 五、为什么 Python 没有传统意义上的函数重载

### 5.1 先看现象

```python
def hello(x):
    return x

def hello(x, y):
    return x + y
```

最后只会保留第二个 `hello`，前一个会被覆盖。

### 5.2 原因

Python 的函数名本质上就是变量名，后定义会覆盖先定义。它不像 Java / C++ 那样根据“参数个数 + 参数类型”保留多套同名函数。

### 5.3 Python 的替代思路

- 默认参数
- `*args` / `**kwargs`
- 类型判断
- `functools.singledispatch`（标准库提供的单分派）

```python
def greet(name, title=None):
    if title:
        return f"{title} {name}"
    return name
```

---

## 六、装饰器：把“增强逻辑”包在函数外面

### 6.1 一句话先懂

装饰器本质上是：**接收一个函数，返回一个增强后的函数**。

```python
def log_call(fn):
    def wrapper(*args, **kwargs):
        print(f"调用 {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper

@log_call
def add(a, b):
    return a + b
```

### 6.2 `@decorator` 语法糖到底等价于什么

```python
@log_call
def add(a, b):
    return a + b
```

等价于：

```python
def add(a, b):
    return a + b

add = log_call(add)
```

所以装饰器并不神秘，它只是把原函数交给另一个函数包装一下。

### 6.3 为什么装饰器底层离不开闭包和 `*args/**kwargs`

因为包装函数通常需要：
- 记住原函数 `fn`
- 接住原函数可能收到的各种参数

最稳的通用模板一般像这样：

```python
def decorator(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper
```

### 6.4 一个常见场景：打日志

```python
def log_call(fn):
    def wrapper(*args, **kwargs):
        print(f"开始调用 {fn.__name__}")
        result = fn(*args, **kwargs)
        print(f"结束调用 {fn.__name__}")
        return result
    return wrapper
```

### 6.5 为什么很多装饰器都要写 `functools.wraps`

如果你直接返回 `wrapper`，原函数的一些元信息可能会丢失，比如：
- `__name__`
- `__doc__`

更规范的写法：

```python
from functools import wraps


def log_call(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        print(f"调用 {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper
```

这也是面试里经常会追问的点。

### 6.6 带参数的装饰器怎么理解

如果装饰器自己也要接参数，就会再多包一层。

```python
from functools import wraps


def repeat(times):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = fn(*args, **kwargs)
            return result
        return wrapper
    return decorator


@repeat(3)
def greet(name):
    print(f"hello {name}")
```

这时可以这样理解：
- 最外层先接装饰器参数 `times`
- 中间层接原函数 `fn`
- 最里层才是真正执行包装逻辑的 `wrapper`

### 6.7 多个装饰器叠加时顺序怎么记

```python
@a
@b
def func():
    pass
```

等价于：

```python
func = a(b(func))
```

也就是：
- 离函数最近的那个先包
- 最上面的那个最后包

### 6.8 装饰器常见应用场景

- 日志
- 权限校验
- 性能统计
- 缓存
- 重试
- 注册路由 / 注册插件

---

## 七、递归与尾递归补充

### 7.1 什么是递归

函数调用自己。

```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
```

### 7.2 什么时候递归写起来更自然

常见于：
- 树结构
- 分治问题
- 一层套一层的数据处理

### 7.3 什么是尾递归

尾递归指的是：
- 递归调用发生在函数返回前的最后一步

### 7.4 Python 里要不要依赖尾递归优化

通常不要。

Python 并不把尾调用优化当成基础承诺，所以如果递归层级很深，更稳的思路通常是改写成循环。

---

## 八、常见考点对应

本章主要对应 `python.docs-hub` 的这些题：

- `43` Lambda 函数
- `47` 为什么 Python 没有函数重载
- `48` 变量作用域（Scope）
- `49` 闭包
- `58` 装饰器用法
- 扩展主题：尾递归

如果你面试遇到这些题，优先按下面顺序组织回答：

1. **先给一句话定义**
2. **再给一个最短代码例子**
3. **最后说应用场景或易错点**

---

**本章小结**：函数默认返回 `None`；参数分位置参数、默认参数、`*args`、`**kwargs`；作用域遵循 LEGB；改全局用 `global`，改外层函数变量用 `nonlocal`；`lambda` 适合短小一次性函数；闭包是“函数 + 被记住的环境”；Python 没有传统函数重载，常用默认参数和 `*args/**kwargs` 替代；装饰器本质是“函数包函数”的增强写法；递归在某些问题上表达力很强，但深层递归通常不如循环稳妥。
