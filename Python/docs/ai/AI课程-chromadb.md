# AI 课程：ChromaDB

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **chromadb** 文档。ChromaDB 是轻量级开源向量数据库，用于存储与检索向量数据，适合本地开发、原型与中小规模语义检索；可与 [Milvus](/ai/AI课程-Milvus向量数据库与PyMilvus)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 对照学习。

---

## 1. 什么是 ChromaDB？

- **语义搜索**：按意思检索，而非仅关键词  
- **相似度检索**：返回与查询向量最相似的文档  
- **轻量易用**：API 简洁，可本地运行，内置默认向量化  

前置：了解「向量」与「嵌入」——文本经嵌入模型转为向量，相似文本对应相似向量；ChromaDB 负责存、查这些向量。

---

## 2. 环境准备

- Python ≥ 3.8  

```bash
python -m pip install --upgrade pip
python -m pip install chromadb
# 国内镜像：-i https://pypi.tuna.tsinghua.edu.cn/simple
```

验证：`EphemeralClient()` 创建临时客户端 → `create_collection` → `add(documents=["测试"], ids=["id1"])` → `query(query_texts=["测试"], n_results=1)`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Client** | 入口；`PersistentClient(path)` 持久化，`EphemeralClient()` 仅内存 |
| **Collection** | 类似「表」，存同一类文档+向量+元数据 |
| **Document** | 原始文本 |
| **Embedding** | 文档对应的向量，可由 ChromaDB 默认生成或自定义 |
| **Metadata** | 键值对，用于过滤 |
| **ID** | 每条数据的唯一标识 |

---

## 4. 客户端与集合

```python
import chromadb

# 持久化
client = chromadb.PersistentClient(path="./chroma_store")
collection = client.create_collection(name="notes", metadata={"description": "示例"})

# 临时
memory_client = chromadb.EphemeralClient()

# 获取或创建
collection = client.get_or_create_collection(name="notes")
```

---

## 5. 写入与查询

```python
collection.add(
    documents=["机器学习包含监督学习和无监督学习", "Python 拥有丰富的数据科学生态"],
    metadatas=[{"topic": "ml"}, {"topic": "python"}],
    ids=["doc_1", "doc_2"]
)
print(collection.count())

results = collection.query(
    query_texts=["如何入门机器学习？"],
    n_results=2
)
# results["documents"], results["metadatas"], results["distances"], results["ids"]
```

---

## 6. 元数据过滤与数据管理

- **过滤查询**：`where={"topic": {"$eq": "python"}}`；常用操作符 `$eq`、`$ne`、`$gt`、`$lt` 等  
- **更新**：先 `delete(ids=[...])` 再 `add(...)` 同 id  
- **删除**：`delete(ids=[...])`  
- **按 ID 取**：`get(ids=[...])`  

---

## 7. 自定义嵌入函数

默认嵌入对中文可能一般，可改用 [Sentence Transformers](/python/AI课程-sentence_transformers) 等：

```python
from sentence_transformers import SentenceTransformer
from chromadb import EmbeddingFunction, PersistentClient

class STEmbedding(EmbeddingFunction):
    def __init__(self):
        self.model = SentenceTransformer("shibing624/text2vec-base-chinese")
    def __call__(self, texts):
        return self.model.encode(texts).tolist()

client = PersistentClient(path="./custom_store")
collection = client.create_collection(
    name="custom_embed",
    embedding_function=STEmbedding()
)
collection.add(documents=["向量数据库提升语义检索"], ids=["c1"])
results = collection.query(query_texts=["语义搜索"], n_results=1)
```

---

## 8. 实战：知识库检索类

封装 `PersistentClient` + `get_or_create_collection`；`add(docs, metadatas)` 批量写入并生成 id；`query(query_texts=[query], n_results=top_k)` 得到 `documents`、`metadatas`、`distances`，可转为相似度分数（如 `1 - distance`）返回。

---

## 9. 常见问题

| 问题 | 处理 |
|------|------|
| 中文效果差 | 使用自定义中文嵌入模型（见第 7 节） |
| 结果不相关 | 加长查询文本、提高文档质量、按 `distances` 设阈值过滤 |
| 数据丢失 | 用 `PersistentClient` 并确认 path 有写权限 |
| 性能 | 批量 `add`、合理设置 `n_results` |

---

## 10. 参考

- [ChromaDB 官方文档](https://docs.trychroma.com/)  
- [Sentence Transformers](https://www.sbert.net/)  

---

## 11. 向量数据库对比（摘要）

| 类型 | [FAISS](/ai/AI课程-faiss) | Chroma | Milvus | Pinecone | PostgreSQL |
|------|--------|--------|--------|----------|------------|
| 形态 | 库 | 嵌入式/独立 | 分布式 | 云托管 | 关系型+扩展 |
| 场景 | 研究/中规模 | 快速开发/本地 | 大规模生产 | 无运维/云上 | 已有 PG/强事务 |

- **Chroma**：快速开始、简单应用、开发测试。  
- **Milvus**：大规模生产、企业级，见 [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus)。

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [chromadb（课程原文）](https://rag.docs-hub.com/html/chromadb.html)
