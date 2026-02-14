# AI 课程：Python collections 模块

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **collections** 文档。`collections` 是 Python 内置的容器扩展，提供比 `dict`、`list`、`set`、`tuple` 更贴合场景的结构（计数器、默认字典、双端队列、命名元组等），无需安装，适合数据处理与 RAG 脚本。

---

## 1. collections 模块是什么？

**collections** 是 Python **内置**的容器扩展包，提供更适合特定场景的数据结构，例如：

- 计数器（统计出现次数）
- 带默认值的字典（避免 KeyError）
- 双端队列（两端 O(1) 增删）
- 带字段名的元组、有序字典、多字典链式查找等

无需额外安装，`import collections` 即可使用。

---

## 2. 如何开始使用？

随 Python 发布，Windows / macOS 均无需安装：

```python
import collections
print(collections.__file__)
print(collections.defaultdict)
```

---

## 3. 核心数据类型一览

### 3.1 Counter：统计出现次数

适合统计列表、字符串等可迭代对象中元素的频率。

```python
from collections import Counter

words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_counter = Counter(words)
print("词频：", word_counter)

char_counter = Counter("programming")
print("字符频率：", char_counter)
print("出现次数最多的 2 个词：", word_counter.most_common(2))

merged = Counter(["a", "b", "c"]) + Counter(["b", "c", "d"])
print("合并后的计数器：", merged)
```

### 3.2 defaultdict：带默认值的字典

缺失的 key 会自动用默认值（如 `list`、`int` 或自定义函数），避免 `KeyError`。

```python
from collections import defaultdict

list_dict = defaultdict(list)
list_dict["fruits"].append("apple")
list_dict["fruits"].append("banana")
print("列表默认值示例：", list_dict)

count_dict = defaultdict(int)
for word in ["apple", "banana", "apple", "orange"]:
    count_dict[word] += 1
print("整数默认值示例：", count_dict)

def fallback() -> str:
    return "未知"
custom_dict = defaultdict(fallback)
print("自定义默认值：", custom_dict["name"])
```

### 3.3 deque：双端队列

两端插入/删除均为 O(1)，适合队列、栈或滑动窗口。

```python
from collections import deque

dq = deque(["b", "c", "d"])
dq.append("e")
dq.appendleft("a")
print("添加元素后：", dq)

right = dq.pop()
left = dq.popleft()
print("弹出元素：", left, right)
print("当前队列：", dq)

dq.extend(["e", "f"])
dq.extendleft(["z"])
dq.rotate(2)
print("扩展并旋转后：", dq)
```

### 3.4 namedtuple：带字段名的元组

轻量数据结构，既可按下标访问又可按字段名访问。

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
Person = namedtuple("Person", "name age city")
p1 = Point(10, 20)
person = Person("Alice", 25, "Beijing")
print("坐标：", p1.x, p1.y)
print("人物信息：", person.name, person.age, person.city)
print("转换为字典：", person._asdict())
```

### 3.5 OrderedDict：有序字典

保证插入顺序，支持 `move_to_end`、`popitem(last=False)` 等，适合 LRU 缓存。

```python
from collections import OrderedDict

od = OrderedDict()
od["z"] = 1
od["a"] = 2
od["c"] = 3
print("初始顺序：", od)
od.move_to_end("z")
print("移动 z 到末尾：", od)
od.pop("a")
last_key, last_value = od.popitem()
print("弹出后：", od, "| 最后弹出：", (last_key, last_value))
```

### 3.6 ChainMap：链接多个字典

多层字典的「合并视图」，先查第一个，再查第二个……常用于默认配置 + 环境 + 用户配置。

```python
from collections import ChainMap

defaults = {"theme": "light", "lang": "zh"}
env = {"lang": "en"}
user = {"theme": "dark"}
settings = ChainMap(user, env, defaults)
print("当前配置：", dict(settings))
settings["lang"] = "jp"
print("更新后：", dict(settings))
```

---

## 4. 实战案例

### 4.1 文本词频统计

```python
from collections import Counter
import re

text = "hello world hello python world python python"
words = re.findall(r"\w+", text.lower())
freq = Counter(words)
print("最高频词：", freq.most_common(3))
```

### 4.2 构建树状数据

用 `defaultdict` 递归引用自身实现无限深度树（如目录结构）。

```python
from collections import defaultdict

def tree():
    return defaultdict(tree)

file_system = tree()
file_system["home"]["user"]["documents"]["file.txt"] = "content"
file_system["home"]["user"]["downloads"]["app.zip"] = "data"
print("读取文件内容：", file_system["home"]["user"]["documents"]["file.txt"])
```

### 4.3 最近最少使用缓存（LRU）

基于 `OrderedDict`：命中则 `move_to_end`，满则 `popitem(last=False)` 淘汰最久未用项。

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

cache = LRUCache(2)
cache.put(1, "A")
cache.put(2, "B")
print(cache.get(1))
cache.put(3, "C")
print(cache.get(2))  # 2 已被淘汰，返回 -1
```

---

## 5. 总结与对比

| 类型         | 主要用途       | 适用场景           |
|--------------|----------------|--------------------|
| Counter      | 统计元素频率   | 词频、库存统计     |
| defaultdict  | 缺省值字典     | 数据归类、计数     |
| deque        | 双端队列       | 队列/栈、滑动窗口  |
| namedtuple   | 轻量数据结构   | 坐标、记录对象     |
| OrderedDict  | 有序字典       | LRU 缓存、顺序控制 |
| ChainMap     | 多配置合并     | 配置覆盖、作用域   |

---

**相关文档**：[typing 类型提示](/python/AI课程-typing类型提示) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [collections（课程原文）](https://rag.docs-hub.com/html/collections.html)
