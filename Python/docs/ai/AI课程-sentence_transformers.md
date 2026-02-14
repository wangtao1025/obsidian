# AI 课程：Sentence Transformers

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **sentence_transformers** 文档。Sentence Transformers 可将句子、段落或文档转换为固定长度的向量（Embedding），用于语义搜索、相似度计算与 RAG 嵌入；与 [余弦相似度](/ai/AI课程-余弦相似度)、[ChromaDB](/ai/AI课程-chromadb)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配学习。

---

## 1. 什么是 Sentence Transformers？

Sentence Transformers 是一个 Python 库，可以将句子、段落甚至整个文档转换成固定长度的数字向量（Embedding）。这些向量能够捕捉文本的语义信息，相似的文本会产生相似的向量，所以通过比较向量就能找到语义相似的内容。

**为什么要用 Sentence Transformers？**

想象一下，你想在一个包含数千篇文档的知识库中找到「如何学习编程？」相关的文档。传统的关键词搜索可能会找不到，因为文档中可能用的是「如何入门编程」或「编程学习指南」等不同的表述。但 Sentence Transformers 能理解这些不同的表达方式在语义上是相似的，从而找到相关内容。

**主要应用场景：**

- **语义搜索**：根据意思搜索，而不仅仅是关键词匹配
- **相似度计算**：判断两段文本是否相似
- **文档聚类**：将相似的文档分组
- **智能推荐**：推荐相似的内容
- **问答系统**：找到与问题最相关的答案

**前置知识补充：**

- **嵌入（Embedding）**：将文本转换成数字向量的过程。向量是一串数字，比如 `[0.1, 0.5, -0.3, 0.8, ...]`。相似的文本会有相似的向量。
- **余弦相似度**：衡量两个向量相似程度的指标，范围通常是 -1 到 1，值越接近 1 表示越相似。详见 [余弦相似度](/ai/AI课程-余弦相似度)。
- **Transformer**：一种深度学习模型架构，Sentence Transformers 基于此构建。

---

## 2. 环境准备

支持 Python 3.8 及以上，安装时会自动安装 PyTorch（CPU 版）。若需 GPU，需先单独安装支持 GPU 的 PyTorch。

### 2.1 检查 Python 版本

```bash
# Windows PowerShell
python --version

# macOS / Linux
python3 --version
```

### 2.2 安装 Sentence Transformers

```bash
# Windows
python -m pip install --upgrade pip
python -m pip install sentence-transformers

# macOS / Linux
python3 -m pip install --upgrade pip
python3 -m pip install sentence-transformers
```

国内镜像加速：`-i https://pypi.tuna.tsinghua.edu.cn/simple`

### 2.3 验证安装

```python
from sentence_transformers import SentenceTransformer

print("正在加载模型进行测试...")
model = SentenceTransformer("all-MiniLM-L6-v2")
sentence = "这是一个测试句子"
embedding = model.encode(sentence)
print(f"安装成功！嵌入向量维度：{embedding.shape}")
print(f"前 5 个维度值：{embedding[:5]}")
```

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **模型（Model）** | 将文本转换为向量的工具，如 all-MiniLM-L6-v2、多语言/领域模型 |
| **编码（Encoding）** | 文本 → 向量的过程，输入字符串，输出数字数组 |
| **相似度（Similarity）** | 通过向量距离/相似度判断文本相似程度，常用余弦相似度 |
| **嵌入向量（Embedding）** | 文本的数字表示，固定长度数组 |

---

## 4. 快速体验：加载模型与编码句子

```python
from sentence_transformers import SentenceTransformer

print("正在加载模型 'all-MiniLM-L6-v2'...")
model = SentenceTransformer("all-MiniLM-L6-v2")
print("模型加载完成！")

sentence = "自然语言处理可以帮助我们理解文本含义"
embedding = model.encode(sentence)

print(f"\n嵌入向量维度：{embedding.shape}")
print(f"前 5 个维度值：{embedding[:5]}")
print(f"向量类型：{type(embedding)}")

import numpy as np
print(f"向量数值范围：[{np.min(embedding):.4f}, {np.max(embedding):.4f}]")
```

---

## 5. 批量编码：处理多个句子

### 5.1 批量编码示例

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
sentences = [
    "深度学习是人工智能的重要分支",
    "我喜欢在周末读技术博客",
    "今天的天气非常适合散步",
    "Python 是数据科学常用语言"
]
embeddings = model.encode(sentences)

print(f"嵌入矩阵形状：{embeddings.shape}")
print(f"句子数量：{embeddings.shape[0]}，向量维度：{embeddings.shape[1]}")
print(f"\n第一条句子的向量（前 5 维）：{embeddings[0][:5]}")
```

### 5.2 编码选项

`encode()` 常用参数：`convert_to_tensor=True`（返回张量）、`show_progress_bar=True`、`batch_size=16`、`convert_to_numpy=True`（默认）。

---

## 6. 相似度计算：找出相似的文本

### 6.1 余弦相似度

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")
sentences = ["我爱机器学习", "机器学习非常有趣", "我今天吃了披萨"]
embeddings = model.encode(sentences, convert_to_tensor=True)
similarity_matrix = util.cos_sim(embeddings, embeddings)
print("相似度矩阵：\n", similarity_matrix)
```

### 6.2 找到最相似的句子

```python
from sentence_transformers import SentenceTransformer, util
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
candidate_sentences = [
    "机器学习是人工智能的重要分支",
    "我喜欢在周末读技术博客",
    "深度学习依靠神经网络",
    "Python 是数据科学常用语言",
    "今天的天气非常适合散步"
]
query = "人工智能和机器学习"
query_embedding = model.encode(query, convert_to_tensor=True)
candidate_embeddings = model.encode(candidate_sentences, convert_to_tensor=True)
similarities = util.cos_sim(query_embedding, candidate_embeddings)[0]
best_match_idx = np.argmax(similarities.cpu().numpy())
print(f"查询：'{query}'")
print(f"最相似：{candidate_sentences[best_match_idx]}，相似度：{similarities[best_match_idx]:.4f}")
```

**余弦相似度**：1 表示一致，接近 1 表示相似，0 不相关，-1 相反。详见 [余弦相似度](/ai/AI课程-余弦相似度)。

---

## 7. 语义搜索：构建简单的搜索系统

### 7.1 基本语义搜索

```python
from sentence_transformers import SentenceTransformer, util
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
corpus = [
    "猫咪在沙发上睡觉",
    "狗狗在草地上奔跑",
    "程序员正在调试代码",
    "美食博主在分享菜谱",
    "学生正在准备考试"
]
query = "写代码的人在干什么"
corpus_embeddings = model.encode(corpus, convert_to_tensor=True)
query_embedding = model.encode(query, convert_to_tensor=True)
cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
top_k = 3
top_results = np.argsort(-cos_scores.cpu().numpy())[:top_k]
print(f"查询：'{query}'\n")
for idx in top_results:
    print(f"  {corpus[idx]}，相似度：{cos_scores[idx]:.4f}")
```

### 7.2 改进版：封装搜索函数

可封装 `semantic_search(query, corpus, model, top_k=3)`：检查空输入、编码 query 与 corpus、`util.cos_sim`、取 top_k 并返回 `(文档, 分数)` 列表。

---

## 8. 性能优化：批量处理与设备选择

- **批量编码**：增大 `batch_size`（如 64）可提速，内存紧张时减小（如 8）。
- **GPU 加速**：`device = "cuda" if torch.cuda.is_available() else "cpu"`，加载模型时传入 `SentenceTransformer(..., device=device)`，`encode(..., device=device)`。

---

## 9. 实战案例：文档推荐系统

可封装类 `DocumentRecommender(model_name="all-MiniLM-L6-v2")`：

- `add_documents(docs)`：将文档列表加入并编码存储。
- `recommend(query, top_k=3)`：对 query 编码，与库中向量算余弦相似度，返回 top_k 个 `(文档, 分数)`。
- `get_stats()`：返回文档数量等统计信息。

与 [ChromaDB](/ai/AI课程-chromadb)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 结合可扩展为完整 RAG 管线。

---

## 10. 使用中文模型

默认模型对中文可能不够友好，可使用中文优化模型：

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("shibing624/text2vec-base-chinese")
chinese_texts = [
    "机器学习是人工智能的重要分支",
    "深度学习依靠神经网络",
    "自然语言处理可以理解文本语义",
    "计算机视觉可以识别图像内容"
]
embeddings = model.encode(chinese_texts)
query = "人工智能和机器学习"
query_emb = model.encode(query, convert_to_tensor=True)
corpus_emb = model.encode(chinese_texts, convert_to_tensor=True)
scores = util.cos_sim(query_emb, corpus_emb)[0]
for text, score in zip(chinese_texts, scores):
    print(f"  {text}: {score:.4f}")
```

**模型选择建议**：通用用 `all-MiniLM-L6-v2`；中文用 `shibing624/text2vec-base-chinese`；多语言用 `paraphrase-multilingual-MiniLM-L12-v2`。

---

## 11. 常见问题与排查

| 问题 | 处理 |
|------|------|
| 模型下载慢/失败 | 设置 `HF_ENDPOINT=https://hf-mirror.com` 或使用镜像 |
| 内存不足 | 减小 `batch_size`（如 8） |
| 中文效果差 | 使用中文模型（见第 10 节） |
| 大量数据慢 | 增大 batch_size、GPU、或缓存已编码结果 |
| 版本兼容 | `pip install --upgrade torch transformers sentence-transformers` |

---

## 12. 参考

- [Sentence Transformers 官方文档](https://www.sbert.net/)
- [Hugging Face Model Hub](https://huggingface.co/models)

---

**相关文档**：[余弦相似度](/ai/AI课程-余弦相似度) · [ChromaDB](/ai/AI课程-chromadb) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [sentence_transformers（课程原文）](https://rag.docs-hub.com/html/sentence_transformers.html)
