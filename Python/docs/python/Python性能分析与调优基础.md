# Python 性能分析与调优基础

← [Python 首页](/python/) | [语法手册总览](/python/python语法手册)

---

**适合什么时候看**：你已经会写 Python，但代码变慢时只会凭感觉乱改，或者想知道 `timeit`、`cProfile`、`pstats`、`tracemalloc` 这些工具该怎么定位问题时。  
**学完能做什么**：能用“先测量、再定位、再优化”的方式分析性能问题，而不是靠拍脑袋改代码。

---

## 一、先建立性能分析最重要的原则

### 1.1 一句话先懂

**不要先凭感觉优化，要先测量。**

很多时候真正慢的地方并不是你以为的地方。

### 1.2 性能问题通常分两类

- **时间性能**：跑得慢
- **空间性能**：占内存大

### 1.3 优化顺序应该是什么

1. 明确慢在哪里
2. 测量热点在哪里
3. 选择合适优化手段
4. 再次验证是否真的变快

---

## 二、`timeit`：做小片段性能对比

### 2.1 它适合什么

适合：
- 比较两段小代码谁更快
- 做微基准测试

### 2.2 最简单例子

```python
import timeit

print(timeit.timeit("'-'.join(['a', 'b', 'c'])", number=100000))
print(timeit.timeit("'a' + '-' + 'b' + '-' + 'c'", number=100000))
```

### 2.3 使用时要注意什么

- 它更适合“小而纯”的片段
- 不要把 I/O、网络、数据库延迟当成纯 `timeit` 对象
- 结果要多次比较，不要只看一次

---

## 三、`cProfile`：看整个程序的热点函数

### 3.1 一句话先懂

`cProfile` 更适合分析：
- 一个函数 / 一个程序整体里
- 到底哪些函数最耗时间

### 3.2 最简单写法

```python
import cProfile


def main():
  total = 0
  for i in range(100000):
    total += i * i
  return total

cProfile.run('main()')
```

### 3.3 输出里重点看什么

通常关注：
- 调用了多少次
- 总耗时
- 累计耗时

这样你能知道：
- 是谁慢
- 是因为调用太多次，还是单次太贵

---

## 四、`pstats`：整理 `cProfile` 输出

### 4.1 为什么需要它

原始 `cProfile` 输出可能比较乱。
`pstats` 可以帮助你：
- 排序
- 筛选
- 只看最热点的函数

### 4.2 基本用法

```python
import cProfile
import pstats

profiler = cProfile.Profile()
profiler.enable()

# 你的代码
for i in range(100000):
  i * i

profiler.disable()
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative').print_stats(10)
```

---

## 五、`tracemalloc`：看内存分配

### 5.1 它解决什么问题

如果你怀疑：
- 某段代码内存占用异常
- 某次改动让内存明显上涨

可以先用 `tracemalloc` 看内存分配情况。

### 5.2 最简单例子

```python
import tracemalloc

tracemalloc.start()

data = [str(i) for i in range(100000)]
current, peak = tracemalloc.get_traced_memory()
print(current, peak)
tracemalloc.stop()
```

### 5.3 它适合什么场景

- 观察当前 / 峰值内存
- 辅助定位内存热点

---

## 六、除了工具，还要看算法和数据结构

### 6.1 为什么不是所有性能问题都该靠“语法优化”

因为很多慢，不是写法小细节慢，而是：
- 算法复杂度不对
- 数据结构选错

### 6.2 常见例子

- 频繁成员判断用 `list`，可能不如 `set`
- 反复字符串拼接，可能不如 `''.join()`
- 不必要的深拷贝会很重
- 重复计算结果却没缓存

### 6.3 优化里最常见的高收益方向

- 先减少无意义工作
- 再换更合适的数据结构
- 再考虑微优化

---

## 七、`dis` 为什么偶尔也会出现在性能分析里

### 7.1 它不是主力性能工具

但它可以帮助你理解：
- 某段语法最终大概变成什么字节码
- 某些表达式为什么会多一些操作

### 7.2 更适合什么场景

- 原理分析
- 教学演示
- 验证某些细节直觉

而不是日常第一选择。

---

## 八、性能调优的一个推荐流程

### 8.1 第一步：先确认问题存在

- 是真的慢，还是体感慢
- 是时间慢，还是内存高

### 8.2 第二步：选合适工具测量

- 小片段：`timeit`
- 整体热点：`cProfile` + `pstats`
- 内存：`tracemalloc`

### 8.3 第三步：找根因

- 算法问题
- 数据结构问题
- I/O 问题
- 并发模型不匹配
- 不必要拷贝 / 序列化 / 重复计算

### 8.4 第四步：优化后再测

不要只改，不验证。

---

## 九、本章高频问法速记

- **分析 Python 性能常用什么工具**：`timeit`、`cProfile`、`pstats`、`tracemalloc`。
- **`timeit` 适合什么**：小代码片段微基准。
- **`cProfile` 适合什么**：找程序级热点函数。
- **内存问题看什么**：`tracemalloc`。
- **性能优化最重要的原则是什么**：先测量，再优化。

---

**本章小结**：性能分析最怕“感觉优化”。真正有效的方法是：先量化，再定位，再调整，再验证。把 `timeit`、`cProfile`、`pstats`、`tracemalloc` 这几样工具用起来，你就能从“觉得好像慢”升级到“知道到底哪里慢、为什么慢、优化后有没有真的变好”。
