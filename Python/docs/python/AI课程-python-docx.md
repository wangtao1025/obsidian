# AI 课程：python-docx

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **python-docx** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、lxml、OpenPyXL、PyMuPDF 等同为课程用到的第三方库）。python-docx 用于读写 Microsoft Word 2007+ 的 .docx 文件，支持段落、列表、表格、图片、页眉页脚等；RAG 文档解析、批量生成合同/周报常用；可与 [PyMuPDF](/python/AI课程-PyMuPDF)、[OpenPyXL](/python/AI课程-openpyxl) 等文档处理库搭配学习。

---

## 1. 什么是 python-docx？

python-docx 是流行的 Word 文档处理库，纯 Python 实现、无需安装 Office。支持创建、读取、修改 .docx，包括段落、列表、表格、图片、页眉页脚等。**导入名**：`from docx import Document`（包名 `docx`）。

**前置概念**：Document（文档）、Paragraph（段落）、Run（文本片段/样式单位）、Table（表格）、Section（节）；.docx 为开放 XML（ZIP 包）。

---

## 2. 环境准备

- Python ≥ 3.6。
- 安装：`python -m pip install python-docx`（或 `python3 -m pip install python-docx`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。
- 验证：`from docx import Document` → `doc = Document()` → `doc.add_paragraph("测试")` → `doc.save("test.docx")`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Document** | 整个 Word 文档，`Document()` 新建或 `Document(path)` 加载 |
| **Paragraph** | 文档中的段落，可含多个 Run |
| **Run** | 段落内的一段文本，可有独立样式（粗体、斜体、颜色、字号等） |
| **Table** | 表格，由行/列/单元格（Cell）组成 |

---

## 4. 快速体验：创建与读取

- **创建**：`doc = Document()` → `doc.add_paragraph("你好，python-docx！")` → `doc.save("hello.docx")`。
- **读取**：`doc = Document("hello.docx")` → `for p in doc.paragraphs: print(p.text)`，`len(doc.paragraphs)` 获取段落数。

---

## 5. 创建与读取：详细操作

- **创建**：`add_heading(text, level=1)`（1–9 级标题）、`add_paragraph(text)`；保存 `doc.save(path)`。
- **读取**：`doc.paragraphs`、`p.text`、`p.style.name`；全文可 `"\n".join([p.text for p in doc.paragraphs])`。

---

## 6. 段落与样式

- **Run 与样式**：`para = doc.add_paragraph("普通")` → `r = para.add_run(" 加粗")`，`r.bold = True`；`r.italic`、`r.font.size = Pt(14)`、`r.font.color.rgb = RGBColor(255,0,0)`（需 `from docx.shared import Pt, RGBColor`）。
- **对齐与间距**：`from docx.enum.text import WD_ALIGN_PARAGRAPH`；`p.alignment = WD_ALIGN_PARAGRAPH.CENTER`；`p.paragraph_format.space_before = Pt(12)`、`space_after`。

---

## 7. 标题与列表

- **标题**：`doc.add_heading("一级标题", level=1)`，level 最大 9。
- **列表**：`doc.add_paragraph("项一", style="List Bullet")`（项目符号）、`style="List Number"`（编号列表）。

---

## 8. 表格

- **创建与填充**：`table = doc.add_table(rows=4, cols=4)`，`table.style = "Table Grid"`；`table.cell(row_idx, col_idx).text = "内容"`。
- **列宽与合并**：`table.autofit = False`，`table.columns[i].width = Inches(1.5)`（`from docx.shared import Inches`）；`cell_a.merge(cell_b)` 合并单元格。

---

## 9. 图片

- **插入**：`para = doc.add_paragraph()` → `run = para.add_run()` → `run.add_picture("logo.png", width=Inches(2.5))`；段落可 `para.alignment = WD_ALIGN_PARAGRAPH.CENTER`。
- 仅支持本地路径或流；网络图需先下载。插入前可用 `os.path.exists(path)` 检查。

---

## 10. 页面设置：页眉页脚与布局

- **节**：`section = doc.sections[0]`。
- **布局**：`from docx.enum.section import WD_ORIENTATION`；`section.orientation = WD_ORIENTATION.LANDSCAPE`；`section.page_width/page_height`、`top_margin/bottom_margin/left_margin/right_margin`（单位 `Inches()`）。
- **页眉页脚**：`section.header.paragraphs[0].text = "页眉"`，`section.footer.paragraphs[0].text = "页脚"`；对齐用 `alignment = WD_ALIGN_PARAGRAPH.CENTER` 等。

---

## 11. 实战案例：批量生成文档

典型用法：读取模板 `doc = Document(template_path)`，遍历 `doc.paragraphs`，用 `p.text.replace("{{CLIENT}}", client["name"])` 等替换占位符，再 `doc.save(output_path)`。可封装为 `fill_contract(template_path, output_path, client)`，对多个客户循环调用。

---

## 12. 常见问题与排查

| 问题 | 处理 |
|------|------|
| 中文字体不生效 | 设置 `run.font.name` 同时设置东亚字体：`run._element.rPr.rFonts.set(qn("w:eastAsia"), "微软雅黑")`（`from docx.oxml.ns import qn`） |
| 文件损坏/无法打开 | 避免占用下保存；可用 `zipfile.ZipFile(path)` 检测 .docx 是否为合法 ZIP |
| 图片路径错误 | 仅支持本地路径；先 `os.path.exists(image_path)` 再 `add_picture` |
| 批量生成慢 | 循环外复用 `Pt()`/`RGBColor()` 等样式对象；批量填表后一次性保存 |

---

## 13. 参考

- [python-docx 官方文档](https://python-docx.readthedocs.io/)
- [python-docx GitHub](https://github.com/python-openxml/python-docx)

---

**相关文档**：[PyMuPDF](/python/AI课程-PyMuPDF) · [OpenPyXL](/python/AI课程-openpyxl) · [lxml](/python/AI课程-lxml) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [python-docx（课程原文）](https://rag.docs-hub.com/html/python-docx.html)
