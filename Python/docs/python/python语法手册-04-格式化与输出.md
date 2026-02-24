# Python 语法手册：格式化输出

← [语法手册总览](/python/python语法手册) | 下一章见总览

---

## 四、格式化输出 `(f-string` 与 `print)`

### `f-string`

**格式说明符**：`{变量:填充字符对齐方式宽度.精度类型}`（**自测卷 4.1 待复习**）
- `:` - 格式说明符开始
- `.2` - 精度（保留2位小数）
- `f` - 格式类型（浮点数）
- `<` - 左对齐，`>` - 右对齐，`^` - 居中
- `x` - 十六进制，`b` - 二进制，`o` - 八进制；**`d` - 十进制整数 (Decimal)**。
#### 4.1 数字格式化：
- **`d`：表示十进制整数 (Decimal)**。用于整数输出、补零、对齐，如 `f"{n:05d}"` 表示至少 5 位不足补 0，`f"{n:10d}"` 表示宽度 10 右对齐。
- `{value:.2f}`（保留两位小数）。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
	- `.2` - 精度（保留2位小数）
	- `f` - 格式类型（浮点数）
- **类型速查**：`d` 十进制整数；`f` 浮点数；`x`/`X` 十六进制；`b` 二进制；`o` 八进制。
#### 4.2 对齐布局：（**自测卷 4.2 待复习**）
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
