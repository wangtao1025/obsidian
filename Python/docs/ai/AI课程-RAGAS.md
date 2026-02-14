# AI 课程：RAGAS

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **RAGAS** 文档，归在 **AI 分类**（评估与框架）。RAGAS（Retrieval-Augmented Generation Assessment）是用于评估 RAG 系统质量的 Python 框架，用 LLM 作为评判员做无参考/少参考的自动化评估。可与 [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配学习。

---

## 1. 什么是 RAGAS？

- **定义**：专门评估 RAG 系统质量的 Python 框架，使用大语言模型自动评估各关键维度，无需大量人工标注。
- **特点**：无参考评估（多数指标不需标准答案）、多维度（检索 + 生成）、自动化、API 简单。
- **价值**：发现问题、明确优化方向（检索器 vs 生成器）、做配置/模型对比、持续监控生产表现。

---

## 2. 核心评估指标

| 层次 | 指标 | 含义 |
|------|------|------|
| **检索器** | Context Precision | 检索到的文档中有多少真正相关，以及相关文档是否排前面 |
| **检索器** | Context Recall | 检索结果是否覆盖回答问题所需的关键信息 |
| **生成器** | Faithfulness | 答案是否忠实于检索到的文档，有无编造或矛盾 |
| **生成器** | Answer Relevance | 答案是否直接回答问题、是否跑题或冗余 |

理想情况各指标接近 1.0。流程：检索器评估（Context Precision + Context Recall）→ 生成器评估（Faithfulness + Answer Relevance）→ 整体质量。

---

## 3. 用法示例

- 数据格式：`question`、`answer`、`contexts`（列表的列表）、`ground_truth`（可选，用于 context recall 等）。
- 使用 HuggingFace `Dataset.from_dict()` 构造数据集，`ragas.evaluate()` 传入 `dataset`、`llm`、`embeddings`、`metrics=[context_precision, context_recall, faithfulness, answer_relevancy]`。
- 结果可 `result.to_pandas()` 查看各条得分与均值。

---

## 4. 实际应用流程

1. **准备测试数据**：ChromaDB + 本地 Embedding（如 Sentence Transformers）插入测试文档，保证有可检索的上下文。
2. **准备 RAG**：实现 `Rag` 类（检索 + 构建 prompt + LLM 生成），准备 `questions` 与 `ground_truths`。
3. **生成答案**：对每个问题调用 `rag.answer()`，收集 `answers` 与 `contexts`。
4. **评测**：用 `Dataset.from_dict({"question": questions, "answer": answers, "contexts": contexts, "ground_truth": ground_truths})` 构建数据集，调用 `evaluate(..., llm=eval_llm, embeddings=eval_embedding, metrics=[...], run_config=RunConfig(timeout=1200))` 得到 RAGAS 各项分数。

---

## 5. generate 方法（与 ragas 兼容）

- ragas 会以**异步**方式调用 LLM。若本地 LLM 只有同步 `invoke()`，可增加异步方法 `async def generate(self, prompt, stop=None, **kwargs)`。
- **做法**：对 `prompt` 做兼容（支持 list/str）→ 用 `functools.partial` 绑定 `invoke` → `await loop.run_in_executor(None, invoke_func)` 在线程池中跑同步调用 → 返回 ragas 期望的 `GenerationResult`（含 `generations = [[Generation(text)]]`）。
- 这样既保留同步用法，又满足 ragas 的异步接口与返回结构。

---

## 6. 总结

- **核心**：RAGAS 是自动化、多维度的 RAG 评估框架；四大指标覆盖检索与生成；流程为准备数据 → 跑 RAG 得 answer/contexts → 调用 `evaluate` 看结果。
- **适用**：开发/迭代 RAG 时评估质量、对比配置或模型、监控线上表现。
- **不适用**：需要极高精度人工评估、对 API 成本极敏感、或需评估特定领域专业知识时，RAGAS 为近似评估，可作参考而非唯一标准。

---

**相关文档**：[RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [RAGAS（课程原文）](https://rag.docs-hub.com/html/RAGAS.html)
