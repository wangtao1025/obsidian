# 身份判断与成员运算符

← [语法手册总览](/python/python语法手册) | [上一章 逻辑与真值](/python/python语法手册-06-逻辑与真值) | [下一章 数据处理](/python/python语法手册-08-数据处理)

---

**本章对应自测卷**：[身份判断与成员运算符（共 8 题）](/python/Python核心语法自测试卷#八身份判断与成员运算符-共-8-题)
**学完能做什么**：真正分清 `==` / `!=` 和 `is` / `is not` 的区别，知道 `in` / `not in` 在字符串、列表、集合、字典里的行为差异，并理解为什么判断 `None` 要用 `is None`。  
**小白注意**：① `==` 比“值”，`is` 比“是不是同一个对象”。② 判断 `None` 时优先用 `is None`。③ 字典的 `in` 默认查键，不查值。④ 不要依赖小整数或短字符串缓存去写业务逻辑。

---

## 一、先建立最核心的区分：值相等，不代表是同一个对象

**一句话先懂**：两个东西内容一样，不等于它们在内存里就是同一个对象。

```python
list_a = [1, 2, 3]
list_b = [1, 2, 3]
list_c = list_a

print(list_a == list_b)   # True
print(list_a is list_b)   # False
print(list_a is list_c)   # True
```

这三行里：
- `list_a == list_b`：看内容，内容一样，所以是 `True`
- `list_a is list_b`：看身份，它们是两个不同列表对象，所以是 `False`
- `list_a is list_c`：`list_c` 只是 `list_a` 的另一个名字，所以是 `True`

---

## 二、`==` / `!=`：比较值是否相等

### 2.1 `==` 的含义

**一句话先懂**：`==` 问的是“内容是不是一样”。

```python
print([1, 2] == [1, 2])
print('abc' == 'abc')
print(10 == 10.0)
```

### 2.2 `!=` 的含义

**一句话先懂**：`!=` 问的是“内容是不是不一样”。

```python
a = [1, 2]
b = [1, 2]
print(a != b)  # False
```

因为它们的值相同，所以“不等于”是 `False`。

### 2.3 `==` 背后通常调用什么

在很多对象上，`==` 本质上会走对象的 `__eq__()` 逻辑。

这意味着：
- 对内置类型，Python 已经帮你定义好了常见规则
- 对自定义类，你可以自己决定“什么叫相等”

---

## 三、`is` / `is not`：比较是不是同一个对象

### 3.1 `is` 的含义

**一句话先懂**：`is` 问的是“是不是内存里同一个对象”。

```python
a = [1, 2]
b = [1, 2]
c = a

print(a is b)  # False
print(a is c)  # True
```

### 3.2 `is not` 的含义

```python
a = [1, 2]
b = [1, 2]

print(a is not b)  # True
```

**一句话先懂**：`is not` 只是在问“它们是不是不同对象”。

### 3.3 `!=` 和 `is not` 为什么经常被混淆

```python
a = [1, 2]
b = [1, 2]

print(a != b)      # False
print(a is not b)  # True
```

因为：
- `a != b` 比较值
- `a is not b` 比较身份

所以这两个表达式完全可能一个是 `False`，一个是 `True`。

---

## 四、为什么判断 `None` 时推荐用 `is None`

### 4.1 `None` 是单例对象

**一句话先懂**：整个 Python 运行过程中，`None` 通常就那一个对象。

所以判断“是不是 `None`”，最准确的方式就是比较身份：

```python
if user is None:
  print('没有用户')

if user is not None:
  print('用户存在')
```

### 4.2 为什么不推荐写 `== None`

主要有两个原因：
- 语义上没 `is None` 清楚
- 某些自定义类可能重写了 `==` 的行为，导致结果不符合你原本的意图

**推荐写法**：

```python
if value is None:
  ...

if value is not None:
  ...
```

### 4.3 一个很重要的开发习惯

- 判断“是不是那个唯一的 `None` 对象” → 用 `is None`
- 判断“值是否相等” → 用 `==`

这两类问题不要混着写。

---

## 五、缓存现象为什么会误导你：不要用 `is` 比较数字和字符串

### 5.1 小整数与短字符串缓存现象

Python 为了性能，常常会缓存一些小整数和短字符串。

```python
a = 256
b = 256
print(a is b)
```

有时你会看到它是 `True`。  
但这不意味着“所有值相同的整数都应该用 `is` 比较”。

### 5.2 为什么这是陷阱

```python
x = 257
y = 257
print(x is y)
```

不同环境、不同实现、不同写法下，结果都可能不稳定。

**结论很简单**：
- 比较数字是否相等：用 `==`
- 比较字符串内容是否相等：用 `==`
- 只在判断 `None`、单例对象或明确需要身份比较时，才用 `is`

---

## 六、成员运算符：`in` 和 `not in`

**一句话先懂**：`in` 问的是“某个值是不是这个对象的成员”，`not in` 则相反。

```python
print(2 in [1, 2, 3])
print('py' in 'python')
print('x' not in 'python')
```

### 6.1 `in` 在不同数据结构里的含义不同

<span id="721-不同结构的查找逻辑"></span>
| 数据结构 | `in` 在查什么 | 常见复杂度 | 备注 |
| --- | --- | --- | --- |
| 字符串 | 字符或子串 | `O(n)` | `'py' in 'python'` 合法 |
| 列表 / 元组 | 元素 | `O(n)` | 从头到尾找 |
| 集合 | 元素 | 平均 `O(1)` | 基于哈希，通常很快 |
| 字典 | **键** | 平均 `O(1)` | 默认不查值 |

### 6.2 为什么字典的 `in` 容易踩坑

```python
d = {'a': 1, 'b': 2}
print('a' in d)             # True
print(1 in d)               # False
print(1 in d.values())      # True
print(('a', 1) in d.items())  # True
```

**一句话先懂**：`key in dict` 默认查的是键，不是值。

所以：
- 查键：`x in d`
- 查值：`x in d.values()`
- 查键值对：`(k, v) in d.items()`

### 6.3 `not in` 只是反过来写

```python
print('z' not in 'python')
print(5 not in {1, 2, 3})
```

它本质上就是“成员不存在”的判断。

### 6.4 为什么集合和字典查成员通常更快

因为集合和字典底层通常用哈希结构来定位元素或键，所以平均情况下查找更快。  
而列表、元组、字符串通常是从前往后扫，数据越长越慢。

**开发建议**：
- 如果你要做大量“是否存在”的判断，优先考虑 `set`
- 如果你既要存值又要按键快速查找，优先考虑 `dict`

<span id="723-自定义对象支持-in"></span>
### 6.5 自定义对象如何支持 `in`

如果你想让 `2 in obj` 这种写法对自定义对象生效，可以实现 `__contains__()`。

```python
class MyBox:
  def __init__(self, data):
    self.data = data

  def __contains__(self, item):
    return item in self.data

box = MyBox([1, 2, 3])
print(2 in box)  # True
```

**一句话先懂**：`in` 会问这个对象：“你认不认识这个成员？”  
而 `__contains__()` 就是在回答这个问题。

### 6.6 如果没写 `__contains__`，Python 通常还会怎么找

如果一个对象没有实现 `__contains__()`，Python 通常还会尝试：
- 看它能不能被迭代（比如实现了 `__iter__()`）
- 或者能不能按下标不断取值（较旧风格的序列协议）

也就是说，`x in obj` 在很多情况下，本质上是在“遍历这个对象，看里面有没有 `x`”。

```python
class MyItems:
  def __init__(self, data):
    self.data = data

  def __iter__(self):
    return iter(self.data)

obj = MyItems([1, 2, 3])
print(2 in obj)  # True
```

### 6.7 为什么 `obj == None` 可能不可靠

因为有些类可以自己改写 `==` 的行为。

```python
class Weird:
  def __eq__(self, other):
    return True

obj = Weird()
print(obj == None)   # True
print(obj is None)   # False
```

所以判断空值时，更稳妥的写法仍然是：

```python
if obj is None:
  ...
```

---

## 七、本章高频问法速记

- **`==` 和 `is` 的区别**：`==` 比值，`is` 比是不是同一个对象。
- **为什么 `list_a == list_b` 是 `True`，但 `list_a is list_b` 是 `False`**：两个列表内容一样，但不是同一个列表对象。
- **为什么判断 `None` 推荐用 `is None`**：因为判断的是“是不是那个唯一的 `None` 对象”。
- **`!=` 和 `is not` 的区别**：前者比值不等，后者比身份不同。
- **字典里的 `in` 默认查什么**：查键，不查值。
- **为什么 `1 in d` 往往是 `False`**：因为字典默认不按值查。
- **为什么集合查成员通常更快**：平均情况下基于哈希查找，通常是 `O(1)`。
- **什么时候不要用 `is`**：不要拿它比较数字或字符串内容是否相等。
- **自定义对象怎样支持 `in`**：实现 `__contains__()`。

---

**本章小结**：第七章真正要掌握的，只有两条主线：第一条是“值”和“身份”必须彻底分开，`==` / `!=` 处理的是值，`is` / `is not` 处理的是身份；第二条是 `in` / `not in` 的行为依赖具体数据结构，尤其要记住字典默认查键、集合查成员很快。把这两条主线抓稳，身份判断和成员运算符基本就不会再混。 
