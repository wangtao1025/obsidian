# AI 课程笔记：HNSW

来源课程：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）HNSW 章节。以下为 HNSW 概念、前置知识、hnswlib 使用、工作原理、单层/分层实现及优缺点与适用场景的整理。

---

## 一、什么是 HNSW？

**HNSW**（Hierarchical Navigable Small World）即「可导航小世界分层图」，是一种用于**快速向量相似度查找**的算法，常用于推荐、搜索、图像检索等场景。

### 1.1 要解决什么问题？

例如：有 100 万张图片，每张用 512 维向量表示；给定一张新图，如何**快速**从 100 万条里找到最相似的几张？这就是**高维向量相似度搜索**问题，HNSW 为此而生。

### 1.2 传统方法为何不够？

**线性扫描**：要精确找最近邻，需计算查询向量与所有向量的距离，数据量大时耗时可到秒级甚至更久。

### 1.3 HNSW 的优势

- **快**：百万级数据可在毫秒级返回相似结果。  
- **准**：近似最近邻，不保证绝对最近，但通常非常接近。  
- **易用**：有现成 Python 库（如 hnswlib）可直接使用。

---

## 二、前置知识

### 2.1 向量

向量是一组有序数，如 `[1.2, 3.4, 5.6]` 为 3 维向量。在 AI 里，文本、图片、音频等常被编码成高维向量。

```python
import numpy as np
vector = np.array([1.2, 3.4, 5.6])
print(vector.shape, vector)
```

### 2.2 向量相似度

常用度量：

- **欧氏距离（L2）**：两点直线距离，越小越相似。  
- **余弦相似度**：两向量夹角余弦，越接近 1 方向越相似。

```python
import numpy as np

def euclidean_distance(vec1, vec2):
    return np.sqrt(np.sum((vec1 - vec2) ** 2))

def cosine_similarity(vec1, vec2):
    dot = np.dot(vec1, vec2)
    n1, n2 = np.linalg.norm(vec1), np.linalg.norm(vec2)
    return dot / (n1 * n2) if n1 and n2 else 0

a, b = np.array([1., 2., 3.]), np.array([4., 5., 6.])
print("L2:", euclidean_distance(a, b))
print("cosine:", cosine_similarity(a, a * 2))
```

### 2.3 近似最近邻（ANN）

- **精确最近邻**：遍历全部向量，慢。  
- **近似最近邻（ANN）**：不遍历全部，用索引快速找到「比较近」的向量，HNSW 即一种 ANN 算法。

---

## 三、安装与环境

### 3.1 安装 hnswlib

```bash
pip install hnswlib
# 或使用镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple hnswlib
```

### 3.2 验证

```python
import hnswlib
print("hnswlib 安装成功！")
```

---

## 四、核心思想：像查地图一样查数据

- **高层**：数据点少，像世界地图，用来快速定大方向。  
- **中间层**：点增多，像省/市地图，逐步缩小范围。  
- **底层（第 0 层）**：包含所有点，像街道图，做精确查找。

通过「从高层快速跳转 → 逐层下降 → 底层精搜」，避免在底层做全局扫描，从而提速。

---

## 五、HNSW 基础使用（hnswlib）

```python
import hnswlib
import numpy as np

np.random.seed(42)
dim = 128
num_elements = 1000

p = hnswlib.Index(space='l2', dim=dim)
p.init_index(max_elements=num_elements, ef_construction=200, M=16)

data = np.random.random((num_elements, dim)).astype(np.float32)
p.add_items(data, np.arange(num_elements))

p.set_ef(50)
query = np.random.random((dim,)).astype(np.float32)
labels, distances = p.knn_query(query, k=5)

print("最相似的 5 个:")
for i, (label, dist) in enumerate(zip(labels[0], distances[0])):
    print(f"  第 {i+1} 名: 标签={label}, 距离={dist:.4f}")
```

- **space**：`'l2'`（欧氏）、`'cosine'`、`'ip'`（内积）等。  
- **ef_construction**：建图时候选大小，越大图质量越好、建图越慢。  
- **M**：每节点最大邻居数。  
- **set_ef(ef_search)**：查询时候选大小，越大越准、越慢。

---

## 六、HNSW 的工作原理

### 6.1 小世界网络

- **短程连接**：与附近点相连（局部聚类）。  
- **长程连接**：少量「跳板」连到较远区域，便于快速跨越。  
搜索时从某点出发，沿边不断走向更接近查询向量的邻居。

### 6.2 分层结构

- **顶层**：点少、边「长」，快速粗定位。  
- **底层**：点全、边「短」，精细搜索。  
查询：从顶层入口出发 → 每层做局部贪心搜索 → 下层用上层的最近点作为入口 → 底层得到最终 Top-K。

### 6.3 构建过程（插入新向量）

1. 为该点**随机一个最高层**（层越高概率越小，如指数衰减）。  
2. 从顶层入口开始，**逐层**找当前层中离新向量最近的节点。  
3. 在该点出现的**每一层**，选最近 M 个邻居并建双向边。

---

## 七、实现（单层图 + 贪心搜索）

以下为简化版：单层图 + 优先队列贪心搜索，便于理解「小世界 + 最佳优先」思路。与 [heapq 使用指南](/python/heapq使用指南) 中的优先队列一致。

```python
import heapq
import numpy as np

class HNSW:
    """单层图 + 贪心/最佳优先搜索（教学用简化版）。"""

    def __init__(self, space: str, dim: int):
        if space != 'l2':
            raise ValueError('示例仅支持 L2 距离')
        self.dim = dim
        self.max_elements = 0
        self.M = 0
        self.explorationFactor = 10
        self.vectors = {}
        self.graph = {}
        self.entry_point = None

    def init_index(self, max_elements: int, M: int):
        self.max_elements = max_elements
        self.M = M

    def add_items(self, data, labels):
        for vector, label in zip(data, labels):
            if len(self.vectors) >= self.max_elements:
                raise ValueError('已达到索引容量上限')
            self.graph.setdefault(label, [])
            if self.entry_point is None:
                self.entry_point = label
                self.vectors[label] = vector
                continue
            neighbors = self._select_neighbors(vector)
            self.vectors[label] = vector
            for nb in neighbors:
                if nb == label:
                    continue
                if nb not in self.graph[label]:
                    self.graph[label].append(nb)
                if label not in self.graph.get(nb, []):
                    self.graph.setdefault(nb, []).append(label)

    def set_explorationFactor(self, explorationFactor: int):
        self.explorationFactor = max(1, explorationFactor)

    def knn_query(self, query, k: int):
        if self.entry_point is None:
            raise ValueError('索引为空')
        visited = set()
        frontier = []
        entry_dist = self._l2(query, self.vectors[self.entry_point])
        heapq.heappush(frontier, (entry_dist, self.entry_point))
        best = []
        while frontier:
            dist, node = heapq.heappop(frontier)
            if node in visited:
                continue
            visited.add(node)
            if len(best) < self.explorationFactor or dist < -best[0][0]:
                heapq.heappush(best, (-dist, node))
                if len(best) > self.explorationFactor:
                    heapq.heappop(best)
            for nb in self.graph.get(node, []):
                if nb not in visited:
                    nd = self._l2(query, self.vectors[nb])
                    heapq.heappush(frontier, (nd, nb))
        best_pairs = sorted(best, key=lambda x: -x[0])[:k]
        labels_out = np.array([[label for _, label in best_pairs]])
        distances_out = np.array([[-score for score, _ in best_pairs]])
        return labels_out, distances_out

    def _select_neighbors(self, vector):
        dists = [(self._l2(vector, other), label) for label, other in self.vectors.items()]
        dists.sort(key=lambda x: x[0])
        return [label for _, label in dists[: self.M]]

    @staticmethod
    def _l2(a, b):
        return float(np.linalg.norm(a - b))
```

---

## 八、分层实现要点

完整 HNSW 使用**多层图**：

- **graphs[layer]**：每层一个图，`layer 0` 含所有节点，层越高节点越少。  
- **节点层级**：用指数衰减随机决定节点出现在哪几层（每层 0.5 概率再上一层，上限如 16）。  
- **插入**：从该点最高层往下，每层用 `_search_layer` 找入口，再选 M 个邻居建边。  
- **查询**：从最高层入口开始，每层 `_search_layer` 得到当前层最近点，作为下一层入口；在 layer 0 用较大 ef 做最终 K 近邻。

`_search_layer(entry_node, query, layer, ef)`：在该层从 `entry_node` 出发，用优先队列贪心扩展，保留距离最小的 ef 个节点（与第七节单层逻辑类似，只是限定在 `graphs[layer]` 的边上）。分层版还需 `_random_level()`、`_select_neighbors_in_layer()` 等，完整实现见课程源码或 hnswlib。

---

## 九、优缺点与适用场景

### 9.1 优点

- **性能好**：速度与精度在常见 ANN 基准中表现突出，百万级毫秒级响应。  
- **易用**：hnswlib 等库 API 简单。  
- **支持动态插入**：不必每次重建索引。  
- **通用**：支持 L2、余弦、内积等度量。  
- **参数直观**：M、ef_construction、ef_search 含义清晰，便于调参。

### 9.2 缺点

- **内存**：需存图结构，十亿级可能成瓶颈；百万～千万级通常可接受。  
- **需调参**：不同数据最优 M/ef 可能不同。  
- **建图时间**：比简单线性索引长。  
- **近似**：不保证绝对最近邻。

### 9.3 适用场景

- **适合**：推荐、搜索引擎、图像/向量检索，百万～千万级，可接受近似解，需支持增量插入。  
- **不适合**：必须绝对精确最近邻；数据规模达十亿级且内存紧张；对建图时间要求极高。

---

## 十、参考与延伸

- **课程内**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础)（向量与检索）、[Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus)（向量索引与 IVF_FLAT 等）、[heapq 使用指南](/python/heapq使用指南)（优先队列）。  
- **库**：hnswlib 官方文档与 GitHub。

---

*（本文档为课程 HNSW 章节整理，与 heapq、向量基础、Milvus 等衔接；HNSW 为向量检索与 RAG 中常用的 ANN 索引之一。）*
