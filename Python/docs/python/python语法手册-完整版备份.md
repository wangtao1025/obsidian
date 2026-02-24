# 🐍 Python 全栈开发：核心语法查漏补缺手册

## 文档链接

| **需求场景**                   | **对应网站**                                        | **对应前端工具**     |
| -------------------------- | ----------------------------------------------- | -------------- |
| **查内置语法、标准库 (如 datetime)** | [Python Docs](https://docs.python.org/zh-cn/3/) | **MDN**        |
| **搜第三方库、安装命令 (pip)**       | [PyPI](https://pypi.org/)                       | **npm.js**     |
| **查复杂库的实战教程**              | [Real Python](https://realpython.com/)          | **CSS-Tricks** |
课程文档链接
- [python 面试题](https://python.docs-hub.com/)
- [课程网址](https://study.renshengtech.com/)
## 一、 变量赋值与解包 

核心直觉： 等号两边的“形状”必须匹配。
### 1.1 多重赋值基础

- 同步赋值：`a, b, c = 1, 2, 3`
- 链式赋值：`x = y = z = 0`
  - ⚠️ 引用陷阱： 禁止使用 `list1 = list2 = []`。改一个，全都会变。
  - 原因：列表是可变对象，这样写会导致所有变量指向同一个内存地址。
  - 正确做法： `list_a, list_b = [], []`。****

### **1.2 星号解包 `(* / **)`**

- 星号收集 `(*)`：`first, *middle, last = [1, 2, 3, 4, 5]` $\rightarrow$ `middle` 是 `[2, 3, 4]`。
- 字典合并 `(**)`：`merged = {**dict1, **dict2}`。(常用于合并前端配置或 API 请求参数)。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
## 二、 内置数据结构 深度解析

### 2.1 列表 (List) - 有序可变容器

- **特点**：有序、可变、支持重复元素、支持索引与切片、元素可为任意类型。
- **基本用法**：
  - `my_list[0]` / `my_list[-1]`：访问首个 / 末尾元素。
  - `my_list[1:3]`：切片操作（含头不含尾）。
- **关键操作 (修改与添加)**：
  - `.append(x)`：在列表末尾添加单个元素。
  - `.insert(i, x)`：在指定索引 `i` 处插入元素 `x`。
  - `.extend(iterable)`：将另一个序列的内容整体追加到末尾。
  - `list1 + list2`：连接两个列表并返回新列表。
- **关键操作 (删除)**：
  - `.pop(i)`：删除并返回指定索引 `i` 处的元素（默认最后一位）。**注意**：`i` 越界或空列表会抛出 `IndexError`。
  - `.remove(x)`：删除列表中第一个匹配的值 `x`。**注意**：若 `x` 不存在会抛出 `ValueError`。
  - `.clear()`：清空列表内所有元素。
- **统计与排序**：
  - `.index(x)`：查找值 `x` 第一次出现的索引位置。**注意**：若 `x` 不存在会抛出 `ValueError`。
  - `.count(x)`：统计值 `x` 在列表中出现的次数（不存在返回 0，不报错）。
  - `.reverse()`：原地反转列表。
  - `.sort()`：原地对列表进行升序排序。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- **高级用法**：
  - **列表推导式**：`[s["score"] for s in students if s["score"] >= 60]`。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - **全局排序**：`sorted(list, key=lambda x: x["score"], reverse=True)`。

### 2.2 元组 (Tuple) - 有序不可变序列

- **特点**：一旦创建无法修改，支持重复元素，可作为字典键。
- **语法关键**：`single_tuple = (42,)`（单个元素必须带逗号）。
- **核心操作**：
  - **解包**：`a, b, c = my_tuple[:3]`。
  - `.count(x)`：统计次数（不存在返回 0，不报错）。
  - `.index(x)`：查找索引。**注意**：若 `x` 不存在会抛出 `ValueError`。
- **场景**：坐标点 `coordinates = {(0,0): "origin"}`、函数返回多个值。

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
	  - 查找索引（find 失败返 -1，index ==失败报错==）。
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

#### 2.5.5 `.split()`:

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
  
  - **小整数对象池**：Python 默认缓存了 `[-5, 256]` 的整数以优化性能（详见本文 **7.4 节**）。
  - **下划线分隔符**：为了提高大数字的可读性，可以使用下划线：`one_million = 1_000_000`。

### 2.7 浮点型 (Float) - 双精度浮点数

- **特点**：对应 C 语言中的 `double`，用于表示带小数的数值。由于计算机底层使用二进制存储小数，存在**精度误差**风险。
    
- **核心构造函数 `float()`**：
    
    - **显式转换**：`float(x)` 将整数或字符串转换为浮点数。
        
    - **工业级建议**：在执行如 `format_file_size` 等关键计算前，建议先显式调用 `float()` 将数据“身份”确定化，以增强代码可控性，消除隐式转换的歧义。
        
- **精度控制 (f-string)**：
    
    - 格式：`{value:.nf}`（保留 n 位小数）。
        
    - 示例：`f"{3.14159:.2f}"` $\rightarrow$ `"3.14"`。
        
    - **对应例题**：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]] 成绩报告报表输出。
        
- **防御性检查 (isfinite)**：
    
    - 对于除法运算，应先检查分母是否为 `0` 或数据是否 `is None`。

## 三、 异常捕获与主动抛出 
- **对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]][[python 面试题#[题目 1.2]：进制转换与存储单位换算 (算法类)]]**
- **核心直觉**：
	- **被动捕获 (`try-except`)**：用于预测并优雅地处理潜在的崩溃（如前端传来的脏数据）。
	    
	- **主动抛出 (`raise`)**：用于当逻辑不符合业务要求时，果断中断程序并告知原因。
#### 3.1 被动捕获（处理非法转换）
在处理外部输入（API 请求、文件读取）时，必须保护程序不被 `ValueError` 或 `TypeError` 击垮。
```python
# 对应例题：[题目 1.1] 中的数据清洗
try:
    # 尝试将前端传来的字符串转为数字
    age = int(student_info["age"]) 
except (ValueError, TypeError):
    # 捕获转换失败，不让程序崩溃，而是返回 None 标记数据无效
    return None
```
#### 3.2 主动抛出（执行业务规则）

在底层函数中，如果输入参数合法但**不符合业务逻辑**（例如：进制转换超出了 2-16 进制），应主动抛出异常，让调用者知道哪里出错了。
```python
# 对应例题：[题目 1.2] 中的进制校验
def convert_base(number_str, from_base, to_base):
    # 防御性编程：主动检查业务边界
    if not (2 <= from_base <= 16) or not (2 <= to_base <= 16):
        # 抛出异常：强制调用者必须传入正确的进制范围
        raise ValueError("进制范围必须在 2 到 16 之间") 
    
    # 后续逻辑...
```
#### 3.3 常见的异常类型 

- **`ValueError`**：传入的值类型正确但内容非法（如 `int("abc")` 或进制不在 2-16 范围内）。
    
- **`TypeError`**：操作或函数应用于不适当类型的对象（如对 `None` 进行加法）。
    
- **`KeyError`**：试图访问字典中不存在的键。
    
- **`IndexError`**：序列索引超出范围。

- **编码专用异常**：
	- `UnicodeEncodeError`：字符串转字节失败（如 ASCII 编码中文）。
	- `UnicodeDecodeError`：字节转字符串失败（如 用 UTF-8 去读 GBK 字节流）。
	- `LookupError`：使用了不存在的编码名称。
#### 3.4 专家级贴士：`try-except-else-finally`

- **`else`**：当 `try` 块没有发生异常时执行（用于区分“成功执行”的逻辑）。
    
- **`finally`**：无论是否发生异常都会执行（常用于关闭文件句柄、释放数据库连接等工业级清理操作）。
## 四、 格式化输出 `(f-string` 与 `print)`
### `f-string`

**格式说明符**：`{变量:填充字符对齐方式宽度.精度类型}`
- `:` - 格式说明符开始
- `.2` - 精度（保留2位小数）
- `f` - 格式类型（浮点数）
- `<` - 左对齐，`>` - 右对齐，`^` - 居中
- `x` - 十六进制，`b` - 二进制，`o` - 八进制
#### 4.1 数字格式化：
- `{value:.2f}`（保留两位小数）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
	- `.2` - 精度（保留2位小数）
	- `f` - 格式类型（浮点数）
#### 4.2 对齐布局：
- `{text:<10}`（左对齐）、`{text:>10}`（右对齐）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `^` - 居中
#### 4.3 **补零开关 (`0`)**：
- `f"{n:010d}"`。第一个 `0` 是指令（补零），`10` 是宽度。
#### 4.4  **自定义填充 (如补 1)**：
- 必须显式指定对齐方式，否则语法歧义。
	- ✅ 正确：`f"{n:1>10d}"` (1 是填充字符，> 是右对齐，10 是宽度)。
	    
	- ❌ 错误：`f"{n:110d}"` (系统会认为宽度是 110，并默认填充空格)。
#### 4.5 **数据溢出不截断原则**：

- **规则**：设置的宽度是**最小保证宽度**。
- **现象**：如果真实数据长度（如 12345）大于指定宽度（如 2），Python 会**原样输出全量数据**，绝不会为了对齐而截断数字（数据安全性高于排版美观）。
#### 4.6 **码点展示** 与 **字节展示**
- **码点：`f"U+{ord(char):04X}"` (补0，宽4，十六进制大写)。
    
- **字节：`f"\\x{b:02x}"` (补0，宽2，十六进制小写)。
### [`print`](https://study.renshengtech.com/course/cmgg0mka10000p679mwure0bd/chapter/cmggr75in0003p6wd7qe8t4rd/section/cmgmhib3w003fp602jx862r1h)
#### 4.7  基本语法
```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
```
##### 4.7.1 参数说明

| 参数         | 默认值          | 说明              | 示例                                         |
| ---------- | ------------ | --------------- | ------------------------------------------ |
| `*objects` | -            | 可接受多个参数，自动用空格分隔 | `print("A", "B", "C")` → `A B C`           |
| `sep`      | `' ' `       | 多个对象之间的分隔符      | `print("A", "B", sep="-")` → `A-B`         |
| `end`      | `'\n'`       | 输出结束时添加的字符      | `print("Hi", end="!")` → `Hi!`             |
| `file`     | `sys.stdout` | 输出目标（文件对象或者流）   | `print("text", file=open("log.txt", "w"))` |
| `flush`    | `False`      | 是否强制刷新缓存区       |                                            |
- **`*objects`**：想打印什么就传什么，可以传多个，自动用空格连接
- **`sep`**：改变多个对象之间的连接符号
- **`end`**：改变打印完后添加什么（默认是换行）
- **`file`**：改变输出位置（默认是屏幕，也可以是文件）
- **`flush`
	- **作用**：强制刷新缓冲区 ->  `True`。
	- **场景**：动态进度条。如果不加，进度可能卡住然后突然跳到 100%。

#### 4.8 基础用法
##### 4.8.1 最基础打印
`print()` 是 Python 中最常用的输出函数，用于将内容显示到屏幕上。它可以打印字符串、数字、变量等各种类型的数据。

```python
print("Hello World")           # Hello World
print(100)                     # 100
print(3.14)                    # 3.14
print(True)                    # True
```
##### 4.8.2 打印多个值
打印多个值时，`print()` 会自动用空格分隔各个参数。

```python
name = "Alice"
age = 25
print("姓名:", name, "年龄:", age)  # 姓名: Alice 年龄: 25

# 可以混合不同类型
print("数字:", 42, "布尔:", True, "浮点:", 3.14)
# 数字: 42 布尔: True 浮点: 3.14
```
#### 4.9 参数
##### 4.9.1  sep - 分隔符
`sep` 参数用于指定多个输出对象之间的分隔符。默认情况下，`print()` 会用空格将各个对象分开。

```python
# 使用逗号分隔
print("A", "B", "C", sep=",")           # A,B,C

# 使用连字符分隔
print("年", "月", "日", sep="-")         # 年-月-日

# 使用其他字符
print("1", "2", "3", sep="*")           # 1*2*3

# 无分隔符（直接拼接）
print("Hello", "World", sep="")         # HelloWorld

# 使用多个字符作为分隔符
print("Python", "Java", "C++", sep=" | ")  # Python | Java | C++
```

##### 4.9.2 end - 结束符
`end` 参数用于指定输出结尾的字符。默认情况下，`print()` 每次输出后会自动换行（即 `end='\n'`）。


```python
# 默认换行
print("第一行")
print("第二行")
# 输出:
# 第一行
# 第二行

# 不换行，用空格连接
print("Hello", end=" ")
print("World", end="!")
print()  # 手动换行
# Hello World!

# 连续输出
print("加载中", end="")
print("...", end="")
print("完成")
# 加载中...完成
```

##### 4.9.3  组合使用 sep 和 end
```python
# 组合使用
print("苹果", "香蕉", "橙子", sep=", ", end=" 都是水果\n")
# 苹果, 香蕉, 橙子 都是水果

# 构建多行格式
print("姓名", "年龄", "城市", sep=" | ", end="\n---\n")
print("张三", "25", "北京", sep=" | ")
# 姓名 | 年龄 | 城市
# ---
# 张三 | 25 | 北京
```

##### 4.9.4  file - 输出到文件
`file` 参数用于指定输出目标，默认是 `sys.stdout`（标准输出，即屏幕）。可以将输出重定向到文件或标准错误流。

```python
# 输出到文件
with open("output.txt", "w", encoding="utf-8") as f:
    print("这是写入文件的内容", file=f)
    print("第二行内容", file=f)

# 输出到标准错误
import sys
print("这是一个错误信息", file=sys.stderr)

# 输出到多个目标
with open("log.txt", "w") as log_file:
    message = "重要信息"
    print(message)              # 输出到屏幕
    print(message, file=log_file)  # 输出到文件
```

#### 4.10 特殊技巧与实际案例
##### 4.10.1 动态更新同一行
```python
import time

# 进度百分比
for i in range(101):
    print(f"\r处理进度: {i}%", end="")
    time.sleep(0.05)
print("\n完成！")

# 旋转动画
symbols = ['|', '/', '-', '\\']
for i in range(20):
    print(f"\r加载中 {symbols[i % 4]}", end="")
    time.sleep(0.2)
print("\r加载完成！      ")
```
**关键技术**：
- `\r` - 回到行首（覆盖当前行）
- `end=""` - 不换行

#### 4.11 repr函数

返回一个对象的“官方”字符串表示。对于字符串，它会显式打印出所有**不可见字符**（如 `\n`, `\t`）
```python
text = "apple\torange\n"

print(text)        
# 输出结果（肉眼看）：
# apple   orange
# （后面有个空行）

print(repr(text))  
# 输出结果（显微镜看）: 'apple\torange\n'
```

#### 4.12  `__str__` 和 `__repr__`

核心直觉： **`__str__` 是“精装修”，`__repr__` 是“毛坯房/施工图”。**

| **特性**   | **__str__(self)**         | **__repr__(self)**                    |
| -------- | ------------------------- | ------------------------------------- |
| **触发方式** | `print(obj)` 或 `str(obj)` | 直接输入变量名、`repr(obj)`、或在列表等容器中展示        |
| **受众**   | **终端用户** (End User)       | **开发者** (Developer/Debugger)          |
| **设计目标** | 可读性好，像人说的话                | 准确无误，最好能通过结果直接还原对象                    |
| **默认行为** | 如果没定义，就去找 `__repr__`      | 返回 `<__main__.Class object at 0x...>` |
```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    # 1. 给人看的：整齐美观
    def __str__(self):
        return f"学生: {self.name} (成绩: {self.score})"

    # 2. 给机器/调试看的：包含细节
    def __repr__(self):
        return f"Student(name='{self.name}', score={self.score})"

s = Student("Alice", 95)

# 触发 __str__
print(s)  # 输出: 学生: Alice (成绩: 95)

# 触发 __repr__
print(repr(s)) # 输出: Student(name='Alice', score=95)

# 在容器中展示时，默认调用 __repr__
print([s]) # 输出: [Student(name='Alice', score=95)]
```
## 五、 内置函数

- `len(iterable)`：返回长度（个数）。
  - 应用：计算平均分时的分母 `sum(scores) / len(scores)`。
  - （对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `sum(iterable)`：对序列内所有数值求和。
  - 应用：累加总分。
  - （对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `max(iterable)`：返回最大值。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `min(iterable)`：返回最小值。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - 应用：计算极差 `max(scores) - min(scores)` 判断是否偏科。
- `reversed()`：返回反向迭代器（不改变原数据）。
- `sorted()`：返回排序后的新列表（不改变原数据）。

## 六、 逻辑判断 与 真值检测
核心直觉： **Python 的逻辑运算不只是 `True/False`，更是“寻找结果”的过程。**

- `all(iterable)`：
  - 逻辑：只有全部为 `True` 才返回 `True`。
  - 例子：`all(s >= 60 for s in scores)` $\rightarrow$ 全员及格。
- `any(iterable)`：
  - 逻辑：只要有一个为 `True` 就返回 `True`。
  - 例子：`any(s < 60 for s in scores)` $\rightarrow$ 是否有人挂科。

### 6.1 逻辑运算符 and 、or、 not

|**运算符**|**语义**|**短路逻辑 (关键)**|**返回值规则**|
|---|---|---|---|
|**`and`**|且 (找假)|若第一个为假，直接返回，不再看后面。|**“与”返首假**：返回第一个遇到的假值；若全是真，返回最后一个。|
|**`or`**|或 (找真)|若第一个为真，直接返回，不再看后面。|**“或”返首真**：返回第一个遇到的真值；若全是假，返回最后一个。|
|**`not`**|非|总是评估操作数，并强制取反。|**必返布尔值**：强制转换为 `True` 或 `False`。|

### 6.2 真值测试：谁是“假”？ (Truth Value Testing)

在 Python 中，以下对象在逻辑判断时被视为 **`False`**，其余皆为 `True`：

1. **常量**：`None`, `False`
    
2. **数值零**：`0`, `0.0`, `0j`
    
3. **空容器**：`''`, `[]`, `()`, `{}`, `set()`, `range(0)`
    
4. **自定义对象**：定义了 `__bool__()` 返回 `False` 或 `__len__()` 返回 `0` 的类。
    

### 6.3 短路计算 (Short-circuiting) 的妙用

短路特性不仅为了性能，更是为了**程序安全**。

- **安全检查**：避免报错。
    ``` Python
    # 如果 user 为 None，后面 user.name 不会执行，避免了 AttributeError
    if user is not None and user.name == "Admin":
        pass
    ```
    
- **设置默认值**：
    ``` Python
    # 如果 input_name 是空字符串(假)，则取 "Guest"
    name = input_name or "Guest" 
    ```
    
### 6.4 进阶：自定义对象的真值

Python 判断对象真值的优先级：
1. **`__bool__()`**：最优先，返回布尔值。
2. **`__len__()`**：次优先，若返回 `0` 则为假。
3. **默认**：若两者都未定义，对象永远为 `True`。
    

---

## 七、 身份判断( == 与 is) 与 成员运算符号 (in 与 not in)

### 7.1 身份运算符: == 和 is
核心直觉： == 问的是“内容像不像”，is 问的是“是不是同一个人”。

| **运算符**             | **比较维度**          | **判断依据**         | **对应底层方法**          |
| ------------------- | ----------------- | ---------------- | ------------------- |
| == / !=             | **值 (Value)**     | 比较两个对象的内容是否相等    | `__eq__` / `__ne__` |
| **`is` / `is not`** | **身份 (Identity)** | 比较内存地址 (id) 是否相同 | `id(a) == id(b)`    |
|                     |                   |                  |                     |
#### 7.1.1 场景实战

```python
# 情况 A：内容相同，但内存地址不同
list_a = [1, 2, 3]
list_b = [1, 2, 3]
print(list_a == list_b)    # True  (内容一模一样)
print(list_a is list_b)    # False (在内存中是两个独立的盒子)

# 情况 B：通过赋值，指向同一个地址
list_c = list_a
print(list_a is list_c)    # True  (c 只是 a 的一个别名)
```

#### 7.1.2 `None` 的判断

在 Python 中，`None` 是一个**单例对象 (Singleton)**。整个解释器运行期间，内存里只有一个 `None`。

- **推荐做法**：始终使用 `is None` 或 `is not None`。

- **原因**：性能更快（直接比地址），且能防止自定义类重载了 == 运算符导致的逻辑错误。

```python
# 黄金准则：永远不要写 == None
if my_variable is not None:
    print("变量有值")
```

#### 7.1.3 性能优化陷阱：小整数与短字符串缓存

Python 会缓存 **-5 到 256** 之间的整数以及**短字符串**，以节省内存。这会导致一些“违反直觉”的情况：

```python
a = 256
b = 256
print(a is b)      # True (命中缓存，地址相同)

x = 257
y = 257
print(x is y)      # False (超出缓存范围，创建了新对象)
```

⚠️ **警惕**：永远不要依赖 `is` 来比较数字或字符串的大小，务必使用 ==

### 7.2 成员运算符： in 和 not in
用于测试某个值是否是序列或者可迭代对象的成员，返回布尔值
#### 7.2.1 不同结构的查找逻辑

|**数据结构**|**查找对象**|**复杂度**|**性能特点**|
|---|---|---|---|
|**字符串**|字符/子串|$O(n)$|唯一支持**子串**查找（如 `'py' in 'python'`）。|
|**列表/元组**|元素|$O(n)$|数据量越大越慢（需从头扫描）。|
|**集合 (Set)**|元素|**$O(1)$**|**最快**（基于哈希表，瞬间定位）。|
|**字典 (Dict)**|**键 (Key)**|**$O(1)$**|默认只找键！找值需用 `.values()`（性能降至 $O(n)$）。|
#### 7.2.2 字典查找陷阱
```python
d = {'a': 1, 'b': 2}
print('a' in d)          # True (键存在)
print(1 in d)            # False (默认不找值！)
print(1 in d.values())   # True (手动查值，但失去了 O(1) 速度)
print(('a', 1) in d.items()) # True (查键值对是否存在)
```

#### 7.2.3 自定义对象支持 `in`
通过在类中定义 `__contains__` 方法，可以让自定义对象支持成员运算。
```python
class MyClass:
    def __init__(self, data):
        self.data = data
    def __contains__(self, item):
        return item in self.data # 核心逻辑

obj = MyClass([1, 2, 3])
print(2 in obj) # True
```

## 八、 数据处理

核心直觉： 算法是灵魂，单位是底线。
### 8.1 进制转换的“万能公式”

在 Python 中，处理进制转换只需记住一个中转站：**十进制**。

- **第一步：统一化**：利用 `int(str, base)` 将源数据（2-16进制）全部吞掉，转化成 Python 内部的十进制整数。

- **第二步：多样化**：
  
  - 如果转回 2/8/16 进制：直接使用内置函数 `bin()` / `oct()` / `hex()`。
  
  - 如果转成自定义进制（如 7 进制）：使用**循环取余法**（不断用 `//` 和 `%` 剥离每一位数字）。

```Python
# 核心逻辑示例 (十进制作为中转)
decimal_val = int("FF", 16)      # FF -> 255
binary_str = bin(decimal_val)    # 255 -> '0b11111111'
```

### 8.2 存储单位格式化 (Human Readable)

为了让文件大小变得“人类可读”，我们需要在 **1024 进制**（KiB/MiB 系列）下进行单位降级。

- **核心算法**：使用 `while` 循环判定。只要数字 $\ge 1024$，就除以 1024.0 并且将单位列表索引 `+1`。

- **单位阶梯**：`['B', 'KiB', 'MiB', 'GiB', 'TiB']`。

- **全栈应用**：后端返回原始字节数 `1536`，前端通过此算法显示 `1.50 KiB`。

### 8.3 网络下载时间计算 (The 8-Bit Trap)

这是最容易被面试官抓住的细节陷阱：**大 B (Byte) 与 小 b (bit)**。

- **换算底线**：文件大小通常以 **MB** (Megabyte) 存储，而带宽速度以 **Mbps** (Megabit per second) 计算。

- **换算关键**：$1\text{ Byte} = 8\text{ bits}$。

- **避坑公式**：$\text{下载秒数} = (\text{文件 MB} \times 8) \div \text{带宽 Mbps}$。

- **逻辑分支**：根据总秒数判断输出单位（秒/分钟/小时），并使用 f-string 控制小数位数（如 `{val:.1f}`）。

### 8.4 健壮性检查 (Defensive Programming)

作为“谨慎的开发者”，函数的第一行永远应该是**边界检查**：

- **进制范围**：必须在 2 到 16 之间。

- **数值合法性**：文件大小不能为负数，带宽必须大于 0。

## 九、字符编码
### 9.1 编码铁三角的关系真相

1. **ASCII (村级系统)**：早期英文标准。它是“身份证号”与“存储方式”的暴力合一，1 字节解决。
    
2. **Unicode (全球身份证系统/码表)**：
    
    - **本质**：它包含了 ASCII 并扩展了全球所有字符。
        
    - **逻辑**：它只发“码点”（逻辑编号），不负责存。在 0-127 号位上，它与 ASCII 的编号完全对齐。
        
3. **UTF-8 (快递包装系统/编码方案)**：
    
    - **本质**：它是 Unicode 码点转换成二进制字节流的**规则**。
        
    - **特性**：**变长存储**。ASCII 字符占 1 字节（结果与原 ASCII 一模一样），汉字占 3 字节，Emoji 占 4 字节。
### 9.2 核心操作：`str` (内存文本) ↔ `bytes` (硬盘字节)

- **编码 (Encode)**：`text.encode('utf-8', errors='replace')`。
    
- **解码 (Decode)**：`data.decode('utf-8', errors='replace')`。
    
    - `errors='replace'`：防止因个别无法识别字符导致的整个系统崩溃。
### 9.3 核心转换工具：`ord()` 与 `chr()`

这是在编码铁三角中，连接 **“字符”** 与 **“Unicode 码点”** 的直达电梯。

| 方法          | 严谨定义 (底层物理)                           | 方便理解 (直觉对照)                                        |
| ----------- | ------------------------------------- | -------------------------------------------------- |
| `ord(char)` | **获取码点**。输入一个字符，返回其对应的十进制 Unicode 编号。 | **“查身份证号”**。看到“中”字，问系统：它的 Unicode 编号是多少？（结果：20104） |
| `chr(code)` | **还原字符**。输入一个十进制编号，返回对应的 Unicode 字符。  | **“按号叫人”**。告诉系统：去把 20104 号对应的字找出来。（结果：“中”）         |
## 十、循环遍历( while 与 for)
核心直觉： **`for` 是为了“数完”或“走完”，`while` 是为了“等到”。**
### 10.1 循环动力引擎：`range()`
#### 10.1.1 语法
`range` 不是列表，而是一个**“懒惰”的数字工厂**，只在循环需要时才生产下一个数字，极其节省内存。
1. **`range(stop)`**：生成从`0`开始，到`stop`结束（不包含`stop`）的整数序列
2. **`range(start, stop)`**：生成从`start`开始，到`stop`结束（不包含`stop`）的整数序列
3. **`range(start, stop, step)`**：生成从`start`开始，到`stop`结束（不包含`stop`），并以`step`为步长的整数序列
其中：
- `stop`参数是一个限定值，序列不包含此值
- `start`参数定义了序列的起始值（默认为`0`）
- `step`参数表示序列中相邻数字之间的步长（默认为`1`）
#### 10.1.2 高级特性
- range对象与列表的转换
	- `range()`函数生成的是一个`range`对象，而不是一个实际的列表。`range`对象是可迭代的，但它并不会在内存中立即生成所有数字。如果需要将其转换为列表，可以使用`list()`函数。
	```python
	# 生成一个range对象，表示从0到4的序列
	my_range_object = range(5)
	# 将range对象转换为列表并打印
	print(list(my_range_object))
	```
- 内存效率
	 - `range`对象具有非常高的内存效率。它们并不会真正地在内存中存储所有数字，而是依赖于一个算法来在需要时生成这些数字。这意味着即使是生成非常大的序列（例如`range(10**9)`），也不会占用大量内存。
	```python
	# 创建一个非常大的range对象
	large_range = range(10**6)
	# 打印range对象的内存占用（非常小）
	print(f"range对象大小: {large_range.__sizeof__()} 字节")# 48 字节
	
	# 如果转换为列表，内存占用会很大
	large_list = list(large_range)  # 这会占用大量内存
	print(f"列表大小: {large_list.__sizeof__()} 字节")#8000040 字节
	```
- 生成递减序列
	- `range()`函数也可以用于生成递减的序列。这需要满足两个条件：`start`值必须大于`stop`值，并且`step`值必须是负数。
	```python
	# 定义序列的起始值
	start_value = 5
	# 定义序列的停止值
	stop_value = 0
	# 定义负数步长，实现递减
	negative_step = -1
	# 遍历从start_value到stop_value+1，步长为negative_step的整数
	for i in range(start_value, stop_value, negative_step):
	    # 打印当前整数
	    print(i)
	```
- `range` 支持切片操作
	- `range`对象支持切片操作，尽管这个特性不常见。切片操作会返回一个新的`range`对象。
	```python
	# 创建一个从0到9的range对象
	r = range(10)
	print(list(r))#[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	# 对range对象进行切片操作：从索引2开始，到索引8结束（不包含），步长为2
	# 结果将是range(2, 8, 2)
	print(r[2:8:2])
	# 将切片结果转换为列表查看
	print(list(r[2:8:2]))#[2, 4, 6]
	```

### 10.2  `break`, `continue`, `pass`, `return`
| **关键字**        | **作用范围 (破坏半径)** | **形象理解**   | **场景示例**                  |
| -------------- | --------------- | ---------- | ------------------------- |
| **`pass`**     | **0 (无影响)**     | **“此处招租”** | 还没想好 `if` 后面的逻辑，先占个位防止报错。 |
| **`continue`** | **当前这一次迭代**     | **“这题跳过”** | 遇到脏数据（如 `None`），直接进入下一轮。  |
| **`break`**    | **最近的一层循环**     | **“原地爆破”** | 找到目标数据后立即收工，不再跑剩下的循环。     |
| **`return`**   | **整个函数**        | **“终结者”**  | 无论嵌套几层循环，直接关掉函数并带走结果。     |


## 十一、标准库模块

### 11.1 `datetime` 日期时间处理
#### 11.1.1 功能概述
`datetime` 模块提供日期和时间处理功能，支持时间获取、格式化、运算和解析。

#### 11.1.2 主要类型
- `datetime`  包含日期和时间
- `date` 仅包含日期
- `time` 仅包含时间
- `timedelta` 时间间隔

#### 11.1.3 基本用法

##### 11.1.3.1 获取当前时间
```python
from datetime import datetime, date, time, timedelta

# 获取当前时间
now = datetime.now()
print("当前时间:", now)
print("格式化时间:", now.strftime("%Y-%m-%d %H:%M:%S"))
 
```

##### 11.1.3.2 创建特定时间
```python
# 创建特定时间
dt = datetime(2024, 1, 15, 14, 30, 0)
print("特定时间:", dt)
```

##### 11.1.3.3 时间运算
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

##### 11.1.3.4 时间组件
```python
# 获取时间各部分
print("年:", now.year)
print("月:", now.month)
print("日:", now.day)
print("时:", now.hour)
print("分:", now.minute)
print("星期:", now.weekday())
```

##### 11.1.3.5 字符串解析
```python
# 字符串解析为时间对象
date_str = "2024-01-15 14:30:00"
parsed_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print("解析后的时间:", parsed_date)
```
- strptime 就是将字符串的时间转换为时间对象
- strftime 就是将时间对象转换成时间字符串
- https://docs.python.org/zh-cn/3/library/datetime.html#strftime-and-strptime-behavior
#### 11.1.4 使用场景
- 日志记录和时间戳
- 数据分析和统计
- 定时任务和调度
- 用户界面时间显示

### 11.2 `collections` - 高级数据结构
`collections` 模块提供高性能、多用途的数据结构，扩展了内置类型的功能。

##### 11.2.1 `namedtuple` - 命名元组

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