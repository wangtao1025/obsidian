# AI 课程附录：模型与 API 速查

本页汇总课程中涉及的**聊天、嵌入、重排、图像转文本、语音**等模型类型及常见平台，便于在 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[RAGFlow](/ai/AI课程-RAGFlow)、[Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) 等章节中配置 LLM / Embedding / Rerank 时查阅。**具体 baseUrl、API Key、模型名以各平台当前文档为准；密钥请用环境变量或配置中心，勿写入代码或文档。**

---

## 一、配置项通用说明

| 配置项 | 说明 |
|--------|------|
| **baseUrl** | 接口地址（如 OpenAI 兼容的 `https://xxx/api/v3/chat/completions`、`/embeddings`） |
| **ApiKey** | 认证密钥，从平台控制台获取 |
| **Model** | 模型名称（如 deepseek-v3、doubao-seed-1-6-250615、bge-m3） |

课程中常用环境变量示例：`OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL_NAME`（名称因项目而异）。

---

## 二、按类型速查

### 2.1 聊天模型（Chat）

用于 RAG 生成答案、对话、推理。部分平台同时提供「蒸馏模型」（Distill），体积更小、延迟更低。

| 开发组织 | 典型模型 | 备注 |
|----------|----------|------|
| 01.ai | Yi-1.5-6B/9B/34B-Chat | 6B/9B/34B，部分 16K 上下文 |
| DeepSeek | DeepSeek-V3, DeepSeek-R1 | 通用对话 / 推理；蒸馏版如 R1-Distill-Qwen-1.5B/7B/14B/32B |
| Qwen | Qwen2-1.5B/7B, Qwen2.5-7B/14B/32B/72B | 多尺寸，部分 128K 上下文；QwQ-32B 推理 |
| Meta | Llama-3.1-8B/70B, Llama-3.3-70B | 需注意许可与合规 |
| Google | Gemma-2-9b-it, Gemma-2-27b-it | |
| InternLM | InternLM2.5-7B/20B-chat | |
| THUDM | ChatGLM3-6B, GLM-4-9B-chat | |
| DeepSeek | Janus-Pro-7B, deepseek-vl2 | 视觉语言 / 多模态 |

### 2.2 嵌入模型（Embedding）

用于文本/多语言向量化，RAG 入库与检索、Milvus 写入与搜索均会用到。

| 开发组织 | 典型模型 | 备注 |
|----------|----------|------|
| BAAI | bge-large-zh-v1.5, bge-large-en-v1.5, bge-m3 | 中/英/多语言；本地可用 Ollama 拉取 bge-m3 |
| Qwen | Qwen3-Embedding-0.6B/4B/8B | |
| 网易有道 | bce-embedding-base_v1 | |

### 2.3 重排模型（Rerank）

用于对检索结果做二次排序，提升 RAG 召回的精准度。

| 开发组织 | 典型模型 | 备注 |
|----------|----------|------|
| BAAI | bge-reranker-v2-m3 | 多语言；Ollama 可拉取 xitao/bge-reranker-v2-m3 |
| 网易有道 | bce-reranker-base_v1 | |

### 2.4 图像转文本（Image2Text）

用于 PDF/图片内文字识别、多模态理解，RAGFlow 等文档理解会用到。

| 开发组织 | 典型模型 | 备注 |
|----------|----------|------|
| Qwen | QVQ-72B-Preview | |
| DeepSeek | Janus-Pro-7B | 多模态 |
| 本地 | llava:7b（Ollama） | 图像理解 |

### 2.5 语音合成（TTS）

课程中涉及较少，按需查阅各平台文档。

| 开发组织 | 典型模型 | 备注 |
|----------|----------|------|
| FishAudio | fish-speech-1.5 | |
| FunAudioLLM | CosyVoice2-0.5B | |

---

## 三、常见平台与使用场景

| 场景 | 说明 |
|------|------|
| **RAG 第四讲 / RAGFlow** | 需配置 Chat（生成）+ Embedding（向量化）；可选 Rerank、Image2Text。 |
| **Milvus 嵌入与多模态** | 文本向量用 Embedding API；以图搜图用多模态嵌入（如 dashscope multimodal-embedding）。 |
| **本地部署** | Ollama 可拉取部分 Chat、Embedding、Rerank、Image2Text 模型，无需 API Key，见 [RAGFlow](/ai/AI课程-RAGFlow) 中 RAGFlow-Plus + Ollama 小节。 |
| **云端 API** | 火山方舟、硅基流动、DeepSeek、豆包、OpenRouter 等均提供 OpenAI 兼容或自有接口；模型列表与计费见各平台控制台。 |

---

## 四、参考与延伸

- 课程正文：[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[RAGFlow](/ai/AI课程-RAGFlow)、[Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus)。  
- 密钥与端点：一律使用环境变量或配置中心，不在仓库中提交真实 API Key。

---

*（本页为课程附录，便于配置模型与 API 时统一查阅；具体模型名与接口以各平台最新文档为准。）*
