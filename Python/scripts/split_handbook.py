#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""按章拆分 Python 语法手册，并生成总览页。"""
import re
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs" / "python"
BACKUP = DOCS / "python语法手册-完整版备份.md"

CHAPTERS = [
    ("01-变量与解包", "一、 变量赋值与解包"),
    ("02-内置数据结构", "二、 内置数据结构 深度解析"),
    ("03-异常", "三、 异常捕获与主动抛出"),
    ("04-格式化与输出", "四、 格式化输出"),
    ("05-内置函数", "五、 内置函数"),
    ("06-逻辑与真值", "六、 逻辑判断 与 真值检测"),
    ("07-身份与成员", "七、 身份判断"),
    ("08-数据处理", "八、 数据处理"),
    ("09-字符编码", "九、字符编码"),
    ("10-循环", "十、循环遍历"),
    ("11-标准库", "十一、标准库模块"),
]

def main():
    text = BACKUP.read_text(encoding="utf-8")

    # 文档链接 + 课程链接（到第一个 ## 一、 之前）
    intro_end = text.find("## 一、 变量赋值与解包")
    intro = text[:intro_end].strip()

    # 按 ## 一、 ## 二、 ... 切分
    pattern = r"^## (一、|二、|三、|四、|五、|六、|七、|八、|九、|十、|十一、)"
    parts = re.split(pattern, text[intro_end:], flags=re.MULTILINE)
    # parts[0] 为空（intro_end 起是 "## 一、..."），parts[1] 是 "一、", parts[2] 是第一章内容...

    for i, (slug, title_mark) in enumerate(CHAPTERS):
        idx = 2 * i + 2
        if idx >= len(parts):
            break
        content = parts[idx].strip()
        lines = content.split("\n")
        first_line = lines[0].strip() if lines else ""
        body = "\n".join(lines[1:]).strip() if len(lines) > 1 else ""
        # 完整二级标题：一、 + 首行（如「变量赋值与解包」或「格式化输出 `(f-string` 与 `print)`」）
        section_title = title_mark.split("、", 1)[0] + "、" + first_line
        name = first_line.split("`")[0].strip() if "`" in first_line else first_line
        full_content = f"# Python 语法手册：{name}\n\n← [语法手册总览](/) | 下一章见总览\n\n---\n\n## {section_title}\n\n{body}\n"
        out = DOCS / f"python语法手册-{slug}.md"
        out.write_text(full_content, encoding="utf-8")
        print(f"Wrote {out.name}")

    # 总览页
    overview = intro + "\n\n## 按章阅读（分类拆分）\n\n"
    overview += "| 章 | 主题 | 链接 |\n|----|------|------|\n"
    for slug, title_mark in CHAPTERS:
        name = title_mark.split("、", 1)[1].strip()
        overview += f"| {slug[:2]} | {name} | [阅读](/python/python语法手册-{slug}) |\n"
    overview += "\n**完整未拆分版**（备份）：[python语法手册-完整版备份](/python/python语法手册-完整版备份)\n"
    (DOCS / "python语法手册.md").write_text(overview, encoding="utf-8")
    print("Wrote python语法手册.md (overview)")

if __name__ == "__main__":
    main()
