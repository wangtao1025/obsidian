# 内置函数

← [语法手册总览](/python/python语法手册) | [上一章 格式化与输出](/python/python语法手册-04-格式化与输出) | [下一章 逻辑与真值](/python/python语法手册-06-逻辑与真值)

---

**本章对应自测卷**：[内置函数（共 19 题）](/python/Python核心语法自测试卷#六内置函数-共-10-题)
**学完能做什么**：熟练使用 `len()`、`sum()`、`max()`、`min()`、`reversed()`、`sorted()`、`enumerate()`、`zip()`、`any()`、`all()` 解决计数、求和、排序、并行遍历、批量判断等高频问题。  
**小白注意**：① `sorted()` 返回新列表，不改原数据。② `reversed()` 返回迭代器，不是列表。③ `max()` / `min()` 空序列默认会报错。④ `any()` 和 `all()` 判断的是“真值”，不只是 `True` 和 `False` 两个字面量。

---

## 一、先理解什么叫“内置函数”

**一句话先懂**：内置函数就是 Python 已经提前准备好的函数，不用 `import`，拿来就能用。

比如：

```python
print(len('hello'))
print(sum([1, 2, 3]))
print(max(10, 20, 30))
```

这些函数的共同特点：
- Python 自带
- 使用频率很高
- 用来处理最基础、最通用的任务

**开发视角**：
- 内置函数往往比你自己手写循环更简洁
- 也更接近 Python 的常见写法
- 看到需求时，先想“有没有现成内置函数”，通常能少写很多代码

---

## 二、计数、求和、最大最小：最基础的一组函数

### 2.1 `len()`：求长度

**一句话先懂**：`len()` 返回“有多少个元素”。

```python
print(len('hello'))
print(len([10, 20, 30]))
print(len((1, 2)))
print(len({'a': 1, 'b': 2}))
print(len({1, 2, 3}))
```

### 2.1.1 `len()` 分别返回什么

- 字符串：字符个数
- 列表 / 元组：元素个数
- 集合：去重后的元素个数
- 字典：**键的个数**

```python
d = {'name': 'Tom', 'age': 18}
print(len(d))  # 2
```

**注意**：字典的 `len(d)` 不是“值的个数”，也不是“键值对占内存多少”，而是键的数量。

### 2.1.2 什么对象不能用 `len()`

```python
# len(42)     # TypeError
# len(3.14)   # TypeError
```

整数、浮点数这种“单个数值”没有长度概念。

### 2.2 `sum()`：对数值求和

**一句话先懂**：`sum()` 把一组数字加起来。

```python
print(sum([1, 2, 3, 4]))
print(sum((10, 20, 30)))
print(sum(range(5)))
```

**标准语法**：

```python
sum(iterable, start=0)
```

- `iterable`：一组可迭代的数字
- `start`：从哪个数开始累加，默认是 `0`

```python
print(sum([1, 2, 3], 10))  # 16
```

### 2.2.1 `start` 参数到底是什么意思

`sum([1, 2, 3], 10)` 相当于：

```python
10 + 1 + 2 + 3
```

所以结果是 `16`。

### 2.2.2 为什么 `sum()` 通常不直接拿来拼字符串或列表

```python
# sum(['a', 'b', 'c'])   # TypeError
# sum([[1], [2], [3]])   # TypeError
```

因为 `sum()` 的设计目标主要是处理**数字累加**。  
拼字符串通常用 `''.join(...)`，拼列表更常见的是：
- 循环 `extend()`
- 列表推导式
- 其他更明确的写法

### 2.2.3 一个非常常见的场景：求平均值

```python
scores = [85, 92, 78, 95, 60]
avg = sum(scores) / len(scores)
print(avg)
```

### 2.2.4 为什么 `sum(student['score'] >= 60 for student in students)` 可行

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 55},
  {'name': 'C', 'score': 90}
]

passed = sum(student['score'] >= 60 for student in students)
print(passed)  # 2
```

这是因为布尔值在 Python 里可以参与数值运算：
- `True` 当成 `1`
- `False` 当成 `0`

所以这行代码本质上是在数“有多少个条件成立”。

这在统计：
- 及格人数
- 命中次数
- 满足条件的记录数

时非常常见。

<span id="53-max-和-min-最大值与最小值"></span>
### 2.3 `max()` 和 `min()`：最大值与最小值

**一句话先懂**：`max()` 取最大，`min()` 取最小。

```python
print(max([85, 92, 78, 95, 60]))  # 95
print(min([85, 92, 78, 95, 60]))  # 60
print(max(1, 5, 3))               # 5
```

### 2.3.1 `key` 参数：按“规则”比较

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 95},
  {'name': 'C', 'score': 75}
]

best = max(students, key=lambda x: x['score'])
print(best)  # {'name': 'B', 'score': 95}
```

**一句话先懂**：`key` 不是改变元素，而是告诉 Python“按什么规则去比”。

上面这段代码里：
- 元素本身是字典
- 字典彼此不能直接按你想要的“分数高低”比较
- 所以用 `key=lambda x: x['score']` 指定“按分数字段比较”

### 2.3.2 `max()` / `min()` 返回的是什么

返回的是：**原可迭代对象里的某个元素本身**，不是索引。

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 95}
]

result = max(students, key=lambda x: x['score'])
print(result)  # {'name': 'B', 'score': 95}
```

### 2.3.3 空序列为什么会报错

```python
# max([])
# min([])
```

默认情况下，Python 不知道“空数据里的最大值是谁”，所以会抛出 `ValueError`。

### 2.3.4 `default` 参数：空数据时给一个兜底值

```python
print(max([], default=0))   # 0
print(min([], default=0))   # 0
```

**一句话先懂**：`default` 主要用来处理“可迭代对象可能为空”的情况。

这在下面场景很实用：
- 过滤后可能一条记录都没有
- 用户输入可能为空
- 批处理结果有可能是空列表

### 2.3.5 极差怎么写

```python
scores = [85, 92, 78, 95, 60]
print(max(scores) - min(scores))  # 35
```

---

## 三、顺序、排序、编号：遍历时最常用的一组函数

### 3.1 `reversed()`：反向遍历，但不改原数据

**一句话先懂**：`reversed(seq)` 返回一个“倒着遍历”的迭代器，不会修改原序列。

```python
nums = [1, 2, 3]
result = reversed(nums)
print(result)
print(list(result))  # [3, 2, 1]
print(nums)          # [1, 2, 3]
```

### 3.1.1 为什么很多人以为它返回的是列表

因为大家经常会写：

```python
print(list(reversed([1, 2, 3])))
```

但真正返回列表的是外层的 `list()`，不是 `reversed()` 本身。

### 3.1.2 `reversed()` 和切片 `[::-1]` 的区别

```python
nums = [1, 2, 3]
print(list(reversed(nums)))
print(nums[::-1])
```

两者都能得到反向结果，但：
- `reversed(nums)`：得到迭代器，适合遍历
- `nums[::-1]`：直接得到一个新列表（或新字符串、新元组切片结果）

### 3.2 `sorted()`：排序并返回新列表

**一句话先懂**：`sorted()` 不改原数据，而是返回一个新的排好序的列表。

```python
nums = [3, 1, 4, 2]
new_nums = sorted(nums)
print(new_nums)  # [1, 2, 3, 4]
print(nums)      # [3, 1, 4, 2]
```

### 3.2.1 `sorted()` 可以排哪些对象

```python
print(sorted([3, 1, 2]))
print(sorted((3, 1, 2)))
print(sorted('hello'))
```

只要是可迭代对象，通常都可以交给 `sorted()`，但返回值总是**列表**。

### 3.2.2 升序、降序与 `reverse=True`

```python
nums = [3, 1, 4, 2]
print(sorted(nums))
print(sorted(nums, reverse=True))
```

- 默认升序
- `reverse=True` 表示降序

### 3.2.3 `key` 参数：排序规则

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 95},
  {'name': 'C', 'score': 75}
]

print(sorted(students, key=lambda x: x['score']))
print(sorted(students, key=lambda x: x['score'], reverse=True))
```

### 3.2.4 `sorted()` 和 `.sort()` 的区别

| 对比项 | `sorted(iterable)` | `list.sort()` |
| --- | --- | --- |
| 是否改原数据 | 不改 | 改原列表 |
| 返回值 | 新列表 | `None` |
| 适用对象 | 各类可迭代对象 | 只有列表 |

更详细的说明见 `Python/docs/python/python语法手册-02-内置数据结构.md:243`。

### 3.2.5 按成绩降序排，并取前 3 名

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 95},
  {'name': 'C', 'score': 75},
  {'name': 'D', 'score': 91}
]

top3 = sorted(students, key=lambda x: x['score'], reverse=True)[:3]
print(top3)
```

这行代码是自测卷里的高频综合题：
- 先排序
- 再切片取前三

### 3.3 `enumerate()`：给每个元素配上序号

**一句话先懂**：`enumerate()` 会把“索引”和“元素”打包在一起。

```python
letters = ['a', 'b', 'c']
print(list(enumerate(letters)))
# [(0, 'a'), (1, 'b'), (2, 'c')]
```

### 3.3.1 `start` 参数

```python
letters = ['a', 'b', 'c']
print(list(enumerate(letters, start=1)))
# [(1, 'a'), (2, 'b'), (3, 'c')]
```

**一句话先懂**：`start=1` 表示编号从 1 开始，而不是默认的 0。

### 3.3.2 为什么 `enumerate()` 比自己维护计数器更自然

```python
names = ['Tom', 'Alice', 'Bob']
for index, name in enumerate(names, start=1):
  print(index, name)
```

它适合：
- 打印菜单序号
- 遍历带行号的数据
- 排行榜输出
- “索引 + 元素”同时需要的场景

### 3.4 `zip()`：把多个序列按位置打包

**一句话先懂**：`zip()` 会把多个可迭代对象按相同位置配成一组。

```python
nums = [1, 2]
chars = ['a', 'b', 'c']
print(list(zip(nums, chars)))
# [(1, 'a'), (2, 'b')]
```

### 3.4.1 为什么不会报错，而是按最短序列截断

因为 `zip()` 的规则就是：
- 走到最短的那个序列结束时就停
- 后面多出来的元素直接忽略

这就是上例里 `'c'` 没有出现在结果中的原因。

### 3.4.2 `zip()` 的三个高频场景

#### 并行遍历

```python
names = ['Tom', 'Alice']
scores = [90, 95]

for name, score in zip(names, scores):
  print(name, score)
```

#### 快速构造字典

```python
keys = ['name', 'age']
values = ['Tom', 18]
print(dict(zip(keys, values)))
```

#### 行列转换的基础

`zip()` 也是很多“矩阵转置”“列转行”写法的基础。

---

## 四、批量条件判断：`any()` 和 `all()`

### 4.1 `any()`：只要有一个为真就行

```python
print(any([0, '', False, 3]))  # True
```

因为里面有 `3`，它的真值是 `True`，所以整个结果就是 `True`。

### 4.2 `all()`：必须全部都为真

```python
print(all([1, 'x', True]))  # True
print(all([1, 0, True]))    # False
```

因为第二行里有 `0`，它的真值是 `False`，所以结果是 `False`。

### 4.3 它们判断的是“真值”，不是只认 `True` / `False`

下面这些值在布尔上下文里通常是假：
- `0`
- `0.0`
- `''`
- `[]`
- `{}`
- `set()`
- `None`
- `False`

所以：

```python
print(any(['', [], 0, None]))
print(all([1, 'ok', [1]]))
```

### 4.4 生成器表达式是最常见搭配

```python
scores = [88, 92, 76]
print(all(score >= 60 for score in scores))
print(any(score >= 90 for score in scores))
```

这类写法特别适合表达：
- 是否全部及格
- 是否有人优秀
- 是否存在异常值
- 是否所有记录都合法

---

## 五、本章高频一行代码

### 5.1 列表平均分

```python
scores = [85, 92, 78, 95, 60]
avg = sum(scores) / len(scores)
```

### 5.2 字典列表里取最高分学生

```python
students = [{'name': 'A', 'score': 80}, {'name': 'B', 'score': 95}]
best = max(students, key=lambda x: x['score'])
```

### 5.3 按成绩从高到低排序

```python
students = [{'name': 'A', 'score': 80}, {'name': 'B', 'score': 95}]
result = sorted(students, key=lambda x: x['score'], reverse=True)
```

### 5.4 取前 3 名

```python
top3 = sorted(students, key=lambda x: x['score'], reverse=True)[:3]
```

### 5.5 计算及格率

```python
students = [
  {'name': 'A', 'score': 80},
  {'name': 'B', 'score': 55},
  {'name': 'C', 'score': 90}
]

rate = sum(student['score'] >= 60 for student in students) / len(students)
```

如果要直接显示百分比：

```python
print(f'{rate:.1%}')
```

---

## 六、本章高频问法速记

- **`len(d)` 对字典返回什么**：返回键的个数。
- **`sum([1, 2, 3], 10)` 为什么是 16**：因为 `start=10`，相当于 `10 + 1 + 2 + 3`。
- **`max()` / `min()` 的 `key` 是做什么的**：指定比较规则。
- **`max([], default=0)` 为什么不会报错**：因为为空时会直接返回 `default`。
- **`reversed()` 会不会改原列表**：不会，它返回的是反向迭代器。
- **`sorted()` 和 `.sort()` 的区别**：前者返回新列表，后者原地排序且返回 `None`。
- **`enumerate(..., start=1)` 的作用**：从 1 开始给元素编号。
- **`zip()` 为什么不会因长度不等报错**：它会按最短序列截断。
- **`any()` 和 `all()` 的区别**：一个“至少一个真”，一个“必须全部真”。
- **为什么 `sum(condition for x in data)` 可统计个数**：因为 `True` 会按 `1`、`False` 会按 `0` 参与求和。

---

**本章小结**：第五章最核心的目标，是把“循环里自己干的活”逐步交给更合适的内置函数：计数用 `len()`，求和用 `sum()`，极值用 `max()` / `min()`，排序用 `sorted()`，反向遍历用 `reversed()`，带编号遍历用 `enumerate()`，并行遍历用 `zip()`，批量条件判断用 `any()` / `all()`。当你开始自然地用这些函数写代码时，Python 风格就真正出来了。
