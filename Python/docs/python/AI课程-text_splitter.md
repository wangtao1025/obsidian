# AI 课程：文本分割器（text_splitter）

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **text_splitter** 文档，文档归在 **Python 分类**（与 jieba、PyMuPDF、python-docx、Requests 等同为课程用到的工具/库）。文本分割器将长文档拆成小块（chunk），用于满足模型上下文限制、提高 RAG 检索精度、保持语义完整；课程以 **LangChain** 的 `langchain-text-splitters` 为主（如 RecursiveCharacterTextSplitter）。可与 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[Sentence Transformers](/python/AI课程-sentence_transformers) 等搭配学习。

---

## 1. 什么是文本分割器？

文本分割器（Text Splitter）把长文档拆成较小、可单独检索的文本片段（chunk）。用途包括：**模型上下文限制**（如 512/4096 token）、**RAG 检索效率**（按块检索）、**语义完整性**（尽量在段落/句子边界切分）。核心挑战：如何不破坏语义、如何定块大小、如何应对无词边界语言（如中文）。

---

## 2. 安装

- 安装：`python -m pip install langchain-text-splitters`（或 `python3 -m pip install langchain-text-splitters`）。按 token 分割时需 `pip install tiktoken`。
- 验证：`from langchain_text_splitters import RecursiveCharacterTextSplitter` 无报错即可。

---

## 3. 前置概念

| 概念 | 说明 |
|------|------|
| **Chunk Size** | 每块最大长度（字符数或 token 数），需结合模型限制与文档类型 |
| **Chunk Overlap** | 相邻块重叠长度，用于保持上下文、避免在句/段中间切断 |
| **Separators** | 分隔符列表，按从粗到细使用，如 `["\n\n", "\n", " ", ""]`（段落→行→词→字符） |

---

## 4. 三种主要策略

- **基于长度**：严格按长度切，如 `CharacterTextSplitter(chunk_size=100, chunk_overlap=0, separator="")`；或 `RecursiveCharacterTextSplitter.from_tiktoken_encoder(encoding_name="cl100k_base", chunk_size=100)` 按 token。块大小一致，不保证语义边界。
- **基于文本结构（推荐）**：先用段落（`\n\n`），再句子（`\n`、`.`），再词（空格），最后字符。**RecursiveCharacterTextSplitter** 默认即此，在语义与块大小间折中，适合多数 RAG。
- **基于文档结构**：按 Markdown 标题（`MarkdownHeaderTextSplitter`）、代码结构（`RecursiveCharacterTextSplitter.from_language(Language.PYTHON, ...)`）等切分，保留层级与语法完整。

---

## 5. RecursiveCharacterTextSplitter 要点

- 参数：`chunk_size`、`chunk_overlap`（建议为 chunk_size 的 10–20%）、`length_function`（默认 `len`）、`separators`（默认 `["\n\n", "\n", " ", ""]`）。
- 流程：按分隔符优先级选第一个存在的分隔符切分 → 若某段仍超长则用更细分隔符递归切 → 小块用 `_merge_splits` 合并到不超过 `chunk_size`，并在合并时施加 `chunk_overlap`（相邻块保留重叠）。
- 使用：`text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)` → `texts = text_splitter.split_text(document)` 或 `docs = text_splitter.create_documents([text])`。

---

## 6. 无词边界语言（如中文）

- 默认分隔符偏英文，中文等无空格分词的语言易在不当处切断。**处理**：在 `separators` 中加入中文标点，如 `["\n\n", "\n", " ", "。", "，", "、", ""]`；中英混合可再加 `"！", "？", "；"` 等。
- 示例：`RecursiveCharacterTextSplitter(separators=["\n\n", "\n", "。", "，", " ", ""], chunk_size=100, chunk_overlap=20)`。

---

## 7. 常见问题

| 问题 | 处理 |
|------|------|
| 块大小不一致 | 递归分割会尽量在语义边界切，块可能小于 chunk_size；若需固定大小可用 CharacterTextSplitter |
| 中文切分差 | 在 separators 中增加中文标点（。，、等） |
| 重叠导致重复 | 为设计如此；不需重叠则 `chunk_overlap=0`，检索端可做去重 |
| 分割慢 | 减少分隔符数量、用更简单分割器或并行处理多文件 |
| Token 计数不准 | 确认 tiktoken 编码与所用模型一致（如 GPT-4 用 cl100k_base） |

---

## 8. 参考与相关

- [LangChain Text Splitters 文档](https://python.langchain.com/docs/modules/data_connection/document_transformers/)
- 课程内对 RecursiveCharacterTextSplitter 的逐步实现（简单拆分 → 递归分隔 → 合并小块 → 重叠字符）及执行流程图见课程原文。

---

**相关文档**：[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [Sentence Transformers](/python/AI课程-sentence_transformers) · [知识体系与学习路径](/ai/知识体系与学习路径) · [text_splitter（课程原文）](https://rag.docs-hub.com/html/text_splitter.html)
