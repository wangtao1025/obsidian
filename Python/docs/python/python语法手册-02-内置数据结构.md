# Python 语法手册：内置数据结构 深度解析

← [语法手册总览](/python/python语法手册) | 下一章见总览

---

## 二、内置数据结构 深度解析

### 2.1 列表 (List) - 有序可变容器

- **特点**：有序、可变、支持重复元素、支持索引与切片、元素可为任意类型。（**自测卷 2.1 待复习**：列表五大特点）
- **基本用法**：
  - `my_list[0]` / `my_list[-1]`：访问首个 / 末尾元素。
  - `my_list[1:3]`：切片操作（含头不含尾）。
- **关键操作 (修改与添加)**：
  - `.append(x)`：在列表末尾添加单个元素。
  - `.insert(i, x)`：在指定索引 `i` 处插入元素 `x`。
  - `.extend(iterable)`：将另一个序列的内容整体追加到末尾。
  - `list1 + list2`：连接两个列表并返回新列表。
- **关键操作 (删除)**：
  - `.pop(i)`：删除并返回指定索引 `i` 处的元素（默认最后一位）。**注意**：`i` 越界或空列表会抛出 `IndexError`。（**自测卷 2.3 待复习**）
  - `.remove(x)`：删除列表中第一个匹配的值 `x`。**注意**：若 `x` 不存在会抛出 `ValueError`。
  - `.clear()`：清空列表内所有元素。
- **统计与排序**：
  - `.index(x)`：查找值 `x` 第一次出现的索引位置。**注意**：若 `x` 不存在会抛出 `ValueError`。
  - `.count(x)`：统计值 `x` 在列表中出现的次数（不存在返回 0，不报错）。
  - `.reverse()`：原地反转列表。
  - `.sort()`：原地对列表进行升序排序。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）

#### 2.1.1 sorted() 与 .sort() 详解（小白必读）（**自测卷 2.4 待复习**）

排序时有两种写法：**列表的 `.sort()` 方法** 和 **内置函数 `sorted()`**。核心区别只有一句话：**`.sort()` 会直接改掉原列表，不返回新列表；`sorted()` 不会动原数据，会返回一个全新的、排好序的列表。**

---

**1. 基本用法**

```python
# 假设有一组数字
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# 用 sorted()：得到新列表，原列表不变
new_list = sorted(nums)
print(new_list)   # [1, 1, 2, 3, 4, 5, 6, 9]
print(nums)      # [3, 1, 4, 1, 5, 9, 2, 6]  原列表没变

# 用 .sort()：直接改原列表，返回值是 None
nums.sort()
print(nums)      # [1, 1, 2, 3, 4, 5, 6, 9]  原列表被改了
# result = nums.sort()  # result 是 None，不要用 .sort() 的“返回值”
```

- **sorted(可迭代对象)**：括号里可以放列表、元组、字符串等“可迭代对象”，**一律返回一个新的列表**。原数据是什么类型都不变，也不会被修改。
- **默认是升序**（小的在前、大的在后）。想降序要用参数 `reverse=True`（下面会写）。

---

**2. 常用参数**

| 参数 | 含义 | 示例 |
|------|------|------|
| 第一个参数 | 要排序的可迭代对象（列表、元组、字符串等） | `sorted([3,1,2])`、`sorted("hello")` |
| `reverse` | 是否倒序；默认 `False`（升序），设为 `True` 为降序 | `sorted(nums, reverse=True)` |
| `key` | 排序时用哪个“值”来比大小；传一个函数，对每个元素先算出一个结果再按这个结果排 | `sorted(students, key=lambda x: x["score"])` |

- **reverse=True**：降序（大的在前）。
  ```python
  sorted([3, 1, 4])           # [1, 3, 4]  升序
  sorted([3, 1, 4], reverse=True)  # [4, 3, 1]  降序
  ```
- **key=函数**：按“规则”排序。函数接收一个元素，返回用来比较的值。
  ```python
  # 按绝对值排序
  sorted([-3, 1, -4, 2], key=abs)   # [1, 2, -3, -4]

  # 按字典里的 "score" 排序（比如学生列表）
  students = [{"name": "小明", "score": 80}, {"name": "小红", "score": 95}]
  sorted(students, key=lambda x: x["score"])               # 按分数升序
  sorted(students, key=lambda x: x["score"], reverse=True)  # 按分数降序
  ```

---

**3. 和 .sort() 对比（记这张表就够用）**

| 对比项 | sorted(可迭代对象) | 列表.sort() |
|--------|---------------------|-------------|
| 是否改原数据 | **不改**，原列表/元组/字符串都保持原样 | **改**，只作用于列表，且直接改掉原列表 |
| 返回值 | **返回新的列表**，可以赋值给变量 | 返回 **None**，不要写 `a = lst.sort()` |
| 能排序谁 | 列表、元组、字符串、字典键等任意可迭代对象 | **只有列表**，元组、字符串不可变，没有 .sort() |
| 参数 | `sorted(可迭代对象, key=..., reverse=...)` | `lst.sort(key=..., reverse=...)` |

- **什么时候用 sorted()？**  
  不想动原数据、想得到一个新列表时；或者要排序的不是列表（比如元组、字符串）时，只能用 `sorted()`。
- **什么时候用 .sort()？**  
  确定只排序一个列表，且可以接受“原列表被改掉”时，用 `.sort()` 可以少占一点内存（不额外建新列表）。

---

**4. 易错点**

- 误以为 `sorted()` 会改原列表：**不会**。改的是你拿到的“返回值”，原数据不变。
- 误用 `.sort()` 的返回值：`a = lst.sort()` 里 `a` 一定是 `None`。要“排好序的列表”请用 `a = sorted(lst)`。
- 元组、字符串没有 `.sort()` 方法，只能写 `sorted(元组)` 或 `sorted(字符串)`，得到的是**列表**（因为元组/字符串不可变，不能原地排序）。

---

**5. 一句话总结**

- **sorted()**：返回排序后的**新列表**，**不改变**原数据，可排序任意可迭代对象，常用 `key` 和 `reverse`。
- **.sort()**：只用于列表，**原地**排序（改原列表），返回 `None`。

- **高级用法**：
  - **列表推导式**：`[s["score"] for s in students if s["score"] >= 60]`。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - **全局排序**：`sorted(list, key=lambda x: x["score"], reverse=True)`。

### 2.2 元组 (Tuple) - 有序不可变序列

- **特点**：一旦创建无法修改，支持重复元素，可作为字典键；有序、支持索引与切片（只读）。
- **语法关键**：`single_tuple = (42,)`（单个元素必须带逗号，否则 `(42)` 是整数不是元组）。
- **核心操作**：
  - **解包**：`a, b, c = my_tuple[:3]`；或直接 `a, b, c = my_tuple`（个数须一致）。
  - `.count(x)`：统计 `x` 出现次数（不存在返回 0，不报错）。
  - `.index(x)`：查找 `x` 第一次出现的索引。**注意**：若 `x` 不存在会抛出 `ValueError`。可用 `.index(x, start, end)` 在指定范围内查找。（**自测卷 2.9 待复习**：元组仅有的两个方法）

#### 2.2.1 元组方法与知识点详解

**1. 创建与字面量**

```python
empty = ()                    # 空元组
one = (42,)                   # 单元素必须加逗号，否则 (42) 是 int
points = (1, 2)              # 多元素
a, b, c = 10, 20, 30         # 省略括号的元组：右边自动打包成元组再解包
t = tuple([1, 2, 3])         # 从列表转元组
```

- **易错**：`(42)` 是整数，`(42,)` 才是元组。单元素元组必须写逗号。

**2. 索引与切片（只读）**

- 与列表相同：`t[0]`、`t[-1]`、`t[1:3]`（含头不含尾）。
- **不可变**：不能写 `t[0] = 99`，会抛出 `TypeError: 'tuple' object does not support item assignment`。
- 没有 `.append()`、`.remove()`、`.sort()` 等修改方法。

**3. 仅有的两个方法**

| 方法 | 说明 | 报错情况 |
|------|------|----------|
| `.count(x)` | 返回 `x` 在元组中出现的次数 | 不存在返回 0，不报错。 |
| `.index(x)` | 返回 `x` 第一次出现的索引 | `x` 不存在时抛出 `ValueError`。 |

- `.index(x, start, end)`：在切片 `t[start:end]` 范围内查找，返回的是**相对整个元组的索引**（不是相对 start 的偏移）。

**4. 拼接与重复**

- `t1 + t2`：拼接两个元组，得到**新元组**（原元组不变）。
- `t * n`：元组重复 n 次，得到新元组。
- 与列表一样，不能 `t.append(x)`，需要“新元组”时用 `t + (x,)` 或先转列表改完再 `tuple(list)`。

**5. 成员检测与长度**

- `x in t` / `x not in t`：是否在元组中。
- `len(t)`：元素个数。

**6. 不可变的深层含义**

- 元组**自身**不可增删改元素；若元素是**可变对象**（如列表），元组里的“引用”不变，但该列表的**内容**可以改。
  ```python
  t = (1, [2, 3])
  t[1].append(4)   # 合法：改的是元组里的列表，不是元组本身
  # t[0] = 0      # 非法：TypeError
  ```
- **可哈希**：元组若只含不可变元素，整体可哈希，可作字典的键、集合的元素；含列表等可变元素则不可哈希，不能作键。

**7. 与列表的转换**

- `tuple(iterable)`：列表、字符串等转元组。
- `list(t)`：元组转列表。需要“修改”时先转列表，改完再转回元组（若需要）。

**8. 常见场景**

- **函数返回多个值**：`return a, b` 实际返回一个元组，调用处用 `x, y = f()` 解包。
- **字典键**：`{(0, 0): "原点", (1, 0): "右"}`，坐标、多字段组合键常用元组。
- **保护数据**：不希望被意外修改的序列用元组；传入函数时不会像列表那样被函数内部改掉（除非元素是可变对象并修改其内容）。

**9. 与列表对比（简要）**

| 对比项 | 元组 | 列表 |
|--------|------|------|
| 可变性 | 不可变 | 可变 |
| 方法数量 | 仅 `.count`、`.index` | 多种增删改查排序 |
| 字面量 | `()`，单元素要 `(x,)` | `[]` |
| 作字典键/集合元素 | 可（若元素皆不可变） | 不可 |
| 性能/占用 | 一般更省内存、创建略快 | 功能多、可原地修改 |

**10. 一句话总结**

- 元组是**有序、不可变**序列，只有 `.count()` 和 `.index()` 两个方法；单元素必须写 `(x,)`；适合多返回值、字典键、不可变数据。

### 2.3 集合 (Set) - 无序唯一元素

- **特点**：自动去重，元素必须不可变类型，无索引（不支持 `set[0]`）。
- **基本用法**：
  - `set(my_list)`：将列表转换为集合以实现快速去重。
  - `empty_set = set()`：创建空集合（不能使用 `{}`，那是空字典）。
- **关键操作**：
  - `set(my_list)`：从列表创建集合（自动去重）。
  - `.add(x)` / `.update([x, y])`：添加单个 / 多个元素。
  - `.remove(x)` / `.discard(x)`：删除元素。**易错**：`remove(x)` 在元素不存在时抛出 `KeyError`；`discard(x)` 不存在时静默忽略，不报错。
  - `.pop()`：随机删除并返回一个元素。**注意**：空集合调用会抛出 `KeyError`。
  - `.clear()`：清空集合。
- **数学运算**：
  - `|` (并集)：两个集合的所有元素。
  - `&` (交集)：两个集合的共同元素。
  - `-` (差集)：在 set1 但不在 set2 中的元素。
  - `^` (对称差集)：两个集合中不同时存在的元素。

### 2.4 字典 (Dict) - 键值对映射

- **特点**：键必须不可变且唯一，值可任意，查找速度极快。
- **核心方法**：
  - `dict[key] = value`：添加或修改。**注意**：用 `dict[key]` 取值时，键不存在会抛出 `KeyError`；用 `.get(key, default)` 则键不存在时返回默认值，不报错。
  - `.get(key, default)`：安全取值（键不存在返回默认值）（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - `.items()`：返回键值对，用于 `for k, v in dict.items()`。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - `.keys()` / `.values()`：获取所有键 / 所有值。
  - `.pop(key)`：删除并返回指定键的值。**注意**：键不存在时抛出 `KeyError`；可用 `.pop(key, default)` 指定默认值则不存在时返回默认值不报错。
  - `.popitem()`：删除并返回最后一个键值对。**注意**：空字典调用会抛出 `KeyError`。
  - `.update(other_dict)`：合并另一个字典的内容。
  - `.clear()` / `.copy()`：清空字典 / 浅拷贝字典。

### 2.5 字符串 (String) - 不可变字符序列

- **特点**：有序、不可变、Unicode 支持。
#### 2.5.1 **查找替换**：
  - `.find("sub")` / `.index("sub")`
	  - 查找索引（find 失败返 -1，index 失败报错）。（**自测卷 2.16 待复习**）
  - `.replace("old", "new")`
	  - 替换子串。
#### 2.5.2 **检查与转换**：
  - `.isdigit()` / `.isalpha()`：检查纯数字 / 纯字母。
  - `.startswith()` / `.endswith()`：首尾检查。
  - `.lower()` / `.upper()` / `.title()`：转小写 / 大写 / 首字母大写。
  - `.strip()`：去除首尾空格、换行符。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
#### 2.5.3** 切片技巧**：
  - `text[ : :-1]`：字符串反转。
  - `text[ : :2]`：每隔一个字符取一个。 
#### 2.5.4 `.join()`：
- 语法：`"连接符".join(字符串列表)`
	```python
	# 语法：separator.join(iterable)

	# 定义一个包含字符串元素的列表
	fruits = ['apple', 'banana', 'orange', 'grape']
	print("字符串列表:", fruits)
	
	# 使用逗号作为分隔符将列表元素连接成一个字符串
	# separator是逗号，iterable是fruits列表
	comma_joined = ",".join(fruits)
	print("逗号连接:", comma_joined)
	
	# 使用空格作为分隔符连接
	space_joined = " ".join(fruits)
	print("空格连接:", space_joined)
	
	# 使用连字符作为分隔符连接
	hyphen_joined = "-".join(fruits)
	print("连字符连接:", hyphen_joined)
	
	# 使用空字符串作为分隔符连接（无分隔符）
	no_separator_joined = "".join(fruits)
	print("无分隔符连接:", no_separator_joined)
	
	# 使用多字符作为分隔符连接
	multi_char_joined = " | ".join(fruits)
	print("多字符分隔符连接:", multi_char_joined)
	```

- 注意：只能连接字符串列表。如果有数字，需先转字符串。
	
-  处理不同类型的可迭代对象
	```python
	# 列表
	list_fruits = ['apple', 'banana', 'orange']
	list_joined = ", ".join(list_fruits)
	print("列表连接:", list_joined)
	
	# 元组
	tuple_fruits = ('apple', 'banana', 'orange')
	tuple_joined = ", ".join(tuple_fruits)
	print("元组连接:", tuple_joined)
	
	# 集合（注意：集合是无序的）
	set_fruits = {'apple', 'banana', 'orange'}
	set_joined = ", ".join(set_fruits)
	print("集合连接:", set_joined)
	
	# 字符串（字符串也是可迭代对象）
	string_chars = "hello"
	string_joined = "-".join(string_chars)
	print("字符串字符连接:", string_joined)
	
	# 生成器表达式
	numbers = [1, 2, 3, 4, 5]
	# 将数字转换为字符串后连接
	numbers_joined = ", ".join(str(num) for num in numbers)
	print("数字列表连接:", numbers_joined)
	
	# 列表推导式
	words = ['hello', 'world', 'python']
	# 将单词转换为大写后连接
	upper_joined = " ".join(word.upper() for word in words)
	print("大写单词连接:", upper_joined)
	```

#### 2.5.5 `.split()`:（**自测卷 2.19 待复习**）

- 语法：`"字符串".split("分隔符")`
- 将字符串按指定分隔符分割成列表，常用于一句话拆分为词、数据拆分为字段。
- **参数说明**：
	- `sep`（可选）：分隔符，默认为`None`（即按照任何空白字符分割，包括空格、制表符、换行等）。如果指定其它分隔符，比如`,`，就按照该字符分割。
	- `maxsplit`（可选）：最多分割次数，分割后列表元素最多有`maxsplit+1`个。默认为-1，表示分割到底。
	```python
	# 例1：按照空格分割
	s = "hello world python"
	print(s.split())  # ['hello', 'world', 'python']
	
	# 例2：按照其它字符分割
	data = "2024-06-01"
	print(data.split("-"))  # ['2024', '06', '01']
	
	# 例3：使用maxsplit参数
	record = "id,name,age,gender"
	print(record.split(",", maxsplit=2))  # ['id', 'name', 'age,gender']
	
	# 例4：多种空白字符自动分割
	multi_space = "one\t two   three\nfour"
	print(multi_space.split())  # ['one', 'two', 'three', 'four']
	```
	- **注意事项**：
    - 当`sep=None`时，会自动处理所有连续的空白字符，并忽略开头和结尾的空白。
    - 若字符串中没有指定分隔符，split()返回整个字符串组成的单元素列表。

-  maxsplit参数
	- `maxsplit`（可选）：最多分割次数，分割后列表元素最多有`maxsplit+1`个。默认为-1，表示分割到底。
	```python
	# 定义一个包含多个分隔符的字符串
	text_with_multiple_separators = "a,b,c,d,e,f,g"
	print("原始字符串:", text_with_multiple_separators)
	
	# 不指定maxsplit，默认分割所有分隔符
	# maxsplit默认为-1，表示不限制分割次数
	all_split = text_with_multiple_separators.split(",")
	print("全部分割:", all_split)
	
	# 指定maxsplit=2，只分割前2个分隔符
	# maxsplit=2表示最多分割2次，得到3个元素
	limited_split = text_with_multiple_separators.split(",", maxsplit=2)
	print("限制分割次数为2:", limited_split)
	
	# 指定maxsplit=1，只分割1个分隔符
	# maxsplit=1表示最多分割1次，得到2个元素
	single_split = text_with_multiple_separators.split(",", maxsplit=1)
	print("限制分割次数为1:", single_split)
	
	# 使用maxsplit=0，不进行分割
	# maxsplit=0表示不分割，返回原字符串
	no_split = text_with_multiple_separators.split(",", maxsplit=0)
	print("不分割:", no_split)
	```
	
- 默认分隔符的使用
	```python
	# 默认分隔符的使用演示
	# 当sep=None时，split()会以任意空白字符作为分隔符
	
	# 定义一个包含多种空白字符的字符串
	text_with_whitespace = "apple   orange\tbanana\ncherry"
	print("包含多种空白字符的字符串:")
	print(repr(text_with_whitespace))  # 使用repr显示转义字符
	
	# 不指定分隔符，使用默认的空白字符分割
	# 默认会合并连续的空白字符
	default_split = text_with_whitespace.split()
	print("默认空白字符分割:", default_split)
	
	# 指定空格作为分隔符
	# 这样不会合并连续的空白字符
	space_split = text_with_whitespace.split(" ")
	print("指定空格分割:", space_split)
	
	# 指定制表符作为分隔符
	tab_split = text_with_whitespace.split("\t")
	print("指定制表符分割:", tab_split)
	
	# 指定换行符作为分隔符
	newline_split = text_with_whitespace.split("\n")
	print("指定换行符分割:", newline_split)
	```
	
- 使用正则表达式进行复杂分割
	```python
	# 使用正则表达式进行复杂分割
	import re
	
	# 定义一个包含多种分隔符的复杂字符串
	complex_text = "apple,banana;orange:grape|kiwi"
	print("复杂分隔符字符串:", complex_text)
	
	# 使用正则表达式分割多种分隔符
	# 正则表达式'[,;:|]'表示匹配逗号、分号、冒号或竖线
	regex_split = re.split('[,;:|]', complex_text)
	print("正则表达式分割:", regex_split)
	
	# 保留分隔符的分割
	# 使用捕获组()来保留分隔符
	regex_split_with_separators = re.split('([,;:|])', complex_text)
	print("保留分隔符的分割:", regex_split_with_separators)
	
	# 使用正则表达式分割空白字符
	text_with_mixed_whitespace = "apple  \t  orange\n\nbanana"
	print("\n混合空白字符字符串:")
	print(repr(text_with_mixed_whitespace))
	
	# 使用正则表达式分割一个或多个空白字符
	regex_whitespace_split = re.split(r'\s+', text_with_mixed_whitespace)
	print("正则表达式空白字符分割:", regex_whitespace_split)
	
	# 使用正则表达式分割，限制分割次数
	regex_limited_split = re.split(r'\s+', text_with_mixed_whitespace, maxsplit=1)
	print("正则表达式限制分割次数:", regex_limited_split)
	```

#### 2.5.6 原始字符串 `r""` 
- **核心语法：告诉 Python “不要理会反斜杠 `\` 的转义作用”。所有的 `\` 都被视为普通字符。**“所见即所得”**。
    ```python
    # ❌ 错误示范：\n 会被误认为换行，\t 会被误认为制表符
	path = "C:\new_folder\test.txt" 
	
	# ✅ 工业标准：使用 r 前缀
	path = r"C:\new_folder\test.txt" 
	print(path) # 输出: C:\new_folder\test.txt
    ```

#### 2.5.7 大小写转换

| **方法**             | **功能**      | **隐藏副作用 / 坑点**                                                                                                                                    |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`lower()`**      | 全转小写        | 无。                                                                                                                                                |
| **`upper()`**      | 全转大写        | 无。                                                                                                                                                |
| **`capitalize()`** | **全句**首字母大写 | **坑**：除了第一个字母，**后面所有字母强制变小写**。                                                                                                                    |
| **`title()`**      | 每个单词首字母大写   | **坑1**：除了单词首字母，**其余强制变小写**（如 `iPhone` $\rightarrow$ `Iphone`）。<br><br>  <br><br>**坑2**：非字母符号（如 `'`）会误触发单词切割（如 `they're` $\rightarrow$ `They'Re`）。 |
| **`casefold()`**   | 强力小写        | 专门处理德语 `ß` 等国际化字符的比较。                                                                                                                             |

#### 2.5.8 去空格
| **方法**         | **功能**         | **工业场景**                  |
| -------------- | -------------- | ------------------------- |
| **`lstrip()`** | 删除**开头**（左侧）空白 | 处理缩进、清理行首标识。              |
| **`rstrip()`** | 删除**结尾**（右侧）空白 | **最常用**：清理文件读取时的换行符 `\n`。 |
| **`strip()`**  | 删除**两端**空白     | **必备**：用户输入标准化、数据库数据清洗。   |
##### 2.5.8.1 默认行为 (不传参数)

默认删除所有空白字符，包括：空格 、制表符 `\t`、换行符 `\n`、回车符 `\r`。

```Python
text = "  \n hello world  \t "
print(repr(text.strip()))  # 'hello world' (中间的空格被完美保留)
```

##### 2.5.8.2 进阶：自定义字符集合 (重点)

`strip("字符集")` （lstrip rstrip 同理）会删除两端**属于该集合**的任何字符，直到遇到第一个不属于集合的字符为止。

``` Python
# 案例：清理 URL 旁边的杂质
url = "www.baidu.com/"
print(url.strip("w./")) # 结果: "baidu.com" (删除了开头的 w 和 .，以及结尾的 /)

# 案例：清理编号
code = "123-SECRET-321"
print(code.strip("0123456789-")) # 结果: "SECRET"
```

##### 2.5.8.3 性能与特性

- **不可变性**：与所有字符串方法一样，它们不会修改原字符串，而是**返回一个新的字符串副本**。
- **效率**：内置 C 实现，处理长文本速度极快。
- **局限**：无法删除字符串**中间**的指定字符（中间部分请用 `replace()` 或正则表达式 `re.sub()`）。

#### 2.5.9 反转字符串
#####  2.5.9.1 切片法 ` [: :-1] `
- **语法**：`s[ : :-1]`
- **原理**：利用切片的步长（Step）。`-1` 表示从后往前跳跃，每次跳 1 格。
- **优势**：底层由 C 语言实现，速度极快，代码最短。
    ``` Python
    s = "Python"
    print(s[::-1]) # "nohtyP"
    ```

##### 2.5.9.2 `reversed()` + `join()`
- **语法**：`"".join(reversed(s))`
    
- **原理**：`reversed()` 返回一个反向迭代器（不占内存），`join()` 将其重新粘合。
    
- **场景**：如果你在反转的同时需要用特殊符号连接（如 `" ".join(reversed(s))`），这个方法更方便。
##### 2.5.9.3 for循环拼接 和 递归方法拼接
- for 循环拼接
```python

```
##### 性能对比与避坑指南

| **方法**                | **代码简洁度** | **评价**                                     |
| --------------------- | --------- | ------------------------------------------ |
| **切片 `[::-1]`**       | ★★★★★     | **工业标准**，首选。                               |
| **`reversed`+`join`** | ★★★★☆     | 适合流式处理。                                    |
| **`for` 循环拼接**        | ★★☆☆☆     | 逻辑清晰但效率低，每次拼接都在创建新对象。                      |
| **递归方法**              | ★☆☆☆☆     | **禁止生产使用**。大数据量会触发 `RecursionError` (栈溢出)。 |


### 2.6 整型 (Integer) - 不可变数值对象

- **特点**：不可变、任意精度（只要内存够，数字可以无限大）、支持多种进制表示。

- **核心构造函数 `int()`** ：
  
  - `int(x)`：将浮点数或纯数字字符串转为十进制整数（直接截断小数部分，不进行四舍五入）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]、[[python 面试题#[题目 1.2]：进制转换与存储单位换算 (算法类)]]）
  - **`int(string, base)`**：将指定进制的字符串转换为十进制整数。
    
    - 示例：`int("1010", 2)` $\rightarrow$ `10`。
    - 示例：`int("FF", 16)` $\rightarrow$ `255`。

- **进制表示法**：
  
  - `0b` / `0B`：二进制 (Binary)，如 `0b1010`。
  
  - `0o` / `0O`：八进制 (Octal)，如 `0o12`。
  
  - `0x` / `0X`：十六进制 (Hexadecimal)，如 `0xff`。

- **常用内置转换函数**：
  
  - `bin(n)`：十进制转二进制字符串（带 `0b` 前缀）。
  
  - `oct(n)`：十进制转八进制字符串（带 `0o` 前缀）。
  
  - `hex(n)`：十进制转十六进制字符串（带 `0x` 前缀）。

- **关键运算符 (常用于算法)**：
  
  - `//` (整除)：返回商的整数部分（在进制转换算法中用于“降位”）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]、[[python 面试题#[题目 1.2]：进制转换与存储单位换算 (算法类)]]）
  - `%` (取余)：返回余数（在进制转换算法中用于“取当前位的值”）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]、[[python 面试题#[题目 1.2]：进制转换与存储单位换算 (算法类)]]）
  - `**` (幂运算)：`2**10` $\rightarrow$ `1024`。
  - **`/` (浮点除法)**：在 Python 3 中，即便两个操作数都是整数，使用 `/` 计算的结果也**永远是浮点数**。
      - 示例：`10 / 2` $\rightarrow$ `5.0`。
      - **全栈应用**：在计算平均分或下载时间时，即便结果能整除，也要注意它是浮点型。

- **进阶特性**：
  
  - **小整数对象池**：Python 默认缓存了 `[-5, 256]` 的整数以优化性能（详见本文 **7.4 节**）。（**自测卷 2.27 待复习**）
  - **下划线分隔符**：为了提高大数字的可读性，可以使用下划线：`one_million = 1_000_000`。

### 2.7 浮点型 (Float) - 双精度浮点数

- **特点**：对应 C 语言中的 `double`，用于表示带小数的数值。由于计算机底层使用二进制存储小数，存在**精度误差**风险。（**自测卷 2.30 待复习**）
    
- **核心构造函数 `float()`**：
    
    - **显式转换**：`float(x)` 将整数或字符串转换为浮点数。
        
    - **工业级建议**：在执行如 `format_file_size` 等关键计算前，建议先显式调用 `float()` 将数据“身份”确定化，以增强代码可控性，消除隐式转换的歧义。
        
- **精度控制 (f-string)**：
    
    - 格式：`{value:.nf}`（保留 n 位小数）。
        
    - 示例：`f"{3.14159:.2f}"` $\rightarrow$ `"3.14"`。
        
    - **对应例题**：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]] 成绩报告报表输出。
        
- **防御性检查 (isfinite)**：
    
    - 对于除法运算，应先检查分母是否为 `0` 或数据是否 `is None`。
