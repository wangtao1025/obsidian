# AI 课程笔记：Milvus 向量数据库与 PyMilvus

来源课程：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）第二讲 + 第三讲合并。涵盖 Milvus 安装与概念、Attu 使用、以及 PyMilvus 从连接到搜索的完整实战。

---

## 一、Milvus 简介

### 1.1 是什么？

Milvus 是专为**存储与检索海量向量**设计的向量数据库。

### 1.2 为什么流行？

- **高性能**：毫秒级从数十亿向量中做相似检索。
- **开源免费**：可直接使用。
- **易用**：配合 Attu 图形界面，非专业程序员也能上手。

### 1.3 能做什么？

- 图片搜索、语音检索、推荐系统、智能问答等「按相似度找东西」的场景。

### 1.4 工作流程

1. **收集数据** → 将文本/图片/声音转为向量。  
2. **存储向量** → 写入 Milvus。  
3. **快速搜索** → 输入查询向量，返回最相似的 Top-K。

---

## 二、安装与 Attu

### 2.1 下载 docker-compose.yml

- **Windows（PowerShell）**：
  ```powershell
  Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml
  ```
  若 GitHub 不可用，可用 Gitee：
  ```powershell
  Invoke-WebRequest https://gitee.com/milvus-io/milvus/raw/v2.6.4/deployments/docker/standalone/docker-compose.yml -OutFile docker-compose.yml
  ```
- **Mac / Linux**：
  ```bash
  wget https://gitee.com/milvus-io/milvus/raw/v2.6.4/deployments/docker/standalone/docker-compose.yml -O docker-compose.yml
  ```

### 2.2 启动

```bash
docker compose up -d
docker compose ps
```

典型服务：`milvus-etcd`（元数据）、`milvus-minio`（对象存储）、`milvus-standalone`（Milvus 本体，端口 19530 / 9091）。

### 2.3 Docker 镜像加速（可选）

在 Docker 配置中增加 `registry-mirrors`，例如阿里云、DaoCloud 等，加速拉取镜像。

### 2.4 Attu 图形界面

Attu 是 Milvus 的 Web 管理工具，可查看集合、创建集合、导入数据、执行向量搜索。

```bash
docker run -p 8000:3000 -e MILVUS_URL=你的Milvus地址:19530 zilliz/attu:v2.5
```

- `MILVUS_URL`：改成实际 Milvus 所在机器的 IP（本机可用 `ipconfig` / `ifconfig` 查看）。  
- 浏览器访问：`http://你的IP:8000/#/`。

---

## 三、核心概念

### 3.1 集合与字段类型

| 类型类别   | 类型名称        | 说明 |
|------------|-----------------|------|
| 主键字段   | INT64 / VARCHAR | 唯一标识，必有一个主键。 |
| 向量字段   | Float Vector    | 浮点向量，最常用。 |
|            | Binary Vector   | 二值向量。 |
|            | Float16 / BFloat16 | 节省空间。 |
|            | Sparse Vector   | 稀疏向量。 |
|            | BM25(Varchar)   | 文本 BM25 检索。 |
| 标量字段   | Int8/16/32/64, Float, Double, Boolean, VarChar, JSON, Array | 普通属性。 |

- **主键**：保证每条数据唯一。**向量字段**：支撑相似度检索。**标量字段**：存属性，可过滤、展示。
- **VarChar**：可配置分词器 (Standard)、同义词匹配、分区键。**Nullable**：勾选后该字段允许为空。

### 3.2 一致性级别

| 选项        | 含义 |
|-------------|------|
| **Strong**  | 强一致，所有人立刻看到，延迟高。 |
| **Session** | 会话一致，当前会话立即看到自己的写入。 |
| **Bounded** | 有界一致，在可控时间内同步（常用）。 |
| **Eventually** | 最终一致，延迟不确定但吞吐高。 |

**选择建议**：要绝对准确用 Strong；要看到自己操作用 Session；一般场景用 Bounded；对延迟不敏感求性能用 Eventually。

### 3.3 Schema、副本与加载

- **Schema**：集合的字段定义（名称、类型、主键、向量维度等）。  
- **副本 (Replica)**：数据拷贝数，提高可用性与查询并发。  
- **加载 (Load)**：集合需先**加载到内存**才能做索引与搜索；释放 (Release) 后从内存卸下。  
- **生命周期**：创建 → 加载 → 可搜索/建索引 → 释放 → 再加载。

### 3.4 索引与度量类型

- **索引**：类似「目录」，加速检索。常用 AUTOINDEX 或 IVF_FLAT、HNSW、IVF_PQ 等。
- **度量**：COSINE（余弦相似度）、L2（欧氏距离，越小越相似）、IP（内积，归一化下与余弦等价）、汉明距离（二值向量）。

常用度量与归一化示例：

```python
import math
from typing import List, Sequence

def l2_distance(vec_a: Sequence[float], vec_b: Sequence[float]) -> float:
    if len(vec_a) != len(vec_b):
        raise ValueError("向量维度必须一致")
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(vec_a, vec_b)))

def inner_product(vec_a: Sequence[float], vec_b: Sequence[float]) -> float:
    if len(vec_a) != len(vec_b):
        raise ValueError("向量维度必须一致")
    return sum(a * b for a, b in zip(vec_a, vec_b))

def cosine_similarity(vec_a: Sequence[float], vec_b: Sequence[float]) -> float:
    dot = inner_product(vec_a, vec_b)
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0 or norm_b == 0:
        raise ValueError("向量模长不能为 0")
    return dot / (norm_a * norm_b)

def normalize(vector: Sequence[float]) -> List[float]:
    norm = math.sqrt(sum(c * c for c in vector))
    if norm == 0:
        raise ValueError("零向量无法归一化")
    return [c / norm for c in vector]
```

### 3.5 向量搜索概念与参数

- **概念**：给定查询向量，在集合中找最相似的 Top-K 或满足距离条件的记录。
- **Level**：控制精度与速度的权衡；值越高越准但越慢。  
- **Radius**：只返回距离 ≤ radius 的结果。  
- **Range Filter**：按距离区间过滤，如 `distance >= 0.5 && distance <= 0.9`。  
- **分区过滤**：仅在指定分区内搜索。

示例（Level / Radius / Range Filter）：

```python
import math
from typing import List, Tuple

DATABASE = [{"id": i, "vector": (i * 0.1, i * 0.1 + 0.3)} for i in range(20)]

def l2_distance(a: Tuple[float, float], b: Tuple[float, float]) -> float:
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

def search_with_level(query: Tuple[float, float], level: int) -> List[int]:
    sorted_vectors = sorted(DATABASE, key=lambda item: l2_distance(query, item["vector"]))
    ratio = max(0.1, min(level / 100, 1.0))
    top_k = max(1, int(len(sorted_vectors) * ratio))
    return [item["id"] for item in sorted_vectors[:top_k]]

def search_with_radius(query: Tuple[float, float], radius: float) -> List[int]:
    return [item["id"] for item in DATABASE if l2_distance(query, item["vector"]) <= radius]

def search_with_range_filter(query: Tuple[float, float], min_d: float, max_d: float) -> List[int]:
    return [item["id"] for item in DATABASE
            if min_d <= l2_distance(query, item["vector"]) <= max_d]
```

### 3.6 数据段与集合属性

- **数据段 (Segment)**：实际存储数据的最小单元，可压缩、落盘、刷新。**查询节点 ID**：分布式下负责该段查询的节点标识。
- **集合属性**（`collection.` 开头）：如 `collection.ttl.seconds`、`collection.autocompaction.enabled`、`collection.replica.number` 等，用于调优与资源控制。

---

## 四、PyMilvus 实战

PyMilvus 是 Milvus 的 **Python SDK**，实现集合管理、向量插入与删除、相似度搜索、分区与索引管理。建议 Python 3.7+。

### 4.1 安装

```bash
uv add pymilvus
# 或
pip install pymilvus
```

### 4.2 连接 Milvus

服务端需已启动，默认端口 19530。

```python
from pymilvus import connections

connections.connect("default", host="localhost", port="19530", db_name="rensheng")
print(connections.has_connection("default"))  # True 表示连接成功
```

常见问题：端口不通或服务未启动会失败；`host`/`port` 需与 Milvus 服务端一致。

### 4.3 创建集合（Collection）

集合类似「表」，需先定义字段和 Schema。

```python
from pymilvus import CollectionSchema, FieldSchema, DataType, Collection, connections

connections.connect("default", host="localhost", port="19530", db_name="rensheng")

fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128),
]
schema = CollectionSchema(fields, description="example")

collection_name = "example"
try:
    collection = Collection(collection_name)
    print(f"集合 {collection_name} 已存在")
except Exception:
    collection = Collection(collection_name, schema)
    print(f"集合 {collection_name} 创建成功")
```

注意：向量字段必须指定 `dim`；主键常用 INT64；集合名唯一。

### 4.4 创建索引

向量字段需建索引以加速检索，常用 IVF_FLAT、HNSW、IVF_PQ 等。

```python
from pymilvus import Collection, connections

connections.connect("default", host="localhost", port="19530", db_name="rensheng")
collection = Collection("example")

index_params = {
    "metric_type": "L2",       # L2 / IP / COSINE
    "index_type": "IVF_FLAT",
    "params": {"nlist": 128},  # nlist 越大召回越高、速度越慢
}
collection.create_index("embedding", index_params)
print("索引创建成功")
```

未建索引时检索效率低；`nlist` 需按数据量调节。

### 4.5 加载集合到内存

检索前必须先 **load**。

```python
collection = Collection("example")
collection.load()
print("集合已加载到内存")
```

未 load 无法检索；数据量大时 load 可能较慢。

### 4.6 插入数据

#### 列表格式（按列）

每项对应一个字段，**顺序与 schema 一致**（不含 auto_id 主键）。

```python
from pymilvus import Collection, connections
import random

connections.connect("default", host="localhost", port="19530", db_name="rensheng")
collection = Collection("example")

vectors = [[random.random() for _ in range(128)] for _ in range(1000)]
data = [vectors]  # 仅向量列（主键 auto_id 不需提供）

mr = collection.insert(data)
print("插入向量数量：", mr.insert_count)
collection.flush()
```

#### 字典格式（按行）

每行一个字典，字段名与 schema 对应。

```python
data = [
    {"embedding": [0.1, 0.2, ...], "category": 2},
    {"embedding": [0.3, 0.4, ...], "category": 3},
]
collection.insert(data)
```

注意：列表格式顺序必须与 schema 一致；字典格式需写字段名、顺序无关。

### 4.7 向量搜索

支持 L2、IP、COSINE；可指定 `limit`（topK）、`param`（如 nprobe）。

```python
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
query_vector = [random.random() for _ in range(128)]

results = collection.search(
    data=[query_vector],
    anns_field="embedding",
    param=search_params,
    limit=5,
)

for hits in results:
    for hit in hits:
        print(f"id: {hit.id}, distance: {hit.distance}")
```

未 load 会报错；查询向量维度需与 schema 一致。

### 4.8 删除集合

会清空所有数据，谨慎使用。

```python
collection = Collection("example")
collection.drop()
print("集合已删除")
```

### 4.9 分区管理

用分区做数据分组、分层查询。

```python
partition_name = "partition_2"
if partition_name not in [p.name for p in collection.partitions]:
    collection.create_partition(partition_name)

vectors = [[random.random() for _ in range(128)] for _ in range(10)]
collection.insert([vectors], partition_name=partition_name)
collection.flush()
collection.load(partition_names=[partition_name])

results = collection.search(
    data=[query_vector],
    anns_field="embedding",
    param=search_params,
    limit=5,
    partition_names=[partition_name],
)
collection.release(partition_names=[partition_name])
```

分区名唯一；插入/检索时通过 `partition_name` / `partition_names` 指定。

### 4.10 混合搜索（向量 + 标量过滤）

用 `expr` 在向量检索基础上做标量过滤。

```python
results = collection.search(
    data=[query_vector],
    anns_field="embedding",
    param=search_params,
    limit=5,
    expr="category in [2, 3, 4]",  # 只检索 category 为 2、3、4 的向量
)
```

### 4.11 最佳实践

- **批量插入**：尽量批量 insert，避免单条循环插入。  
- **索引参数**：按数据量和查询需求调 `nlist`、`nprobe`。  
- **预加载**：查询前对目标集合/分区执行 `load`。  
- **高并发**：使用连接池管理连接。  
- **监控**：关注查询延迟与资源占用。  
- **异常处理**：关键操作用 try/except，便于排查。

### 4.12 文本/图片向量写入

- **文本**：调用嵌入 API（如硅基流动等）得到 `list[float]`，与业务字段一起 `insert`；查询时同样先得到查询向量再 `search`。**向量维度**需与集合定义一致。  
- **图片**：使用多模态嵌入 API（如阿里云 dashscope 的 multimodal-embedding），将图片转为 base64 或 URL 传入，获取向量后写入 Milvus，即可做以图搜图。

---

## 五、IVF_FLAT 原理与示例

- **IVF**：Inverted File，按「中心」建倒排：每个中心对应一个桶，向量按最近中心落入对应桶。  
- **FLAT**：桶内用暴力计算距离（不压缩），精度高。  
- **nlist**：中心数（桶数）；**nprobe**：查询时只查距离最近的 nprobe 个桶，平衡速度与召回。

以下用 K-Means++ 选中心、建桶，再在桶内做最近邻检索，对应「IVF_FLAT」的简化实现。

```python
from collections import defaultdict
import math
import random

def l2_distance(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

def kmeans(vectors, k):
    centers = [random.choice(vectors)]
    while len(centers) < k:
        dists = [min(l2_distance(v, c) ** 2 for c in centers) for v in vectors]
        total = sum(dists)
        r = random.random() * total
        prefix = 0.0
        for v, d in zip(vectors, dists):
            prefix += d
            if prefix >= r:
                centers.append(v)
                break
    clusters = {i: [] for i in range(k)}
    for v in vectors:
        idx = min(range(k), key=lambda i: l2_distance(v, centers[i]))
        clusters[idx].append(v)
    for i, points in clusters.items():
        if points:
            centers[i] = [sum(dim) / len(points) for dim in zip(*points)]
    return centers

def build_ivf_flat(vectors, nlist):
    centers = kmeans(vectors, nlist)
    buckets = defaultdict(list)
    for vec in vectors:
        idx = min(range(nlist), key=lambda i: l2_distance(vec, centers[i]))
        buckets[idx].append(vec)
    return centers, buckets

def search_ivf_flat(query, centers, buckets, nprobe, topk):
    probe_order = sorted(range(len(centers)), key=lambda i: l2_distance(query, centers[i]))
    candidate_pairs = []
    for idx in probe_order[:nprobe]:
        for vec in buckets[idx]:
            candidate_pairs.append((l2_distance(query, vec), vec))
    candidate_pairs.sort(key=lambda x: x[0])
    return candidate_pairs[:topk]

if __name__ == "__main__":
    random.seed(0)
    database = [[0.1, 0.2], [0.15, 0.18], [0.8, 0.85], [0.82, 0.79],
                [0.4, 0.4], [0.42, 0.45], [0.9, 0.1], [0.88, 0.15]]
    query = [0.12, 0.22]
    nlist, nprobe = 4, 2
    centers, buckets = build_ivf_flat(database, nlist=nlist)
    results = search_ivf_flat(query, centers, buckets, nprobe=nprobe, topk=3)
    print(f"nlist={nlist}, nprobe={nprobe}")
    for dist, vec in results:
        print(f"向量={vec}, 距离={dist:.4f}")
```

---

## 六、API Key 与云服务器

### 6.1 API Key 配置（概要）

课程中涉及多家服务的 API Key，用于嵌入模型或 LLM。配置项一般包括：**baseUrl**、**ApiKey**、**Model**（如 deepseek-v3、deepseek-r1）。涉及平台示例：DeepSeek、Ollama、硅基流动、派欧算力云、腾讯云、百度、阿里、字节火山引擎、科大讯飞、OpenRouter 等。**模型类型与平台速查**见 [模型与 API 速查](/ai/AI课程-模型与API速查)。具体以各平台文档为准；**切勿在文档或代码中提交真实 API Key**，应使用环境变量或配置中心。

### 6.2 云服务器安装

同本地：在服务器上执行 `wget ... docker-compose.yml`、`docker compose up -d`，再在本机或服务器启动 Attu，`MILVUS_URL` 填服务器 IP:19530，通过 `http://服务器IP:8000` 访问 Attu。

---

## 七、参考与延伸

- **课程内**：第一讲 [RAG 与向量基础](/ai/AI课程-RAG与向量基础)、第四讲 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)。  
- **官方**：Milvus 文档、度量类型、归一化、分区、数据段、向量模型与多模态嵌入等。

---

*（本文档合并原第二讲「Milvus」与第三讲「PyMilvus」，与第一讲向量基础衔接，后续可接第四讲 RAG。）*
