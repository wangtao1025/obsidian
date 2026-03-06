# Findings

- 用户期望不是继续扩写 `python 面试题.md`，而是把 `python.docs-hub.com` 的题目拆成知识点，回填到《Python 全栈开发：核心语法查漏补缺手册》的对应章节。
- `python.docs-hub.com` 当前可访问的编号题共有 **66** 道（`1`–`65`、`67`）。
- 并非所有题都适合直接进入“核心语法手册”正文：
  - 适合回填的有：变量赋值、运算符、数据结构、异常、格式化输出、内置函数、逻辑、身份、数据处理、字符编码、循环、标准库、函数与作用域。
  - 更偏工程/运行时/生态工具的题（如 PEP8、内存管理、pip/uv、并发、面向对象体系）更适合后续单列“工程补充手册”。
- 本轮已完成的手册补充：
  - `python语法手册.md`：新增“面试题站知识点映射”，把 66 题按章节映射回手册。
  - `python语法手册-函数与作用域.md`：从占位状态补成可用章节，覆盖 `lambda`、LEGB、`global/nonlocal`、闭包、装饰器、无函数重载。
  - `python语法手册-01-变量与解包.md`：新增多变量赋值、交换变量、`**` 合并覆盖规则。
  - `python语法手册-03-异常.md`：新增 `KeyError` / `TypeError` / `ValueError` 区分。
  - `python语法手册-05-内置函数.md`：新增 `enumerate`、`zip`、`any/all`。
  - `python语法手册-07-身份与成员.md`：新增 `!=` vs `is not` 补充。
  - `python语法手册-10-循环.md`：新增“大文件按行读取”补充。
  - `python语法手册-11-标准库.md`：新增文件读取、`copy`、`functools.reduce`、`pickle`、`timeit/cProfile`。
- 本轮发现并修复一处历史脏文本污染：`python语法手册-05-内置函数.md` 顶部混入异常 patch 字符串。
