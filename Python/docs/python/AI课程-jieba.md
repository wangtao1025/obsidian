# AI 课程：jieba 中文分词

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **jieba** 文档。jieba 是 Python 里最常用的**中文分词**工具，支持分词、关键词提取、词性标注和自定义词典，在 RAG 文档解析、文本分析、搜索预处理中常用。

---

## 1. 什么是 jieba？

**jieba** 把连在一起的中文句子「切开」成词，方便程序做统计、检索、情感分析等。支持：

- 三种分词模式：精确、全模式、搜索引擎模式  
- 自定义词典（行业词、专有名词）  
- 关键词提取（TF-IDF、TextRank）  
- 词性标注  

---

## 2. 如何安装？

```bash
# Windows
python -m pip install jieba
# macOS / Linux
python3 -m pip install jieba
# conda
conda install -c conda-forge jieba
```

---

## 3. 分词模式

### 3.1 精确模式（默认）

适合一般文本分析。

```python
import jieba
text = "我爱自然语言处理技术"
result = jieba.cut(text, cut_all=False)
print("精确模式：", "/".join(result))
```

### 3.2 全模式

尽可能多切出候选词。

```python
result = jieba.cut(text, cut_all=True)
print("全模式：", "/".join(result))
```

### 3.3 搜索引擎模式

长词会再切一次，适合搜索与倒排索引。

```python
result = jieba.cut_for_search(text)
print("搜索引擎模式：", "/".join(result))
```

---

## 4. 自定义词典

### 4.1 临时添加词语

```python
import jieba
text = "李小福是创新办主任也是云计算方面的专家"
print("默认：", "/".join(jieba.cut(text)))
jieba.add_word("李小福")
jieba.add_word("创新办")
jieba.add_word("云计算")
print("加词后：", "/".join(jieba.cut(text)))
```

### 4.2 加载词典文件

格式：`词语 词频 词性`（后两项可选）。

```python
jieba.load_userdict("user_dict.txt")
text = "李小福蓝瘦香菇创新办主任"
print("使用词典：", "/".join(jieba.cut(text)))
```

### 4.3 调整词频

让某两个连续字被拆开或合并。

```python
text = "如果放到post中将出错"
jieba.suggest_freq(("中", "将"), tune=True)
print("调频后：", "/".join(jieba.cut(text)))
```

---

## 5. 关键词提取

TF-IDF 与 TextRank 二选一或组合使用。

```python
import jieba.analyse
text = "自然语言处理是人工智能和语言学领域的重要分支，研究如何让计算机理解和生成人类语言。"
# TF-IDF
tfidf = jieba.analyse.extract_tags(text, topK=5, withWeight=True)
print("TF-IDF：", tfidf)
# TextRank
textrank = jieba.analyse.textrank(text, topK=5, withWeight=True)
print("TextRank：", textrank)
```

---

## 6. 词性标注与列表返回

```python
import jieba.posseg as pseg
text = "我爱自然语言处理技术"
for word, flag in pseg.cut(text):
    print(f"{word}: {flag}")
```

直接要列表用 `lcut`：

```python
import jieba
print("精确模式列表：", jieba.lcut(text))
print("全模式列表：", jieba.lcut(text, cut_all=True))
```

---

## 7. 实战案例

### 7.1 文本分析（词频 + 关键词）

```python
import jieba
import jieba.analyse
from collections import Counter

def text_analysis(text: str):
    words = jieba.lcut(text)
    filtered = [w for w in words if len(w) > 1]
    freq = Counter(filtered)
    keywords = jieba.analyse.extract_tags(text, topK=5)
    return freq, keywords

sample = "自然语言处理结合了计算机科学和语言学，目标是让计算机理解人类语言"
word_freq, keywords = text_analysis(sample)
print("词频：", word_freq.most_common(3))
print("关键词：", keywords)
```

### 7.2 搜索引擎分词

```python
def search_engine_tokenize(query: str):
    return list(jieba.cut_for_search(query))
print("搜索分词：", search_engine_tokenize("北京大学的学生学习人工智能"))
```

### 7.3 情感分析预处理

```python
STOP_WORDS = {"的", "了", "在", "是", "我", "有", "和", "就", "不", "也", "很", "这"}

def preprocess_for_sentiment(text: str):
    words = jieba.lcut(text)
    return [w for w in words if len(w) > 1 and w not in STOP_WORDS]

review = "这部电影真的很好看，演员表演很出色，剧情也很精彩！"
print("预处理：", preprocess_for_sentiment(review))
```

---

## 8. 进阶技巧

### 8.1 并行分词

大文本可开多进程加速（注意 Windows 下多进程限制）。

```python
jieba.enable_parallel(4)
# ... 对 large_text 做 cut ...
jieba.disable_parallel()
```

### 8.2 词典路径

```python
print("当前词典：", jieba.get_dict_file())
jieba.set_dictionary("path/to/your/dict.txt")
```

---

## 9. 常见问题

- **内存大**：用生成器逐行读文件，对每行 `jieba.cut(line)`，不要一次性把整文件读进内存。  
- **行业词切不对**：用 `load_userdict` 加载领域词典，或用 `suggest_freq` 调词频。

---

## 10. 总结

| 功能 | 方法 | 适用场景 |
|------|------|----------|
| 精确分词 | `jieba.cut(text)` | 一般文本分析、RAG 分块前分词 |
| 全模式 | `jieba.cut(text, cut_all=True)` | 收集所有候选词 |
| 搜索分词 | `jieba.cut_for_search(text)` | 搜索引擎、倒排索引 |
| 关键词 | `jieba.analyse.extract_tags()` | 摘要、标签、RAG 关键词 |
| 词性 | `jieba.posseg.cut(text)` | NER、语法分析 |
| 自定义词典 | `add_word()` / `load_userdict()` | 行业词、专有名词 |

---

**相关文档**：[BeautifulSoup4](/python/AI课程-beautifulsoup4) · [collections](/python/AI课程-collections) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [jieba（课程原文）](https://rag.docs-hub.com/html/jieba.html)
