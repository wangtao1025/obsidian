# AI 课程：大语言模型（llm）

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **llm** 文档，文档归在 **AI 分类**。介绍大语言模型（LLM）的基本概念、工作原理（文字接龙、概率生成）、Token 与词表、分词与 tiktoken、temperature/top_p 采样；与 [OpenAI](/python/AI课程-openai)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配理解「模型如何生成文本」与「如何调参」。

---

## 1. 什么是大语言模型？

大语言模型（Large Language Model, LLM）是根据输入文字**逐字/逐 token 预测并生成**后续内容的模型；参数量与训练数据规模大，能理解、生成、推理。常见如 ChatGPT、GPT-4、文心一言、通义千问、Claude 等。回答「一段一段」流式输出，是因为模型本质是**文字接龙**：每步只生成下一个 token，再与已有内容一起作为输入继续生成。

---

## 2. 基本工作原理

- **核心**：文字接龙。输入「什么是大语言模型」→ 模型先输出「大」→ 再以「什么是大语言模型大」为输入输出「语」→ 依此类推，直到生成结束标记。
- **概率**：每一步模型对所有可能 token 给出概率分布；通常**概率越高越容易被选中**，但会保留一定随机性，所以同一问题多次回答可能不同。
- **温度（temperature）**：低温度更确定（偏向最高概率），高温度更随机（分布更均匀）。

---

## 3. Token 与词表（Vocab）

- **Token**：模型处理文本的基本单位，可对应字、词或子词；计费与长度限制都按 token 算（如 GPT-4o 按百万 token 计费）。
- **中英文大致关系**：英文约 1 token ≈ 0.75 词 ≈ 4 字符；中文约 1 token ≈ 1–2 汉字。
- **词表（Vocab）**：所有可能 token 的集合；不同模型词表大小不同（如数万到十余万）。Token 常采用**子词（Subword）**，兼顾语义与词表规模、缓解未登录词（OOV）问题。

---

## 4. 分词（Tokenization）与 tiktoken

- **分词**：把文本切分成 token 序列；输入时 文本→Token 序列→模型，输出时 模型→Token 序列→文本（逆分词）。
- **tiktoken**：OpenAI 的分词库，按 GPT 等模型的编码规则切分；支持多种编码（如 cl100k_base）。用于**精确统计 token 数**、配合 [text_splitter](/python/AI课程-text_splitter) 控制 chunk 大小、评估是否超长。
- 示例：`import tiktoken` → `enc = tiktoken.get_encoding("cl100k_base")` → `tokens = enc.encode("Hello, world!")`，`len(tokens)` 即 token 数。
- **Tiktokenizer**：网页工具 [tiktokenizer.vercel.app](https://tiktokenizer.vercel.app)，可直观查看文本在 GPT 中的分词结果。

---

## 5. temperature 与 top_p

- **temperature**：对概率做缩放 `prob^(1/temperature)`。`temperature < 1` 更确定，`> 1` 更随机，`= 0` 等价于只选概率最高 token。
- **top_p（核采样）**：只从「累积概率达到 top_p」的候选中采样，过滤低概率尾部。`top_p=1` 考虑全部，`< 1` 只考虑高概率候选。
- **采样流程**：先按 top_p 过滤 → 再 temperature 缩放并归一化 → 按概率采样得到下一个 token。

---

## 6. 课程中的简版实现要点

课程用「词→下一个词概率」的简版模型演示：维护词表、统计词对出现次数、算概率；预测时用 temperature/top_p 做缩放与过滤后采样。真实 LLM 以 **token + 深度网络** 实现，但「概率分布 → 采样」的思路一致。

---

**相关文档**：[OpenAI](/python/AI课程-openai) · [text_splitter](/python/AI课程-text_splitter) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [llm（课程原文）](https://rag.docs-hub.com/html/llm.html)
