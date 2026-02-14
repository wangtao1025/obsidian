# AI 课程：lxml

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **lxml** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4 等同为课程用到的第三方库）。lxml 是高性能 XML/HTML 解析库，基于 C 库 libxml2/libxslt，支持 XPath、XSLT；RAG 文档解析、网页抓取、配置文件处理常用；可与 [BeautifulSoup4](/python/AI课程-beautifulsoup4) 搭配学习（BS4 可选 lxml 作为解析器）。

---

## 1. 什么是 lxml？

lxml 是 Python 中强大的 XML/HTML 解析库，基于 C 实现，速度快、API 友好，支持 XPath、XSLT，容错性好。用于解析网页、配置文件、RSS、结构化数据提取等。

**前置概念**：XML、HTML、标签与属性、元素（Element）。

---

## 2. 环境准备

- Python ≥ 3.8。
- 安装：`python -m pip install lxml`（或 `python3 -m pip install lxml`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。若编译失败，Windows 可试预编译轮子，macOS 可先装 Xcode 命令行工具：`xcode-select --install`。
- 验证：`from lxml import etree` → `root = etree.fromstring("<root><item>测试</item></root>")` → `root.findtext("item")` 得 `"测试"`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Element** | 代表 XML/HTML 中的一个元素（标签+内容），有标签名、文本、属性 |
| **根节点** | 文档最外层元素 |
| **父子关系** | 树状结构，父含子 |
| **XPath** | 在文档中定位元素的查询语言 |

---

## 4. 快速体验：解析 XML 与 HTML

```python
from lxml import etree
xml_text = """<books><book id="1"><title>Python 入门</title><price>39.9</price></book></books>"""
root = etree.fromstring(xml_text)
for book in root:
    print(book.findtext("title"), book.findtext("price"))
```

```python
from lxml import html
html_root = html.fromstring("<div><p class='intro'>欢迎使用 lxml</p></div>")
print(html_root.xpath("//p/text()"))  # ['欢迎使用 lxml']
```

---

## 5. 元素导航：访问与修改

- **访问**：`root[0]`、`elem.findtext("tag")`、`elem.find("tag")`、`elem.attrib`、`elem.get("attr")`
- **修改**：`price_node.text = "188"`、`etree.SubElement(parent, "stock").text = "有货"`
- **遍历**：`for child in root:`、`root.findall(".//price")`、`.tag`、`.text`
- **序列化**：`etree.tostring(root, encoding="unicode", pretty_print=True)`

---

## 6. XPath 查询

- **方法**：`elem.xpath("xpath_expr")`，返回列表（元素、文本或属性值）。
- **常用语法**：`//tag`（所有 tag）、`//tag[@attr="value"]`（按属性）、`//tag/text()`（文本）、`//book[price>60]`（条件）、`//book[1]`（位置）、`//book/@category`（属性值）。逻辑与：`and`。

---

## 7. 创建和生成 XML

- **创建**：`root = etree.Element("catalog")`、`etree.SubElement(root, "book", id="1001")`、`child.text = "内容"`
- **写文件**：`etree.tostring(...)` 后 `open(...).write(...)`；或 `tree = etree.ElementTree(root)` → `tree.write("out.xml", encoding="utf-8", pretty_print=True, xml_declaration=True)`。

---

## 8. HTML 解析与清洗

- **解析**：`doc = html.fromstring(html_text)`，再用 `.xpath("//h1/text()")`、`//a` 等提取。
- **清洗**：`from lxml.html.clean import Cleaner`；`cleaner = Cleaner(scripts=True, javascript=True, style=True, ...)` → `clean_doc = cleaner.clean_html(doc)`，可移除脚本与样式。

---

## 9. 从文件读取 XML

- `tree = etree.parse("file.xml")` → `root = tree.getroot()`；或先 `open().read()` 再 `etree.fromstring(xml_text)`。

---

## 10. 实战案例：RSS 解析器

可封装类：解析 RSS 字符串 → 找 `channel`，用 `findtext("title")` 等取频道信息，`findall("item")` 遍历条目，每条用 `findtext("title")`、`findtext("link")` 等；或用 XPath `count(//item)` 统计数量。

---

## 11. 性能优化：流式解析大型文件

- `etree.iterparse(path, tag="book", events=("end",))` 逐元素迭代，每处理完一个 `elem.clear()` 释放内存，避免大文件一次性加载。

---

## 12. 常见问题与排查

| 问题 | 处理 |
|------|------|
| XML 语法错误 | 使用 `etree.XMLParser(recover=True)` 尝试修复；或检查 `parser.error_log` |
| 编码/乱码 | 保证文件或字符串为 UTF-8；XML 声明中写 `encoding="utf-8"` |
| 命名空间 | 定义 `namespaces = {"bk": "http://..."}`，XPath 用 `//bk:book`，并传 `namespaces=namespaces` |
| HTML 动态内容 | lxml 不执行 JavaScript；需配合 Selenium/Playwright 渲染后再用 lxml 解析 |

---

## 13. 参考

- [lxml 官方文档](https://lxml.de/)
- [XPath 教程](https://www.w3school.com.cn/xpath/)
- [BeautifulSoup 教程](/python/AI课程-beautifulsoup4)（可与 lxml 配合）

---

**相关文档**：[BeautifulSoup4](/python/AI课程-beautifulsoup4) · [jieba](/python/AI课程-jieba) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [lxml（课程原文）](https://rag.docs-hub.com/html/lxml.html)
