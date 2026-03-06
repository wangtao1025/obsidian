# 内置数据结构

← [语法手册总览](/python/python语法手册) | [上一章 赋值与算术运算符](/python/python语法手册-赋值与算术运算符) | [下一章 异常](/python/python语法手册-03-异常)

---

**本章对应自测卷**：[内置数据结构（共 37 题）](/python/Python核心语法自测试卷#三内置数据结构-共-37-题)
**学完能做什么**：熟练使用列表、元组、字符串、集合、字典完成增删改查，理解负索引与切片，分清 `append` / `insert` / `extend`、`remove` / `del` / `pop`、`sorted()` / `.sort()`、`.join()` / `.split()` 等高频知识点。  
**小白注意**：① 字符串和元组不能原地改。② `.sort()` 改原列表且返回 `None`。③ 字典的 `in` 默认查的是键，不是值。④ 负索引只适用于有顺序的数据类型。

---

## 一、先建立整体地图：Python 里常见的内置数据类型

**一句话先懂**：先分清“有没有顺序”“能不能修改”“是不是键值对”，后面大部分语法都能一下看懂。

### 1.1 本章最常见的七类类型

| 类型 | 例子 | 有序吗 | 可变吗 | 能重复吗 | 典型用途 |
| --- | --- | --- | --- | --- | --- |
| `list` | `[1, 2, 3]` | 有序 | 可变 | 可以 | 存一组要改动的数据 |
| `tuple` | `(1, 2, 3)` | 有序 | 不可变 | 可以 | 固定结构的数据 |
| `str` | `'hello'` | 有序 | 不可变 | 可以 | 文本处理 |
| `set` | `{1, 2, 3}` | 无序 | 可变 | 不可以 | 去重、成员判断 |
| `dict` | `{'name': 'Tom'}` | 键有插入顺序 | 可变 | 键不能重复 | 键值映射 |
| `int` | `10` | - | 不可变 | - | 整数计算 |
| `float` | `3.14` | - | 不可变 | - | 小数计算 |

### 1.2 一个非常重要的分类：可变 vs 不可变

**一句话先懂**：可变对象能在原地改，不可变对象每次“修改”本质上都是创建新对象。

- **可变对象**：`list`、`set`、`dict`
- **不可变对象**：`tuple`、`str`、`int`、`float`

```python
name = 'abc'
name = name.replace('a', 'A')

nums = [1, 2, 3]
nums.append(4)
```

**为什么这很重要**：
- 决定你能不能写 `obj[0] = ...`
- 决定方法调用后是“原地修改”还是“返回新对象”
- 决定共享引用时会不会互相影响

---

<span id="10-负索引与切片适用所有序列"></span>
## 二、负索引与切片：所有序列都绕不过去的基础

**一句话先懂**：正索引从左往右数，负索引从右往左数；切片是“取一段”，而且始终是“包前不包后”。

适用对象：`list`、`tuple`、`str` 等**有顺序的序列**。  
不适用：`set`、`dict`，因为它们不是“按位置访问”的结构。

```python
s = 'python'
print(s[0])    # 'p'
print(s[-1])   # 'n'
print(s[1:4])  # 'yth'
print(s[::-1]) # 'nohtyp'
```

### 2.1 正索引与负索引怎么对应

假设：

```python
arr = ['A', 'B', 'C', 'D', 'E']
```

| 位置 | 正索引 | 负索引 |
| --- | --- | --- |
| 第 1 个 | `0` | `-5` |
| 第 2 个 | `1` | `-4` |
| 第 3 个 | `2` | `-3` |
| 第 4 个 | `3` | `-2` |
| 最后 1 个 | `4` | `-1` |

**最该记住的一条**：最后一个元素永远是 `-1`。

### 2.2 切片三件套：`start:stop:step`

**标准语法**：

```python
seq[start:stop:step]
```

- `start`：从哪开始
- `stop`：到哪结束，但**不包含这个位置**
- `step`：每隔几个取一个

```python
nums = [0, 1, 2, 3, 4, 5, 6]

print(nums[1:5])   # [1, 2, 3, 4]
print(nums[:3])    # [0, 1, 2]
print(nums[3:])    # [3, 4, 5, 6]
print(nums[::2])   # [0, 2, 4, 6]
print(nums[::-1])  # [6, 5, 4, 3, 2, 1, 0]
```

**高频写法**：
- `seq[-1]`：最后一个元素
- `seq[-3:]`：最后三个元素
- `seq[:-1]`：除了最后一个
- `seq[::-1]`：反转

<span id="1031-开始结束步长的组合规则含正负与空切片"></span>
#### 2.2.1 起止位置和步长容易出错的地方

**一句话先懂**：步长是正数时从左往右取，步长是负数时从右往左取；方向写反了就会得到空结果。

```python
text = 'abcdef'

print(text[1:4])     # 'bcd'
print(text[4:1:-1])  # 'edc'
print(text[1:4:-1])  # ''
```

为什么第三个结果是空字符串：
- `step=-1` 说明想从右往左走
- 但 `start=1` 在左边，`stop=4` 在右边
- 方向和位置矛盾，所以取不到任何元素

### 2.3 单下标会报错，切片通常不会

```python
nums = [1, 2, 3]

# print(nums[10])   # IndexError
print(nums[10:20])  # []
```

**开发视角**：
- `seq[i]` 是“精确取某一个位置”，越界就报错
- `seq[a:b]` 是“取一段范围”，Python 会自动裁剪范围

---

<span id="11-列表-list---有序可变容器"></span>
## 三、列表 `list`：最常用的可变容器

**一句话先懂**：列表就是“有顺序、能修改、能重复、能放任意类型”的数据容器。

```python
students = ['Tom', 'Alice', 'Bob']
```

### 3.1 列表的四个核心特点

- **有序**：每个元素都有位置，可以索引和切片
- **可变**：可以增删改元素
- **可重复**：相同元素可以出现多次
- **元素类型不限**：可以同时放整数、字符串、列表等

```python
data = [1, 'hello', True, [10, 20]]
```

### 3.2 访问、修改、切片

```python
nums = [10, 20, 30, 40]
print(nums[0])    # 10
print(nums[-1])   # 40
print(nums[1:3])  # [20, 30]

nums[1] = 200
print(nums)       # [10, 200, 30, 40]
```

### 3.3 添加元素：`append()`、`insert()`、`extend()`

**一句话先懂**：
- `append(x)`：末尾加一个元素
- `insert(i, x)`：指定位置插入一个元素
- `extend(iterable)`：把一批元素逐个加进去

```python
items = [1, 2]
items.append(3)
print(items)   # [1, 2, 3]

items.insert(1, 99)
print(items)   # [1, 99, 2, 3]

items.extend([7, 8])
print(items)   # [1, 99, 2, 3, 7, 8]
```

#### 为什么 `append([3, 4])` 和 `extend([3, 4])` 结果不一样

```python
a = [1, 2]
b = [1, 2]

a.append([3, 4])
b.extend([3, 4])

print(a)  # [1, 2, [3, 4]]
print(b)  # [1, 2, 3, 4]
```

- `append()` 把整个对象当成一个元素塞进去
- `extend()` 会把可迭代对象拆开，再逐个加入列表

这就是三者最容易混淆的地方。

### 3.4 删除元素：`remove()`、`pop()`、`del`

**一句话先懂**：
- `remove(x)`：按值删，删第一个匹配项
- `pop(i)`：按位置删，并返回被删掉的值
- `del`：既能删单个位置，也能删一整段，甚至删整个变量名

```python
nums = [10, 20, 30, 20]
nums.remove(20)
print(nums)  # [10, 30, 20]

value = nums.pop(1)
print(value) # 30
print(nums)  # [10, 20]

del nums[0]
print(nums)  # [20]
```

#### 三者的区别表

| 写法 | 按什么删 | 有返回值吗 | 典型报错 |
| --- | --- | --- | --- |
| `remove(x)` | 按值 | 没有 | 值不存在时 `ValueError` |
| `pop(i)` | 按索引 | 有，返回被删元素 | 越界时 `IndexError` |
| `del lst[i]` | 按索引 / 切片 | 没有 | 越界时 `IndexError` |

### 3.5 排序：`.sort()` 和 `sorted()`

<span id="111-sorted-与-sort-详解小白必读"></span>
**一句话先懂**：`.sort()` 改原列表，`sorted()` 返回新列表。

```python
nums = [3, 1, 4, 2]

new_nums = sorted(nums)
print(new_nums)  # [1, 2, 3, 4]
print(nums)      # [3, 1, 4, 2]

nums.sort()
print(nums)      # [1, 2, 3, 4]
```

**最容易犯的错**：

```python
nums = [3, 1, 2]
result = nums.sort()
print(result)  # None
```

因为 `.sort()` 的设计目标是“原地排序”，不是“返回新列表”。

**常用参数**：

```python
words = ['banana', 'apple', 'pear']
print(sorted(words, reverse=True))
print(sorted(words, key=len))
```

### 3.6 列表元素类型转换

有时候列表里的元素是字符串，但你要做数值运算，需要先转型。

```python
scores = ['90', '85', '100']
nums = [int(x) for x in scores]
print(nums)  # [90, 85, 100]
```

也可以配合 `map()`：

```python
nums = list(map(int, ['1', '2', '3']))
print(nums)  # [1, 2, 3]
```

**开发视角**：
- 读文件、读接口、读表单数据时，很多数字一开始其实是字符串
- 真正运算前，先把类型转对，是非常常见的预处理步骤

### 3.7 列表推导式：写法更紧凑的批量生成

```python
nums = [1, 2, 3, 4, 5]
squares = [x * x for x in nums if x % 2 == 1]
print(squares)  # [1, 9, 25]
```

**一句话理解**：把“循环 + 判断 + 收集结果”写到一行里。

---

<span id="12-元组-tuple---有序不可变序列"></span>
## 四、元组 `tuple`：有顺序，但一般不改

**一句话先懂**：元组像“不能改的列表”，常用来表达一组固定结构的数据。

```python
point = (3, 5)
user = ('Tom', 18, 'Shanghai')
```

### 4.1 元组的特点

- 有序
- 不可变
- 允许重复元素
- 支持索引和切片

```python
info = ('Tom', 18, 'dev')
print(info[0])   # 'Tom'
print(info[-1])  # 'dev'
print(info[1:])  # (18, 'dev')
```

### 4.2 单元素元组一定要加逗号

```python
a = (1)
print(type(a))   # <class 'int'>

b = (1,)
print(type(b))   # <class 'tuple'>
```

**关键点**：决定是不是元组的，不是括号，而是**逗号**。

### 4.3 元组只有两个高频方法：`count()` 和 `index()`

```python
nums = (1, 2, 2, 3)
print(nums.count(2))  # 2
print(nums.index(3))  # 3
```

### 4.4 元组解包

**一句话先懂**：把元组里的值按顺序拆给多个变量。

```python
name, age, city = ('Alice', 20, 'Beijing')
print(name, age, city)
```

也能配合星号：

```python
first, *middle, last = (10, 20, 30, 40)
print(first)   # 10
print(middle)  # [20, 30]
print(last)    # 40
```

### 4.5 列表和元组怎么选

| 场景 | 更适合谁 | 原因 |
| --- | --- | --- |
| 数据后面还要增删改 | `list` | 可变 |
| 数据结构固定 | `tuple` | 更稳、更清晰 |
| 需要当字典键 | `tuple`（元素也得可哈希） | 列表不可哈希 |
| 只是临时装一批数据 | 两者都行 | 看是否需要修改 |

**开发经验**：
- “一组经纬度、颜色 RGB、数据库记录坐标”这类固定结构，元组很自然
- “待办事项、购物车、接口返回结果集合”这类会改动的东西，更常用列表

---

## 五、集合 `set`：去重和成员判断特别快

**一句话先懂**：集合里没有重复元素，而且特别适合做“是否存在”的判断。

```python
nums = {1, 2, 3, 3, 2}
print(nums)  # {1, 2, 3}
```

### 5.1 集合的特点

- 无序
- 元素唯一
- 可变
- 不能用索引和切片

### 5.2 常用操作

```python
s = {1, 2, 3}
s.add(4)
print(s)  # {1, 2, 3, 4}

s.remove(2)
print(s)  # {1, 3, 4}

print(3 in s)  # True
```

### 5.3 `remove()` 和 `discard()` 的区别

```python
s = {1, 2, 3}
# s.remove(99)   # KeyError
s.discard(99)    # 不报错
```

**一句话区别**：
- `remove(x)`：元素不存在会报错
- `discard(x)`：元素不存在也没事

### 5.4 交集、并集、差集

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # 并集 {1, 2, 3, 4, 5}
print(a & b)  # 交集 {3}
print(a - b)  # 差集 {1, 2}
```

**典型用途**：
- 用户标签去重
- 黑名单过滤
- 判断两个列表里哪些元素重复

---

<span id="14-字典-dict---键值对映射"></span>
## 六、字典 `dict`：最重要的键值对结构

**一句话先懂**：字典用“键 → 值”的方式存数据，查找通常很快，开发里几乎天天用。

```python
user = {'name': 'Tom', 'age': 18}
```

### 6.1 字典的特点

- 用键找值，不靠位置
- 键不能重复
- 值可以重复
- 可变
- 从 Python 3.7 起，字典会保留插入顺序

### 6.2 取值：直接取和安全取值

```python
user = {'name': 'Tom', 'age': 18}

print(user['name'])      # 'Tom'
print(user.get('age'))   # 18
print(user.get('city'))  # None
print(user.get('city', '未知'))  # '未知'
```

**什么时候用 `[]`，什么时候用 `.get()`**：
- 确定键一定存在：`user['name']`
- 不确定键是否存在：`user.get('name')`

### 6.3 增、改、删

```python
user = {'name': 'Tom', 'age': 18}

user['city'] = 'Shanghai'   # 新增
user['age'] = 20            # 修改
print(user)

age = user.pop('age')
print(age)   # 20
print(user)

del user['city']
print(user)
```

### 6.4 遍历字典

```python
user = {'name': 'Tom', 'age': 18}

for key in user:
    print(key, user[key])

for key, value in user.items():
    print(key, value)
```

常见三个视图：
- `dict.keys()`：所有键
- `dict.values()`：所有值
- `dict.items()`：所有键值对

### 6.5 `in` 判断的默认对象是键

```python
user = {'name': 'Tom', 'age': 18}

print('name' in user)  # True
print('Tom' in user)   # False
```

如果你要判断值是否存在，要写：

```python
print('Tom' in user.values())  # True
```

### 6.6 合并字典

```python
a = {'x': 1, 'y': 2}
b = {'y': 999, 'z': 3}

print(a | b)          # {'x': 1, 'y': 999, 'z': 3}
print({**a, **b})     # {'x': 1, 'y': 999, 'z': 3}
```

**规则**：后面的同名键会覆盖前面的值。

---

## 七、字符串 `str`：最常处理的不可变序列

**一句话先懂**：字符串本质上是“字符组成的不可变序列”，所以它支持索引和切片，但你不能原地改某个字符。

```python
text = 'python'
print(text[0])   # 'p'
print(text[-1])  # 'n'
```

```python
# text[0] = 'P'   # TypeError: 'str' object does not support item assignment
```

### 7.1 字符串常见方法总览

| 类别 | 常用方法 |
| --- | --- |
| 查找 | `find()`、`index()`、`count()` |
| 替换 | `replace()`、`re.sub()` |
| 分割拼接 | `split()`、`rsplit()`、`join()` |
| 大小写 | `lower()`、`upper()`、`title()`、`capitalize()` |
| 清理空白 | `strip()`、`lstrip()`、`rstrip()` |
| 判断 | `isdigit()`、`isalpha()`、`isalnum()`、`startswith()`、`endswith()` |

<span id="151-查找替换"></span>
<span id="151-查找find--index"></span>
#### 7.1.1 查找：`find()` 和 `index()`

**一句话先懂**：都能找子串位置，但 `find()` 找不到返回 `-1`，`index()` 找不到会报错。

```python
s = 'hello python'
print(s.find('python'))   # 6
print(s.find('java'))     # -1

print(s.index('hello'))   # 0
# print(s.index('java'))  # ValueError
```

**怎么选**：
- 不想写异常处理，通常先用 `find()`
- 明确要求“必须存在”，可以用 `index()`

<span id="152-字符串替换详解strreplace--不可变性-resub-多重替换"></span>
### 7.2 字符串替换：`replace()`、`re.sub()`、多重替换

**一句话先懂**：字符串不能原地改，所以替换永远返回新字符串。

```python
text = 'I like apple.'
new_text = text.replace('apple', 'banana')
print(new_text)  # I like banana.
print(text)      # I like apple.
```

#### 7.2.1 `str.replace()`：字面替换

**标准语法**：

```python
str.replace(old, new[, count])
```

```python
msg = 'a-b-c-a'
print(msg.replace('a', 'x'))      # x-b-c-x
print(msg.replace('a', 'x', 1))   # x-b-c-a
```

适合场景：
- 固定文本替换
- 不需要模式匹配
- 不关心大小写、数字范围、边界等复杂规则

#### 7.2.2 为什么字符串替换后原字符串没变

因为字符串是不可变对象。

```python
s = 'hello'
s.replace('h', 'H')
print(s)  # hello

s = s.replace('h', 'H')
print(s)  # Hello
```

**最常见错误**：忘了接收返回值。

#### 7.2.3 `re.sub()`：按模式替换

当你不是替换固定字面值，而是替换“某种模式”的文本时，用正则更合适。

```python
import re

text = '电话：13812345678，备用：13900001111'
masked = re.sub(r'\d{11}', '***', text)
print(masked)  # 电话：***，备用：***
```

**标准语法**：

```python
re.sub(pattern, repl, string, count=0)
```

- `pattern`：匹配规则
- `repl`：替换成什么
- `string`：原字符串
- `count`：最多替换几次，默认全部替换

#### 7.2.4 `re.sub()` 结合函数做多重替换（展开理解）

<span id="41-方式二详解resub-结合函数做多重替换小白向"></span>
有些场景不是“把所有匹配都换成同一个词”，而是：
- 匹配到 `red` 要换成 `crimson`
- 匹配到 `blue` 要换成 `navy`
- 匹配到 `green` 要换成 `emerald`

这时可以让 `re.sub()` 每匹配一次，就调用一次函数。

```python
import re

text = '这些颜色有 red、blue 和 green。'
mapping = {
  'red': 'crimson',
  'blue': 'navy',
  'green': 'emerald'
}

def replace_color(match):
  word = match.group(0)
  return mapping[word]

pattern = '|'.join(map(re.escape, mapping))
result = re.sub(pattern, replace_color, text)
print(result)  # 这些颜色有 crimson、navy 和 emerald。
```

把它拆开理解：
- `mapping`：准备“旧词 → 新词”的对照表
- `match.group(0)`：拿到当前匹配到的那一个词
- `replace_color()`：根据匹配到的词决定要换成什么
- `re.sub()`：不是直接替换成固定字符串，而是“匹配一个，调用一次函数”

#### 7.2.5 `re.escape()` 是干什么的

**一句话先懂**：把文本里那些在正则里有特殊意义的字符，转成“普通字符”。

```python
import re

keyword = 'a.b'
print(re.escape(keyword))   # a\.b
```

为什么重要：
- `.` 在正则里表示“任意字符”
- 如果用户真的输入了 `a.b`，你通常想匹配“字面上的 `a.b`”，不是 `axb`、`a9b`
- 所以把用户输入、字典键拼进正则前，常常先 `re.escape()`

#### 7.2.6 `re.compile()` 什么时候用

**一句话先懂**：同一个正则要反复使用时，先编译成模式对象会更清晰。

```python
import re

phone_pattern = re.compile(r'\d{11}')
text = '13812345678 和 13900001111'
print(phone_pattern.sub('***', text))  # *** 和 ***
```

适合场景：
- 同一规则要多次匹配、查找、替换
- 想把正则表达式起个名字，提高可读性
- 后面还想继续用 `.search()`、`.findall()`、`.sub()` 等方法

**补充**：`re.compile()` 不是新语法，本质上仍然是把正则“准备好以后再反复用”。

<span id="153-检查与转换"></span>
### 7.3 检查与转换

```python
s1 = '123'
s2 = 'abc'
s3 = 'abc123'

print(s1.isdigit())   # True
print(s2.isalpha())   # True
print(s3.isalnum())   # True
print('python'.startswith('py'))  # True
print('report.pdf'.endswith('.pdf'))  # True
```

**高频理解**：
- `isdigit()`：是不是全是数字字符
- `isalpha()`：是不是全是字母
- `isalnum()`：是不是全是字母或数字
- `startswith()` / `endswith()`：前缀 / 后缀判断

### 7.4 切片技巧

<span id="154-切片技巧"></span>
```python
s = 'abcdefg'
print(s[:3])    # abc
print(s[3:])    # defg
print(s[::2])   # aceg
print(s[::-1])  # gfedcba
```

常见用途：
- 取前缀、后缀
- 取间隔字符
- 反转字符串

<span id="155-join"></span>
### 7.5 `join()`：把多个字符串拼成一个

**一句话先懂**：`join()` 的调用者是“分隔符”，不是列表。

```python
words = ['I', 'love', 'Python']
print(' '.join(words))   # I love Python
print('-'.join(words))   # I-love-Python
```

**为什么很多人写反**：

```python
# words.join(' ')  # 错误，列表没有 join 这个用法
```

因为真正的意思是：
- 用某个分隔符
- 去连接一组字符串

**开发视角**：
- 拼 URL 片段、CSV 行、日志文本时非常常见
- 拼接大量字符串时，比反复 `+` 更自然，也通常更高效

<span id="155-split"></span>
<span id="156-split自测卷-319-待复习"></span>
### 7.6 `split()`：把一个字符串拆成列表

**一句话先懂**：`join()` 是“合起来”，`split()` 是“拆开来”。

```python
text = 'I love Python'
print(text.split())   # ['I', 'love', 'Python']

csv = 'a,b,c'
print(csv.split(',')) # ['a', 'b', 'c']
```

#### 7.6.1 `split()` 和 `split(' ')` 不一样

```python
text = 'a  b\t c\n'

print(text.split())
print(text.split(' '))
```

结果区别：
- `split()` 不传参数：按任意空白字符分割，并且会把连续空白看成一个分隔
- `split(' ')`：严格按单个空格分割，连续空格会产生空字符串

#### 7.6.2 `maxsplit`：最多分几次

```python
record = 'id,name,age,gender'
print(record.split(',', maxsplit=2))
# ['id', 'name', 'age,gender']
```

#### 7.6.3 什么时候用 `re.split()`

如果分隔符不止一种，可以用正则拆分。

```python
import re

text = 'apple,banana;orange|grape'
parts = re.split(r'[,;|]', text)
print(parts)  # ['apple', 'banana', 'orange', 'grape']
```

### 7.7 原始字符串 `r''`

<span id="157-原始字符串-r"></span>
**一句话先懂**：给字符串加 `r` 前缀后，反斜杠通常按普通字符处理。

```python
path = r'C:\new_folder\test.txt'
pattern = r'\d{11}'
```

适合场景：
- Windows 路径
- 正则表达式

### 7.8 大小写转换

<span id="158-大小写转换"></span>
```python
text = 'PyThOn'
print(text.lower())      # python
print(text.upper())      # PYTHON
print('hello world'.title())      # Hello World
print('python'.capitalize())      # Python
```

高频方法：
- `lower()`：转小写
- `upper()`：转大写
- `capitalize()`：首字母大写，其余通常变小写
- `title()`：每个单词首字母大写

**开发里最常用的是 `lower()`**：
- 做大小写不敏感比较
- 统一用户输入
- 处理邮箱、标签、命令等文本

### 7.9 去空白和去指定字符：`strip()` / `lstrip()` / `rstrip()`

<span id="159-去空格"></span>
**一句话先懂**：它们默认只去两端，不会改中间。

```python
s = '  hello  '
print(s.strip())   # 'hello'
print(s.lstrip())  # 'hello  '
print(s.rstrip())  # '  hello'
```

#### 7.9.1 默认行为：去两端空白字符

这里的“空白”不只是空格，还包括：
- 换行 `\n`
- 制表符 `\t`
- 其他空白字符

```python
text = '\n\t hello \t\n'
print(text.strip())
```

#### 7.9.2 传参数时，不是删子串，而是删“字符集合”

```python
url = 'www.baidu.com/'
print(url.strip('w./'))   # baidu.com

code = '123-SECRET-321'
print(code.strip('0123456789-'))  # SECRET
```

这一步很容易误解。  
`strip('abc')` 的意思不是“删除前后的 `'abc'` 整段”，而是：
- 只要开头或结尾的字符属于 `a`、`b`、`c` 这个集合
- 就一直删
- 直到遇到不属于这个集合的字符为止

### 7.10 反转字符串

<span id="1510-反转字符串"></span>
**一句话先懂**：首选切片 `[::-1]`，又短又清楚。

#### 7.10.1 切片法 `[::-1]`

```python
s = 'Python'
print(s[::-1])  # nohtyP
```

#### 7.10.2 `reversed()` + `join()`

```python
s = 'Python'
print(''.join(reversed(s)))  # nohtyP
```

#### 7.10.3 for 循环也能写，但不推荐做首选

```python
s = 'Python'
result = ''
for ch in s:
  result = ch + result
print(result)  # nohtyP
```

**怎么选**：
- 最常用：`s[::-1]`
- 想强调“反向迭代再拼接”：`''.join(reversed(s))`
- 教学上可以看 for 循环，但实际代码里通常不用它当首选

---

<span id="16-整型-integer---不可变数值对象"></span>
## 八、整数 `int`：没有小数的数值类型

**一句话先懂**：整数是不可变对象，支持普通十进制写法，也支持二进制、八进制、十六进制表示。

```python
a = 10
b = 0b1010
c = 0o12
d = 0xA
```

### 8.1 常见转换

```python
print(int('123'))      # 123
print(int(3.9))        # 3
print(int('1010', 2))  # 10
print(int('FF', 16))   # 255
```

**注意**：`int(3.9)` 不是四舍五入，而是直接去掉小数部分。

### 8.2 常见进制函数

```python
print(bin(10))  # 0b1010
print(oct(10))  # 0o12
print(hex(10))  # 0xa
```

### 8.3 小整数对象池

**一句话先懂**：Python 通常会缓存 `-5` 到 `256` 之间的整数对象，用来提高性能。

```python
a = 100
b = 100
print(a is b)   # 通常为 True
```

**但要注意**：
- 这是实现细节，不要把它当业务逻辑来依赖
- 判断数值是否相等，用 `==`
- 判断是不是同一个对象，才用 `is`

---

<span id="17-浮点型-float---双精度浮点数"></span>
## 九、浮点数 `float`：带小数的数值类型

**一句话先懂**：浮点数能表示小数，但很多十进制小数无法在二进制里精确表示，所以会有精度误差。

```python
print(0.1 + 0.2)  # 0.30000000000000004
```

### 9.1 为什么会这样

因为计算机底层用二进制存浮点数，像 `0.1` 这样的十进制小数，往往不能被精确表示，只能存成一个非常接近的值。

### 9.2 常见处理方式

```python
value = 3.1415926
print(f'{value:.2f}')  # 3.14
```

```python
print(round(3.1415926, 2))  # 3.14
```

**开发视角**：
- 展示给用户时，通常格式化到固定小数位
- 做金额等强精度计算时，不能只靠普通 `float`

---

## 十、本章高频问法速记

- **列表和元组的区别是什么**：列表可变，元组不可变；两者都支持索引、切片、重复元素。
- **`append`、`insert`、`extend` 的区别**：前两者加一个元素，`extend` 加一批元素；`append([1, 2])` 会把列表整体当一个元素。
- **`remove`、`pop`、`del` 的区别**：`remove` 按值删，`pop` 按索引删且有返回值，`del` 是语句，能删位置、切片或变量。
- **`.sort()` 和 `sorted()` 的区别**：`.sort()` 改原列表，`sorted()` 返回新列表。
- **`join()` 和 `split()` 的区别**：`join()` 是把一组字符串拼起来，`split()` 是把一个字符串拆开。
- **`find()` 和 `index()` 的区别**：找不到时，`find()` 返回 `-1`，`index()` 报 `ValueError`。
- **为什么字符串替换后原串没变**：因为字符串不可变，所有修改类方法都返回新字符串。
- **为什么 `0.1 + 0.2` 不等于精确的 `0.3`**：因为浮点数底层是二进制近似存储。

---

**本章小结**：这一章最重要的不是死记方法名，而是先分清“是否有序、是否可变、是否按位置访问、是否按键访问”。掌握这个大框架后，列表、元组、集合、字典、字符串的大部分语法都会自然串起来；再配合负索引、切片、增删改查和字符串处理方法，已经足够应对绝大多数基础开发场景。
