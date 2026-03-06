# 循环遍历( while 与 for)

← [语法手册总览](/python/python语法手册) | [上一章 字符编码](/python/python语法手册-09-字符编码) | [下一章 标准库](/python/python语法手册-11-标准库)

---

**本章对应自测卷**：[循环遍历 while 与 for（共 8 题）](/python/Python核心语法自测试卷#十一循环遍历-while-与-for-共-8-题)
**学完能做什么**：用 `range` 三种写法控制循环，分清 `break`/`continue`/`pass`/`return` 的作用范围，理解 `range` 惰性不占大内存。  
**小白注意**：① `range(stop)` 不包含 stop；倒序要 `range(start, stop, -1)`。② `range` 不是列表，是惰性对象，`range(10**9)` 几乎不占内存。③ `break` 只跳出当前循环，`return` 直接结束整个函数。

---

## 一、循环遍历( while 与 for)

核心直觉： **`for` 是为了“数完”或“走完”，`while` 是为了“等到”。**

### 1.1 while 循环：在条件为 True 时反复执行

**语法**：

```python
while 条件表达式:
    # 循环体代码块（需缩进，一般 4 个空格）
    ...
```

- 每次循环开始前都会先判断「条件表达式」是否为 True。  
  - 为 True：执行缩进的循环体，然后再次判断条件。  
  - 为 False：退出循环，执行后面的代码。
- 典型场景：**不知道要循环多少次，只知道“什么时候可以停”**，例如用户输入验证、一直等到某个状态出现等。

**计数器示例**（打印 1～5）：

```python
count = 1
while count <= 5:
    print(f"这是第 {count} 次循环")
    count += 1  # 条件更新：否则会永远 <= 5，变成死循环
```

**关键三要素**：

1. **条件表达式**：决定“要不要继续循环”。  
2. **循环体**：需要重复执行的代码。  
3. **条件更新**：在循环体内修改与条件相关的变量，让条件最终变为 False，避免无限循环。

**常见用法示例**：

- **用户输入校验**：

```python
while True:
    user_input = input("请输入一个正整数：")
    if user_input.isdigit() and int(user_input) > 0:
        print(f"您输入的数字是：{user_input}")
        break           # 校验通过，跳出循环
    else:
        print("输入无效，请重新输入！")
```

- **while + else**：只有在循环“正常结束”（不是通过 `break` 跳出）时才会执行 `else` 里的代码：

```python
count = 1
while count <= 3:
    print(f"循环第 {count} 次")
    count += 1
else:
    print("循环正常结束（不是通过 break 退出）")
```

### 1.2 循环动力引擎：`range()`
#### 1.1.1 语法
`range` 不是列表，而是一个**“懒惰”的数字工厂**，只在循环需要时才生产下一个数字，极其节省内存。
1. **`range(stop)`**：生成从`0`开始，到`stop`结束（不包含`stop`）的整数序列
2. **`range(start, stop)`**：生成从`start`开始，到`stop`结束（不包含`stop`）的整数序列
3. **`range(start, stop, step)`**：生成从`start`开始，到`stop`结束（不包含`stop`），并以`step`为步长的整数序列
其中：
- `stop`参数是一个限定值，序列不包含此值
- `start`参数定义了序列的起始值（默认为`0`）
- `step`参数表示序列中相邻数字之间的步长（默认为`1`）
#### 1.1.2 高级特性
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

### 1.3  `break`, `continue`, `pass`, `return`
| **关键字**        | **作用范围 (破坏半径)** | **形象理解**   | **场景示例**                  |
| -------------- | --------------- | ---------- | ------------------------- |
| **`pass`**     | **0 (无影响)**     | **“此处招租”** | 还没想好 `if` 后面的逻辑，先占个位防止报错。 |
| **`continue`** | **当前这一次迭代**     | **“这题跳过”** | 遇到脏数据（如 `None`），直接进入下一轮。  |
| **`break`**    | **最近的一层循环**     | **“原地爆破”** | 找到目标数据后立即收工，不再跑剩下的循环。     |
| **`return`**   | **整个函数**        | **“终结者”**  | 无论嵌套几层循环，直接关掉函数并带走结果。     |

---

**本章小结**：`for` 遍历已知序列，`while` 条件循环。`range(stop)`/`range(start,stop)`/`range(start,stop,step)`，不包含 stop；`range` 惰性省内存。`break` 跳出一层循环，`continue` 跳过当次，`return` 结束函数。


## 二、循环与大文件读取

### 2.1 为什么读大文件不要直接 `read()`

```python
with open('huge.log', 'r', encoding='utf-8') as f:
    for line in f:
        process(line)
```

- `read()`：一次性把全部内容读进内存。
- `for line in f`：按行迭代，更省内存，更适合日志、CSV、超大文本。

### 2.2 `read()` / `readline()` / `readlines()` 怎么选

- `read()`：要整块内容时用。
- `readline()`：一次读一行，手动控制。
- `readlines()`：一次读完，得到列表；大文件慎用。
- **最推荐的工程写法**：`for line in f`。

### 2.3 对应面试题

- `13` `break`、`continue`、`pass` 的作用
- `15` `range` 的运用
- `41` 如何读取大文件
