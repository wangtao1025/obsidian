# AI

本分类下的 AI 相关文档入口。

> **新手建议先看**：[知识体系与学习路径](/ai/知识体系与学习路径) — 用流程图和脑图串起所有文档与概念，再按主线或按场景选读。

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
| [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) | Milvus 安装/Attu/概念 + PyMilvus 实战（第二+三讲合并） |
| [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) | RAG 流程、文档解析与分块、工作流代码（第四讲） |
| [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs) | RAG 评估维度与 RAGAs 指标（第五讲） |
| [RAGFlow](/ai/AI课程-RAGFlow) | RAGFlow 简介、安装、特性、原理、场景与对比 |
| [HNSW](/ai/AI课程-HNSW) | 向量近似最近邻、hnswlib、单层/分层原理与实现 |
| [模型与 API 速查](/ai/AI课程-模型与API速查) | 模型类型与平台速查（配置 LLM/Embedding 时查阅） |

## 与 Python 分类的交叉

课程里用到的**标准库与第三方库**（math、typing、jieba、BeautifulSoup4 等）文档**统一放在 Python 分类**：侧栏「标准库」「第三方库（课程内）」；标准库总览在 [语法手册第11章](/python/python语法手册-11-标准库)。AI 分类只放 RAG、向量、检索、评估等。从 AI 侧跳转：[知识体系与学习路径](/ai/知识体系与学习路径#四、与-python-分类的交叉) 的交叉表；从 Python 侧：[Python 首页](/python/) 侧栏或首页表格。
