# AI 课程：BeautifulSoup4

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **beautifulsoup4** 文档。BeautifulSoup4（BS4）是 Python 中常用的 HTML/XML 解析库，可与 requests 配合抓取并解析网页，在 RAG 文档采集、信息抽取中常用。

---

## 1. 什么是 BeautifulSoup4？

**BeautifulSoup4** 用于从 HTML/XML 中提取文本、链接、属性等，特点：

- 自动处理编码、修复损坏标签  
- API 简单：`find`、`find_all`、`select`  
- 常与 **requests** 配合：先请求网页，再交给 BS4 解析  

前置：了解 HTML 基本结构（标签、属性，如 `<a href="/home">首页</a>`）。

---

## 2. 环境准备

- Python ≥ 3.8，pip ≥ 21  
- 建议安装 **lxml** 解析器以提升性能  

```bash
# Windows
python -m pip install --upgrade pip
python -m pip install beautifulsoup4 lxml

# macOS / Linux
python3 -m pip install --upgrade pip
python3 -m pip install beautifulsoup4 lxml
```

验证：

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup("<html><body><p>测试</p></body></html>", "lxml")
print(soup.p.get_text())  # 测试
```

---

## 3. 快速体验

```python
from bs4 import BeautifulSoup

html_doc = """
<html>
  <head><title>示例页面</title></head>
  <body>
    <h1>热门链接</h1>
    <ul id="menu">
      <li><a href="/home">首页</a></li>
      <li><a href="/about">关于我们</a></li>
    </ul>
  </body>
</html>
"""
soup = BeautifulSoup(html_doc, "lxml")
print("标题：", soup.title.string)
for item in soup.select("#menu li a"):
    print(item.get_text(strip=True), "|", item["href"])
```

---

## 4. 解析器与编码

- **lxml**：速度快，推荐（需安装 lxml）  
- **html.parser**：内置，无需安装  
- **html5lib**：容错最好，速度较慢（需安装 html5lib）  

中文乱码时，用 requests 时建议：

```python
response.encoding = response.apparent_encoding
soup = BeautifulSoup(response.text, "lxml")
```

---

## 5. DOM 导航

- **父节点**：`tag.parent`  
- **子节点**：`tag.children`  
- **兄弟节点**：`tag.find_next_siblings("p")`  

---

## 6. 查找：find、find_all、select

- `find(name, attrs)`：第一个匹配  
- `find_all(name, attrs)`：所有匹配  
- `select("css选择器")`：CSS 选择器，如 `"#menu li a"`、`".links"`、`'a[data-tag="tech"]'`  

```python
links = soup.find_all("a")
first = soup.find("a", attrs={"data-tag": "tech"})
items = soup.select("ul.links li a")
```

---

## 7. 提取文本与属性

- **文本**：`tag.get_text(strip=True)`（推荐）、`tag.text`、`tag.string`（仅直接文本，有子标签时为 None）  
- **属性**：`tag["href"]` 或 `tag.get("href", "#")`（安全）；`tag.attrs` 获取全部属性  

---

## 8. 修改与构造 HTML

- 修改标签名：`tag.name = "span"`  
- 修改属性：`tag["class"] = ["updated"]`  
- 修改文本：`tag.string = "新内容"`  
- 新建标签：`new_tag = soup.new_tag("div")`，`tag.append(new_tag)`  

---

## 9. 实战：迷你新闻采集器思路

结合 requests + BS4：`requests.get(url)` → `response.encoding = response.apparent_encoding` → `BeautifulSoup(response.text, "lxml")` → `soup.select("article h2 a, .news-item a")` 提取标题与链接；相对路径用 `urljoin(url, href)` 转绝对路径。注意异常处理与超时。

---

## 10. 常见问题

| 问题 | 处理 |
|------|------|
| 乱码 | `response.encoding = response.apparent_encoding` 或 `from_encoding="utf-8"` |
| 找不到标签 | 可能为 JS 动态生成，需 Selenium/Playwright；或核对选择器 |
| 性能 | 缩小选择器范围、用 Session、设超时 |
| 反爬 | 延时、随机 User-Agent、遵守 robots.txt |

---

## 11. 学习资源

- [BS4 官方文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)  
- [CSS 选择器参考](https://www.w3schools.com/cssref/css_selectors.asp)  
- [requests 文档](https://requests.readthedocs.io/)  

---

**相关文档**：[jieba](/python/AI课程-jieba) · [collections](/python/AI课程-collections)（解析结果常配合容器） · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [beautifulsoup4（课程原文）](https://rag.docs-hub.com/html/beautifulsoup4.html)
