# Python 迭代模型与生成器

← [Python 首页](/python/) | [语法手册总览](/python/python语法手册)

---

**适合什么时候看**：已经会 `for` 循环，但对 iterable、iterator、generator 这三个词老是混，或者不知道 `iter()`、`next()`、`yield` 到底是什么时。  
**学完能做什么**：能分清可迭代对象、迭代器、生成器的关系，知道文件对象为什么能一行一行读，也能解释“为什么生成器更省内存”。

---

## 一、先记住三句话

- **Iterable（可迭代对象）**：可以被 `for` 遍历的对象。
- **Iterator（迭代器）**：能不断产出下一个值的对象。
- **Generator（生成器）**：是一种“写起来更方便”的迭代器。

---

## 二、什么是 Iterable（可迭代对象）

### 2.1 一句话先懂

只要一个对象能够被 `for` 循环遍历，我们通常就说它是可迭代对象。

### 2.2 常见例子

- `list`
- `tuple`
- `str`
- `dict`
- `set`
- `range`
- 文件对象
- 生成器对象

```python
for ch in 'Python':
  print(ch)
```

### 2.3 判断方式

开发里最常见的两个角度：
- 能不能交给 `for`
- 能不能交给 `iter()`

```python
nums = [1, 2, 3]
print(iter(nums))
```

如果 `iter(obj)` 能成功得到一个迭代器，通常就说明它是可迭代对象。

---

## 三、什么是 Iterator（迭代器）

### 3.1 一句话先懂

迭代器是一个“记得住遍历进度”的对象，每次取一个，下次接着上次继续。

### 3.2 迭代器最重要的两个动作

- `iter(it)`：返回迭代器自身
- `next(it)`：取下一个值

```python
nums = [10, 20, 30]
it = iter(nums)

print(next(it))
print(next(it))
print(next(it))
```

### 3.3 没有下一个值会怎样

会抛出：

```python
StopIteration
```

这也是 `for` 循环在底层结束遍历的重要信号。

### 3.4 为什么说“不是所有可迭代对象都是迭代器”

例如列表：
- 它是可迭代对象
- 但它本身通常不是“会自己记住当前迭代进度的那个对象”

你要通过 `iter(list_obj)` 先得到一个迭代器。

---

## 四、什么是 Generator（生成器）

### 4.1 一句话先懂

生成器是一种特殊的迭代器，重点是：
- 不一次性把所有结果都准备好
- 而是“需要一个，算一个”

### 4.2 生成器函数：`yield`

只要函数里出现 `yield`，它调用后得到的通常就是生成器对象。

```python
def count_up_to(n):
  current = 1
  while current <= n:
    yield current
    current += 1

for x in count_up_to(3):
  print(x)
```

### 4.3 生成器表达式

```python
gen = (x * x for x in range(5))
print(gen)
print(list(gen))
```

它长得像列表推导式，但：
- 列表推导式是 `[]`
- 生成器表达式是 `()`

### 4.4 为什么生成器更省内存

因为它不是一上来就把所有结果都放进内存，而是边迭代边产生。

所以它特别适合：
- 大数据流
- 大文件处理
- 惰性计算

---

## 五、三者之间的关系到底怎么说

### 5.1 最稳的关系图

```text
Generator 是 Iterator 的一种
Iterator 通常也是 Iterable
Iterable 不一定是 Iterator
```

### 5.2 用列表举个最典型的例子

```python
nums = [1, 2, 3]
```

- `nums`：可迭代对象
- `iter(nums)` 的结果：迭代器
- `yield` 写出来的对象：生成器，也是迭代器

---

## 六、`for` 循环底层大概做了什么

### 6.1 一句话理解

`for x in obj:` 底层大致相当于：
- 先拿 `iter(obj)`
- 然后不断 `next()`
- 直到捕获 `StopIteration`

### 6.2 简化版示意

```python
it = iter(obj)
while True:
  try:
    x = next(it)
    print(x)
  except StopIteration:
    break
```

这就是为什么：
- 只要对象符合迭代协议，`for` 就能工作

---

## 七、文件对象为什么适合读大文件

### 7.1 文件对象本身就是可迭代对象

```python
with open('big.txt', 'r', encoding='utf-8') as file:
  for line in file:
    print(line)
```

这样读的好处是：
- 一行一行处理
- 不需要一次把整个文件都读进内存

### 7.2 为什么不推荐直接 `read()` 大文件

因为 `read()` 往往会把全部内容一次性读入内存。
如果文件很大，就容易内存占用高。

### 7.3 更适合的方式

- `for line in file`
- 分块 `read(size)`

---

## 八、如何自己实现一个简单迭代器

```python
class Counter:
  def __init__(self, limit):
    self.current = 0
    self.limit = limit

  def __iter__(self):
    return self

  def __next__(self):
    if self.current >= self.limit:
      raise StopIteration
    self.current += 1
    return self.current
```

```python
for x in Counter(3):
  print(x)
```

这说明：
- 迭代器不是神秘黑盒
- 只是遵守了一套协议

---

## 九、初学者最容易混淆的点

### 9.1 “能 `for`” 不等于“本身就是迭代器”

很多对象：
- 能被 `for`
- 但要先通过 `iter()` 变成真正的迭代器

### 9.2 生成器不是“普通返回多个值”

它不是一次返回完，而是每次恢复执行到下一个 `yield`。

### 9.3 生成器一旦消费完，不能自动回到开头

```python
gen = (x for x in range(3))
print(list(gen))
print(list(gen))
```

第二次通常就空了，因为已经被消费过。

### 9.4 `enumerate()`、`zip()`、`map()` 往往返回的也是惰性迭代结果

这也是 Python 常见的“节省中间结果”的设计思路。

---

## 十、本章高频问法速记

- **什么是 Iterable**：能被 `for` 遍历的对象。
- **什么是 Iterator**：能记住遍历进度，并通过 `next()` 逐个产出值的对象。
- **什么是 Generator**：一种通过 `yield` 创建的特殊迭代器。
- **三者关系是什么**：生成器属于迭代器，迭代器通常也可迭代，但可迭代对象不一定是迭代器。
- **为什么生成器省内存**：它按需生成，不一次性把结果全部放进内存。
- **为什么 `for line in file` 适合大文件**：文件对象可迭代，能一行一行处理。

---

**本章小结**：学迭代模型，核心不是背三个英文名，而是建立一个动作链：`iter()` 拿到迭代器，`next()` 取值，`StopIteration` 表示结束，`yield` 让你可以方便地写出惰性生成的数据流。理解了这套机制，`for`、生成器、大文件读取、很多内置函数都会自然串起来。
