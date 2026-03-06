# 循环遍历

← [语法手册总览](/python/python语法手册) | [上一章 字符编码](/python/python语法手册-09-字符编码) | [下一章 标准库](/python/python语法手册-11-标准库)

---

**本章对应自测卷**：[循环遍历 while 与 for（共 14 题）](/python/Python核心语法自测试卷#十一循环遍历-while-与-for-共-8-题)
**学完能做什么**：理解 `for` 和 `while` 的使用场景，掌握 `range()`、`break`、`continue`、`pass`、`for-else` / `while-else`、`while True` 等高频写法。  
**小白注意**：① `range()` 不是列表。② `break` 只跳出当前这一层循环。③ `continue` 会跳过本轮后续代码，`pass` 什么都不做。④ `for-else` / `while-else` 的 `else` 不是“条件不成立就执行”。

---

## 一、先分清：`for` 和 `while` 分别适合什么场景

### 1.1 `for`：适合“遍历一批东西”

**一句话先懂**：当你已经知道要遍历什么对象时，通常优先用 `for`。

```python
for name in ['A', 'B', 'C']:
  print(name)
```

常见场景：
- 遍历列表、字符串、字典
- 跑固定次数
- 依次处理一组数据

### 1.2 `while`：适合“只要条件还成立就继续”

**一句话先懂**：当循环次数不固定，而是由条件决定时，通常更适合 `while`。

```python
count = 3
while count > 0:
  print(count)
  count -= 1
```

常见场景：
- 输入校验反复重试
- 读取直到某个条件结束
- 不确定循环多少次

---

## 二、`range()`：`for` 最常见的搭档

### 2.1 `range()` 的三种写法

```python
print(list(range(5)))
print(list(range(1, 5)))
print(list(range(1, 10, 2)))
```

对应三种形式：
- `range(stop)`
- `range(start, stop)`
- `range(start, stop, step)`

### 2.2 `range()` 返回的是列表吗

**一句话先懂**：不是。`range()` 返回的是 `range` 对象。

```python
r = range(5)
print(r)
print(type(r))
```

### 2.3 为什么 `range()` 内存效率高

因为它不是一次性把所有数字都真的存成一个列表，而是按规则“按需计算”。

这也是为什么：
- `range(1000000000)` 也能轻松创建
- 但 `list(range(1000000000))` 会占很多内存

### 2.4 一个高频题：生成 `[5, 4, 3, 2, 1]`

```python
print(list(range(5, 0, -1)))
```

### 2.5 `range()` 也支持切片

```python
r = range(10)
print(r[2:8:2])
print(list(r[2:8:2]))  # [2, 4, 6]
```

**一句话先懂**：`range` 对象也能切片，而且切完通常还是 `range` 对象。

再看两个自测高频结果：

```python
print(list(range(5, -1, -2)))  # [5, 3, 1]
print(list(range(5, 5, -1)))   # []
```

---

## 三、循环控制：`break`、`continue`、`pass`

### 3.0 四个高频关键字先分清

| 关键字 | 作用范围 | 形象理解 |
| --- | --- | --- |
| `pass` | 当前代码位置 | 先占个位置，什么都不做 |
| `continue` | 当前循环这一轮 | 跳过本轮后续代码，直接下一轮 |
| `break` | 当前这一层循环 | 立刻结束这层循环 |
| `return` | 整个函数 | 直接结束函数并返回结果 |

### 3.1 `break`：立刻结束当前这一层循环

```python
for n in range(10):
  if n == 3:
    break
  print(n)
```

### 3.1.1 `break` 能跳出几层循环

**一句话先懂**：只跳出当前这一层。

```python
for i in range(3):
  for j in range(3):
    if j == 1:
      break
    print(i, j)
```

如果你要“跳出所有嵌套循环”，常见办法是：
- 写函数，然后 `return`
- 用标记变量配合外层判断
- 重构逻辑，避免过深嵌套

### 3.2 `continue`：跳过本轮剩余代码，进入下一轮

```python
for n in range(5):
  if n == 2:
    continue
  print(n)
```

### 3.3 `pass`：什么都不做，只是语法占位

```python
for n in range(3):
  if n == 1:
    pass
  print(n)
```

### 3.4 `continue` 和 `pass` 的本质区别

- `continue`：会直接进入下一轮循环，本轮后面的代码不执行
- `pass`：只是“占个位置”，程序还会继续往下执行

一个高频输出题：

```python
for i in range(5):
  if i == 2:
    continue
  if i == 4:
    break
  print(i, end=' ')
```

输出是：

```text
0 1 3 
```

---

## 四、`for-else` 和 `while-else`：很多人第一次见都会懵

### 4.1 `for-else` 的执行规则

**一句话先懂**：如果循环是“正常跑完”的，`else` 就执行；如果中途 `break` 了，`else` 就不执行。

```python
for n in [1, 2, 3]:
  print(n)
else:
  print('正常结束')
```

### 4.2 被 `break` 打断时，`else` 不执行

```python
for n in [1, 2, 3]:
  if n == 2:
    break
  print(n)
else:
  print('正常结束')
```

### 4.3 `while-else` 也是同样规则

```python
count = 3
while count > 0:
  print(count)
  count -= 1
else:
  print('while 正常结束')
```

### 4.4 它最常见的实际用途

搜索场景特别常见：
- 找到了就 `break`
- 没找到，循环正常结束后进 `else`

```python
nums = [1, 3, 5, 8]
for n in nums:
  if n % 2 == 0:
    print('找到偶数:', n)
    break
else:
  print('没有找到偶数')
```

---

## 五、遍历时拿到“索引 + 元素”

### 5.1 推荐写法：`enumerate()`

```python
names = ['A', 'B', 'C']
for index, name in enumerate(names):
  print(index, name)
```

如果你想从 1 开始编号：

```python
for index, name in enumerate(names, start=1):
  print(index, name)
```

**一句话先懂**：同时要序号和元素时，优先想到 `enumerate()`。

---

## 六、`while True`：能写，但一定要想清楚退出条件

### 6.1 最常见的用法

```python
while True:
  text = input('请输入 q 退出: ')
  if text == 'q':
    break
```

### 6.2 为什么它容易写出死循环

因为：
- 条件本身永远是真
- 如果你忘了写退出条件，或者退出条件永远达不到，循环就停不下来

所以 `while True` 最重要的不是“能不能写”，而是“退出逻辑是否清楚”。

---

## 七、本章高频问法速记

- **`for` 和 `while` 的核心区别**：一个更适合遍历现成对象，一个更适合按条件持续执行。
- **`range()` 的三种形式**：`range(stop)`、`range(start, stop)`、`range(start, stop, step)`。
- **`range()` 是列表吗**：不是，是 `range` 对象，按需生成，内存更省。
- **怎么生成 `[5,4,3,2,1]`**：`list(range(5, 0, -1))`。
- **`break` 能跳出几层循环**：只跳出当前这一层。
- **`continue` 和 `pass` 的区别**：`continue` 跳过本轮剩余代码，`pass` 只是占位。
- **`for-else` / `while-else` 的 `else` 什么时候执行**：循环正常结束时执行，被 `break` 打断就不执行。
- **同时遍历索引和元素推荐用什么**：`enumerate()`。
- **`while True` 常见退出方式是什么**：配合 `break`。

---

**本章小结**：循环这一章最重要的不是背关键词，而是抓住“什么时候遍历对象、什么时候按条件循环、什么时候提前结束、什么时候跳过当前轮”。把 `for` / `while`、`range()`、`break/continue/pass`、`for-else/while-else` 这些核心规则连起来之后，绝大多数遍历和控制流题就都能看懂、写对。 
