# 逻辑判断与真值检测

← [语法手册总览](/python/python语法手册) | [上一章 内置函数](/python/python语法手册-05-内置函数) | [下一章 身份与成员](/python/python语法手册-07-身份与成员)

---

**本章对应自测卷**：[逻辑判断与真值检测（共 44 题）](/python/Python核心语法自测试卷#七逻辑判断与真值检测-共-44-题)
**学完能做什么**：理解 `and` / `or` / `not` 的返回值规则，掌握假值列表、短路机制、关系运算符、链式比较、浮点数比较、三元表达式，以及 Python 中常见的 `switch` 替代方案。  
**小白注意**：① `and` / `or` 不一定返回布尔值。② `not` 一定返回 `True` 或 `False`。③ 浮点数不要轻易用 `==` 判等。④ `match` 是 Python 3.10+ 语法。

---

## 一、先建立核心直觉：Python 的逻辑运算不只是“真”或“假”

**一句话先懂**：Python 里的逻辑判断，很多时候不是单纯在算 `True` / `False`，而是在“挑一个合适的结果”或者“决定后面还要不要继续算”。

比如：

```python
name = input_name or 'Guest'
```

这行代码就不只是判断真假，它还顺手完成了“取默认值”。

---

## 二、逻辑运算符与真值规则

<span id="61-逻辑运算符-and-or-not"></span>
### 2.1 `and` / `or` / `not`

| 运算符 | 一句话理解 | 返回值规则 |
| --- | --- | --- |
| `and` | 找第一个假值 | 返回第一个假值；如果都为真，返回最后一个 |
| `or` | 找第一个真值 | 返回第一个真值；如果都为假，返回最后一个 |
| `not` | 逻辑取反 | 一定返回布尔值 |

```python
print(1 and 2 and 3)     # 3
print(0 and 2 and 3)     # 0
print('' and 'hello')    # ''

print(0 or '' or 'hello')  # 'hello'
print(1 or 2 or 3)         # 1
print(0 or '' or [])       # []
```

### 2.2 为什么 `and` / `or` 不总是返回布尔值

**一句话先懂**：它们的设计目标是“根据真假挑结果”，不是强制把一切都变成 `True` / `False`。

比如：

```python
a = 'Python'
b = ''

print(a and 123)  # 123
print(b or '默认值')  # 默认值
```

- `a and 123`：前面是真的，所以继续看后面，返回 `123`
- `b or '默认值'`：前面是假的，所以返回后面的 `'默认值'`

这也是它们在“默认值选择”“防御式判断”里很好用的原因。

### 2.3 `not` 和 `and` / `or` 的一个重要区别

**一句话先懂**：`not` 会强制把结果变成布尔值，而 `and` / `or` 往往返回原对象。

```python
print(not [])       # True
print(not 'hello')  # False
print(not 0)        # True
print(not None)     # True
```

### 2.4 短路计算：后面可能根本不会执行

**一句话先懂**：如果前面的结果已经足够决定整条表达式的结果，Python 就不会再算后面了。

#### 2.4.1 `and` 的短路

```python
x = 0
print(x and 1 / 0)  # 0
```

因为 `x` 是假值，`and` 已经知道整条表达式一定是假，所以后面的 `1 / 0` 根本不会执行。

#### 2.4.2 `or` 的短路

```python
x = 'ok'
print(x or 1 / 0)   # ok
```

因为前面已经是真值，`or` 已经知道结果一定为真，所以后面也不会执行。

### 2.5 短路最常见的两个实际用途

#### 2.5.1 安全判断，避免报错

```python
if user is not None and user.name == 'Admin':
  print('管理员')
```

如果 `user` 是 `None`，那么第二部分 `user.name` 就不会执行，从而避免 `AttributeError`。

#### 2.5.2 设置默认值

```python
name = input_name or 'Guest'
```

逻辑是：
- 如果 `input_name` 有值，就用它
- 如果它是假值（比如空字符串），就退回到 `'Guest'`

<span id="62-真值测试谁是假-truth-value-testing"></span>
### 2.6 真值测试：哪些对象会被当成假

下面这些对象在布尔环境中会被视为假：

- `False`
- `None`
- `0`
- `0.0`
- `0j`
- `''`
- `[]`
- `()`
- `{}`
- `set()`
- `range(0)`

除了这些常见假值之外，大多数对象都是真值。

```python
print(bool([]))
print(bool(''))
print(bool([1]))
print(bool('hello'))
```

<span id="64-进阶自定义对象的真值"></span>
### 2.7 自定义对象的真值判断优先级

Python 判断一个自定义对象是真是假时，优先级是：

1. 先看 `__bool__()`
2. 没有 `__bool__()` 时，再看 `__len__()`
3. 两者都没有时，默认当成真

```python
class Box:
  def __len__(self):
    return 0

print(bool(Box()))  # False
```

如果写了 `__bool__()`，它优先级更高：

```python
class User:
  def __bool__(self):
    return False

print(bool(User()))  # False
```

---

<span id="65-关系运算符自测卷-6116-614"></span>
## 三、关系运算符：比较大小、相等与范围判断

### 3.1 六种关系运算符

| 运算符 | 含义 |
| --- | --- |
| `<` | 小于 |
| `<=` | 小于等于 |
| `>` | 大于 |
| `>=` | 大于等于 |
| `==` | 等于 |
| `!=` | 不等于 |

**一句话先懂**：关系运算符的结果一定是布尔值。

```python
print(3 < 5)    # True
print(3 == 5)   # False
print(3 != 5)   # True
```

### 3.2 数值比较：整数和浮点数能直接比较

```python
print(10 == 10.0)  # True
print(10 < 10.5)   # True
```

因为 Python 会按数值意义比较它们，而不是只看类型名。

### 3.3 字符串比较：按字符编码顺序逐个比较

```python
print('Apple' < 'apple')
print('abc' < 'abd')
```

**一句话先懂**：字符串比较是逐字符进行的，比较依据是字符编码顺序。

所以：
- `'abc' < 'abd'` 是 `True`
- `'Apple' < 'apple'` 也是 `True`，因为大写字母的编码通常比小写字母小

### 3.4 列表和元组比较：逐元素、按顺序比较

```python
print([1, 2, 3] < [1, 2, 4])  # True
print([1, 2] < [1, 2, 3])     # True
```

规则是：
- 从左到右依次比较
- 一旦某一位分出大小，就停止
- 如果前面都一样，较短的序列更小

### 3.5 链式比较

```python
x = 5
print(1 < x < 10)   # True
print(1 < x == 5)   # True
```

**一句话先懂**：`1 < x < 10` 等价于 `(1 < x) and (x < 10)`。

### 3.5.1 中间变量会求值几次

只求值一次。

这就是链式比较的一个重要优点：
- 写法更自然
- 也避免中间表达式被重复计算

### 3.5.2 `a < b > c` 会不会比较 `a` 和 `c`

不会。

```python
a, b, c = 1, 5, 3
print(a < b > c)   # True
```

它等价于：

```python
(a < b) and (b > c)
```

并不会额外比较 `a < c`。

### 3.5.3 链式比较也会短路

如果前半段已经是 `False`，后半段就不会继续求值。

### 3.6 浮点数比较：不要轻易直接用 `==`

```python
print(0.1 * 3 == 0.3)  # 可能是 False
```

原因不是 Python 算错了，而是浮点数底层用二进制近似表示，很多十进制小数无法精确存储。

### 3.6.1 推荐做法一：`math.isclose()`

```python
import math
print(math.isclose(0.1 * 3, 0.3))
```

### 3.6.2 推荐做法二：手动设容差

```python
a = 0.1 * 3
b = 0.3
print(abs(a - b) < 1e-9)
```

### 3.7 哪些类型支持全部六种比较，哪些不支持

- **常见支持全部六种的类型**：数字、字符串、列表、元组
- **通常只适合用 `==` 和 `!=` 的类型**：字典
- **集合有特殊情况**：
  - `==` / `!=` 可以比较是否元素相同
  - `<` / `<=` / `>` / `>=` 不是普通大小比较，而是**子集 / 超集关系判断**

```python
print({1, 2} == {2, 1})  # True
print({1} < {1, 2})      # True，表示真子集
```

所以集合上的 `<` 并不是“1 比 2 小”的意思。

### 3.8 字典为什么不能直接用 `<` 比较

```python
# {'a': 1} < {'b': 2}   # TypeError
```

字典主要支持：
- `==`
- `!=`

如果你要“按某个键的值比较字典”，通常应该明确写出比较规则，比如：

```python
a = {'score': 80}
b = {'score': 95}
print(a['score'] < b['score'])
```

### 3.9 复杂数据结构比较

```python
print([[1, 2], [3, 4]] < [[1, 2], [3, 5]])  # True
```

嵌套列表仍然是逐层按顺序比较。  
但嵌套字典仍然不支持普通大小比较。

<span id="157-自定义类比较"></span>
### 3.10 自定义类比较

**一句话先懂**：如果你希望 `p1 < p2`、`p1 == p2` 这样的写法对自定义对象生效，就要在类里实现对应的特殊方法。

常见对应关系：
- `==` → `__eq__`
- `<` → `__lt__`
- `<=` → `__le__`
- `>` → `__gt__`
- `>=` → `__ge__`

```python
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def __lt__(self, other):
    if isinstance(other, Person):
      return self.age < other.age
    return NotImplemented

  def __repr__(self):
    return f"Person(name='{self.name}', age={self.age})"

p1 = Person('Alice', 25)
p2 = Person('Bob', 30)
print(p1 < p2)  # True
print(sorted([p2, p1]))
```

### 3.10.1 为什么要返回 `NotImplemented`

如果对方不是你支持的类型，比如拿 `Person` 去跟整数比较，应该返回 `NotImplemented`，这样 Python 才有机会尝试别的比较路径，或者最终给出合理的 `TypeError`。

```python
class Person:
  def __lt__(self, other):
    if isinstance(other, Person):
      return True
    return NotImplemented
```

---

## 四、`if`、三元表达式与条件分支写法

### 4.1 `if` / `elif` / `else`

这是最基础的条件分支结构。

```python
score = 85

if score >= 90:
  level = '优秀'
elif score >= 60:
  level = '及格'
else:
  level = '不及格'
```

适合场景：
- 分支较多
- 每个分支里逻辑不止一行
- 需要清晰表达流程

## 五、三元表达式：一行写完简单条件

### 5.1 基本语法

```python
结果1 if 条件 else 结果2
```

**一句话先懂**：如果条件为真，就取前面的值；否则取后面的值。

```python
score = 75
level = '及格' if score >= 60 else '不及格'
print(level)
```

### 5.2 它和普通 `if-else` 的关系

上面那句三元表达式，等价于：

```python
if score >= 60:
  level = '及格'
else:
  level = '不及格'
```

### 5.3 三元表达式的高频场景

#### 5.3.1 简单条件赋值

```python
user_input = '2'
preference = user_input if user_input in ['1', '2', '3'] else '1'
```

#### 5.3.2 列表推导式里按条件转换

```python
nums = [1, 2, 3, 4, 5, 6]
result = [str(x) if x % 2 == 0 else x for x in nums]
print(result)
```

#### 5.3.3 函数返回值按条件选择

```python
def pass_status(score):
  return '通过' if score >= 60 else '未通过'
```

### 5.4 什么时候不适合用三元表达式

不太适合这些场景：
- 条件本身很复杂
- 分支里逻辑不止一个表达式
- 出现多层嵌套三元，读起来费劲

这时更推荐普通 `if / elif / else`，因为可读性更高。

---

## 六、Python 里如何实现“switch”效果

Python 没有传统 C / Java 那种老式 `switch` 语句，但有很多替代写法。

### 6.1 方式一：`if-elif-else`

```python
grade = 'B'

if grade == 'A':
  text = '优秀'
elif grade == 'B':
  text = '良好'
elif grade == 'C':
  text = '及格'
else:
  text = '未知等级'
```

适合：
- 分支不多
- 条件不只是“等于某个值”
- 初学者最容易理解

### 6.2 方式二：字典映射

```python
grade_map = {
  'A': '优秀',
  'B': '良好',
  'C': '及格'
}

grade = 'B'
print(grade_map.get(grade, '未知等级'))
```

适合：
- 纯“值 → 值”的映射
- 分支较多
- 配置化需求

### 6.3 方式三：函数字典

```python
def case_a():
  return '处理 A'

def case_b():
  return '处理 B'

def case_default():
  return '默认处理'


def dispatch(case):
  table = {
    'a': case_a,
    'b': case_b,
  }
  func = table.get(case, case_default)
  return func()
```

适合：
- 每个分支里有不同的复杂逻辑
- 想把各分支拆成独立函数
- 路由、命令分发、处理器映射

### 6.4 方式四：`match` 语句（Python 3.10+）

```python
def handle(cmd):
  match cmd:
    case 'start':
      return 'start ok'
    case 'stop':
      return 'stop ok'
    case 'pause':
      return 'pause ok'
    case _:
      return 'unknown command'
```

**一句话先懂**：`match` 像是 Python 现代版的模式匹配，不只是比值相等，还能匹配类型、结构和附加条件。

### 6.5 `case _:` 是什么意思

它相当于“默认分支”，一般放在最后。

### 6.6 `match` 里的几个常见写法

#### 6.6.1 多个值合并匹配

```python
match cmd:
  case 'a' | 'b':
    print('命中 a 或 b')
```

#### 6.6.2 类型模式

```python
match x:
  case int():
    print('是整数')
  case str():
    print('是字符串')
```

#### 6.6.3 绑定变量

```python
match x:
  case int(n):
    print('整数值是', n)
```

- `case int():`：只检查是不是整数
- `case int(n):`：检查是整数，并把值绑定给变量 `n`

#### 6.6.4 守卫条件

```python
match x:
  case int(n) if n > 0:
    print('正整数')
  case str(s) if len(s) > 5:
    print('长字符串')
  case _:
    print('其他')
```

这类写法就叫“类型 + 守卫”。

### 6.7 这四种 switch 写法怎么选

- **分支少、逻辑简单**：`if-elif-else`
- **纯值映射、分支多**：字典映射
- **每个分支逻辑复杂**：函数字典
- **Python 3.10+ 且需要模式匹配能力**：`match`

从工程实践看：
- 字典映射通常更适合做配置、路由、状态到文本的映射
- `if-elif-else` 在条件不是简单值匹配时更灵活
- `match` 可读性强，但要考虑 Python 版本要求

---

## 七、本章高频问法速记

- **`and` 的返回值规则**：返回第一个假值；如果都为真，返回最后一个。
- **`or` 的返回值规则**：返回第一个真值；如果都为假，返回最后一个。
- **`not` 的返回值类型**：总是布尔值。
- **哪些对象是假值**：`None`、`False`、各种数值零、空字符串、空容器等。
- **为什么 `if user is not None and user.name == ...` 安全**：因为 `and` 会短路。
- **自定义对象真值优先级**：`__bool__()` → `__len__()` → 默认真。
- **`1 < x < 10` 等价于什么**：`(1 < x) and (x < 10)`，而且 `x` 只求值一次。
- **浮点数为什么别直接用 `==`**：因为二进制近似存储会带来精度误差。
- **集合和字典支持哪些比较**：字典主要是 `==` / `!=`；集合的 `<` / `>` 表示子集 / 超集关系。
- **自定义类比较时不支持对方类型该返回什么**：返回 `NotImplemented`。
- **三元表达式语法**：`结果1 if 条件 else 结果2`。
- **Python 如何替代 switch**：`if-elif-else`、字典映射、函数字典、`match`。

---

**本章小结**：逻辑判断这一章最重要的不是背“真假表”，而是建立三层意识：第一层，`and` / `or` / `not` 有明确的返回值规则；第二层，短路机制会影响程序是否继续执行、也能用来做安全判断和默认值；第三层，比较、三元表达式、`switch` 替代方案，本质上都是在“根据条件选择行为”。把这三层连起来，后面写条件判断就会自然很多。
