# AI 课程：OpenAI（Python 库）

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **openai** 文档，文档归在 **Python 分类**（与 Requests、Sentence Transformers 等同为课程用到的第三方库）。OpenAI 官方 Python 库用于调用 ChatGPT、DALL-E、Whisper、Embeddings 等 API；RAG 中常用于调用大模型生成、嵌入接口。可与 [Requests](/python/AI课程-requests)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配学习。

---

## 1. 什么是 OpenAI 库？

OpenAI 官方 Python 包，用于与 OpenAI 服务交互：**文本对话**（ChatGPT）、**图像生成**（DALL-E）、**语音转文字**（Whisper）、**文本嵌入**（Embeddings）。需在 [OpenAI 平台](https://platform.openai.com/) 获取 API Key，按 token 计费。

---

## 2. 前置概念

| 概念 | 说明 |
|------|------|
| **API** | 应用程序接口，向服务器发请求、收结果 |
| **API Key** | 身份与计费凭证，勿提交到代码仓库；推荐环境变量 `OPENAI_API_KEY` |
| **Model** | 如 gpt-4o、gpt-4、dall-e-3、whisper-1、text-embedding-ada-002 |
| **Token** | 计费与长度单位；英文约 0.75 词/token，中文约 1–2 字/token |

---

## 3. 安装与验证

- 安装：`python -m pip install openai`（或 `python3 -m pip install openai`）。
- 验证：`from openai import OpenAI` 无报错即可。API Key 可用环境变量或 `OpenAI(api_key="...")`（生产环境勿写死在代码中）。

---

## 4. 初始化客户端

- **推荐**：`export OPENAI_API_KEY="your-api-key-here"`（或 Windows `$env:OPENAI_API_KEY = "..."`）→ `client = OpenAI()`。
- 或：`client = OpenAI(api_key="your-api-key-here")`。
- 可选：`base_url`（兼容代理/自建）、`timeout`、`organization`。

---

## 5. 与 ChatGPT 对话

- **单轮**：`response = client.chat.completions.create(model="gpt-4o", messages=[{"role": "user", "content": "1+1=?"}], max_tokens=500, temperature=0.7)` → `reply = response.choices[0].message.content`。
- **多轮**：将历史消息依次加入 `messages`（含 `role: "system"`/`"user"`/`"assistant"`），每次请求传入完整列表。
- **流式**：`stream=True`，遍历 `for chunk in response`，取 `chunk.choices[0].delta.content` 逐段输出。

---

## 6. 核心功能

- **Chat Completions**：`client.chat.completions.create(model, messages, max_tokens, temperature, stream=...)`；参数含 `top_p`、`n` 等。
- **图像生成**：`client.images.generate(model="dall-e-3", prompt="...", size="1024x1024", quality="standard")` → `response.data[0].url`。
- **语音转文字**：`client.audio.transcriptions.create(model="whisper-1", file=open("audio.mp3","rb"))`；`translations.create` 可译成英文。
- **文本嵌入**：`client.embeddings.create(model="text-embedding-ada-002", input="文本" 或 列表)` → `response.data[0].embedding`。

---

## 7. 错误处理与重试

- 常见异常：`OpenAIError`、`RateLimitError`、`APIConnectionError`、`APIError`。可用 `try/except` 捕获，对限流/网络错误做指数退避重试。
- 建议：始终设 `timeout`，Key 用环境变量或密文配置，不写死在源码中。

---

## 8. 最佳实践

- **Key 安全**：环境变量或独立配置文件，不提交 Git。
- **成本**：按 token 计费；控制 `max_tokens`、对话长度；简单任务用 gpt-4o。
- **参数**：创意类可 `temperature` 偏高；代码/总结类偏低；流式输出适合长回复体验。

---

## 9. 常见问题

| 问题 | 处理 |
|------|------|
| API Key 错误 | 检查无空格、环境变量生效、平台端 Key 有效 |
| 请求频率超限 | 限流重试、检查用量与配额 |
| Token 超长 | 缩短输入或历史、或换更大 context 模型 |
| 网络错误 | 检查网络/代理；国内可能需要代理 |
| 模型不存在 | 核对模型名（如 gpt-4o），查官方文档当前可用模型 |

---

## 10. 参考

- [OpenAI 平台文档](https://platform.openai.com/docs)
- [openai-python GitHub](https://github.com/openai/openai-python)

---

**相关文档**：[Requests](/python/AI课程-requests) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [openai（课程原文）](https://rag.docs-hub.com/html/openai.html)
