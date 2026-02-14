# AI 课程笔记：RAG 检索增强生成

来源课程：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）第四讲。以下为 RAG 概念、文档解析、分块、向量化与完整工作流代码的整理。

---

## 一、RAG 简介

**RAG（Retrieval-Augmented Generation，检索增强生成）** 结合「检索」与「生成」，常用于问答、智能助手等：先从未知知识库中检索相关片段，再交给大模型生成答案。

### 1.1 安装依赖

```bash
uv add PyMuPDF beautifulsoup4 python-docx openpyxl python-pptx lxml sentence_transformers numpy chromadb requests rank_bm25
```

### 1.2 大模型的局限性

- **知识滞后**：训练数据有截止时间，难以及时反映最新事实。  
- **缺乏专有知识**：企业、行业私有知识难以覆盖。  
- **幻觉**：可能生成看似合理但错误的内容。

### 1.3 为什么选 RAG？

- **提升准确性**：用实时检索到的内容增强生成，减少胡编乱造。  
- **降低成本**：不必为每条新知识重训大模型，只需更新知识库。  
- **适应变化**：新领域、新事件通过检索即可利用，无需重新训练。

### 1.4 RAG 工作流程（三步骤）

| 步骤 | 名称 | 说明 |
|------|------|------|
| 1 | **知识库构建** | 管理员把本地文档解析、分块、向量化后写入向量库。 |
| 2 | **检索 (Retrieval)** | 用户提问 → 问题向量化 → 在向量库中检索最相关的若干文档块。 |
| 3 | **生成 (Generation)** | 将检索到的内容与问题一起填入 Prompt，交给大模型生成答案。 |

### 1.5 优势

- 知识可扩展、答案可追溯、降低幻觉。

### 1.6 应用场景

- 企业知识库问答、智能客服、文档摘要、代码检索与生成等。

### 1.7 长上下文 (Long Context) 与 RAG 对比

| 维度 | RAG | Long Context |
|------|-----|--------------|
| 知识容量 | 依赖外部知识库，理论上可很大 | 受限于模型上下文窗口（如 32K、128K） |
| 实时性 | 检索快，生成取决于模型 | 长文本输入会拖慢推理 |
| 可扩展性 | 知识库易更新，无需重训 | 超长需截断或摘要 |
| 准确性 | 依赖检索质量 | 窗口内可直接引用 |
| 成本 | 检索+生成，可控 | 长上下文推理消耗大 |

**部分模型上下文长度（课程表）**：GPT-4o 128K，Claude 3 200K，Gemini 1.5 Pro 1M，Llama 3 最高 128K 等。

**适用场景**：RAG 适合企业知识库、专业领域、需可解释性；Long Context 适合长文档/长对话、内容有限且全相关、不便建库时。

---

## 二、RAG 工作流总览

- **管理员侧**：本地文档 → 非结构化加载 → 文本 → 文本切分 → 文本块 → 向量化 → 向量库。  
- **用户侧**：查询 → 查询向量化 → 向量相似度检索 → 相关文本块 → 填入 Prompt 模板 → 大模型 → 答案。

---

## 三、文档解析

### 3.1 数据格式与内容复杂性

企业数据格式多样（PDF、Word、Excel、PPT、HTML、JSON、XML、CSV、txt、Markdown 等），且常为半结构化/非结构化，解析需按格式选用不同库与策略。

### 3.2 GIGO（Garbage In, Garbage Out）

数据质量决定 RAG 效果。需在**数据源选择、解析、分块**各环节把控质量，避免错误、矛盾、无关或低质数据进入知识库。

### 3.3 文档解析示例（思路统一）

通用流程：**打开/加载文件 → 解析/遍历 → 提取文本 → 拼接成字符串 → 返回**。

| 格式 | 库 | 要点 |
|------|-----|------|
| PDF | PyMuPDF (`fitz`) | `fitz.open` → 逐页 `page.get_text("text")` |
| Word | python-docx | `Document(file_path)` → `paragraphs` 拼接 |
| Excel | openpyxl | `load_workbook` → `iter_rows(values_only=True)` 按行拼接 |
| PPT | python-pptx | `Presentation` → 每页 `slide.shapes` 取 `shape.text` |
| HTML | [BeautifulSoup4](/python/AI课程-beautifulsoup4) | `BeautifulSoup(html, "html.parser")` → `get_text(separator="\n")` |
| JSON | json | `json.load` → `json.dumps(..., ensure_ascii=False, indent=2)` |
| XML | lxml.etree | `etree.fromstring` → `root.itertext()` 拼接 |
| CSV | csv | `csv.reader` → 每行用逗号连接再换行拼接 |
| txt / md | 内置 open | `open(..., encoding="utf-8").read()` |

课程中为每种格式提供了独立函数（如 `extract_pdf_text`、`extract_text_from_word` 等），并在 `extract.py` 中统一封装；实现时注意异常处理与编码（UTF-8）。

---

## 四、文档分割（Text Chunking）

### 4.1 核心价值

- 保证**语义纯度**、提高**检索精度**、适配**模型长度限制**。

### 4.2 基本原则

- **语义完整性**：每块应是完整语义单元。  
- **大小平衡**：过小丢失上下文，过大混入多主题、降低相关性。

### 4.3 递归分割策略

- 用分隔符层级（如段落 → 句子 → 词）逐级切分，直到块大小符合要求。  
- 课程中使用 **LangChain** 的 `RecursiveCharacterTextSplitter`（`chunk_size`、`chunk_overlap`）。

### 4.4 语义感知分块（SemanticChunker）

- **思路**：按句切分 → 滑动窗口成块 → 对每块算 embedding → 计算**相邻块余弦相似度**，低于阈值则在此处切分。  
- **参数**：`window_size`（窗口内句子数）、`threshold`（相似度阈值，如 0.85）。  
- **流程**：句子分割 → 滑动窗口初步分块 → `model.encode(docs)` → 相邻块相似度 → 确定分割点 → 合并为最终块。

课程给出了基于 [Sentence Transformers](/ai/AI课程-sentence_transformers)（如 `all-MiniLM-L6-v2`）的 `SemanticChunker` 类；核心逻辑示例（精简）：

```python
from sentence_transformers import SentenceTransformer
import numpy as np
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

class SemanticChunker:
    def __init__(self, window_size=2, threshold=0.85):
        self.window_size = window_size
        self.threshold = threshold

    def create_documents(self, text):
        sentences = re.split(r"(。|！|？|\!|\?|\.|\n)", text)
        sents = []
        for i in range(0, len(sentences) - 1, 2):
            s = (sentences[i].strip() + sentences[i + 1].strip()).strip()
            if s:
                sents.append(s)
        docs = []
        start = 0
        while start < len(sents):
            end = min(start + self.window_size, len(sents))
            docs.append("".join(sents[start:end]))
            start = end
        embeddings = model.encode(docs)
        split_points = [0]
        for i in range(1, len(docs)):
            sim = np.dot(embeddings[i - 1], embeddings[i]) / (
                np.linalg.norm(embeddings[i - 1]) * np.linalg.norm(embeddings[i])
            )
            if sim < self.threshold:
                split_points.append(i)
        result = []
        for i in range(len(split_points)):
            start = split_points[i]
            end = split_points[i + 1] if i + 1 < len(split_points) else len(docs)
            chunk = "".join(docs[start:end])
            if chunk.strip():
                result.append(chunk)
        return result
```

---

## 五、向量化

### 5.1 云服务

- 调用嵌入 API（如课程示例中的火山引擎等），传入文本，返回 `embedding` 列表。  
- **注意**：API Key 勿写死在代码中，应用环境变量或配置中心。

### 5.2 本地向量化

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def get_sentence_embedding(doc_content):
    return model.encode(doc_content)
```

---

## 六、RAG 工作流代码结构（课程五模块）

整体流程：**Retrieval（检索）→ Augmented（增强到 Prompt）→ Generation（生成）**。

### 6.1 extract.py

- **作用**：按文件扩展名选择解析器，从 PDF/Word/Excel/PPT/HTML/JSON/XML/CSV/txt/MD 等提取纯文本。  
- **要点**：各格式一个函数，统一异常与日志；`extract_text_auto(file_path)` 根据 `os.path.splitext` 派发到对应函数。

### 6.2 db.py

- **作用**：将单条文本向量化并写入 ChromaDB（或可替换为 Milvus 等）。  
- **要点**：单例模型（`SentenceTransformer`）与单例客户端（`chromadb.PersistentClient`）；`save_text_to_db(text, collection_name, source)` 内部：空文本校验 → 生成 `text_id`（如 `str(abs(hash(text)))`）→ 查重 → `model.encode` → `collection.add(documents, metadatas, ids, embeddings)`。  
- **存储结构**：documents、metadatas、ids、embeddings 四列。

### 6.3 save.py

- **作用**：文档入库主流程：提取 → 分块 → 逐块写入向量库。  
- **要点**：`extract_text_auto(file_path)` 取全文 → `RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=30).split_text(text)` → 对每个 chunk 调用 `save_text_to_db`，统计成功数并返回。

### 6.4 llm.py

- **作用**：封装大模型调用（OpenAI 兼容接口）。  
- **要点**：从环境变量读 `OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL_NAME`；单例 `OpenAI` 客户端；`invoke(prompt, model=None, temperature=0.7)` 调用 `client.chat.completions.create`，返回 `response.choices[0].message.content`。

### 6.5 query.py

- **作用**：RAG 查询主入口：查询向量化 → 向量检索 → 拼 Prompt → 调 LLM → 返回答案。  
- **要点**：  
  - `get_query_embedding(query)`：用同一嵌入模型将问题转为向量。  
  - `retrieve_related_chunks(query_embedding, n_results=3, collection_name)`：在 ChromaDB 中 `collection.query(query_embeddings=[...], n_results=n_results)`，返回 `documents[0]`。  
  - `query_rag(query, n_results, collection_name)`：embedding → retrieve → `context = "\n".join(related_chunks)` → `prompt = f"已知信息：\n{context}\n\n请根据上述内容回答用户问题：{query}"` → `llm.invoke(prompt)` → 返回答案。

课程中流程图概括：**用户问题 → 向量化 → 向量库检索 → 相关块 → 拼 Prompt → LLM → 答案**。

---

## 七、参考（课程内关联）

- 文档解析与向量存储可结合 [Milvus 与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) 或 [ChromaDB](/ai/AI课程-chromadb) 使用。
- **评估 RAG 效果**见第五讲：[RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs)。
- **LLM / Embedding 模型与平台配置**见 [模型与 API 速查](/ai/AI课程-模型与API速查)。

PyMuPDF、python-docx、openpyxl、python-pptx、beautifulsoup4、lxml、sentence_transformers、RAGFlow、openai、llm 等见课程内链接与前述各讲。

---

*（本文档为课程第四讲「RAG」的整理；与第二+三讲合并篇「Milvus 与 PyMilvus」衔接，后续为第五讲「RAG 评估与 RAGAs」。）*
