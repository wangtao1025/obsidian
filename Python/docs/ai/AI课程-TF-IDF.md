# AI 课程：TF-IDF

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **TF-IDF** 文档，归在 **AI 分类**（检索与排序）。TF-IDF（Term Frequency–Inverse Document Frequency）是词频与逆文档频率的加权技术，用于评估词语在文档集中的重要性；无需训练，适合搜索引擎、文本相似度、关键词提取与文档分类。可与 [词袋模型（BagofWords）](/ai/AI课程-BagofWords)、[BM25（rank_bm25）](/ai/AI课程-rank_bm25)、[RAG 与向量基础](/ai/AI课程-RAG与向量基础)、[Scikit-learn](/python/AI课程-scikit-learn)（TfidfVectorizer）、[jieba](/python/AI课程-jieba) 搭配学习。

---

## 1. 什么是 TF-IDF？为什么需要？

- **是什么**：TF（词频）× IDF（逆文档频率）；词在单篇文档中出现多且在整个集合中少见，则权重高，具有区分度。
- **为什么需要**：找出重要词、过滤常见词（如「的」「是」）、量化词语重要性；用于检索、相似度、关键词与分类。
- **应用**：搜索引擎相关性、文档相似度（TF-IDF 向量 + 余弦相似度）、关键词提取、文档分类/聚类、自动摘要。

---

## 2. 前置概念（简要）

| 概念 | 说明 |
|------|------|
| **TF** | 词在文档中的出现次数或标准化频率（词频/文档总词数）。 |
| **DF** | 包含该词的文档数；越少则词越能区分文档。 |
| **IDF** | 逆文档频率，常用 log(N/(df+1))，N 为总文档数；词越稀有 IDF 越大。 |
| **词袋** | 文档表示为词集合/词频，忽略词序；TF-IDF 在词袋基础上对词加权。 |

---

## 3. 核心思想与公式

- **核心**：TF 高且 IDF 高 → 重要关键词；TF 高且 IDF 低 → 常见词（如停用词）；TF 低且 IDF 高 → 稀有但在此文档中不重要。
- **TF**：常用标准化 TF = 词在文档中出现次数 / 文档总词数；也可用原始计数或 log(1+计数)。
- **IDF**：IDF(t) = log(N / (df(t)+1))，加 1 避免除零。
- **TF-IDF**：TF-IDF(t,d) = TF(t,d) × IDF(t)；文档可表示为 TF-IDF 向量（按词表或稀疏表示）。

---

## 4. 实现与使用

- **手写**：预计算每词 DF 与 IDF；对每文档算每词的 TF，再乘 IDF 得到 TF-IDF 向量（稀疏字典或完整向量）。
- **Scikit-learn**：`TfidfVectorizer` 完成分词（或传入自定义 tokenizer）、DF/IDF 与向量化；`fit_transform` 得到矩阵；中文需先分词（如 jieba）再传入或通过 `tokenizer` 参数。
- **应用示例**：文档相似度（TF-IDF 矩阵 + `cosine_similarity`）；关键词提取（取每文档 TF-IDF 最高的 k 个词）。

---

## 5. 优缺点与常见问题

- **优点**：简单、高效、无监督、可解释；IDF 能压制停用词。
- **缺点**：词袋忽略词序与语义；长文档可能占优；未登录词无权重；不捕捉上下文。
- **中文**：必须先分词（如 [jieba](/python/AI课程-jieba)），再对分词结果做 TF-IDF。
- **规模**：小到中规模单机即可；大规模可稀疏矩阵、限制 `max_features`、过滤停用词（如 `max_df`）。

---

## 6. 与 BM25 的关系

- [BM25](/ai/AI课程-rank_bm25) 在 TF-IDF 思路上做了改进：词频饱和（非线性）、文档长度归一化（参数 b）、不同的 IDF 形式；检索效果通常更鲁棒。TF-IDF 适合简单检索与基线；BM25 适合需要更好效果与调参的检索场景。

---

**相关文档**：[词袋模型（BagofWords）](/ai/AI课程-BagofWords) · [BM25（rank_bm25）](/ai/AI课程-rank_bm25) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [余弦相似度](/ai/AI课程-余弦相似度) · [Scikit-learn](/python/AI课程-scikit-learn) · [jieba](/python/AI课程-jieba) · [知识体系与学习路径](/ai/知识体系与学习路径) · [TF-IDF（课程原文）](https://rag.docs-hub.com/html/TF-IDF.html)
