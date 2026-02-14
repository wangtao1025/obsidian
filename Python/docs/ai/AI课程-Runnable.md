# AI 课程：Runnable

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **Runnable** 文档，归在 **AI 分类**（LCEL 核心）。Runnable 是 LangChain 中所有可执行组件的统一接口，提供 `invoke`、`batch`、`stream` 等一致调用方式，并用管道符 `|` 做链式组合，是 [LCEL](/ai/AI课程-LangChain) 的基础。可与 [LangChain（LCEL 与链）](/ai/AI课程-LangChain)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配学习。

---

## 1. 什么是 Runnable？为什么需要？

- **Runnable**：LangChain 的核心抽象，为 LLM、提示模板、解析器、自定义函数等提供**统一接口**；只要实现该接口，即可用相同方式调用与用 `|` 组合。
- **为什么需要**：无统一接口时各组件调用方式不同（如 `run`/`invoke`/`format`/`parse`），难以串联；Runnable 后统一用 `.invoke()` 并可用 `prompt | llm | parser` 组合。

---

## 2. 前置概念

- **接口**：约定组件应提供的方法（如 [abc](/python/AI课程-abc) 中的抽象方法），不关心内部实现。
- **管道符 `|`**：在 LCEL 中重载为「前一步输出作为后一步输入」的链式连接。
- **链式调用**：多步顺序执行，上一步输出即下一步输入。

---

## 3. 核心方法

| 方法 | 说明 |
|------|------|
| **invoke(input)** | 同步单次调用，最常用。 |
| **batch(inputs)** | 批量调用，比多次 invoke 更高效。 |
| **stream(input)** | 流式返回，逐步产出结果。 |
| **ainvoke** | 异步版 invoke。 |

---

## 4. 常用 Runnable 类型

| 类型 | 说明 |
|------|------|
| **RunnableLambda** | 将普通 Python 函数包装成 Runnable，便于接入链。 |
| **RunnablePassthrough** | 原样传递输入，不处理；可用于在链中保留原始输入或配合 assign 追加字段。 |
| **RunnableParallel** | 同一输入并行执行多个 Runnable，结果合并为字典 `{ key: result }`。 |
| **RunnableBranch** | 按条件选分支：多组 `(condition, runnable)` + 默认分支。 |
| **管道 `\|`** | 顺序组合：`step1 \| step2 \| step3`，形成 RunnableSequence。 |

---

## 5. LCEL 进阶：重试、Config、动态参数

- **重试（Retry）**：对 Runnable 包装 `with_retry`，指定异常类型、最大次数等，提高链的健壮性。
- **Config**：在 `invoke(..., config=...)` 中传递 run_name、metadata、callbacks、**configurable** 等，供各步共享（如 session_id、temperature）。
- **动态参数**：运行时根据输入或 config 生成提示、参数，实现「同一链、不同提示/参数」。

---

## 6. 使用要点

- **类型匹配**：链中相邻步骤的**输出类型**须与下一步的**输入类型**一致，否则会报错。
- **顺序**：`|` 的顺序决定执行顺序，不同顺序结果不同。
- **问答链示例**：`prompt_runnable | llm_runnable | parser_runnable`，即「组提示 → 调 LLM → 解析输出」，详见 [LangChain](/ai/AI课程-LangChain)。

---

## 7. 小结

- **Runnable**：统一接口（invoke/batch/stream）+ 管道组合（`|`），是 LCEL 的基石。
- **RunnableLambda / Passthrough / Parallel / Branch**：包装函数、透传、并行、分支，覆盖常见编排需求。
- **Config 与重试**：传递上下文、提高稳定性；与 [LangChain](/ai/AI课程-LangChain) 的 Chat、提示、解析器结合即可搭建 RAG 与多轮对话。

---

**相关文档**：[LangChain（LCEL 与链）](/ai/AI课程-LangChain) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [Runnable（课程原文）](https://rag.docs-hub.com/html/Runnable.html)
