# AI 课程：python-pptx

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **python-pptx** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、python-docx、OpenPyXL、PyMuPDF 等同为课程用到的第三方库）。python-pptx 用于读写 PowerPoint 2007+ 的 .pptx 文件，支持创建/修改幻灯片、布局、文本、图片、形状、表格、图表；RAG 文档解析、批量生成报告/会议材料常用；可与 [python-docx](/python/AI课程-python-docx)、[OpenPyXL](/python/AI课程-openpyxl) 等文档处理库搭配学习。

---

## 1. 什么是 python-pptx？

python-pptx 是读写 .pptx（PowerPoint 2007+）的 Python 库，面向对象 API：演示文稿（Presentation）→ 幻灯片（Slide）→ 形状（Shape）→ 文本框/图片/表格等。支持创建新演示、读取与修改现有演示；适用于批量报告、标准化材料、数据结果转 PPT。**导入**：`from pptx import Presentation`。建议同时安装 `pillow` 以处理图片。

---

## 2. 安装 python-pptx

- Windows：`python -m pip install --upgrade pip` → `python -m pip install python-pptx pillow`。
- macOS：`python3 -m pip install --upgrade pip` → `python3 -m pip install python-pptx pillow`。
- 验证：`from pptx import Presentation` → `print("python-pptx 安装成功！")`。

---

## 3. 前置概念

| 概念 | 说明 |
|------|------|
| **Presentation** | 整个 PPT 文件，`Presentation()` 新建或 `Presentation(path)` 打开 |
| **Slide** | 演示文稿中的一页 |
| **Layout** | 幻灯片模板（标题页、标题和内容、空白等），`prs.slide_layouts[i]` |
| **Placeholder** | 占位符，用于放标题、正文、图片等 |
| **Shape** | 幻灯片上的元素：文本框、图片、表格、图表等 |

---

## 4. 创建最简单的 PPT

- `prs = Presentation()` → `slide_layout = prs.slide_layouts[0]`（标题幻灯片）→ `slide = prs.slides.add_slide(slide_layout)` → `slide.shapes.title.text = "标题"`，`slide.placeholders[1].text = "副标题"` → `prs.save("quick_start.pptx")`。

---

## 5. 幻灯片布局

- 常用：布局 0 标题幻灯片、1 标题和内容、3 两栏内容、6 空白。遍历 `prs.slide_layouts` 可打印 `layout.name`。按需选 `prs.slide_layouts[idx]` 再 `add_slide(layout)`。

---

## 6. 读取现有演示文稿

- `prs = Presentation(path)` → `len(prs.slides)`；遍历 `prs.slides`，`slide.shapes.title.text` 取标题，遍历 `slide.shapes` 用 `hasattr(shape, "text")` 与 `shape.text` 取文本。可用于查看结构、在模板上追加内容、批量修改。

---

## 7. 文本格式设置

- 空白页：`prs.slide_layouts[6]`。`add_textbox(left, top, width, height)`（单位 `Inches`）→ `text_frame.paragraphs[0].text`、`add_paragraph()`；段落 `alignment = PP_ALIGN.CENTER`，`level` 控制项目符号层级；`runs[0].font.size = Pt(28)`、`font.bold`、`font.color.rgb = RGBColor(0,102,204)`。需导入 `pptx.util`（Inches, Pt）、`pptx.enum.text`（PP_ALIGN）、`pptx.dml.color`（RGBColor）。

---

## 8. 插入图片和形状

- **图片**：`slide.shapes.add_picture(img_path, left, top, width=Inches(4))`；图片不存在时可用 `try/except FileNotFoundError`，改插占位形状。
- **形状**：`slide.shapes.add_shape(shape_type, left, top, width, height)`，如 1=矩形；`shape.text`、`shape.fill.solid()`、`shape.fill.fore_color.rgb`、`shape.line.width = Pt(2)`。

---

## 9. 创建表格

- `table_shape = slide.shapes.add_table(rows, cols, left, top, width, height)` → `table = table_shape.table`；`table.cell(r, c).text = value`；单元格内 `cell.text_frame.paragraphs` 设 `alignment`、`font.size`、表头可设 `fill` 与 `font.color.rgb`。

---

## 10. 插入图表

- `ChartData()` → `categories = [...]`，`add_series("系列名", (v1, v2, ...))`；`slide.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, left, top, width, height, chart_data)`；`chart.has_title = True`，`chart.chart_title.text_frame.text = "标题"`，`chart.has_legend = True`，`chart.legend.position = XL_LEGEND_POSITION.BOTTOM`。常用类型：COLUMN_CLUSTERED、LINE、PIE。

---

## 11. 综合示例：自动化报告生成器

- 封装类：初始化 `Presentation()`；方法如 `_add_title_slide(title, subtitle)`、`_add_summary_slide(points)`、`_add_table_slide(rows)`、`_add_chart_slide(chart_info)`，内部按需用布局 0/1/6、add_textbox、add_table、add_chart；`build(data, output)` 依次调用并 `prs.save(output)`。数据用字典传入标题、摘要列表、表格二维列表、图表 categories/series。

---

## 12. 常见问题与解决方案

| 问题 | 处理 |
|------|------|
| 无法删除幻灯片 | 无直接 API；建议重建演示只加需要的页，或使用第三方/底层 XML（不推荐） |
| 图表功能受限 | 仅基础图表；复杂图可用 matplotlib 出图再插入，或 Excel 做图后复制 |
| 字体显示不对 | 确保系统已安装该字体；建议用常见字体（微软雅黑、Arial） |
| 布局编号不一致 | 不同模板编号可能不同；用布局名或先枚举 `slide_layouts` 确认，或多用空白布局 6 |
| 性能 | 复用 Presentation、封装公共结构、大批量分批处理 |
| 文件路径 | 相对路径最简；跨平台用 `os.path.join()` |

---

**相关文档**：[python-docx](/python/AI课程-python-docx) · [OpenPyXL](/python/AI课程-openpyxl) · [PyMuPDF](/python/AI课程-PyMuPDF) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [python-pptx（课程原文）](https://rag.docs-hub.com/html/python-pptx.html)
