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

## 六、装饰器一句话补充

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

你现在只要先记住：**装饰器底层离不开函数对象、闭包、`*args/**kwargs`**。

---

## 七、常见考点对应

本章主要对应 `python.docs-hub` 的这些题：

- `43` Lambda 函数
- `47` 为什么 Python 没有函数重载
- `48` 变量作用域（Scope）
- `49` 闭包
- `58` 装饰器用法

如果你面试遇到这些题，优先按下面顺序组织回答：

1. **先给一句话定义**
2. **再给一个最短代码例子**
3. **最后说应用场景或易错点**

---

**本章小结**：函数默认返回 `None`；参数分位置参数、默认参数、`*args`、`**kwargs`；作用域遵循 LEGB；改全局用 `global`，改外层函数变量用 `nonlocal`；`lambda` 适合短小一次性函数；闭包是“函数 + 被记住的环境”；Python 没有传统函数重载，常用默认参数和 `*args/**kwargs` 替代。
