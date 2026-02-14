# AI

本分类下的 AI 相关文档入口。

> **新手建议先看**：[知识体系与学习路径](/ai/知识体系与学习路径) — 用流程图和脑图串起所有文档与概念，再按主线或按场景选读。若你从**前端转全栈**，可先看 [学习路径总览](/学习路径总览) 的「前端转全栈」建议路径。

## 课程总览（建议按顺序阅读）

| 讲次 | 文档 | 内容概要 |
|------|------|----------|
| 1 | [RAG 与向量基础](/ai/AI课程-RAG与向量基础) | 向量、向量嵌入、向量数据库概念与工作流程 |
| 2+3 | [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) | Milvus 安装/Attu/概念、PyMilvus 连接→集合→索引→插入→搜索、分区与混合搜索、IVF_FLAT、API Key |
| 4 | [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) | RAG 流程、文档解析与分块、向量化、extract/db/save/llm/query 工作流 |
| 5 | [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs) | Context Precision、Faithfulness、Answer Relevance、Context Recall 及评估流程 |
| — | [RAGFlow](/ai/AI课程-RAGFlow) | RAGFlow 定位、安装、核心特性、工作原理、应用场景及与 LangChain/商用平台对比 |
| — | [HNSW](/ai/AI课程-HNSW) | 分层可导航小世界图、向量近似最近邻、hnswlib 使用与简化实现 |
| 附录 | [模型与 API 速查](/ai/AI课程-模型与API速查) | Chat / Embedding / Rerank / Image2Text / TTS 及常见平台，配置时查阅 |

## 文档列表

| 文档 | 说明 |
|------|------|
| [知识体系与学习路径](/ai/知识体系与学习路径) | 流程图 + 脑图，整体串联各文档与概念（建议入口） |
| [RAG 与向量基础](/ai/AI课程-RAG与向量基础) | 向量、向量嵌入、向量数据库（第一讲） |
| [余弦相似度](/ai/AI课程-余弦相似度) | 向量相似度、L2/内积与余弦、RAG 检索基础 |
| [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) | Milvus 安装/Attu/概念 + PyMilvus 实战（第二+三讲合并） |
| [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) | RAG 流程、文档解析与分块、工作流代码（第四讲） |
| [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs) | RAG 评估维度与 RAGAs 指标（第五讲） |
| [RAGAS](/ai/AI课程-RAGAS) | RAGAS 框架：指标、用法、实际应用与 generate 兼容 |
| [RAGFlow](/ai/AI课程-RAGFlow) | RAGFlow 简介、安装、特性、原理、场景与对比 |
| [LangChain（LCEL 与链）](/ai/AI课程-LangChain) | Chat 模型、提示模板、示例选择器、输出解析器、LCEL、消息历史与多会话 |
| [Runnable（LCEL 核心）](/ai/AI课程-Runnable) | 统一接口 invoke/batch/stream、Lambda/Passthrough/Parallel/Branch、重试与 Config |
| [Pydantic](/python/AI课程-Pydantic) | 数据验证、请求体校验、FastAPI/LangChain 常用（文档在 Python 分类 · 第三方库） |
| [HNSW](/ai/AI课程-HNSW) | 向量近似最近邻、hnswlib、单层/分层原理与实现 |
| [FAISS](/ai/AI课程-faiss) | 高效向量相似度搜索、多种索引（Flat/IVF/HNSW）、RAG 与推荐 |
| [ChromaDB](/ai/AI课程-chromadb) | 轻量向量库、集合与查询、本地/持久化、与 Milvus/FAISS 对比 |
| [all-MiniLM-L6-v2](/ai/AI课程-all-MiniLM-L6-v2) | 轻量嵌入模型、本地向量化、与 RAG 检索衔接 |
| [词袋模型（BagofWords）](/ai/AI课程-BagofWords) | BoW 原理、三步骤、实现要点、优缺点与适用场景 |
| [TF-IDF](/ai/AI课程-TF-IDF) | 词频-逆文档频率、文档向量化、相似度与关键词提取、TfidfVectorizer |
| [BM25（rank_bm25）](/ai/AI课程-rank_bm25) | 查询-文档相关性评分、TF/IDF/长度归一化/词频饱和、rank_bm25 使用 |
| [MMR（最大边际相关性）](/ai/AI课程-MMR) | 相关性与多样性平衡、λ 参数、贪心选 k、检索/推荐/摘要 |
| [提示词工程（Prompt Engineering）](/ai/AI课程-PromptEngineering) | 角色/任务/格式/示例/约束、思维链、Few-shot、迭代优化 |
| [模型与 API 速查](/ai/AI课程-模型与API速查) | 模型类型与平台速查（配置 LLM/Embedding 时查阅） |

## 与 Python 分类的交叉

课程里用到的**标准库与第三方库**（math、typing、collections、random、abc、jieba、BeautifulSoup4、lxml、OpenPyXL、PyMuPDF、Pydantic、python-docx、python-pptx、Requests、text_splitter、Sentence Transformers、OpenAI、NumPy、Scikit-learn 等）文档**统一放在 Python 分类**：侧栏「标准库」「第三方库（课程内）」；标准库总览在 [语法手册第11章](/python/python语法手册-11-标准库)。AI 分类只放 RAG、向量、检索、评估等。从 AI 侧跳转：[知识体系与学习路径](/ai/知识体系与学习路径#四、与-python-分类的交叉) 的交叉表；从 Python 侧：[Python 首页](/python/) 侧栏或首页表格。
