# AI 课程：LangChain（LCEL 与链）

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **LangChain** 相关文档，归在 **AI 分类**（框架与链式编排）。LangChain 提供统一的 Chat 模型封装、提示模板、示例选择器、输出解析器，以及 **LCEL（LangChain Expression Language）** 用 `|` 串联 Runnable 链，适合 RAG 流程、多轮对话与可配置流水线。可与 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[RAG 与向量基础](/ai/AI课程-RAG与向量基础) 搭配学习。

---

## 1. Chat 模型与消息

| 组件 | 说明 |
|------|------|
| **ChatOpenAI** | 封装 OpenAI 聊天 API，`invoke(input)` 返回 `AIMessage`；支持字符串或消息列表输入。 |
| **ChatDeepSeek** | 与 ChatOpenAI 接口一致，`base_url` 指向 DeepSeek；需 `api_key` 或 `DEEPSEEK_API_KEY`。 |
| **ChatTongyi** | 通义千问封装，`base_url` 为阿里云兼容端点；需 `DASHSCOPE_API_KEY`。 |
| **BaseMessage / HumanMessage / AIMessage / SystemMessage** | 统一消息类型，含 `content`、`type`；多轮对话时组合成 `messages` 列表传入 `invoke`。 |

多轮对话：构造 `[SystemMessage, HumanMessage, AIMessage, HumanMessage, ...]`，每次调用后把返回的 `AIMessage` 与新的 `HumanMessage` 追加到列表再传入下一轮。

---

## 2. 提示模板

| 组件 | 说明 |
|------|------|
| **PromptTemplate** | `from_template("你好，{name}")`，`format(name="张三")`；支持 `partial(role="AI")` 预填部分变量。 |
| **ChatPromptTemplate** | 多角色消息模板：`(system/human/ai, template)` 或 `from_messages([...])`；`invoke(...)` 返回 `ChatPromptValue`，`format_messages(...)` 返回消息列表。 |
| **MessagesPlaceholder** | 在模板中占位 `variable_name`，格式化时传入该 key 的消息列表，自动展开到对应位置。 |
| **FewShotPromptTemplate** | `examples` + `example_prompt` + `prefix`/`suffix`；可选 `example_selector` 动态选示例。 |
| **load_prompt** | 从 JSON 文件（`_type: "prompt"`, `template`）加载 `PromptTemplate`。 |
| **PipelinePromptTemplate** | 多个中间模板依次格式化，输出 `output_0`, `output_1`… 再交给 `final_prompt` 拼成最终字符串。 |

---

## 3. 示例选择器

| 组件 | 说明 |
|------|------|
| **LengthBasedExampleSelector** | 按输入长度在 `max_length` 内尽量多选示例，避免超长。 |
| **SemanticSimilarityExampleSelector** | 用嵌入 + 向量库（如 [FAISS](/ai/AI课程-faiss)）按与 query 的语义相似度选 top-k 示例。 |
| **MaxMarginalRelevanceExampleSelector** | 在相似度基础上加多样性（[MMR](/ai/AI课程-MMR)），`fetch_k` 初选再选 k 条。 |
| **BaseExampleSelector** | 抽象基类，需实现 `select_examples(input_variables)` 与 `add_example(example)`；可自定义关键词、随机等策略。 |

与 `FewShotPromptTemplate` 的 `example_selector` 参数配合，自动按当前输入选示例。

---

## 4. 输出解析器

| 组件 | 说明 |
|------|------|
| **StrOutputParser** | 保证输出为字符串，不改内容。 |
| **JsonOutputParser** | 从文本中提取 JSON（含 markdown 代码块），可选 `get_format_instructions()` 供 prompt 使用。 |
| **PydanticOutputParser** | 基于 [Pydantic](/python/AI课程-Pydantic) 模型校验与结构化；`get_format_instructions()` 生成 schema 说明。 |
| **OutputFixingParser** | 包装任意解析器，解析失败时用 LLM 修复再重试。 |
| **RetryOutputParser / RetryWithErrorOutputParser** | 需 `parse_with_prompt(completion, prompt_value)`，失败时把 prompt + 错误信息交给 LLM 重新生成再解析。 |
| **BaseOutputParser** | 抽象基类，实现 `parse(text)`；可扩展布尔、列表、键值对、正则等解析器。 |

---

## 5. LCEL 与 Runnable

**LCEL**：用 `|` 把多个步骤串成链，数据从左到右流动。支持 `invoke`、`batch`、`stream`。Runnable 的详细说明见 [Runnable（LCEL 核心）](/ai/AI课程-Runnable)。

| 组件 | 说明 |
|------|------|
| **Runnable** | 抽象接口：`invoke(input)`、`batch(inputs)`、`stream(input)`；可用 `|` 组合。 |
| **RunnableSequence** | 顺序执行多个步骤，每步输出作为下一步输入；`prompt \| llm \| parser` 即序列。 |
| **RunnableLambda** | 将普通函数包装成 Runnable，便于插入链中做变换。 |
| **RunnableParallel** | 同一输入并行跑多路，返回 `{ key: result }` 字典。 |
| **RunnablePassthrough** | 恒等传递；`RunnablePassthrough.assign(**kwargs)` 在字典上追加字段。 |
| **RunnableBranch** | 按条件选分支：多组 `(condition, runnable)` + 默认分支。 |
| **with_retry** | 为 Runnable 加重试：`retry_if_exception_type`、`stop_after_attempt`、可选指数退避。 |

---

## 6. Config 与 ConfigurableField

- **Config**：以字典形式在 `invoke(..., config=...)` 中传递 `run_name`、`run_id`、`tags`、`metadata`、`callbacks`、`max_concurrency`、`configurable` 等，用于追踪、回调与运行时参数。
- **with_config**：绑定默认 config，返回新 Runnable，调用时自动合并；传入的 config 可覆盖绑定值。
- **ConfigurableField**：通过 `configurable_fields(...)` 声明可配置字段，运行时从 `config["configurable"]` 读入，实现同一链不同 temperature、模板等。

---

## 7. 消息历史与多会话

| 组件 | 说明 |
|------|------|
| **ChatMessageHistory** | 内存消息列表：`add_user_message` / `add_ai_message` / `add_message`，`messages` 只读，`clear()` 清空。 |
| **RunnableWithMessageHistory** | 包装任意 Runnable，按 `config["configurable"]["session_id"]` 取历史；自动把历史注入输入、把本轮输入与输出写回历史。需 `get_session_history(session_id)` 工厂。 |
| **SQLChatMessageHistory** | 基于 SQL（如 SQLite）持久化同一 session 的消息；`connection_string`、`table_name` 可配。 |

多会话：为每个用户/会话维护独立 `session_id`，由 `get_session_history` 返回对应存储（内存或 SQL），实现隔离与持久化。

---

## 8. 小结

- **Chat + 消息 + 多轮**：统一消息类型与列表，配合 Chat 模型即可做多轮对话。
- **提示**：PromptTemplate / ChatPromptTemplate / MessagesPlaceholder / FewShot / Pipeline 覆盖单轮、多轮与管道式提示。
- **示例与解析**：示例选择器与 FewShot 结合；输出解析器保证字符串或结构化结果，修复/重试解析器提高鲁棒性。
- **LCEL**：Runnable 序列、并行、分支、Passthrough、Lambda、重试与 Config，适合 RAG 与可配置流水线。
- **历史**：ChatMessageHistory + RunnableWithMessageHistory + SQL 持久化，实现带记忆的多会话对话。

---

**相关文档**：[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs) · [知识体系与学习路径](/ai/知识体系与学习路径) · [LangChain（课程原文）](https://rag.docs-hub.com/html/langchain.html)
