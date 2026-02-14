# AI 课程笔记：RAGFlow

来源课程：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）RAGFlow 章节。以下为 RAGFlow 定位、安装、核心特性、工作原理、应用场景及与 LangChain/商用平台对比的整理。

---

## 一、什么是 RAGFlow？

RAGFlow 是一个基于 **RAG（检索增强生成）** 技术的开源 AI 应用解决方案。它通过**可视化**的方式，让开发者甚至非技术背景的业务专家，都能快速构建基于私有知识的智能问答、文档分析和内容生成系统。

### 1.1 生活中的类比

想象你要建一个智能客服，让用户通过提问快速从产品文档里找信息。

| 传统方法 | 使用 RAGFlow |
|----------|--------------|
| 需编写大量代码 | 通过可视化界面拖拽组件 |
| 需理解复杂 RAG 细节 | 无需写代码 |
| 调试和优化困难 | 直观地调试和优化 |
| 需要专业开发 | 非技术人员也能使用 |

RAGFlow 相当于「可视化 RAG 编排工具」，用拖拽方式构建 RAG 系统。

### 1.2 核心定位

**企业级、高性能、低门槛的 RAG 应用开发平台。**

- **可视化工作流**：用图形界面设计和优化 RAG 流程。  
- **深度文档理解**：支持文本、表格、图片等多种格式。  
- **精准引用溯源**：每个答案标注来源，可追溯可核实。  
- **开源可私有化**：完全开源，可自主部署。

### 1.3 为什么选择 RAGFlow？

- **vs 传统 RAG 开发**：传统需大量编码与调试，RAGFlow 提供界面与直观步骤。  
- **vs 商用闭源平台**：商用多付费且数据可能上云，RAGFlow 免费开源、可私有化、可完全自定义。

---

## 二、安装

### 2.1 环境准备

- 可选用：免费体验机、轻量云主机或按量付费云服务器。  
- 登录服务器：`ssh root@你的服务器IP`，或使用 Xshell 等终端工具。

### 2.2 安装宝塔面板（可选）

用于在 Web 界面安装 Docker、管理主机。

```bash
wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh && sudo bash install_panel.sh
```

安装成功后按提示访问面板地址，云服务器需在安全组放行面板端口（如 29978）。

### 2.3 安装 Docker

在宝塔面板中安装 Docker，或于服务器上执行发行版对应的 Docker 安装命令。

### 2.4 启动 RAGFlow

```bash
git clone https://gitee.com/bopisky/ragflow.git
cd ragflow
git checkout -f v0.20.5
cd docker
```

修改 `docker` 目录下的 `.env`：将  
`RAGFLOW_IMAGE=infiniflow/ragflow:v0.20.5-slim`  
改为  
`RAGFLOW_IMAGE=infiniflow/ragflow:v0.20.5`（如需完整版功能）。

```bash
docker compose -f docker-compose.yml up -d
```

### 2.5 访问

浏览器访问 `http://你的服务器IP` 即可使用 RAGFlow。

### 2.6 RAGFlow-Plus（可选）

[RAGFlow-Plus](https://gitee.com/yakou/ragflow-plus) 提供前台/后台应用管理，便于配置模型与知识库。

**部署：**

```bash
git clone https://gitee.com/yakou/ragflow-plus
cd ragflow-plus
docker compose -f docker/docker-compose.yml up -d
```

**搭配 Ollama 使用本地模型（无需 API Key）：**

```bash
# 拉取并运行 Ollama 容器（端口 11434，数据可挂载到宿主机）
docker pull docker.1ms.run/ollama/ollama
docker run --rm -d -v /data/ollama:/root/.ollama -p 11434:11434 --name ollama docker.1ms.run/ollama/ollama

# 聊天模型（示例）
docker exec -it ollama ollama run deepseek-r1:1.5b

# 向量化模型
docker exec -it ollama ollama pull bge-m3:latest

# 重排序模型
docker exec -it ollama ollama pull xitao/bge-reranker-v2-m3

# 图像转文本
docker exec -it ollama ollama pull llava:7b
```

在 RAGFlow-Plus 后台将 Chat / Embedding / Rerank 指向本机 Ollama 的 baseUrl 和对应模型名即可。

### 2.7 模型与 API 配置要点

- **聊天 / 嵌入 / 重排** 等需配置对应 API（OpenAI 兼容接口、火山方舟、硅基流动等），或在本地用 Ollama（见上）。  
- 在 RAGFlow / RAGFlow-Plus 中填写 `OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL_NAME` 等（或各平台等价配置）。  
- **切勿在文档或代码中提交真实 API Key**，应使用环境变量或配置中心。  
- **模型与平台速查**（Chat、Embedding、Rerank、Image2Text、TTS 及常见平台）：见 [模型与 API 速查](/ai/AI课程-模型与API速查)。

---

## 三、RAGFlow 的核心特性

### 3.1 深度文档理解

不仅处理纯文本，还能理解复杂文档结构。

- **格式**：TXT、Markdown、Word、Excel、PowerPoint、PDF（含图片）、图片（OCR）。  
- **能力**：表格解析、图片文字提取、章节/段落等结构化识别。

### 3.2 可视化工作流编排

通过图形界面编排 RAG 流程，无需写代码。

- **常见组件**：文档加载器、文本分割器、向量化器、检索器、生成器。  
- **优势**：流程可见、参数可调、策略可快速试验。

### 3.3 精准引用与溯源

每个答案都带来源信息。

- **引用内容**：文档名、页码、原文片段。  
- **价值**：提升可信度、便于核实、利于合规。

---

## 四、RAGFlow 的工作原理

### 4.1 知识库入库流程

1. **文档加载**：上传 PDF、Word、PPT 等，解析并提取文本、表格、图片。  
2. **文档解析**：深度解析结构，识别章节、段落、表格，图片做 OCR。  
3. **文本切分**：按规则切块（段落、章节或固定长度），保证语义完整。  
4. **向量化**：用嵌入模型将文本块转为向量，语义相近则向量相近。  
5. **向量存储**：写入向量数据库（如 Milvus），并保存原文与元数据。

### 4.2 问答检索流程

1. **问题向量化**：用与入库相同的嵌入模型把用户问题转为向量。  
2. **语义检索**：在向量库中做相似度搜索，返回 Top-K 相关块。  
3. **结果重排（可选）**：用 BM25、关键词或重排模型二次排序。  
4. **构建提示词**：将检索到的文本块与问题组合成 Prompt。  
5. **生成答案**：调用大语言模型生成回答。  
6. **返回结果**：返回答案及引用片段、来源信息。

与前面课程中的 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 流程一致，RAGFlow 把「解析 → 分块 → 向量化 → 检索 → 生成」做成可视化流水线。

---

## 五、主要应用场景

- **企业智能知识库**：内部制度、产品手册、培训材料；快速检索、答案可追溯。  
- **法律与合同审查**：法条与案例检索、合同比对与风险点定位。  
- **技术支持和客服**：基于产品/故障文档的 24 小时问答与引用。

---

## 六、与其他工具的对比

### 6.1 vs LangChain / LlamaIndex

| 维度       | RAGFlow              | LangChain / LlamaIndex   |
|------------|----------------------|---------------------------|
| 使用方式   | 可视化界面           | 代码编程                  |
| 上手难度   | 较低                 | 较高                      |
| 灵活性     | 高（界面配置）       | 极高（代码实现）          |
| 适用人群   | 技术 + 非技术人员    | 主要为开发                |
| 文档理解   | 内置表格、图片等     | 需自行编码集成            |

**建议**：快速原型、非技术人员参与、需要可视化调试时选 RAGFlow；需要深度定制、复杂业务逻辑、有开发团队时选 LangChain/LlamaIndex。

### 6.2 vs 商用闭源平台

| 维度     | RAGFlow           | 商用闭源平台       |
|----------|-------------------|--------------------|
| 成本     | 免费开源          | 通常付费           |
| 数据控制 | 完全自主         | 可能依赖厂商       |
| 部署     | 可私有化          | 多为 SaaS          |
| 定制     | 开源可改          | 受平台限制         |

**建议**：重视数据安全、需私有化、预算有限选 RAGFlow；需要厂商支持、快速上线且对数据隐私要求不高时可考虑商用平台。

---

## 七、参考与延伸

- **课程内**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础)、[Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs)、[模型与 API 速查](/ai/AI课程-模型与API速查)。  
- **官方**：RAGFlow 官方文档与代码仓库；RAGFlow-Plus 文档与仓库（部署与 Ollama 集成）。

---

*（本文档为课程 RAGFlow 章节的整理，与 RAG 流程、向量库、评估等章节衔接。）*
