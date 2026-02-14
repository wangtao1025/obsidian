# Python 语法手册：内置数据结构 深度解析

← [语法手册总览](/python/python语法手册) | 下一章见总览

---

## 二、内置数据结构 深度解析

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
  - `.pop(i)`：删除并返回指定索引 `i` 处的元素（默认最后一位）。
  - `.remove(x)`：删除列表中第一个匹配的值 `x`。
  - `.clear()`：清空列表内所有元素。
- **统计与排序**：
  - `.index(x)`：查找值 `x` 第一次出现的索引位置。
  - `.count(x)`：统计值 `x` 在列表中出现的次数。
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
  - `.count(x)`：统计次数。
  - `.index(x)`：查找索引。
- **场景**：坐标点 `coordinates = {(0,0): "origin"}`、函数返回多个值。

### 2.3 集合 (Set) - 无序唯一元素

- **特点**：自动去重，元素必须不可变类型，无索引（不支持 `set[0]`）。
- **基本用法**：
  - `set(my_list)`：将列表转换为集合以实现快速去重。
  - `empty_set = set()`：创建空集合（不能使用 `{}`，那是空字典）。
- **关键操作**：
  - `set(my_list)`：从列表创建集合（自动去重）。
  - `.add(x)` / `.update([x, y])`：添加单个 / 多个元素。
  - `.remove(x)` / `.discard(x)`：删除元素（remove的元素不存在报错，discard 在元素不存在时不报错）。
  - `.pop()`：随机删除并返回一个元素。
  - `.clear()`：清空集合。
- **数学运算**：
  - `|` (并集)：两个集合的所有元素。
  - `&` (交集)：两个集合的共同元素。
  - `-` (差集)：在 set1 但不在 set2 中的元素。
  - `^` (对称差集)：两个集合中不同时存在的元素。

### 2.4 字典 (Dict) - 键值对映射

- **特点**：键必须不可变且唯一，值可任意，查找速度极快。
- **核心方法**：
  - `dict[key] = value`：添加或修改。
  - `.get(key, default)`：安全取值（键不存在返回默认值）（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - `.items()`：返回键值对，用于 `for k, v in dict.items()`。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - `.keys()` / `.values()`：获取所有键 / 所有值。
  - `.pop(key)`：删除并返回指定键的值。
  - `.popitem()`：删除并返回最后一个键值对。
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
