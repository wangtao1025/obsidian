# AI 课程：FAISS

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **faiss** 文档，归在 **AI 分类**（向量与检索）。FAISS（Facebook AI Similarity Search）是用于高效相似性搜索与密集向量聚类的开源库，支持百万到十亿级向量、多种索引类型，适合 RAG 检索、推荐、文本/图像相似度搜索。可与 [RAG 与向量基础](/ai/AI课程-RAG与向量基础)、[余弦相似度](/ai/AI课程-余弦相似度)、[HNSW](/ai/AI课程-HNSW)、[ChromaDB](/ai/AI课程-chromadb) 搭配学习。

---

## 1. 什么是向量相似度搜索与 FAISS？

- **向量相似度搜索**：将数据（文本、图像等）表示为向量，用查询向量在库中找最相似的向量，避免逐条遍历。
- **为什么需要 FAISS**：数据量达百万/千万级时，暴力遍历太慢；FAISS 提供高效索引与搜索，可在毫秒级返回 top-k。
- **FAISS 是什么**：Facebook AI Research 开源库，C++ 内核 + Python 接口，支持多种索引与大规模向量。

---

## 2. 前置知识

- **向量**：有序数值表示数据；文本/图像经嵌入模型得到向量。
- **NumPy**：FAISS 使用 `float32` 的 NumPy 数组；形状 `(n, d)` 表示 n 个 d 维向量。
- **相似度**：欧氏距离（L2）越小越相似；[余弦相似度](/ai/AI课程-余弦相似度) 越大越相似，归一化后可用内积等价。
- **索引**：用于快速查找的数据结构；FAISS 的索引决定存储方式与搜索算法。

---

## 3. 安装与验证

- **安装**：`pip install faiss-cpu`（或 `conda install -c conda-forge faiss-cpu`）；GPU 版按需选 `faiss-gpu`。
- **验证**：`import faiss`；`faiss.IndexFlatL2(d)` 创建维度 d 的 L2 索引即表示可用。

---

## 4. 基本流程：建索引与搜索

1. **准备数据**：向量为 `float32`，形状 `(nb, d)`（nb 条，维度 d）。  
2. **创建索引**：如 `index = faiss.IndexFlatL2(d)`。  
3. **添加向量**：`index.add(xb)`。  
4. **搜索**：`D, I = index.search(xq, k)`——`xq` 为查询向量 `(nq, d)`，返回距离矩阵 `D` 与索引矩阵 `I`。

---

## 5. 索引类型与选择

| 索引 | 精度 | 速度 | 内存 | 适用场景 |
|------|------|------|------|----------|
| **IndexFlatL2** | 精确 | 慢 | 高 | 小规模（< 10 万），要精确 L2 距离 |
| **IndexFlatIP** | 精确 | 慢 | 高 | 小规模，**余弦相似度**（先 `faiss.normalize_L2` 再内积） |
| **IndexIVFFlat** | 高 | 快 | 高 | 大规模（> 10 万），需先 `train()`，用 `nprobe` 调精度/速度 |
| **IndexHNSW** | 高 | 很快 | 中 | 快速搜索、内存充足；无需训练 |

- **IVF**：先聚类，搜索时只查部分聚类；`nlist` 聚类数，`nprobe` 搜索时访问的聚类数。  
- **HNSW**：图结构近似最近邻，与本站 [HNSW](/ai/AI课程-HNSW) 原理相通。

---

## 6. 使用注意

- **类型**：向量必须 `float32`（`.astype('float32')`）。  
- **维度**：建索引的维度 d 与添加/查询向量一致。  
- **IVF 索引**：先 `index.train(xb)` 再 `index.add(xb)`。  
- **空索引**：搜索前检查 `index.ntotal > 0`。  
- **余弦相似度**：用 `IndexFlatIP` 前对向量 `faiss.normalize_L2(xb)`、`faiss.normalize_L2(xq)`。

---

## 7. 保存与加载

- **保存**：`faiss.write_index(index, "path.faiss")`。  
- **加载**：`index = faiss.read_index("path.faiss")`。

---

## 8. 性能建议

- 批量 `add` 优于逐条添加；批量 `search` 优于逐条查询。  
- 数据量极大时可分批 add、或选用量化索引（如 IVF+PQ）以省内存。

---

## 9. 小结

- **FAISS**：高效向量相似度搜索库，适合 RAG 检索、推荐、语义检索。  
- **流程**：准备 float32 向量 → 选索引（Flat/IVF/HNSW）→ 建索引 → 需则 train → add → search。  
- **与本站**：[余弦相似度](/ai/AI课程-余弦相似度) 算相似度；[HNSW](/ai/AI课程-HNSW) 理解图索引；[ChromaDB](/ai/AI课程-chromadb) 为带存储的向量库；[LangChain](/ai/AI课程-LangChain) 中可用 FAISS 做示例选择器或检索器。

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [余弦相似度](/ai/AI课程-余弦相似度) · [HNSW](/ai/AI课程-HNSW) · [ChromaDB](/ai/AI课程-chromadb) · [知识体系与学习路径](/ai/知识体系与学习路径) · [faiss（课程原文）](https://rag.docs-hub.com/html/faiss.html)
