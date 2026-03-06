# 标准库模块

← [语法手册总览](/python/python语法手册) | [上一章 循环](/python/python语法手册-10-循环)

---

**本章对应自测卷**：[标准库模块（共 8 题）](/python/Python核心语法自测试卷#十二标准库模块-共-8-题)
**学完能做什么**：用 `datetime` 做时间获取与加减、用 `time` 做计时、用进制与数学相关内置或模块做换算。  
**小白注意**：① 官方完整 API 查 [Python 文档](https://docs.python.org/zh-cn/3/library/)。② 本站课程用到的标准库（math、typing、collections、random、heapq 等）见 [Python 首页](/python/)「标准库」表格。

---

## 一、标准库模块

### 1.1 `datetime` 日期时间处理
#### 1.1.1 功能概述
`datetime` 模块提供日期和时间处理功能，支持时间获取、格式化、运算和解析。

#### 1.1.2 主要类型
- `datetime`  包含日期和时间
- `date` 仅包含日期
- `time` 仅包含时间
- `timedelta` 时间间隔

#### 1.1.3 基本用法

##### 1.1.3.1 获取当前时间
```python
from datetime import datetime, date, time, timedelta

# 获取当前时间
now = datetime.now()
print("当前时间:", now)
print("格式化时间:", now.strftime("%Y-%m-%d %H:%M:%S"))
 
```

##### 1.1.3.2 创建特定时间
```python
# 创建特定时间
dt = datetime(2024, 1, 15, 14, 30, 0)
print("特定时间:", dt)
```

##### 1.1.3.3 时间运算
```python
# 时间加减
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)
print("明天:", tomorrow)
print("上周:", last_week)

# 时间差计算
time_diff = tomorrow - now
print("时间差:", time_diff)
print("相差天数:", time_diff.days)
print("相差秒数:", time_diff.total_seconds())
```

##### 1.1.3.4 时间组件
```python
# 获取时间各部分
print("年:", now.year)
print("月:", now.month)
print("日:", now.day)
print("时:", now.hour)
print("分:", now.minute)
print("星期:", now.weekday())
```

##### 1.1.3.5 字符串解析
```python
# 字符串解析为时间对象
date_str = "2024-01-15 14:30:00"
parsed_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print("解析后的时间:", parsed_date)
```
- strptime 就是将字符串的时间转换为时间对象
- strftime 就是将时间对象转换成时间字符串
- https://docs.python.org/zh-cn/3/library/datetime.html#strftime-and-strptime-behavior
#### 1.1.4 使用场景
- 日志记录和时间戳
- 数据分析和统计
- 定时任务和调度
- 用户界面时间显示

### 1.2 `collections` - 高级数据结构
`collections` 模块提供高性能、多用途的数据结构，扩展了内置类型的功能。

##### 1.2.1 `namedtuple` - 命名元组

`namedtuple`是Python标准库`collections`模块中的一个工厂函数，用于创建具名元组。它允许你像访问对象的属性一样访问元组元素，主要作用是提高代码的可读性和可维护性。

- 主要特点
	-  **具名访问**：可以通过属性名访问元组元素
	- **索引访问**：仍然支持传统的索引访问方式
	- **不可变性**：与普通元组一样，创建后不可修改
	- **内存效率**：比普通类更节省内存
	- **自描述性**：通过字段名提供更好的代码可读性
-  **导入 `namedtuple`**
	```python
		# 从 collections 模块导入 namedtuple 
		from collections import namedtuple
	```
-  **定义具名元组类型**
    - 通过字段名创建一个新的具名元组类```
    ```python
    # 从 collections 模块导入 namedtuple 
    from collections import namedtuple 
    # 创建一个名为 'Point' 的具名元组类 # 该类将拥有 'x' 和 'y' 两个字段 
    Point = namedtuple('Point', ['x', 'y'])
    ```
-  **实例化具名元组对象**
    - 传入各字段对应的值，获得该对象
	```python
	# 从 collections 模块导入 namedtuple 
	from collections import namedtuple 
	# 创建一个名为 'Point' 的具名元组类 # 该类将拥有 'x' 和 'y' 两个字段 
	Point = namedtuple('Point', ['x', 'y']) 
	
	# 创建一个 Point 具名元组对象 
	# 传入 x 值为 10，y 值为 20 
	p = Point(10, 20)
	```
- 访问元素
	- 既可以用“点.属性名”方式，也可以用索引方式
	```python
	# 从 collections 模块导入 namedtuple 
	from collections import namedtuple 
	# 创建一个名为 'Point' 的具名元组类 
	# 该类将拥有 'x' 和 'y' 两个字段 
	Point = namedtuple('Point', ['x', 'y']) 
	
	# 创建一个 Point 具名元组对象 
	# 传入 x 值为 10，y 值为 20 
	p = Point(10, 20) 
	
	# 访问具名元组的属性 
	# 打印 x 属性的值 
	print(f"p.x = {p.x}") 
	# 预期输出: p.x = 10 
	
	# 打印 y 属性的值 
	print(f"p.y = {p.y}") 
	# 预期输出: p.y = 20 
	
	# 也可以像普通元组一样通过索引访问元素 
	# 打印第一个元素 (索引为 0) 的值 
	print(f"p[0] = {p[0]}") 
	# 预期输出: p[0] = 10 
	
	# 打印第二个元素 (索引为 1) 的值 
	print(f"p[1] = {p[1]}") 
	# 预期输出: p[1] = 20 
	
	# 打印整个具名元组对象 
	print(f"Point对象: {p}") 
	# 预期输出: Point对象: Point(x=10, y=20)
	```
- 其他功能
	- `_fields`、
		- 获取具名元组的字段名 
		- `print(f"字段名: {p._fields}") # 预期输出: 字段名: ('x', 'y')`
	- `_replace()`
		- 使用`_replace`方法，替换a字段，生成新的对象
		- `new_person = person._replace(age=26, city='Boston')`
	- `_asdict()`
		- 转换为字典
		- `# 将Person实例转换为字典`
		- `person_dict = person._asdict()`
- 多种创建方式
	```python
		from collections import namedtuple
		# 方式1：使用列表定义字段
		Person1 = namedtuple('Person', ['name', 'age', 'city'])
		# 创建Person具名元组类
		person1 = Person1('Alice', 25, 'New York')
		# 创建Person实例
		print(f"方式1 - 列表定义: {person1}")
		# 打印方式1的结果
		
		# 方式2：使用字符串定义字段（空格分隔）
		Person2 = namedtuple('Person', 'name age city')
		# 创建Person具名元组类
		person2 = Person2('Bob', 30, 'London')
		# 创建Person实例
		print(f"方式2 - 字符串定义: {person2}")
		# 打印方式2的结果
		
		# 方式3：使用字符串定义字段（逗号分隔）
		Person3 = namedtuple('Person', 'name, age, city')
		# 创建Person具名元组类
		person3 = Person3('Charlie', 35, 'Tokyo')
		# 创建Person实例
		print(f"方式3 - 逗号分隔: {person3}")
		# 打印方式3的结果
		
		# 方式4：使用元组定义字段
		Person4 = namedtuple('Person', ('name', 'age', 'city'))
		# 创建Person具名元组类
		person4 = Person4('David', 28, 'Paris')
		# 创建Person实例
		print(f"方式4 - 元组定义: {person4}")
		# 打印方式4的结果
		
		# 打印功能验证标题
		for i, person in enumerate([person1, person2, person3, person4], 1):
		    # 遍历所有person对象
		    print(f"方式{i} - 姓名: {person.name}, 年龄: {person.age}, 城市: {person.city}")
	    # 打印每个person的属性
	```

---

### 1.3 `re` 模块 — 正则表达式（内置模块） {#13-re-模块-正则表达式内置模块}

`re` 是 Python 的**内置标准库模块**，用于**正则表达式**：按“模式”匹配、查找、替换字符串。无需安装，`import re` 即可使用。下面先给小白一个总表，再分块说明常用函数和 **match 对象**。

#### 1.3.1 小白先记

- **正则**：用一串符号描述“长得像什么”的文本（如数字、邮箱、电话号），再在字符串里找或换。
- **re 模块**：提供 `re.match`、`re.search`、`re.findall`、`re.sub`、`re.split` 等函数；很多函数返回 **match 对象**，用 `.group()` 取出匹配到的内容。
- **match 对象**：表示“某次匹配的结果”，常用 `match.group(0)` 取整段匹配串，`match.group(1)`、`match.group(2)` 取括号分组。

#### 1.3.2 re 模块常用函数总览（总结表）

| 函数 / 方法 | 作用 | 返回值 | 典型场景 |
|-------------|------|--------|----------|
| `re.match(pattern, string)` | 从**字符串开头**尝试匹配 | 成功返回 **match 对象**，失败返回 `None` | 校验“整串是否符合格式”（如是否以数字开头） |
| `re.search(pattern, string)` | 在字符串中**找第一个**匹配位置 | 成功返回 **match 对象**，失败返回 `None` | 找“有没有某模式”（不要求从开头） |
| `re.findall(pattern, string)` | 找出**所有**不重叠的匹配 | **列表**，每个元素是匹配到的子串（或元组，当有分组时） | 提取所有数字、所有邮箱等 |
| `re.sub(pattern, repl, string, count=0)` | 按模式**替换**；`repl` 可为字符串或函数 | **新字符串**，原串不变 | 掩码电话号、多词替换（配合函数），详见 [内置数据结构 · 字符串替换](/python/python语法手册-02-内置数据结构#152-字符串替换详解strreplace--不可变性-resub-多重替换) |
| `re.split(pattern, string, maxsplit=0)` | 按模式**分割**字符串 | **列表** | 按多种分隔符（如逗号、分号）拆开，见 [1.5.6 .split()](/python/python语法手册-02-内置数据结构#156-split自测卷-319-待复习) |
| `re.compile(pattern)` | 把正则字符串**编译**成对象 | **Pattern 对象**，可多次调用 `.match` / `.search` / `.sub` 等 | 同一正则要用很多次时，先 compile 再调用，更高效 |
| `re.escape(string)` | 把字符串里的**正则特殊字符**转义 | **字符串**，适合作为“字面匹配”的正则 | 用户输入或字典键拼进正则时，避免 `.`、`+` 等被当语法 |

#### 1.3.3 match 对象（小白向）

当 `re.match()`、`re.search()` 或 `Pattern` 的 `.match()` / `.search()` 匹配成功时，返回的是 **match 对象**（不是字符串）。用这个对象可以：

- **取出匹配到的文字**：`match.group(0)` 表示**整段**匹配到的字符串；若有括号分组，`match.group(1)`、`match.group(2)` 表示第 1、2 个括号里匹配到的部分。
- **取出匹配范围**：`match.start()`、`match.end()` 表示匹配在原串中的起止索引；`match.span()` 返回 `(start, end)`。

**简单示例**：

```python
import re

s = "Hello 123 World 456"
m = re.search(r"\d+", s)   # 找第一段连续数字
if m:
    print(m.group(0))      # "123"  整段匹配
    print(m.span())        # (6, 9)  在 s 中的位置

# 带分组的例子：提取区号和号码
tel = "Tel: 010-12345678"
n = re.search(r"(\d{3})-(\d{8})", tel)
if n:
    print(n.group(0))      # "010-12345678"  整段
    print(n.group(1))      # "010"  第 1 个括号
    print(n.group(2))      # "12345678"  第 2 个括号
```

#### 1.3.4 match 对象常用属性和方法（总结表）

| 属性 / 方法 | 含义 | 示例 |
|-------------|------|------|
| `match.group(0)` | 整段匹配到的字符串 | `re.search(r'\d+', 'a12b').group(0)` → `'12'` |
| `match.group(n)` | 第 n 个括号分组（n≥1） | 见上面 `group(1)`、`group(2)` |
| `match.groups()` | 所有分组组成的**元组** | `('010', '12345678')` |
| `match.start()` / `match.end()` | 匹配在原串中的起始 / 结束索引 | 见上面 `span()` |
| `match.span()` | `(start, end)` 元组 | 用于切片：`s[m.start():m.end()]` 等价于 `m.group(0)` |

**注意**：匹配失败时得到的是 `None`，不能调用 `.group()`，否则会报错。使用前建议写 `if m:` 判断。

#### 1.3.5 专业向补充

- **match 与 search**：`match` 只从**开头**匹配；`search` 在**整串**里找第一个匹配。若要从开头匹配，用 `match` 更明确；若找任意位置，用 `search`。
- **正则中的 raw 字符串**：建议写 `r"..."`，避免反斜杠被 Python 转义（如 `r"\d"` 表示“数字”）。
- **更多 API**：`re.fullmatch`（整串匹配）、`re.finditer`（返回迭代器，每项为 match）、`re.sub` 的 `repl` 为函数时的用法等，见 [内置数据结构 · re.sub 结合函数做多重替换](/python/python语法手册-02-内置数据结构#41-方式二详解resub-结合函数做多重替换小白向)；完整列表见 [Python 官方 re 文档](https://docs.python.org/zh-cn/3/library/re.html)。

---

**延伸**：课程（RAG/向量）中用到的标准库另有单篇详解，见 [Python 首页](/python/) 的「标准库」：math、typing、collections、random、heapq；第三方库见「第三方库（课程内）」：jieba、BeautifulSoup4。

---

**本章小结**：常用标准库如 `datetime`（日期时间）、`time`（计时）、`re`（正则匹配与替换）、进制与数学相关；`re` 做模式匹配与替换，返回的 match 对象用 `.group(0)` 取整段、`.group(1)` 等取分组；详细 API 查官方文档，本站课程相关模块见 Python 首页标准库与第三方库表格。


## 二、文件读取、`copy`、`reduce`、`pickle` 与性能分析

### 2.1 文件对象：`read()` / `readline()` / `readlines()`

```python
with open('demo.txt', 'r', encoding='utf-8') as f:
    all_text = f.read()

with open('demo.txt', 'r', encoding='utf-8') as f:
    first_line = f.readline()

with open('demo.txt', 'r', encoding='utf-8') as f:
    all_lines = f.readlines()
```

- `read()`：返回整个字符串。
- `readline()`：返回一行字符串。
- `readlines()`：返回“每行一个字符串”的列表。
- 读大文件时，更推荐：

```python
with open('huge.log', 'r', encoding='utf-8') as f:
    for line in f:
        process(line)
```

### 2.2 `copy`：浅拷贝 vs 深拷贝

```python
import copy

origin = [[1, 2], [3, 4]]
shallow = copy.copy(origin)
deep = copy.deepcopy(origin)

origin[0][0] = 999
print(shallow)  # [[999, 2], [3, 4]]
print(deep)     # [[1, 2], [3, 4]]
```

- **浅拷贝**：只复制最外层，内部嵌套对象仍共享。
- **深拷贝**：递归复制，内部嵌套对象也独立。

### 2.3 `functools.reduce()`：把一串值归约成一个值

```python
from functools import reduce

nums = [1, 2, 3, 4]
result = reduce(lambda acc, x: acc + x, nums, 0)
print(result)  # 10
```

- `reduce` 适合“累计折叠”问题。
- 但简单求和优先用 `sum()`，可读性更好。

### 2.4 `pickle`：对象序列化与反序列化

```python
import pickle

data = {'name': 'Tom', 'score': 95}
blob = pickle.dumps(data)
restored = pickle.loads(blob)
```

- `dumps` / `loads`：面向内存中的字节串。
- `dump` / `load`：面向文件。
- **注意**：不要反序列化不可信来源的 pickle 数据。

### 2.5 常用工程向标准库速记

- `collections.namedtuple`：轻量不可变记录结构。
- `copy`：浅拷贝 / 深拷贝。
- `functools.reduce`：归约运算。
- `pickle`：对象序列化。
- `pathlib` / `os`：路径与文件系统。
- `timeit` / `cProfile`：性能测量与性能分析。

```python
import timeit
print(timeit.timeit("sum(range(100))", number=10000))
```

```python
import cProfile
cProfile.run("sum(range(100000))")
```

### 2.6 对应面试题

- `14` `namedtuple` 有什么作用
- `39` `read()` / `readline()` / `readlines()`
- `42` 浅拷贝和深拷贝
- `44` `reduce()`
- `53` `pickling` 和 `unpickling`
- `60` 常见标准库模块
- `63` 如何分析 Python 代码执行性能
