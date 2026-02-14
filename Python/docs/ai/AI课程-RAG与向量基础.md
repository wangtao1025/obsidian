# AI 课程笔记：RAG 与向量基础

来源课程导航：[rag.docs-hub.com](https://rag.docs-hub.com/html/)（zhangdocs）。以下为课程内容整理与补充说明。

---

## 课程知识体系概览（按导航整理）

课程覆盖的主线与模块大致包括：

| 类别 | 关键词 |
|------|--------|
| **向量与检索** | vector, 向量嵌入, milvus, pymilvus, [HNSW](/ai/AI课程-HNSW), [余弦相似度](/ai/AI课程-余弦相似度), [math](/python/AI课程-math数学库), [FAISS](/ai/AI课程-faiss), [ChromaDB](/ai/AI课程-chromadb), [MMR](/ai/AI课程-MMR), RRF |
| **RAG 流程** | rag, rag_measure, ragflow, [text_splitter](/python/AI课程-text_splitter), [LangChain](/ai/AI课程-LangChain), [RAGAS](/ai/AI课程-RAGAS), Lost-in-the-middle |
| **模型与嵌入** | [Sentence Transformers](/python/AI课程-sentence_transformers)、[all-MiniLM-L6-v2](/ai/AI课程-all-MiniLM-L6-v2)、[OpenAI](/python/AI课程-openai)、[大语言模型（llm）](/ai/AI课程-llm)、[BPETokenizer](/ai/AI课程-BPETokenizer)、CrossEncoder |
| **检索与排序** | [BM25（rank_bm25）](/ai/AI课程-rank_bm25), [TF-IDF](/ai/AI课程-TF-IDF), [BagofWords](/ai/AI课程-BagofWords), [Scikit-learn](/python/AI课程-scikit-learn) |
| **文档处理** | [python-docx](/python/AI课程-python-docx), [python-pptx](/python/AI课程-python-pptx), [PyMuPDF](/python/AI课程-PyMuPDF), [OpenPyXL](/python/AI课程-openpyxl), [lxml](/python/AI课程-lxml), [BeautifulSoup4](/python/AI课程-beautifulsoup4), [LaTeX](/python/AI课程-LaTeX) |
| **后端与部署** | [Flask](/python/AI课程-Flask), FastAPI, Starlette, uvicorn, sqlalchemy, asyncio, SSE |
| **基础设施** | [etcd](/ai/AI课程-etcd), [MinIO](/ai/AI课程-minio), venv, python-dotenv, argparse |
| **其他** | [Pydantic](/python/AI课程-Pydantic), [dataclasses](/python/AI课程-dataclasses), Jinja2, [提示词工程](/ai/AI课程-PromptEngineering), [Runnable](/ai/AI课程-Runnable), [typing](/python/AI课程-typing类型提示), [collections](/python/AI课程-collections), [jieba](/python/AI课程-jieba), [NumPy](/python/AI课程-numpy) |

下面为**第一讲：向量 → 向量嵌入 → 向量数据库**的笔记。

---

## 一、向量（Vector）

向量是同时包含**大小**和**方向**的量，可视为现代 AI 大模型的「通用语言」和「思维载体」。

### 1.1 一维向量

- **直观**：「向前走 5 步」= 方向（前）+ 大小（5）。
- 一维向量就是这种「方向 + 大小」的数学表示。

### 1.2 二维向量

- 在平面中用**有序数对**表示：**(x, y)**。
- **长度（模）**：$\sqrt{x^2 + y^2}$，代码里常用 `math.hypot(x, y)`。
- **方向角**：与 x 轴的夹角，可用 `math.atan2(y, x)` 再转为角度。
- **两点构成的向量**：从点 A 到点 B 的向量为 $(x_2-x_1,\ y_2-y_1)$。

示例代码（课程中的核心逻辑）：

```python
import math
from typing import Tuple

def vector_length(x: float, y: float) -> float:
    return math.hypot(x, y)

def vector_direction(x: float, y: float) -> float:
    return math.degrees(math.atan2(y, x))

def vector_from_points(a: Tuple[float, float], b: Tuple[float, float]) -> Tuple[float, float]:
    return b[0] - a[0], b[1] - a[1]

v = (3, 4)
print(f"向量 {v} 的长度: {vector_length(*v):.2f}")

point_a, point_b = (2, 1), (5, 5)
ab = vector_from_points(point_a, point_b)
print(f"从 A 到 B 的向量: {ab}, 长度: {vector_length(*ab):.2f}")
```

### 1.3 三维向量

- 形式：**(x, y, z)**，用于空间中的位置或方向。
- 长度与方向角可推广到三维（多一个维度参与计算）。

---

## 二、向量嵌入（Embeddings）

**向量嵌入**是把离散对象（文字、图片、声音等）映射到**连续向量空间**的技术，让计算机能用「一串数字」表示并比较这些对象。

### 2.1 直观理解（课程中的水果例子）

用数字表示特征：

| 水果 | 颜色(红=1,黄=2) | 形状(圆=1,弯=2,椭圆=3) | 味道(甜=1,酸=2) | 向量 |
|------|-----------------|------------------------|------------------|------|
| 苹果 | 1 | 1 | 1 | [1, 1, 1] |
| 香蕉 | 2 | 2 | 1 | [2, 2, 1] |
| 柠檬 | 2 | 3 | 2 | [2, 3, 2] |

- 香蕉和柠檬第一个数都是 2（都是黄色），所以在这维上更「相似」。
- 真实应用里，嵌入的维度很高（如 384、768），由模型自动学习，而不是人工定规则。

---

## 三、向量数据库

### 3.1 是什么？

- **普通数据库**：存表格、字段（如：名字、颜色、形状）。
- **向量数据库**：把对象变成**高维向量**存起来，主要支持「按相似度查找」，而不是精确匹配关键词。

### 3.2 能做什么？

- 以「相似度」为核心：找相似图片、相似文章、相似音乐等。
- 在 RAG 里：把文档切成块 → 转成向量 → 存进向量库；提问时把问题也转成向量，检索最相似的文档块，再交给大模型生成答案。

### 3.3 工作流程（课程小结）

1. **转换**：把文本/图片等通过 Embedding 模型转成向量。
2. **存储**：将向量写入向量数据库（如 Milvus、FAISS、Chroma 等）。
3. **搜索**：把查询（如用户问题）也转成向量。
4. **比较**：用相似度度量（如余弦相似度、内积）计算查询向量与库中向量的相似度。
5. **返回**：返回最相似的 Top-K 条结果，供 RAG 或推荐等使用。

---

## 四、参考与延伸

- 课程内参考：一维/二维/三维向量、向量嵌入、`math` / `typing` 等。
- **后续章节**（建议按顺序阅读）：[Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) → [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) → [RAG 评估与 RAGAs](/ai/AI课程-RAG评估与RAGAs)。

---

*（本文档为课程第一讲整理，与 AI 课程总览中的各讲衔接。）*
