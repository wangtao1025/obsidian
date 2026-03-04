# 赋值与算术运算符

← [语法手册总览](/python/python语法手册) | [上一章 变量与解包](/python/python语法手册-01-变量与解包) | [下一章 内置数据结构](/python/python语法手册-02-内置数据结构)

请详细说明赋值运算符、算术运算符的种类、使用方法、优先级规则以及在实际开发中的应用场景。

**本章对应自测卷**：[赋值与算术运算符（共 22 题）](/python/Python核心语法自测试卷#二赋值与算术运算符-共-22-题)

---

## 1. 什么是 Python 的赋值和算术运算符？

赋值运算符用于将值赋给变量，是 Python 中最基本、最常用的运算符；算术运算符用于执行基本的数学运算，是处理数值计算的核心工具。掌握这两类运算符不仅要了解基本用法，更要理解**优先级规则**、**结合性**以及在实际开发中的最佳实践。

---

## 2. 赋值运算符概述

### 2.1 简单赋值运算符

```python
# 将整数 5 赋值给变量 x
x = 5
print(f"x = {x}")  # 输出: x = 5

# 多重赋值
a, b, c = 1, 2, 3
# 序列解包赋值
data = [10, 20, 30]
x, y, z = data
```

### 2.2 复合赋值运算符

| 运算符 | 等价于     | 说明       |
|--------|------------|------------|
| `+=`   | `x = x + y` | 加后赋值   |
| `-=`   | `x = x - y` | 减后赋值   |
| `*=`   | `x = x * y` | 乘后赋值   |
| `/=`   | `x = x / y` | 除后赋值   |
| `//=`  | `x = x // y`| 整除后赋值 |
| `%=`   | `x = x % y` | 取余后赋值 |
| `**=`  | `x = x ** y`| 幂后赋值   |

```python
x = 10
x += 5   # x = 15
x -= 3   # x = 12
x *= 2   # x = 24
x /= 4   # x = 6.0
x //= 3  # x = 2.0
x %= 2   # x = 0.0
x = 2
x **= 3  # x = 8
```

### 2.3 复合赋值运算符的实际应用

- **计数器**：循环中 `counter += 1`
- **累加器**：`total += num`
- **字符串拼接**：`message += " World"`
- **列表扩展**：`my_list += [4, 5]`、`my_list *= 2`

---

## 3. 算术运算符概述

### 3.1 基本算术运算符

| 运算符 | 含义 | 示例     |
|--------|------|----------|
| `+`    | 加法 | `a + b`  |
| `-`    | 减法 | `a - b`  |
| `*`    | 乘法 | `a * b`  |
| `/`    | 除法（结果为浮点） | `a / b`  |
| `//`   | 整除（向下取整） | `a // b` |
| `%`    | 取余 | `a % b`  |
| `**`   | 幂运算 | `a ** b` |

### 3.2 算术运算符的详细应用

- **数学计算**：圆面积 `pi * radius ** 2`，两点距离用 `** 0.5` 开方。
- **时间计算**：秒数转时分秒用 `//` 和 `%`（如 `hours = total_seconds // 3600`）。
- **数据统计**：平均分 `total_score / len(scores)`。
- **进制转换**：`bin()`、`hex()` 等与算术结合。

### 3.3 算术运算符的特殊情况

实际编程中，算术运算符在**负数、浮点数、大数、除零**等场景下容易踩坑。下面分四种情况说明规则与写法。

#### 情况 1：负数运算

涉及**整除 `//`** 和**取余 `%`** 时，负数会带来与直觉不同的结果。Python 的规则是：**整除向负无穷方向取整**，**余数与除数同号**（除数 `b` 为正时，余数在 `[0, b)` 内非负；即满足 `被除数 = 除数 * 商 + 余数`）。

| 运算 | 示例 | 结果 | 说明 |
|------|------|------|------|
| 负数除法 `/` | `-10 / 3` | `-3.333...` | 普通除法，结果为浮点数 |
| 负数整除 `//` | `-10 // 3` | `-4` | 向负无穷取整，不是 -3 |
| 负数取余 `%` | `-10 % 3` | `2` | 余数与除数 3 同号（除数正，余数非负）：-10 = 3×(-4) + 2 |

```python
# 情况 1：负数运算
print("负数运算:")
a = -10
b = 3
print(f"负数除法: {a} / {b} = {a / b}")   # -3.3333333333333335
print(f"负数整除: {a} // {b} = {a // b}") # -4（向负无穷取整）
print(f"负数取余: {a} % {b} = {a % b}")   # 2（余数与除数 b 同号，除数 3 为正故余数非负）
```

**注意**：不同语言对负数取余定义可能不同（有的按“余数与除数同号”），跨语言或写兼容逻辑时要先确认规则。

#### 情况 2：浮点数运算

浮点数在计算机里用**二进制近似**存储，很多十进制小数无法精确表示，因此会出现**精度误差**。例如 `0.1 + 0.2` 在内部略大于 `0.3`，用 `==` 直接比较可能为 `False`。

- **比较**：不要用 `==`/`!=` 判断两个浮点数“是否相等”，应使用**容差比较**：`abs(a - b) < 1e-9` 或 `math.isclose(a, b)`。
- **展示**：需要“好看”的小数时，用 `round()` 或格式化（如 `f"{x:.2f}"`），不要依赖“看起来等于”的浮点结果做逻辑判断。

```python
# 情况 2：浮点数运算
print("\n浮点数运算:")
x = 0.1
y = 0.2
print(f"浮点数加法: {x} + {y} = {x + y}") # 0.30000000000000004（精度误差）
print(f"浮点数乘法: {x} * 3 = {x * 3}")   # 0.30000000000000004

# 正确比较方式：math.isclose(a, b) 或 abs(a - b) < 1e-9
import math
print(x + y == 0.3)           # False
print(math.isclose(x + y, 0.3))  # True
```

#### 情况 3：大数运算

Python 的 **int 是任意精度整数**，不会像 C/Java 那样发生溢出。因此 `2 ** 100`、`3 ** 50` 以及它们相加，都可以直接计算，只要内存允许。

- **适用**：大整数运算、高精度整数算法、大数取模等。
- **注意**：运算时间与位数有关，特别大的数会变慢；若需高性能大数运算，可考虑 `decimal` 或第三方库。

```python
# 情况 3：大数运算
print("\n大数运算:")
big_num1 = 2 ** 100
big_num2 = 3 ** 50
print(f"2^100 = {big_num1}")              # 1267650600228229401496703205376
print(f"3^50 = {big_num2}")               # 717897987691852588770249
print(f"大数相加: {big_num1 + big_num2}") # 1267651318126217093349291975625
```

#### 情况 4：零除错误

**任何除以零**（`/`、`//`、`%` 中除数为 0）都会抛出 **`ZeroDivisionError`**。在可能除零的地方（例如用户输入、配置、分母来自计算）应做**防御性处理**：先判断分母是否为 0，或用 `try-except` 捕获后给出默认值或提示。

```python
# 情况 4：零除错误处理
print("\n零除错误处理:")
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"零除错误: {e}")

try:
    result = 10 // 0
except ZeroDivisionError as e:
    print(f"整除零错误: {e}")

try:
    result = 10 % 0
except ZeroDivisionError as e:
    print(f"取余零错误: {e}")
```

**小结**：负数注意整除/取余的符号规则；浮点数用容差比较、不依赖 `==`；大数 Python 自带支持；除零一律用条件判断或 `try-except` 处理。

---

## 4. 运算符优先级规则

运算复杂表达式时，Python 按**运算符优先级**从高到低计算。常见顺序（从高到低）：

1. **`**`**（幂）
2. **`+x`、`-x`、`~x`**（一元正负、按位取反）
3. **`*`、`/`、`//`、`%`**
4. **`+`、`-`**（二元加减）
5. 比较运算符（`==`、`!=`、`<`、`<=`、`>`、`>=`）
6. **`not`**
7. **`and`**
8. **`or`**
9. **`=`、`+=` 等赋值**

**口诀**：算术 > 比较 > 逻辑 > 赋值。同优先级多数为**左结合**；`**` 与赋值类为**右结合**。不确定时建议用**括号**明确顺序。

### 4.1 使用括号改变优先级

```python
result1 = x + y * z      # 先乘后加
result2 = (x + y) * z    # 先加后乘
```

---

## 5. 其他常见运算符类型（简述）

本章仅作**概览与示例**；比较/逻辑/成员/身份在手册中有专章详解，可跳转阅读。**位运算符**无单独章节，此处给出完整示例。

### 5.1 比较运算符

六种：`==`、`!=`、`<`、`<=`、`>`、`>=`，返回布尔值。数值按大小比较，字符串按字典序（Unicode 码点）比较。

```python
a, b, c = 10, 5, 10
print(f"a == b: {a == b}")   # False
print(f"a == c: {a == c}")   # True
print(f"a > b: {a > b}")     # True
print(f"a >= c: {a >= c}")   # True

# 字符串比较（按字典序）
str1, str2 = "apple", "banana"
print(f"'{str1}' < '{str2}': {str1 < str2}")  # True
```

**详解**：[逻辑与真值 · 关系运算符](/python/python语法手册-06-逻辑与真值)（链式比较、浮点比较、自定义类比较等）。

### 5.2 逻辑运算符

`and`（与）、`or`（或）、`not`（非）。常与比较运算结合做条件判断；注意短路求值及返回值不必为 `True`/`False`。

```python
condition1, condition2, condition3 = True, False, True
print(condition1 and condition2)  # False
print(condition1 or condition2)   # True
print(not condition2)              # True

# 与比较结合
age, score, is_student = 25, 85, True
ok = age > 18 and score > 80 and is_student
print(f"年龄>18 且 分数>80 且 是学生: {ok}")  # True
```

**详解**：[逻辑与真值 · 逻辑运算符](/python/python语法手册-06-逻辑与真值)（短路、真值测试、返回值规则等）。

### 5.3 位运算符

对整数按二进制位运算：`&`（与）、`|`（或）、`^`（异或）、`~`（取反）、`<<`（左移）、`>>`（右移）。常用于标志位、权限、快速乘除 2 的幂等。

```python
x, y = 10, 4  # 二进制: 1010, 0100
print(f"x & y = {x & y}")   # 0
print(f"x | y = {x | y}")   # 14
print(f"x ^ y = {x ^ y}")   # 14
print(f"~x = {~x}")         # -11
print(f"x << 1 = {x << 1}") # 20
print(f"x >> 1 = {x >> 1}") # 5

# 常见用法：奇偶判断、2 的幂、交换两数
num = 15
print(f"{num} 是偶数: {(num & 1) == 0}")  # False
print(f"2^3 = {1 << 3}")                   # 8
a, b = 5, 10
a ^= b; b ^= a; a ^= b
print(f"交换后: a={a}, b={b}")             # 10, 5
```

**详解**：[位运算符详解](/python/位运算符详解)（按位与/或/异或/取反、左移右移、权限掩码、文件模式、Unicode 转 UTF-8 及面试参考）。

### 5.4 成员运算符

`in`、`not in`：判断元素是否在可迭代对象中。字符串/列表/元组按元素查；**字典默认只查键**，查值需用 `value in d.values()`。

```python
my_string = "apple"
my_list = [1, 2, 3, 4, 5]
my_dict = {"name": "Alice", "age": 25}

print("'a' in my_string:", "a" in my_string)  # True
print("3 in my_list:", 3 in my_list)          # True
print("'name' in my_dict:", "name" in my_dict) # True（查键）
print("'Alice' in my_dict:", "Alice" in my_dict)  # False

# 简单验证
valid = ["A", "B", "C", "D"]
print("'E' 是有效选项:", "E" in valid)  # False
```

**详解**：[身份与成员 · 成员运算符](/python/python语法手册-07-身份与成员)（字典查找陷阱、`__contains__` 等）。

### 5.5 身份运算符

`is`、`is not`：比较两个引用是否指向**同一对象**（即 `id(a) == id(b)`）。与 `==`（比较值）不同。判断 `None` 时推荐用 `is None`；小整数（-5～256）可能被缓存，同值可能同对象。

```python
x, y, z = 10, 10, 20
list1, list2 = [1, 2, 3], [1, 2, 3]
list3 = list1

print("x is y:", x is y)           # True（小整数缓存）
print("list1 is list2:", list1 is list2)  # False（不同对象）
print("list1 is list3:", list1 is list3)  # True（同一引用）

def compare_objects(obj1, obj2):
    if obj1 is obj2:
        return "同一对象"
    elif obj1 == obj2:
        return "值相等，非同一对象"
    return "不同"
print(compare_objects(x, y))      # 同一对象
print(compare_objects(list1, list2))  # 值相等，非同一对象
```

**详解**：[身份与成员 · 身份运算符](/python/python语法手册-07-身份与成员)（`==` 与 `is` 区别、`None` 判断、小整数池等）。

以下为位运算符详解（按位与/或/异或/取反、左移右移、权限掩码、文件模式、Unicode 转 UTF-8 及面试参考）。

## 6. 位运算符详解 {#位运算符详解}

### 6.1 位运算符概述

位运算符在**二进制级别**对整数的每一位进行操作。Python 支持以下位运算符：

| 运算符 | 名称     | 作用                         | 示例        |
|--------|----------|------------------------------|-------------|
| `&`    | 按位与   | 对应位都为 1 时结果为 1      | `12 & 10` → 8 |
| `\|`   | 按位或   | 对应位有 1 则结果为 1        | 12\|10 → 14     |
| `^`    | 按位异或 | 对应位不同为 1，相同为 0      | `12 ^ 10` → 6 |
| `~`    | 按位取反 | 所有位取反（Python 中 `~x` = `-x-1`） | `~12` → -13 |
| `<<`   | 左移     | 二进制位左移，低位补 0        | `12 << 2` → 48 |
| `>>`   | 右移     | 二进制位右移，相当于整除 2^n | `12 >> 2` → 3 |

### 6.2 基本用法

#### 6.2.1 按位与（&）

对应位都为 1 时结果为 1，否则为 0。常用于**掩码、取特定位、奇偶判断**（如 `x & 1`）。

```python
num1, num2 = 0b1100, 0b1010  # 12, 10
result = num1 & num2         # 1100 & 1010 = 1000 → 8
print(f"12 & 10 = {result}")  # 8

# 真值表：0&0=0, 0&1=0, 1&0=0, 1&1=1
# 多个数：15 & 12 & 10 = 8
```

#### 6.2.2 按位或（|）

对应位有 1 则结果为 1。常用于**合并标志位、添加权限**。

```python
a, b = 12, 10
print(f"12 | 10 = {a | b}")  # 1110 → 14
# 真值表：0|0=0, 0|1=1, 1|0=1, 1|1=1
```

#### 6.2.3 按位异或（^）

**不同为 1，相同为 0**。异或满足四条常用性质（见下），常用于交换两数、去重、简单加密。

##### 异或运算的特殊性质

| 性质     | 说明                     | 示例        |
|----------|--------------------------|-------------|
| 与 0 异或 | 任何数与 0 异或都等于它本身 | `x ^ 0 == x` |
| 与自身异或 | 任何数与自身异或都等于 0   | `x ^ x == 0` |
| 交换律   | 多个数异或，顺序可任意交换 | `a ^ b ^ c == c ^ b ^ a` |
| 结合律   | 括号可任意加，结果不变     | `(a ^ b) ^ c == a ^ (b ^ c)` |

```python
# 与 0 异或、与自身异或
x = 15
print(f"{x} ^ 0 = {x ^ 0}")    # 15 ^ 0 = 15
print(f"{x} ^ {x} = {x ^ x}")  # 15 ^ 15 = 0

# 交换律：(a ^ b ^ c) 与 (c ^ b ^ a) 结果相同
a, b, c = 5, 12, 10
r1, r2 = a ^ b ^ c, c ^ b ^ a
print(f"({a} ^ {b} ^ {c}) = {r1}")   # 3
print(f"({c} ^ {b} ^ {a}) = {r2}")   # 3
print(f"交换律: {r1 == r2}")          # True

# 结合律：((a^b)^c) 与 (a^(b^c)) 结果相同
r3, r4 = (a ^ b) ^ c, a ^ (b ^ c)
print(f"(({a}^{b})^{c}) = {r3}, ({a}^({b}^{c})) = {r4}, 结合律: {r3 == r4}")  # True
```

**小结**：① 与 0 异或等于本身；② 与自身异或等于 0；③ 满足交换律；④ 满足结合律。

```python
# 应用：交换两数（不借临时变量）
x, y = 5, 10
x ^= y; y ^= x; x ^= y
print(x, y)  # 10, 5
```

**小白版原理推导：为什么三行异或可以交换 a、b？**

设初始时 `a = a0`、`b = b0`。

1. **第一步：`a ^= b`**  
   - 等价于 `a = a ^ b`，此时 `a = a0 ^ b0`，`b` 还是 `b0`。
2. **第二步：`b ^= a`**  
   - 等价于 `b = b ^ a = b0 ^ (a0 ^ b0)`。  
   - 利用交换律、结合律重排：`b0 ^ (a0 ^ b0) = (b0 ^ b0) ^ a0 = 0 ^ a0 = a0`（因为 `x ^ x = 0`、`x ^ 0 = x`）。  
   - 所以第二步后：`b` 变成了原来的 `a0`。
3. **第三步：`a ^= b`**  
   - 此时 `a = a0 ^ b0`，`b = a0`，所以 `a ^= b` 等价于 `a = (a0 ^ b0) ^ a0`。  
   - 同样重排：`(a0 ^ b0) ^ a0 = (a0 ^ a0) ^ b0 = 0 ^ b0 = b0`。  
   - 所以第三步后：`a` 变成了原来的 `b0`。

最终结果就是 `(a, b) = (b0, a0)`，完成交换。整个过程只依赖异或的性质：  
- `x ^ x = 0`（和自身异或变 0）；  
- `x ^ 0 = x`（和 0 异或不变）；  
- 加上交换律、结合律，可以随意调整运算顺序；  
而且完全在 `a`、`b` 两个变量上原地操作，不需要额外的临时变量。

> 实际 Python 代码中，更推荐用 `a, b = b, a` 来交换，异或交换主要用来练习位运算思维或应对相关面试题。

#### 6.2.4 按位取反（~）

将所有位取反。在 Python 中 **`~x` 等价于 `-x - 1`**（原因见下）。

##### 小白理解：为什么是 `-x - 1`？什么是“任意精度的补码”？

两句话先记住结论：**补码**是计算机里表示正负整数的一种方式；**任意精度**是说 Python 的整数不限定位数，所以“按位取反”没法真的按“固定多少位”来算，Python 就直接用数学结果 **`~x = -x - 1`** 来定义，和你在 C/Java 里对固定位数做按位取反得到的效果一致。

- **补码（Two's Complement）**  
  计算机里要同时表示正数和负数，常用一种叫“补码”的规则：正数按正常二进制存；负数用“对应正数按位取反再加 1”等方式表示。这样加法和减法可以用同一套电路做，而且“按位取反”在数学上恰好对应 **`-x - 1`**（在固定位数下）。你只要知道：**在补码规则下，对整数做“按位取反”得到的就是 `-x - 1`**。

- **任意精度（Arbitrary Precision）**  
  很多语言（如 C、Java）的整数有**固定位数**（如 32 位、64 位），数字再大就会“溢出”。Python 的整数是**任意精度**：需要多少位就用多少位，只要内存够，可以表示非常大的数，不会因为位数固定而溢出。  
  正因为**没有固定位数**，Python 没法像 C 那样“对 32 个二进制位逐位取反”——位数本身是动态的。所以 Python 不按“真·按位”来定义 `~x`，而是直接规定：**`~x` 的结果等于 `-x - 1`**。这样既和补码下“按位取反”的数学含义一致，又适用于任意大小的整数。

- **小结**  
  “Python 整数是任意精度的补码表示”的意思是：**用补码那一套规则来看正负和位运算**，但**不限制位数**。所以 `~x` 在 Python 里就定义为 **`-x - 1`**，你按这个公式记即可。

```python
num = 12
print(f"~12 = {~num}")           # -13
print(f"验证: -12-1 = {-12-1}")  # -13

# 不同数字：~0=-1, ~1=-2, ~5=-6
```

#### 6.2.5 左移（<<）

**小白理解**：把二进制整体往左挪，右边空出来的位用 0 补。每往左挪 1 位，就相当于这个数 **×2**；挪 n 位就相当于 **×2^n**。

- 例如：`12` 的二进制是 `1100`，左移 2 位变成 `110000` = 48，也就是 12×4。
- **左移位数很多会怎样？** 在 Python 里，整数没有固定位数限制，所以一直左移只会得到非常大的数，不会变成 0。例如 `1 << 100` 就是一个很大的整数。在 C/Java 等语言里，超出位数会“溢出”，Python 不会。

```python
num = 12
print(f"12 << 2 = {num << 2}")  # 48，等价于 12 * 4

# 快速计算 2 的幂
def power_of_two(n):
    return 1 << n
print([power_of_two(i) for i in range(5)])  # [1, 2, 4, 8, 16]

# 左移很多位：Python 里不会变 0，只会变大
print(f"1 << 10 = {1 << 10}")   # 1024
print(f"1 << 20 = {1 << 20}")   # 1048576
```

#### 6.2.6 右移（>>）

**小白理解**：把二进制整体往右挪，左边空出来的位按规则补（见下）。每往右挪 1 位，就相当于这个数 **整除 2**；挪 n 位就相当于 **整除 2^n**（即 `x >> n` 等价于 `x // (2**n)`）。

- 例如：`12` 的二进制是 `1100`，右移 2 位变成 `11` = 3，也就是 12÷4 的整数商。

##### 右移位数变多会怎样？（正数 → 0）

对**非负整数**来说，右移的位数一多，相当于一直“除以 2 取整”，最终一定会变成 **0**。

可以这样想：一个正数的二进制只有有限位是 1（比如 12 只有 4 位）。右移 1 位相当于除以 2，右移 2 位相当于除以 4……当右移的位数多到“2 的幂”已经比这个数还大时，整除的结果就是 0。例如：

- `5 >> 1` = 5÷2 = 2  
- `5 >> 2` = 5÷4 = 1  
- `5 >> 3` = 5÷8 = **0**  
- 再往后 `5 >> 4`、`5 >> 100` 都还是 **0**，因为 5 已经比 2^4、2^100 小，整除结果只能是 0。

所以：**正数右移位数足够多，结果就是 0**。你看到的“右移多了变成 0”就是这个道理。

```python
# 正数右移：位数一多就变成 0
x = 12
print(f"12 >> 2 = {x >> 2}")   # 3  (12 // 4)
print(f"12 >> 4 = {x >> 4}")   # 0  (12 // 16)
print(f"12 >> 10 = {x >> 10}") # 0

# 再比如 5
print(f"5 >> 1 = {5 >> 1}")    # 2
print(f"5 >> 2 = {5 >> 2}")    # 1
print(f"5 >> 3 = {5 >> 3}")    # 0  ← 从这里开始就是 0
print(f"5 >> 100 = {5 >> 100}") # 0
```

##### 负数右移会怎样？（不会变成 0）

Python 里对负数的右移是**算术右移**：高位补的是“符号位”（保持是负数），所以负数右移很多位之后会一直往 -1 靠近，**不会变成 0**。例如：

- `-12 >> 1` = -6，`-12 >> 2` = -3，`-12 >> 10` 会是一个负数（最终趋向 -1）。

记住两点即可：

| 情况       | 右移很多位之后 |
|------------|----------------|
| 正数 / 0   | 变成 **0**     |
| 负数       | 保持负数，不会变成 0，会趋向 **-1** |

```python
# 负数右移：不会变成 0，会趋向 -1
print(f"-12 >> 1 = {-12 >> 1}")    # -6
print(f"-12 >> 2 = {-12 >> 2}")    # -3
print(f"-12 >> 10 = {-12 >> 10}")  # -1
print(f"-1 >> 100 = {-1 >> 100}")  # -1  （负数一直右移还是 -1）
```

### 6.3 实际应用场景

#### 6.3.1 位掩码（权限管理）

**核心结论**：用不同二进制位表示不同权限；**添加**用 `|`，**移除**用 `& ~权限`，**检查**用 `(当前 & 权限) == 权限`。

**为什么用 1、2、4、8？** 每个数在二进制里只占一位（0001、0010、0100、1000），这样多个权限可以“叠”在一个整数里，互不干扰；用位运算就能单独加、删、查某一种权限。

下面是一个完整的权限管理示例，带注释和可读输出，方便小白对照运行理解。

```python
class PermissionManager:
    """用位掩码管理权限：一个整数表示多种权限，用 | 添加、& ~ 移除、& 检查。"""

    def __init__(self):
        # 每个权限占一个二进制位，这样多个权限可以“或”在一起
        self.READ = 1    # 二进制 0001
        self.WRITE = 2   # 二进制 0010
        self.EXECUTE = 4 # 二进制 0100
        self.DELETE = 8  # 二进制 1000

        self.permission_names = {
            self.READ: "READ",
            self.WRITE: "WRITE",
            self.EXECUTE: "EXECUTE",
            self.DELETE: "DELETE",
        }

    def add_permission(self, current_permissions, permission):
        """添加权限：用按位或 | 把对应位变成 1。"""
        return current_permissions | permission

    def remove_permission(self, current_permissions, permission):
        """移除权限：先用 ~ 把该位变 0、其它位变 1，再和当前值按位与，只清掉这一位。"""
        return current_permissions & ~permission

    def has_permission(self, current_permissions, permission):
        """检查是否拥有某权限：按位与后若等于该权限值，说明对应位是 1。"""
        return (current_permissions & permission) == permission

    def get_permissions(self, current_permissions):
        """返回当前拥有的所有权限名称列表，方便打印查看。"""
        return [name for perm, name in self.permission_names.items()
                if self.has_permission(current_permissions, perm)]


# ---------- 测试：从 0 开始，加权限 → 查权限 → 删权限 ----------
pm = PermissionManager()
user_permissions = 0  # 初始没有任何权限（二进制 0000）

print("初始权限:", pm.get_permissions(user_permissions))  # []

# 添加权限（用 |）
user_permissions = pm.add_permission(user_permissions, pm.READ)
print("添加 READ 后:", pm.get_permissions(user_permissions))  # ['READ']

user_permissions = pm.add_permission(user_permissions, pm.WRITE)
user_permissions = pm.add_permission(user_permissions, pm.EXECUTE)
print("再添加 WRITE、EXECUTE 后:", pm.get_permissions(user_permissions))  # ['READ','WRITE','EXECUTE']

# 检查权限（用 &）
print("是否有 READ?", pm.has_permission(user_permissions, pm.READ))    # True
print("是否有 DELETE?", pm.has_permission(user_permissions, pm.DELETE)) # False

# 移除权限（用 & ~）
user_permissions = pm.remove_permission(user_permissions, pm.WRITE)
print("移除 WRITE 后:", pm.get_permissions(user_permissions))  # ['READ','EXECUTE']
```

**对应关系小结**：添加 = `current | permission`；移除 = `current & ~permission`；检查 = `(current & permission) == permission`。记住这三句，就能自己写权限位掩码了。

#### 6.3.2 文件读写模式（位组合）

##### 为什么文件模式能和“位”扯上关系？

和权限一样，**一个整数用不同的二进制位表示多种“开关”**：读、写、追加、二进制……每个开关占一位，用 **按位或 `|`** 把多个开关“叠在一起”，就得到“既读又写”“二进制 + 追加”等组合。这样底层（如 C/Unix 的 `open()`）只需传一个整数，就能表达多种模式。

##### 两种用法：字符串模式 vs 位标志

| 方式 | 适用场景 | 示例 |
|------|----------|------|
| **字符串模式** | 日常写 Python 最常用 | `open("a.txt", "r")`、`open("b.bin", "rb")`、`open("c.txt", "w+")` |
| **位标志（os 模块）** | 需要细粒度控制或与系统 API 一致时 | `os.open(path, os.O_RDONLY \| os.O_BINARY)` |

平时我们用的 `"r"`、`"w"`、`"rb"`、`"w+"` 等，在底层会转换成这类位标志再交给操作系统；所以理解“位组合”，有助于明白为什么可以写出 `"rb"`、`"r+"` 这种“组合模式”。

##### 常见字符串模式一览（小白必会）

| 模式名           | 字符串形式 | 含义说明 |
|------------------|------------|----------|
| 只读             | r          | 以只读模式打开，不能写入；文件须已存在 |
| 只写             | w          | 以只写模式打开，不存在则创建，原内容会被清空 |
| 追加             | a          | 以追加模式写入，不存在则创建，内容写到文件末尾 |
| 读写             | r+         | 既可读又可写，文件必须已存在，**不会**清空原内容 |
| 读写（先清空）   | w+         | 可读可写，不存在则创建，**存在则先清空**再读写 |
| 读写追加         | a+         | 可读可写，写入时总是追加到末尾，文件不存在则创建 |
| 只读二进制       | rb         | 二进制只读，适合图片/音频等二进制数据 |
| 只写二进制       | wb         | 二进制只写，写入的是字节流 |
| 追加二进制       | ab         | 二进制追加，所有内容都追加到末尾 |
| 读写二进制       | r+b        | 二进制读写，文件须已存在 |
| 读写追加二进制   | a+b        | 二进制读写且写入时追加到末尾 |

“二进制”就是在“读/写/追加”之外再加一个“按字节、不按文本解码”的开关，所以可以组合成 `rb`、`wb`、`ab`、`r+b`、`a+b` 等。

**“+” 号的含义**：在模式里表示“增强/额外功能”——在原有基础上多一种方向。例如：`r+` = 读 + 额外的写；`w+` = 写 + 额外的读（会先清空）；`a+` = 追加 + 额外的读。记“谁为主、+ 表示再加另一种”即可。  
**r+ 和 w+ 的区别**：两者都能读能写，但 **r+ 不清空**原内容（文件须已存在），**w+ 会先清空**再读写（文件不存在会创建），所以不能算“同样的权限”，只是“都具备读写”而已。

**按首字母记三大家族**：
- **r 开头**（r、r+、rb、r+b）：文件**必须已存在**，不存在会报错；不会清空原内容。
- **w 开头**（w、w+、wb、w+b）：文件**不存在就创建**，**存在就先清空**再写。
- **a 开头**（a、a+、ab、a+b）：文件**不存在就创建**，**存在不清空**，只在**末尾追加**。

##### 用 os 模块看“位组合”长什么样（选学）

Python 的 `os` 模块里提供了和系统一致的常量，用 **按位或 `|`** 把多个选项拼在一起，这就是“文件模式的位组合”在代码里的真实写法：

```python
import os

# 只读打开（相当于 "r"）
fd = os.open("readme.txt", os.O_RDONLY)

# 只写 + 不存在则创建 + 先清空（相当于 "w"）
fd = os.open("out.txt", os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)

# 追加写入（相当于 "a"）
fd = os.open("log.txt", os.O_WRONLY | os.O_APPEND)

# 读写 + 二进制（相当于 "r+b"）
fd = os.open("data.bin", os.O_RDWR | getattr(os, "O_BINARY", 0))
```

这里 `O_WRONLY | O_CREAT | O_TRUNC` 就是把“只写”“创建”“清空”三个开关用 `|` 合在一个整数里传给系统。

##### 用类模拟“位组合”（选学）

下面用自定义的“标志位”模拟：读=1、写=2、追加=4、二进制=8、读写增强=16、文本=32，通过 `|` 组合、`& ~` 清除、`&` 检测，再还原成我们熟悉的 `"r"`、`"rb"`、`"r+"` 等字符串。**这里的 1、2、4、8、16、32 只是为演示方便取的“一位一个开关”的约定数值**（和 6.3.1 节权限里 READ=1、WRITE=2 一样），**并不是** Python 或操作系统里文件模式常量的真实取值；真实底层用的是 `os.O_RDONLY`、`os.O_APPEND` 等，其数值由系统定义。本段仅用于理解“用位组合表示多种开关”这一概念；实际 `open()` 用的是字符串解析和系统调用。

```python
class FileModeManager:
    """用位标志模拟文件模式：读=1、写=2、追加=4、二进制=8、读写=16、文本=32，用 | 组合、& 检测。"""

    def __init__(self):
        self.READ = 1    # 0001
        self.WRITE = 2   # 0010
        self.APPEND = 4  # 0100
        self.BINARY = 8  # 1000
        self.PLUS = 16   # 读写增强 (10000)
        self.TEXT = 32   # 文本 (100000)

    def set_mode(self, mode, flag):
        """添加某个标志：用 |"""
        return mode | flag

    def clear_mode(self, mode, flag):
        """清除某个标志：用 & ~"""
        return mode & ~flag

    def toggle_mode(self, mode, flag):
        """切换某个标志：用 ^"""
        return mode ^ flag

    def has_mode(self, mode, flag):
        """是否包含某标志：用 & 判断"""
        return (mode & flag) != 0

    def get_mode_string(self, mode):
        """把当前位组合转成 open() 用的字符串，如 'r'、'rb'、'r+'。"""
        if self.has_mode(mode, self.READ) and self.has_mode(mode, self.WRITE):
            mode_str = "r+"
        elif self.has_mode(mode, self.READ):
            mode_str = "r"
        elif self.has_mode(mode, self.WRITE):
            mode_str = "a" if self.has_mode(mode, self.APPEND) else "w"
        elif self.has_mode(mode, self.APPEND):
            mode_str = "a"
        else:
            mode_str = ""

        if self.has_mode(mode, self.PLUS):
            if mode_str == "r":
                mode_str = "r+"
            elif mode_str == "w":
                mode_str = "w+"
            elif mode_str == "a":
                mode_str = "a+"

        if self.has_mode(mode, self.BINARY):
            mode_str += "b"
        elif self.has_mode(mode, self.TEXT):
            mode_str += "t"

        return mode_str if mode_str else "无模式"

    def get_mode_description(self, mode):
        """返回当前组合的中文描述，如 '读 + 写 + 二进制'。"""
        parts = []
        if self.has_mode(mode, self.READ):
            parts.append("读")
        if self.has_mode(mode, self.WRITE):
            parts.append("写")
        if self.has_mode(mode, self.APPEND):
            parts.append("追加")
        if self.has_mode(mode, self.BINARY):
            parts.append("二进制")
        if self.has_mode(mode, self.PLUS):
            parts.append("读写")
        if self.has_mode(mode, self.TEXT):
            parts.append("文本")
        return " + ".join(parts) if parts else "无模式"


fm = FileModeManager()

# 演示：从 0 开始用 | 逐步“加”模式，再转成字符串
mode = 0
print("初始:", fm.get_mode_string(mode), fm.get_mode_description(mode))

mode = fm.set_mode(mode, fm.READ)
print("加读:", fm.get_mode_string(mode), fm.get_mode_description(mode))

mode = fm.set_mode(mode, fm.WRITE)
print("加写:", fm.get_mode_string(mode), fm.get_mode_description(mode))

mode = fm.set_mode(mode, fm.BINARY)
print("加二进制:", fm.get_mode_string(mode), fm.get_mode_description(mode))

mode = fm.clear_mode(mode, fm.READ)
print("清除读:", fm.get_mode_string(mode), fm.get_mode_description(mode))

# 常见模式与“位组合”的对应关系
common = {
    "只读": fm.READ,
    "只写": fm.WRITE,
    "追加": fm.WRITE | fm.APPEND,
    "读写": fm.READ | fm.WRITE,
    "只读二进制": fm.READ | fm.BINARY,
    "只写二进制": fm.WRITE | fm.BINARY,
    "追加二进制": fm.WRITE | fm.APPEND | fm.BINARY,
    "读写二进制": fm.READ | fm.WRITE | fm.BINARY,
    "读写追加": fm.READ | fm.WRITE | fm.APPEND,
}
for name, val in common.items():
    print(f"  {name}: {fm.get_mode_string(val)} ({fm.get_mode_description(val)})")
```

小结：和 6.3.1 权限掩码一样，这里用 `|` 添加、`& ~` 清除、`&` 检测；区别是文件模式最后要“解码”成字符串给 `open()` 用，而权限掩码通常只做“有没有某权限”的检查。

##### 和权限掩码的对比（巩固理解）

| 场景       | 用到的运算 | 含义 |
|------------|------------|------|
| 权限掩码   | `current \| permission` | 添加某种权限（把某位设为 1） |
| 权限掩码   | `current & ~permission` | 去掉某种权限（把某位清 0） |
| 权限掩码   | `(current & p) == p`    | 检查是否拥有某权限 |
| 文件模式   | `O_RDONLY \| O_BINARY`  | 同时要“只读”和“二进制”两个选项 |

文件模式这里**只做“组合”**，不做“检测”和“移除”，所以主要用 `|`；每个选项占不同的位，所以不会互相覆盖。

##### 小白怎么学这一块？

1. **先会用字符串模式**：记住 `r`/`w`/`a`、`rb`/`wb`/`r+b` 就够日常用了，写 `open(文件, "rb")` 等即可。
2. **再理解“组合”思想**：`"rb"` = 读 + 二进制，就像两个开关同时打开；这和 6.3.1 节里“多个权限用 `|` 叠在一起”是同一套思路。
3. **位标志不必强记**：知道有 `os.O_RDONLY`、`os.O_WRONLY`、`os.O_APPEND` 这种东西，是用 `|` 组合的即可；真需要时再查 [os 文档](https://docs.python.org/3/library/os.html#os.open)。
4. **总结一句**：文件模式在底层是“多个二进制位开关用 `|` 组合成一个整数”；Python 里我们多数时候用字符串 `"r"`/`"rb"` 等，等价于这些位组合的简便写法。

#### 6.3.3 Unicode 转 UTF-8

UTF-8 编码规则可用位运算实现：根据码点范围决定字节数，用移位和掩码（`>>`、`&`、`|`）拼出各字节。

```python
def unicode_to_utf8(codepoint):
    """将 Unicode 码点转为 UTF-8 字节序列"""
    if codepoint < 0 or codepoint > 0x10FFFF:
        raise ValueError(f"无效的 Unicode 码点: {codepoint}")
    if codepoint <= 0x7F:
        return bytes([codepoint])
    elif codepoint <= 0x7FF:
        return bytes([0b11000000 | (codepoint >> 6), 0b10000000 | (codepoint & 0x3F)])
    elif codepoint <= 0xFFFF:
        return bytes([
            0b11100000 | (codepoint >> 12),
            0b10000000 | ((codepoint >> 6) & 0x3F),
            0b10000000 | (codepoint & 0x3F)
        ])
    else:
        return bytes([
            0b11110000 | (codepoint >> 18),
            0b10000000 | ((codepoint >> 12) & 0x3F),
            0b10000000 | ((codepoint >> 6) & 0x3F),
            0b10000000 | (codepoint & 0x3F)
        ])

# 测试
for char in ['A', '中', '😀']:
    cp = ord(char)
    manual = unicode_to_utf8(cp)
    builtin = char.encode('utf-8')
    print(f"'{char}' U+{cp:04X} → {manual.hex()} 验证: {manual == builtin}")
```

### 6.4 位运算小结

- **&**：按位与，两位都为 1 结果为 1；常用于掩码、奇偶判断。
- **|**：按位或，有 1 则 1；常用于合并标志、添加权限。
- **^**：按位异或，不同为 1；性质 `x^0=x`、`x^x=0`，可交换两数、去重。
- **~**：按位取反，Python 中 `~x == -x-1`。
- **<<**：左移，等价于乘 2^n；可快速算 2 的幂。Python 里左移很多位不会变 0，只会变大。
- **>>**：右移，等价于整除 2^n。**正数**右移位数过多会变成 **0**；**负数**右移是算术右移，不会变成 0，会趋向 -1。

常见应用：权限/标志位、文件模式组合、编码（如 UTF-8）、状态压缩、快速乘除 2 的幂。

### 6.5 参考回答（面试向）

- **六种**：按位与 &、或 |、异或 ^、取反 ~、左移 <<、右移 >>；前四种按位运算，后两种移位。
- **数学意义**：左移 n 位相当于乘 2^n，右移 n 位相当于整除 2^n；便于快速计算 2 的幂或整除 2。
- **应用**：权限/标志位用不同位表示，用 `|` 添加、`& ~mask` 移除、`&` 检查。
- **性能**：位运算在 CPU 层面直接支持，通常比乘除和逻辑判断更快。
- **异或性质**：`a^a=0`、`a^0=a`，可用于交换两数、简单去重或校验。
- **加分**：结合项目（权限系统、多选项压缩）；用位图、位掩码节省内存；注意只适用于整数、`~` 结果为负、负数右移为算术右移。
- **与逻辑运算区别**：位运算对整数的每一位操作，结果是整数；逻辑运算对表达式真假求值，结果是布尔或操作数。

**本章对应自测卷（含位运算符）**：[赋值与算术运算符（共 22 题）](/python/Python核心语法自测试卷#二赋值与算术运算符-共-22-题)、[位运算符（共 14 题）](/python/Python核心语法自测试卷#二附位运算符-共-14-题)（若自测卷保留该小节）。

---

## 7. 结合性（Associativity）

运算符不仅有**优先级**，还具有**结合性**，用于决定在**优先级相同的多个运算符连续出现时**的计算方向。常见类型有 **左结合（从左到右）** 与 **右结合（从右到左）**。

- **左结合（left-to-right）**：大多数二元运算符（如 `+`, `-`, `*`, `/`, `//`, `%`, `&`, `|`, `^`, `<`, `<=`, `>`, `>=`, `==`, `!=`, `in`, `is`, `and`, `or`）。例如：`a - b - c` 实际等价于 `(a - b) - c`。
- **右结合（right-to-left）**：常见于**赋值类运算符**（`=`, `+=`, `-=` 等）以及**幂运算符 `**`**。例如：
  - **指数**：`2 ** 3 ** 2` 等价于 `2 ** (3 ** 2)`，不是 `(2 ** 3) ** 2`。
  - **赋值**：`a = b = c = 10` 会依次从右向左赋值。

### 7.1 常见运算符结合性示例表

| 运算符 | 结合性 | 示例及解释 |
|--------|--------|-------------|
| `+`, `-`, `*`, `/` | 左结合 | `a - b - c` → `(a - b) - c` |
| `**` | 右结合 | `2 ** 3 ** 2` → `2 ** (3 ** 2)` |
| `=`, `+=`, `-=` 等 | 右结合 | `a = b = c = 1` 从右向左赋值 |
| 比较、逻辑（`and` 等） | 左结合 | `True or False or True` 从左到右求值 |

在编写复杂表达式时，理解结合性和优先级非常关键，建议适当加括号，避免歧义和可读性差的问题。

### 7.2 结合性实例代码

```python
# 左结合示例
result = 10 - 5 - 2    # 等价于 (10 - 5) - 2 = 3
print(result)          # 输出: 3

# 右结合示例（幂运算和赋值）
print(2 ** 3 ** 2)     # 输出: 512，因为等价于 2 ** (3 ** 2) = 2 ** 9 = 512
a = b = c = 7
print(a, b, c)         # 输出: 7 7 7
```

如有不确定可参考官方文档：[Python Operator Precedence](https://docs.python.org/3/reference/expressions.html#operator-precedence)。

---

## 8. 总结

### 8.1 核心要点

- 赋值：简单赋值 `=`；复合赋值 `+=`、`-=`、`*=`、`/=`、`//=`、`%=`、`**=`。
- 算术：七种基本运算；注意整除、取余在负数下的行为；除零需异常处理。
- 优先级：指数最高，乘除高于加减，比较高于逻辑，赋值最低；建议用括号增强可读性。

### 8.2 常见错误与解决

- **除零错误**：`try-except` 捕获 `ZeroDivisionError`。
- **浮点精度**：用 `round()` 或 `decimal` 模块、比较时用 `math.isclose()`。
- **优先级混淆**：用括号明确计算顺序。

---

## 9. 参考回答（面试向）

- **开场**：赋值运算符用于给变量赋值，算术运算符用于数学计算；掌握种类、优先级和实际场景很重要。
- **赋值**：分简单赋值与复合赋值；复合赋值相当于“先运算再赋值”，代码更简洁。
- **算术**：七种运算符；整除向下取整，取余与除数/被除数符号相关；幂运算优先级最高之一。
- **优先级**：口诀“指数最高，乘除高于加减，比较高于逻辑，赋值最低”；不确定时用括号。
- **收尾**：扎实掌握赋值与算术运算符、优先级与特殊情况，是写出正确且可维护代码的基础。
