# 标准库模块

← [语法手册总览](/python/python语法手册) | [上一章 循环遍历](/python/python语法手册-10-循环)

---

**本章对应自测卷**：[标准库模块（共 14 题）](/python/Python核心语法自测试卷#十二标准库模块-共-8-题)
**学完能做什么**：掌握 `datetime`、`collections.namedtuple`、`re` 三类高频标准库知识点，并补上文件读取、`copy`、`reduce`、`pickle`、性能分析这些常见工程向面试知识。  
**小白注意**：① 标准库是 Python 自带的，不用额外安装。② `strftime` 是“时间对象 -> 字符串”，`strptime` 是“字符串 -> 时间对象”。③ `re.match()` 偏向从开头匹配，`re.search()` 偏向在整段里找第一个匹配。④ `namedtuple` 依然是元组，本质上不可变。

---

## 一、先理解什么叫“标准库”

**一句话先懂**：标准库就是 Python 官方自带的一整套工具箱，装好 Python 基本就能直接用。

比如：
- 时间日期处理：`datetime`
- 命名元组：`collections.namedtuple`
- 正则表达式：`re`
- 拷贝：`copy`
- 序列化：`pickle`

这些模块共同特点是：
- 不用额外安装第三方包
- 覆盖常见通用需求
- 面试和日常开发里都很高频

---

## 二、`datetime`：处理日期和时间

### 2.1 `datetime` 模块里的四个高频类型

自测题会问的最常见答案是：
- `date`
- `time`
- `datetime`
- `timedelta`

### 2.2 当前时间和今天日期

```python
from datetime import datetime, date

print(datetime.now())
print(date.today())
```

**一句话先懂**：
- `datetime.now()`：当前日期 + 时间
- `date.today()`：今天的日期，不含具体时分秒

### 2.3 `strftime()`：时间对象转字符串

```python
from datetime import datetime

now = datetime.now()
print(now.strftime('%Y-%m-%d %H:%M:%S'))
```

如果你想得到类似：

```text
2024-01-15 14:30:00
```

就常用这个格式串：

```python
'%Y-%m-%d %H:%M:%S'
```

### 2.4 `strptime()`：字符串转时间对象

```python
from datetime import datetime

text = '2024-01-15 14:30:00'
dt = datetime.strptime(text, '%Y-%m-%d %H:%M:%S')
print(dt)
```

### 2.5 `strftime` 和 `strptime` 怎么记

- `strftime`：**format**，把时间格式化成字符串
- `strptime`：**parse**，把字符串解析成时间

### 2.6 `timedelta`：做日期时间加减

```python
from datetime import datetime, timedelta

now = datetime.now()
print(now + timedelta(days=1))
print(now - timedelta(hours=2))
```

### 2.7 一个高频题：怎么求“明天”

```python
from datetime import date, timedelta

print(date.today() + timedelta(days=1))
```

### 2.8 格式串写错通常会怎样

```python
from datetime import datetime

# datetime.strptime('2024/01/15', '%Y-%m-%d')
```

这种通常会失败，并抛出 `ValueError`，因为：
- 原字符串里是 `/`
- 你的格式串里写的是 `-`

---

## 三、`collections.namedtuple`：带字段名的元组

### 3.1 为什么要用 `namedtuple`

**一句话先懂**：普通元组只能靠位置取值，`namedtuple` 既保留元组的轻量特性，又能用字段名访问。

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)
```

### 3.2 相比普通元组，它的优势是什么

至少可以先记这三点：
- 可读性更强：`p.x` 比 `p[0]` 清楚
- 代码语义更明确：字段名表达了位置含义
- 仍然保留元组的轻量和不可变特性

### 3.3 最基础创建方式

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p)
```

### 3.4 字段的几种定义方式

```python
from collections import namedtuple

P1 = namedtuple('Point', ['x', 'y'])
P2 = namedtuple('Point', 'x y')
P3 = namedtuple('Point', 'x, y')
```

这些写法都很常见。

### 3.5 `_replace()` 是干什么的

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p1 = Point(10, 20)
p2 = p1._replace(x=99)

print(p1)  # Point(x=10, y=20)
print(p2)  # Point(x=99, y=20)
```

**一句话先懂**：`_replace()` 不会修改原对象，而是返回一个新的 `namedtuple` 实例。

这和字符串、元组的“不可变”思路是一致的。

---

<span id="13-re-模块-正则表达式内置模块"></span>
## 四、`re` 模块：正则表达式的核心入口

### 4.1 先记住三个最常用函数

- `re.match()`：从开头尝试匹配
- `re.search()`：在整段中找第一个匹配
- `re.findall()`：把所有匹配结果收集成列表

```python
import re

text = 'abc 123 xyz 456'
print(re.match(r'\d+', text))
print(re.search(r'\d+', text))
print(re.findall(r'\d+', text))
```

### 4.2 `re.match()` 和 `re.search()` 的区别

**一句话先懂**：
- `match` 更像“从字符串开头查”
- `search` 更像“在整段文本里找第一个符合的”

```python
import re

text = 'abc 123'
print(re.match(r'\d+', text))   # None
print(re.search(r'\d+', text))  # 匹配到 123
```

### 4.3 `re.findall()` 返回什么

```python
import re

text = 'abc 123 xyz 456'
print(re.findall(r'\d+', text))  # ['123', '456']
```

**一句话先懂**：它返回的是列表，里面装的是所有匹配到的结果。

### 4.4 `match` 对象怎么取值

```python
import re

m = re.search(r'(\d+)-(\w+)', '123-abc')
print(m.group(0))
print(m.group(1))
print(m.group(2))
```

这里：
- `group(0)`：整段匹配结果
- `group(1)`：第一个括号分组
- `group(2)`：第二个括号分组

### 4.5 `re.sub()`：按模式替换

```python
import re

print(re.sub(r'\s+', '-', 'a  b   c'))  # a-b-c
```

**一句话先懂**：它常用来把“不规则空白”“多种分隔符”等内容统一处理掉。

### 4.6 `re.compile()`、`re.escape()`、`re.split()`

这些在前面的字符串章节已经细讲过，这里只做快速归纳：
- `re.compile()`：把模式先编译好，适合重复使用
- `re.escape()`：把特殊字符转义成字面量匹配
- `re.split()`：按正则规则拆分字符串

相关补充见：
- `Python/docs/python/python语法手册-02-内置数据结构.md:586`
- `Python/docs/python/python语法手册-02-内置数据结构.md:705`
- `Python/docs/python/python语法手册-02-内置数据结构.md:788`

---

## 五、工程向高频标准库：文件读取、拷贝、归约、序列化、性能分析

### 5.1 文件读取：`read()` / `readline()` / `readlines()`

```python
with open('demo.txt', 'r', encoding='utf-8') as f:
  text = f.read()
```

三者区别：
- `read()`：一次读全部
- `readline()`：读一行
- `readlines()`：读成列表，每项一行

如果文件很大，更推荐按行遍历：

```python
with open('big.txt', 'r', encoding='utf-8') as f:
  for line in f:
    process(line)
```

**一句话先懂**：大文件不要一口气 `read()` 到内存里，按行遍历通常更稳。

### 5.2 `copy`：浅拷贝和深拷贝

```python
import copy

a = [[1, 2], [3, 4]]
b = copy.copy(a)
c = copy.deepcopy(a)
```

**一句话先懂**：
- 浅拷贝只复制最外层容器
- 深拷贝会递归复制里面嵌套的对象

#### 5.2.1 为什么这个知识点特别容易出错

因为很多人看到“复制”两个字，就以为复制完一定完全独立。

但对嵌套结构来说，浅拷贝并不是这样。

```python
a = [[1, 2], [3, 4]]
b = copy.copy(a)

b[0].append(99)
print(a)  # [[1, 2, 99], [3, 4]]
```

原因是：
- 外层列表是新对象
- 里面那两个内层列表，浅拷贝后仍然共享引用

#### 5.2.2 深拷贝什么时候用

如果你明确需要：
- 外层和内层都彻底分离
- 修改复制后的嵌套对象不影响原对象

这时更适合 `copy.deepcopy()`。

#### 5.2.3 但深拷贝也不是越多越好

因为它：
- 更重
- 更慢
- 可能复制很多你其实不需要复制的结构

所以要先想清楚：
- 你到底是想“复制一层结构”
- 还是想“完全断开所有嵌套引用”

### 5.3 `functools.reduce()`：把一串值归约成一个值

```python
from functools import reduce

print(reduce(lambda x, y: x + y, [1, 2, 3, 4]))  # 10
```

**一句话先懂**：它会把多个值“不断合并”，最后得到一个结果。

#### 5.3.1 它是怎么工作的

大致可以理解成：

```python
(((1 + 2) + 3) + 4)
```

也就是把前一步结果继续和下一个值合并。

#### 5.3.2 什么场景适合它

- 求和、求积
- 合并结构
- 累积状态

但如果只是简单求和，通常 `sum()` 更直观。

### 5.4 `pickle`：对象序列化与反序列化

```python
import pickle

data = {'name': 'Tom', 'age': 18}
raw = pickle.dumps(data)
obj = pickle.loads(raw)
print(obj)
```

**一句话先懂**：
- `dumps` / `dump`：把对象序列化
- `loads` / `load`：把序列化结果恢复成对象

#### 5.4.1 它常用来做什么

- 临时保存 Python 对象
- 在本地缓存中持久化对象
- 进程间或任务间传递 Python 对象（某些场景）

#### 5.4.2 `dump` / `load` 和 `dumps` / `loads` 的区别

- `dump` / `load`：面向文件对象
- `dumps` / `loads`：面向字节串

```python
import pickle

with open('data.pkl', 'wb') as file:
    pickle.dump(data, file)

with open('data.pkl', 'rb') as file:
    restored = pickle.load(file)
```

#### 5.4.3 最重要的安全提醒

**不要反序列化不可信来源的 pickle 数据。**

因为 `pickle` 更偏“Python 内部对象持久化机制”，不是面向不可信输入的安全交换格式。

如果你需要：
- 和其他语言交互
- 面向外部接口传输
- 处理不可信数据

通常更优先考虑 `json` 等更安全、通用的格式。

### 5.5 常见标准库模块全景速记

这题面试经常不是要你背出几十个模块，而是看你是否有“标准库地图”。

你可以先按类别记：
- **时间日期**：`datetime`
- **数学与随机**：`math`、`random`
- **路径与文件系统**：`pathlib`、`os`
- **序列化**：`json`、`pickle`
- **正则**：`re`
- **函数工具**：`functools`、`itertools`
- **数据结构**：`collections`
- **并发**：`threading`、`multiprocessing`、`concurrent.futures`
- **性能与调试**：`timeit`、`cProfile`、`pdb`

如果你要答“用过哪些标准库模块”，最好按“模块 + 使用场景”回答，而不是只报名字。

### 5.6 Python 代码性能分析常见工具

工程上提到“性能分析”时，常见入口包括：
- `time`：粗略计时
- `timeit`：小片段性能测试
- `cProfile`：函数级性能分析
- `pstats`：整理 `cProfile` 结果
- `tracemalloc`：看内存分配

```python
import timeit
print(timeit.timeit('sum(range(100))', number=10000))
```

更完整的性能分析方法会在补充专题 [Python 性能分析与调优基础](/python/Python性能分析与调优基础) 里单独展开。

---

## 六、本章高频问法速记

- **`datetime` 的四个主要类型是什么**：`date`、`time`、`datetime`、`timedelta`。
- **`datetime.now()` 和 `date.today()` 的区别**：前者有日期和时间，后者只有日期。
- **`strftime` 和 `strptime` 的区别**：一个格式化，一个解析。
- **怎么求明天日期**：`date.today() + timedelta(days=1)`。
- **`namedtuple` 比普通元组强在哪**：字段名访问更清晰，但仍然不可变。
- **`_replace()` 会不会改原对象**：不会，返回新对象。
- **`re.match()`、`re.search()`、`re.findall()` 分别干什么**：开头匹配、整段找第一个、找全部。
- **`m.group(0)`、`group(1)`、`group(2)` 是什么**：整段匹配、第 1 组、第 2 组。
- **`re.sub(r'\s+', '-', 'a  b   c')` 的作用**：把连续空白统一替换成 `-`。
- **`datetime.strptime('2024/01/15', '%Y-%m-%d')` 为什么会失败**：字符串格式和格式串不匹配，通常抛 `ValueError`。
- **浅拷贝和深拷贝最关键的区别是什么**：浅拷贝只复制外层，深拷贝会递归复制嵌套对象。
- **`pickle` 能不能处理不可信输入**：不能，反序列化不可信 pickle 数据有安全风险。
- **怎么回答“用过哪些标准库”**：按模块类别加场景回答，比只报名字更好。
- **性能分析第一步是什么**：先测量，再决定优化方向。

---

**本章小结**：标准库这一章不需要一次背很多模块，先抓住三个最核心的高频块：时间处理看 `datetime`，结构化轻量数据看 `namedtuple`，文本模式匹配看 `re`。再把文件读取、`copy`、`reduce`、`pickle`、性能分析这些工程向知识点补上，已经足够覆盖大部分基础开发和常见面试问法。 
