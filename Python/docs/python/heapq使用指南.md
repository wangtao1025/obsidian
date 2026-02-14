# 课程笔记：heapq 使用指南

来源课程：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）heapq 章节。以下为堆的概念、Python `heapq` 核心函数、手写最小堆实现及实际应用示例的整理。

---

## 一、什么是堆？

### 1.1 生活中的例子

想象你在医院急诊室工作，病人按病情紧急程度排队：最紧急的（如心脏病发作）先治疗，普通感冒可稍后。这就是**优先队列**：按优先级处理，而非先来后到。**堆（Heap）** 是一种能高效实现优先队列的数据结构。

### 1.2 堆的定义

堆是一种特殊的二叉树，满足：

- **最小堆**：父节点值 ≤ 子节点值，最小元素在根节点（索引 0）。
- **最大堆**：父节点值 ≥ 子节点值，最大元素在根节点。

**注意**：Python 的 `heapq` 实现的是**最小堆**。

### 1.3 为什么需要堆？

若有一个包含 100 万个数字的列表，需要经常：找最小、删最小、添加新数字。

| 操作         | 普通列表 | 堆       |
|--------------|----------|----------|
| 找最小       | O(n)     | O(1)     |
| 删最小       | O(n)     | O(log n) |
| 添加         | O(1)     | O(log n) |

数据量大时，堆的优势明显。

### 1.4 堆的特点

- 最小元素总在根节点，可直接用 `heap[0]` 访问。
- 插入与删除最小元素为 O(log n)。
- 原地操作，内存效率高。
- 只保证父节点小于子节点，**不保证**兄弟节点有序。

---

## 二、前置知识

### 2.1 Python 列表基础

堆在 Python 中用列表实现，需熟悉列表基本操作。

```python
my_list = []
my_list.append(1)
my_list.append(2)
my_list.append(3)
print(f"列表内容: {my_list}")
print(f"第一个元素: {my_list[0]}")
last_item = my_list.pop()
print(f"删除的元素: {last_item}, 删除后: {my_list}")
```

### 2.2 元组和比较

`heapq` 常用元组存「优先级 + 数据」，元组按第一个元素比较。

```python
tuple1 = (3, "任务A")
tuple2 = (1, "任务B")
tuple3 = (2, "任务C")
print(tuple1 < tuple2)  # False，因 3 > 1
print(tuple2 < tuple3)  # True，因 1 < 2
sorted_tuples = sorted([tuple1, tuple2, tuple3])
print(sorted_tuples)
```

---

## 三、heapq 核心函数

### 3.1 添加元素：heappush

`heapq.heappush(heap, item)`：将元素入堆并保持堆性质。

```python
import heapq
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
heapq.heappush(heap, 2)
print(heap)
print("最小元素（堆顶）:", heap[0])
```

### 3.2 弹出最小元素：heappop

`heapq.heappop(heap)`：弹出并返回最小元素，保持堆性质。

```python
import heapq
heap = [1, 2, 4, 3]
min_item = heapq.heappop(heap)
print("弹出的最小元素:", min_item)
print("弹出后的堆:", heap)
print("新的最小元素:", heap[0])
```

### 3.3 将列表转为堆：heapify

`heapq.heapify(x)`：原地将列表变为堆，O(n)。

```python
import heapq
data = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(data)
print("转换后的堆:", data)
print("最小元素:", data[0])
for i in range(3):
    print(heapq.heappop(data))
```

### 3.4 添加并弹出：heappushpop

`heapq.heappushpop(heap, item)`：先 push 再 pop 最小，比先 push 再 pop 更高效。

```python
import heapq
heap = [2, 3, 4]
result = heapq.heappushpop(heap, 1)
print("添加 1 后弹出的元素:", result)
result = heapq.heappushpop(heap, 5)
print("添加 5 后弹出的元素:", result)
```

### 3.5 弹出并添加：heapreplace

`heapq.heapreplace(heap, item)`：先 pop 最小再 push。**要求堆非空**。

```python
import heapq
heap = [2, 3, 4]
result = heapq.heapreplace(heap, 1)
print("弹出的最小元素:", result)
```

区别：`heappushpop` 先加后弹；`heapreplace` 先弹后加。

### 3.6 找最大的 n 个：nlargest

`heapq.nlargest(n, iterable[, key])`：返回前 n 个最大元素，从大到小。

```python
import heapq
data = [3, 1, 4, 1, 5, 9, 2, 6]
print(heapq.nlargest(3, data))
students = [("张三", 85), ("李四", 92), ("王五", 78), ("赵六", 95)]
top_2 = heapq.nlargest(2, students, key=lambda x: x[1])
print(top_2)
```

### 3.7 找最小的 n 个：nsmallest

`heapq.nsmallest(n, iterable[, key])`：返回前 n 个最小元素，从小到大。

```python
import heapq
data = [3, 1, 4, 1, 5, 9, 2, 6]
print(heapq.nsmallest(3, data))
products = [("苹果", 5.5), ("香蕉", 3.2), ("橙子", 4.8)]
cheapest_2 = heapq.nsmallest(2, products, key=lambda x: x[1])
print(cheapest_2)
```

---

## 四、手写最小堆实现

### 4.1 push（上浮）

```python
class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, value):
        self.heap.append(value)
        self._sift_up(len(self.heap) - 1)

    def _sift_up(self, index):
        while index > 0:
            parent = (index - 1) // 2
            if self.heap[index] < self.heap[parent]:
                self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
                index = parent
            else:
                break

    def peek(self):
        return self.heap[0] if self.heap else None

    def __getitem__(self, index):
        return self.heap[index]

    def __repr__(self):
        return str(self.heap)

heap = MinHeap()
heap.push(3)
heap.push(1)
heap.push(4)
heap.push(2)
print(heap)
print("最小元素:", heap[0])
```

### 4.2 pop（下沉）

在 `MinHeap` 中增加 `pop` 与 `_sift_down`：

```python
def pop(self):
    if not self.heap:
        return None
    min_value = self.heap[0]
    last_value = self.heap.pop()
    if self.heap:
        self.heap[0] = last_value
        self._sift_down(0)
    return min_value

def _sift_down(self, index):
    size = len(self.heap)
    while True:
        left = 2 * index + 1
        right = 2 * index + 2
        smallest = index
        if left < size and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < size and self.heap[right] < self.heap[smallest]:
            smallest = right
        if smallest == index:
            break
        self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
        index = smallest
```

---

## 五、实际应用示例

### 5.1 优先任务调度

```python
import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0

    def push(self, item, priority):
        heapq.heappush(self._queue, (priority, self._index, item))
        self._index += 1

    def pop(self):
        return heapq.heappop(self._queue)[-1]

    def is_empty(self):
        return len(self._queue) == 0

pq = PriorityQueue()
pq.push('处理紧急邮件', 1)
pq.push('写报告', 3)
pq.push('参加会议', 2)
pq.push('整理文档', 4)
while not pq.is_empty():
    print(pq.pop())
```

### 5.2 合并多个有序序列

```python
import heapq

def merge_sorted_arrays(arrays):
    heap = []
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(heap, (arr[0], i, 0))
    result = []
    while heap:
        val, arr_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        if elem_idx + 1 < len(arrays[arr_idx]):
            next_val = arrays[arr_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, arr_idx, elem_idx + 1))
    return result

arrays = [[1, 3, 5], [2, 4, 6], [0, 7, 8]]
print(merge_sorted_arrays(arrays))
```

### 5.3 Top-K 问题

```python
import heapq

def find_top_k(data, k):
    heap = []
    for x in data:
        if len(heap) < k:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)
    return sorted(heap, reverse=True)
```

### 5.4 最大堆技巧

`heapq` 只有最小堆，可用**存负值**实现最大堆：

```python
import heapq
max_heap = []
for x in [10, 5, 20, 15]:
    heapq.heappush(max_heap, -x)
max_item = -heapq.heappop(max_heap)
print("最大元素:", max_item)
```

### 5.5 事件调度器

按时间戳顺序处理事件：

```python
import heapq

class EventScheduler:
    def __init__(self):
        self.events = []
        self.current_time = 0

    def add_event(self, delay, event_id, description):
        event_time = self.current_time + delay
        heapq.heappush(self.events, (event_time, event_id, description))

    def process_events(self, until_time):
        while self.events and self.events[0][0] <= until_time:
            event_time, event_id, description = heapq.heappop(self.events)
            self.current_time = event_time
            print(f"[{self.current_time}] 执行 {event_id}: {description}")
```

---

## 六、常见问题与注意事项

### 6.1 堆属性维护

**不要直接改堆内元素**，会破坏堆性质。应先删再加，或用 `heapreplace`。

### 6.2 相同优先级

多个元素同优先级时，按插入顺序（元组第二项可用 index 保证）。自定义顺序可用 `(priority, index, item)`。

### 6.3 空堆处理

对空堆 `heappop` 或 `heapreplace` 会 `IndexError`，先判断 `if heap:`。

### 6.4 性能

- 只求 Top-K 时，`nlargest`/`nsmallest` 比整体排序更合适。
- 频繁取最值用堆比用列表高效。
- 堆为原地操作，省空间。

---

## 七、时间复杂度总结

| 操作              | 时间复杂度 | 说明           |
|-------------------|------------|----------------|
| heappush          | O(log n)   | 插入           |
| heappop           | O(log n)   | 弹出最小       |
| heapify           | O(n)       | 列表转堆       |
| 查看最小元素      | O(1)       | 访问 heap[0]   |
| nlargest(k, n)    | O(n log k) | 最大 k 个      |
| nsmallest(k, n)   | O(n log k) | 最小 k 个      |

n 为堆大小，k 为所求个数。Top-K 且 k ≪ n 时，堆方案优于全排序。

---

## 八、总结

- 堆：最小堆根为最小，插入/删最小 O(log n)，适合优先队列与 Top-K。
- 核心：`heappush`、`heappop`、`heapify`、`heappushpop`、`heapreplace`、`nlargest`、`nsmallest`。
- 应用：任务调度、多路归并、Top-K、最大堆（负值）、事件调度。
- 注意：不直接改堆内元素、空堆判断、同优先级用 index 区分。

---

**相关文档**：[HNSW](/ai/AI课程-HNSW)（向量检索中用堆） · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [heapq（课程原文）](https://rag.docs-hub.com/html/heapq.html)

*（本文档为课程 heapq 章节整理；课程内与 Generic、HNSW 等章节并列，属 Python 标准库/数据结构部分。）*
