# AI 课程：LaTeX

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **LaTeX** 文档，归在 **Python 分类**（与文档生成、排版相关）。LaTeX 是基于 TeX 的排版系统，用于高质量科技文档与数学公式；本课侧重**用 Python 生成 .tex 文件**，适合需要批量生成报告、成绩单、论文模板等场景。与 [python-docx](/python/AI课程-python-docx)、[PyMuPDF](/python/AI课程-PyMuPDF) 等形成「文档生成」的多种方式（Word/PDF 直接写 vs 生成 LaTeX 再编译）。

---

## 1. 什么是 LaTeX？为什么用？

- **是什么**：标记语言式排版系统，写代码描述文档结构与格式，再编译成 PDF；非所见即所得（区别于 Word）。
- **为什么用**：数学公式排版质量高；格式统一、自动编号与引用；适合学术论文、技术报告、长文档；源文件为文本，便于版本控制；可用 Python 批量生成 .tex 再编译。
- **适用**：学术论文、技术报告、书籍、简历、Beamer 幻灯片。**不太适合**：简单便条、需频繁改版式或实时协作的文档。

---

## 2. 前置概念（简要）

| 概念 | 说明 |
|------|------|
| 文档类 | `article`（短文）、`report`（报告）、`book`（书）、`beamer`（幻灯片） |
| 宏包 | 扩展功能，如 `amsmath`（公式）、`graphicx`（图）、`ctex`（中文） |
| 命令 | `\` 开头，如 `\section{标题}`、`\textbf{文本}`、`$公式$` |
| 环境 | `\begin{环境名} ... \end{环境名}`，如 `equation`、`itemize`、`enumerate` |

---

## 3. 基本结构

- **最小结构**：`\documentclass{article}` → `\begin{document}` … `\end{document}`。
- **完整结构**：文档类与选项、`\usepackage{…}`、`\title`/`\author`/`\date`、`\maketitle`、`\section` 等正文。
- **用 Python 生成**：用多行字符串或模板拼出 LaTeX 源码，`open('xxx.tex','w',encoding='utf-8').write(content)` 写出；中文需 `\usepackage[UTF8]{ctex}`。

---

## 4. 数学公式

- **行内**：`$...$` 或 `\(...\)`，如 `$a^2+b^2=c^2$`。
- **行间**：`$$...$$` 或 `\[...\]`；编号用 `\begin{equation}...\end{equation}`。
- **常用**：上下标 `^`/`_`、分数 `\frac{a}{b}`、根号 `\sqrt{x}`、希腊字母 `\alpha`/`\pi`、求和 `\sum`、积分 `\int`、矩阵 `pmatrix`/`bmatrix`。

---

## 5. 文档结构、列表与表格

- **章节**：`\section`、`\subsection`、`\subsubsection`。
- **列表**：`itemize`（无序）、`enumerate`（有序）；可嵌套。
- **表格**：`tabular` 环境，列对齐 `c`/`l`/`r`，`&` 列分隔、`\\` 换行、`\hline` 横线。

---

## 6. 用 Python 批量生成 LaTeX

- 数据放列表/字典（如学生成绩），循环内用 f-string 或模板拼出每份文档的 LaTeX 源码，写入不同 `.tex` 文件。
- 注意：花括号在 f-string 中需双写（左、右花括号各写两遍）；中文与路径用 `encoding='utf-8'`。
- 编译：本地用 `pdflatex xxx.tex` 或使用 Overleaf 等在线编辑器。

---

## 7. 常见问题与总结

- **编译**：Overleaf 在线或本地安装 TeX Live / MiKTeX 后 `pdflatex`。
- **中文**：`\usepackage[UTF8]{ctex}`。
- **常见错误**：缺 `\end{document}`、命令大小写错误、特殊字符 `&`/`%`/`$`/`#`/`_`/`^` 需转义、未加载所需宏包。
- **总结**：LaTeX 适合学术与技术文档；本课重点是用 Python 生成 .tex，实现批量报告、成绩单、模板等自动化。

---

**相关文档**：[python-docx](/python/AI课程-python-docx) · [PyMuPDF](/python/AI课程-PyMuPDF) · [OpenPyXL](/python/AI课程-openpyxl) · [知识体系与学习路径](/ai/知识体系与学习路径) · [LaTeX（课程原文）](https://rag.docs-hub.com/html/LaTeX.html)
