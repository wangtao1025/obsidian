# AI 课程：OpenPyXL

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **openpyxl** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、lxml 等同为课程用到的第三方库）。OpenPyXL 用于读写 Excel 2007+ 格式（.xlsx、.xlsm 等），支持创建工作簿、读写单元格、样式、公式、图表；RAG 文档解析、报表生成、表格数据提取常用；可与 [python-docx](https://rag.docs-hub.com/html/python-docx.html)、[BeautifulSoup4](/python/AI课程-beautifulsoup4) 等文档处理库搭配学习。

---

## 1. 什么是 OpenPyXL？

OpenPyXL 是 Python 中流行的 Excel 处理库，专门针对 .xlsx/.xlsm/.xltx/.xltm。支持创建、读取、修改、样式、公式、图表；纯 Python、跨平台、无需安装 Microsoft Excel。

**前置概念**：工作簿（Workbook）、工作表（Worksheet）、单元格（Cell）、坐标（A1、B2…）。

---

## 2. 环境准备

- Python ≥ 3.7。
- 安装：`python -m pip install openpyxl`（或 `python3 -m pip install openpyxl`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。
- 验证：`import openpyxl` → `wb = openpyxl.Workbook()` → `wb.active["A1"] = "测试"` → `wb.active["A1"].value`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Workbook** | 整个 Excel 文件，`Workbook()` 新建、`load_workbook()` 加载 |
| **Worksheet** | 工作簿中的一个表，`wb.active`、`wb["表名"]`、`wb.sheetnames` |
| **Cell** | 单元格，通过坐标 `ws["A1"]` 或 `ws.cell(row=1, column=1)` 访问 |
| **坐标** | 列字母+行号（A1、B2），或行列数字（列从 1 开始） |

---

## 4. 快速体验：创建与读取

- **创建**：`from openpyxl import Workbook` → `wb = Workbook()` → `ws = wb.active` → `ws.title = "销售数据"` → `ws["A1"] = "月份"` → `ws.append(["一月", 1000])` → `wb.save("quick_start.xlsx")`。
- **读取**：`from openpyxl import load_workbook` → `wb = load_workbook("quick_start.xlsx")` → `ws = wb["销售数据"]` → `ws["A1"].value`，遍历 `ws["A2:B4"]` 或 `wb.close()`。

---

## 5. 工作簿与工作表管理

- **创建/删除表**：`wb.create_sheet("汇总表")`、`wb.create_sheet("报表头", 0)`、`wb.remove(ws)`。
- **复制表**：`wb.copy_worksheet(ws_main)`，再设置 `ws_copy.title`。

---

## 6. 单元格读写

- **访问**：`ws["A1"]`、`ws.cell(row=2, column=1, value="张三")`、`.value` 读写。
- **批量**：`ws.append([...])` 在末尾追加一行。
- **遍历**：`for row in ws["A1:C4"]`、`ws.iter_rows(min_row=1, max_row=4, min_col=1, max_col=3, values_only=True)`、`cell.coordinate`。

---

## 7. 样式设置

- **字体与填充**：`from openpyxl.styles import Font, PatternFill` → `Font(name="微软雅黑", size=12, bold=True, color="FFFFFF")`、`PatternFill(fill_type="solid", fgColor="4F81BD")` → `cell.font = ...`、`cell.fill = ...`。
- **对齐与边框**：`Alignment(horizontal="center", vertical="center")`、`Border(left=Side(style="thin"), ...)` → `cell.alignment`、`cell.border`。
- **行高列宽**：`ws.column_dimensions["A"].width = 10`、`ws.row_dimensions[1].height = 30`。

---

## 8. 公式计算

- 单元格赋值为公式字符串：`ws["E2"] = "=SUM(B2:D2)"`、`ws.cell(row=2, column=6).value = "=AVERAGE(B2:D2)"`。OpenPyXL 只写入公式，不计算；用 Excel 打开时自动计算。常用：SUM、AVERAGE、MAX、MIN。

---

## 9. 读取大文件

- **只读模式**：`load_workbook("large.xlsx", read_only=True)`，用 `ws.iter_rows(values_only=True)` 遍历，用完 `wb.close()`，可显著降低内存。

---

## 10. 实战案例：销售报表生成器

可封装函数：建 Workbook、设标题行与样式（Font、PatternFill、Alignment、Border）、循环 `append` 数据行并写 SUM/AVERAGE 公式、加总计行、设列宽行高、`wb.save(filename)`。

---

## 11. 常见问题与排查

| 问题 | 处理 |
|------|------|
| 文件损坏/无法打开 | 避免文件被占用；用 try-except 保证保存流程完整；可检查文件是否被锁定再写 |
| 中文字体不生效 | 使用系统已安装字体名（如 Windows「微软雅黑」、macOS「PingFang SC」） |
| 公式不计算 | 正常：OpenPyXL 只写公式，Excel 打开时计算；若要在 Python 中得结果，可手动计算后写 `.value` |
| 大文件慢/占内存 | 读用 `read_only=True`，遍历用 `iter_rows(values_only=True)`；写时多用 `append` 少用逐格赋值；用毕 `wb.close()` |

---

## 12. 参考

- [OpenPyXL 官方文档](https://openpyxl.readthedocs.io/)
- [Excel 公式参考](https://support.microsoft.com/office/)

---

**相关文档**：[BeautifulSoup4](/python/AI课程-beautifulsoup4) · [lxml](/python/AI课程-lxml) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [openpyxl（课程原文）](https://rag.docs-hub.com/html/openpyxl.html)
