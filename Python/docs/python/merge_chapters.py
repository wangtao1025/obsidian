#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""根据分章文档合并生成语法手册完整版。"""

import os

# 当前脚本所在目录
BASE = os.path.dirname(os.path.abspath(__file__))

# 顺序：(文件名, 完整版中的大标题)
CHAPTERS = [
    ("python语法手册-01-变量与解包.md", "一、变量赋值与解包"),
    ("python语法手册-赋值与算术运算符.md", "二、赋值与算术运算符"),
    ("位运算符详解.md", "二附、位运算符"),
    ("python语法手册-02-内置数据结构.md", "三、内置数据结构 深度解析"),
    ("python语法手册-03-异常.md", "四、异常捕获与主动抛出"),
    ("python语法手册-04-格式化与输出.md", "五、格式化输出"),
    ("python语法手册-05-内置函数.md", "六、内置函数"),
    ("python语法手册-06-逻辑与真值.md", "七、逻辑判断与真值检测"),
    ("python语法手册-07-身份与成员.md", "八、身份判断与成员运算"),
    ("python语法手册-08-数据处理.md", "九、数据处理"),
    ("进制表示与转换.md", "九附、进制表示与转换"),
    ("python语法手册-09-字符编码.md", "十、字符编码"),
    ("python语法手册-10-循环.md", "十一、循环遍历"),
    ("python语法手册-11-标准库.md", "十二、标准库模块"),
]


def extract_body(path: str) -> str:
    """去掉首部导航和自测卷说明，保留从第一个 ## 开始的正文。"""
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    # 找到第一个 --- 之后的第一个 ##，从那里开始是正文（跳过标题与导航）
    first_dash = None
    for i, line in enumerate(lines):
        if line.strip() == "---":
            first_dash = i
            break
    start = 0
    search_from = (first_dash + 1) if first_dash is not None else 0
    for i in range(search_from, len(lines)):
        if lines[i].strip().startswith("## "):
            start = i
            break
    if start == 0 and first_dash is None:
        for i, line in enumerate(lines):
            if line.strip().startswith("## "):
                start = i
                break
    return "".join(lines[start:])


def main():
    header = """# 🐍 Python 全栈开发：核心语法查漏补缺手册

本手册为**分章合并版**，与 [按章阅读](/python/python语法手册) 对应。分章链接见总览。

## 文档链接

| **需求场景** | **对应网站** | **对应前端工具** |
|-------------|--------------|------------------|
| 查内置语法、标准库 (如 datetime) | [Python Docs](https://docs.python.org/zh-cn/3/) | MDN |
| 搜第三方库、安装命令 (pip) | [PyPI](https://pypi.org/) | npm.js |
| 查复杂库的实战教程 | [Real Python](https://realpython.com/) | CSS-Tricks |

**课程相关**： [python 面试题](https://python.docs-hub.com/) · [课程网址](https://study.renshengtech.com/)

---

"""
    parts = [header]
    for filename, full_title in CHAPTERS:
        path = os.path.join(BASE, filename)
        if not os.path.isfile(path):
            parts.append(f"\n\n## {full_title}\n\n*（本章文件未找到：{filename}）*\n\n")
            continue
        body = extract_body(path)
        # 将正文中第一个 ## 行替换为完整版大标题
        lines = body.split("\n")
        for j, ln in enumerate(lines):
            if ln.strip().startswith("## "):
                lines[j] = "## " + full_title
                break
        parts.append("\n".join(lines).strip() + "\n\n")
    out = os.path.join(BASE, "python语法手册-完整版备份.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write(header)
        f.write("\n\n---\n\n".join(p.strip() for p in parts[1:] if p.strip()))
    print("Written:", out)


if __name__ == "__main__":
    main()
