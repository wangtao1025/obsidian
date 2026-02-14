# AI 课程：all-MiniLM-L6-v2

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **all-MiniLM-L6-v2** 文档，文档归在 **AI 分类**（嵌入与模型）。all-MiniLM-L6-v2 是常用的轻量级句子嵌入模型（微软 MiniLM），将文本转为 384 维向量，用于语义相似度、RAG 检索、聚类等；通过 Python 库 [Sentence Transformers](/python/AI课程-sentence_transformers) 使用：`SentenceTransformer("all-MiniLM-L6-v2")`。

---

## 1. 什么是 all-MiniLM-L6-v2？

all-MiniLM-L6-v2 是轻量级句子嵌入模型：约 22.7M 参数、约 90MB、输出 384 维、最大 256 tokens。特点：速度快（CPU 上约 100–200 句/秒）、通用性好、开箱即用。用途：文本相似度、语义搜索、聚类、RAG 向量化、智能分块。

---

## 2. 前置概念

| 概念 | 说明 |
|------|------|
| **文本嵌入（Embedding）** | 文本→数值向量，相似文本对应相似向量 |
| **句子嵌入** | 以整句/短段为单位的嵌入（区别于词嵌入） |
| **知识蒸馏** | 大模型（教师）教小模型（学生），MiniLM 即 BERT 的蒸馏版 |
| **余弦相似度** | 两向量夹角余弦，范围约 -1～1，越大越相似；公式 (A·B)/(\|A\|\|B\|) |

---

## 3. 安装与基本使用

- 安装：`pip install sentence-transformers`（见 [Sentence Transformers](/python/AI课程-sentence_transformers)）。GPU 可选装 PyTorch GPU 版。
- 验证：`from sentence_transformers import SentenceTransformer` → `model = SentenceTransformer("all-MiniLM-L6-v2")`（首次会下载约 90MB）。
- 第一个示例：`embedding = model.encode("我喜欢编程和机器学习")` → 得到 shape `(384,)` 的向量，已 L2 归一化。

---

## 4. 模型规格与架构

- **规格**：22.7M 参数，6 层 Transformer，384 维，max 256 tokens；内存约 200–300MB。
- **流程**：输入 → 分词 → 词嵌入 → 6 层 Transformer → 平均池化 → L2 归一化 → 384 维向量。
- 查看：`model.get_sentence_embedding_dimension()`、`model.max_seq_length`。

---

## 5. 实际应用示例

- **相似度**：`embeddings = model.encode(sentences)` → `cosine_similarity(embeddings)`（需 `sklearn.metrics.pairwise.cosine_similarity`）。
- **语义搜索**：文档库与查询分别 `encode`，用 `cosine_similarity(query_embedding, doc_embeddings)[0]`，按相似度排序取 Top-K。
- **批量**：`model.encode(sentences, batch_size=32, show_progress_bar=True)`。
- **长文本**：超过 256 tokens 先分割（如按段落 `split("\n\n")`），每段编码后对向量取平均（或保留每段向量做检索）。

---

## 6. 性能与对比

- CPU 约 100–200 句/秒，GPU 更快；与 all-mpnet-base-v2（更大更准）、BERT-base 等相比，在速度与资源占用上更均衡。
- 选择建议：多数场景用 all-MiniLM-L6-v2；需要更高精度用 all-mpnet-base-v2；资源紧张用本模型。

---

## 7. 优势与局限

- **优势**：轻量、速度快、通用、易用、质量稳定。
- **局限**：序列最长 256 tokens，长文需先分块；专业领域可考虑领域模型；多语言以英语最优，中文可用 `paraphrase-multilingual-MiniLM-L12-v2`；细微语义差异可能不如更大模型。

---

## 8. 使用建议与最佳实践

- **批量**：尽量用 `encode(list, batch_size=32)`，避免逐句编码。
- **相似度阈值**：严格匹配约 0.9+，一般相似 0.7–0.9，宽松 0.5–0.7。
- **长文本**：按段落或固定长度分块 → 每块编码 → 平均或分别存储；结构化文档优先按段落。
- **保存向量**：大批量可预先 `encode` 后 `np.save` / `pickle`，避免重复计算。

---

## 9. 常见问题

| 问题 | 处理 |
|------|------|
| 首次很慢 | 首次会下载模型约 90MB，之后用本地缓存 |
| 内存不足 | 减小 `batch_size`，或分批处理 |
| 文本被截断 | 超长文本先分割再编码，见 8.3 |
| 相似度不准 | 检查文本是否真相似、是否需领域模型、清理特殊字符 |
| GPU 未用 | 检查 `torch.cuda.is_available()`，安装对应 PyTorch GPU 版 |

---

## 10. 参考

- [Sentence Transformers 官网](https://www.sbert.net/)
- [all-MiniLM-L6-v2 模型卡片](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)

---

**相关文档**：[Sentence Transformers](/python/AI课程-sentence_transformers)（Python 库）· [余弦相似度](/ai/AI课程-余弦相似度) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [all-MiniLM-L6-v2（课程原文）](https://rag.docs-hub.com/html/all-MiniLM-L6-v2.html)
