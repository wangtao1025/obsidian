# AI 课程：PyMuPDF

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **PyMuPDF** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、lxml、OpenPyXL 等同为课程用到的第三方库）。PyMuPDF 是 MuPDF 的 Python 绑定，导入名为 **fitz**（历史原因）；支持 PDF、XPS、EPUB 的读取、文本/图片提取、创建与编辑、合并拆分、转图片、搜索高亮；RAG 文档解析、PDF 批处理常用；可与 [OpenPyXL](/python/AI课程-openpyxl)、[lxml](/python/AI课程-lxml) 等文档处理库搭配学习。

---

## 1. 什么是 PyMuPDF？

PyMuPDF 是强大的 PDF 处理库，基于 C（MuPDF），速度快、定位精确。支持文本提取、图片提取、创建/编辑 PDF、合并拆分、页面转图、搜索与注释等。**导入时使用 `import fitz`**，库名为 PyMuPDF。

**前置概念**：PDF、页面（Page）、坐标系统（左下角为原点，X 右 Y 上）、元数据。

---

## 2. 环境准备

- Python ≥ 3.7。
- 安装：`python -m pip install PyMuPDF`（或 `python3 -m pip install PyMuPDF`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。
- 验证：`import fitz` → `doc = fitz.open()` → `page = doc.new_page()` → `page.insert_text((72,72), "Hello PyMuPDF!", fontsize=16)` → `doc.save("test.pdf")` → `doc.close()`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Document** | 整个 PDF 文件，`fitz.open(path)` 打开或 `fitz.open()` 创建 |
| **Page** | 文档中的一页，`doc[i]` 或 `doc.load_page(i)` |
| **Rect** | 矩形区域，`fitz.Rect(x0, y0, x1, y1)` |
| **坐标** | 左下角 (0,0)，X 向右，Y 向上（点为单位，72 点≈1 英寸） |

---

## 4. 快速体验：打开与读取

- `doc = fitz.open("example.pdf")` → `doc.page_count`、`doc.metadata`、`page = doc[0]`、`page.rect`（宽高）→ 用毕 `doc.close()`。

---

## 5. 文本提取

- **完整文本**：`page.get_text()` 或 `page.get_text("text")`。
- **文本块（含坐标）**：`page.get_text("blocks")`，每块为 `(x0, y0, x1, y1, "文本", ...)`。
- **单词级**：`page.get_text("words")`，每词为 `(x0, y0, x1, y1, "词", ...)`。

---

## 6. 图片提取

- `images = page.get_images()` → 遍历取 `xref = img[0]` → `pix = fitz.Pixmap(doc, xref)`；若 `pix.n - pix.alpha >= 4` 需转 RGB：`fitz.Pixmap(fitz.csRGB, pix)`；`pix.save("out.png")`，用毕 `pix = None` 释放。

---

## 7. 创建与编辑 PDF

- **新建**：`doc = fitz.open()` → `page = doc.new_page()` → `page.insert_text((72, 72), "Hello!", fontsize=16, color=(1,0,0))` → `doc.save("out.pdf")` → `doc.close()`。
- **修改已有**：`doc = fitz.open("in.pdf")`，在 `page` 上 `insert_text`、`draw_rect(rect, color=..., fill=True)`、`draw_line(p1, p2, color=..., width=...)`，再 `doc.save("modified.pdf")`。

---

## 8. 合并与拆分 PDF

- **合并**：`merged = fitz.open()` → 对每个源文件 `src = fitz.open(f)` → `merged.insert_pdf(src)` → `src.close()` → `merged.save("merged.pdf")` → `merged.close()`。
- **拆分**：对每页 `target = fitz.open()` → `target.insert_pdf(source, from_page=i, to_page=i)` → `target.save(f"page_{i+1}.pdf")` → `target.close()`。

---

## 9. PDF 转图片

- `matrix = fitz.Matrix(dpi/72, dpi/72)` → `pix = page.get_pixmap(matrix=matrix)` → `pix.save("page_1.png")`，用毕 `pix = None`。可循环每页并指定输出目录。

---

## 10. 搜索与高亮

- **搜索**：`areas = page.search_for("关键词")`，返回矩形列表。
- **高亮**：`annot = page.add_highlight_annot(rect)` → `annot.set_colors(stroke=[1,1,0])` → `annot.update()`。
- **文本注释**：`page.add_text_annot((x,y), "注释内容", icon="Note")`；矩形注释：`page.add_rect_annot(rect)`。

---

## 11. 实战案例：PDF 处理工具

可封装：`pdf_info(path)`（页数、元数据、总文本长度、图片数）；`extract_all_text(pdf_path, output_path)`（逐页 `get_text()` 写入文件）；`create_watermarked_pdf(source, watermark_text, output)`（逐页中心 `insert_text` 浅色水印）→ 保存并关闭。

---

## 12. 常见问题与排查

| 问题 | 处理 |
|------|------|
| 文件不存在 | `try/except FileNotFoundError` 或先 `os.path.exists(path)` |
| 大文件占内存 | 逐页处理、用毕 `pix = None` 和 `doc.close()`，避免一次性加载全部 |
| 中文乱码 | 保存提取结果时用 `open(..., encoding="utf-8")`；PyMuPDF 一般能正确解码 |

---

## 13. 参考

- [PyMuPDF 官方文档](https://pymupdf.readthedocs.io/)
- [PyMuPDF GitHub](https://github.com/pymupdf/PyMuPDF)
- [MuPDF 官网](https://mupdf.com/)

---

**相关文档**：[OpenPyXL](/python/AI课程-openpyxl) · [lxml](/python/AI课程-lxml) · [BeautifulSoup4](/python/AI课程-beautifulsoup4) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [PyMuPDF（课程原文）](https://rag.docs-hub.com/html/PyMuPDF.html)
