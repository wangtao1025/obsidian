# Python

本分类现在按 **学习准备**、**核心语法**、**进阶专题**、**标准库**、**第三方库（课程内）**、**自测与面试** 六组组织。  
如果你是第一次系统学 Python，建议按左侧菜单顺序阅读；如果你已经在开发，可直接从专题页或知识点导航跳转到对应空白点。

## 项目续接

| 文档 | 说明 |
| --- | --- |
| [手册整理继续使用说明](/python/手册整理继续使用说明) | 新开对话时先看这份，能快速理解当前 Python 笔记项目状态与后续接手方式 |

## 学习准备

| 文档 | 说明 |
| --- | --- |
| [Python 首页](/python/) | 当前入口页，查看整体结构 |
| [语法手册总览](/python/python语法手册) | 全栈开发核心语法查漏补缺手册总览 |
| [Python 开发环境与工具链](/python/Python开发环境与工具链) | VSCode、虚拟环境、`pip`、`python -m pip`、`uv`、PEP 8 |
| [Python 语言认知与执行模型](/python/Python语言认知与执行模型) | Python 是什么、执行流程、AST、字节码、`__main__` |
| [Python 数据类型总览](/python/Python数据类型总览) | 可变 / 不可变、可哈希、常见类型选择 |

## 核心语法

| 文档 | 说明 |
| --- | --- |
| [第1章 变量赋值与解包](/python/python语法手册-01-变量与解包) | 多变量赋值、解包、交换变量 |
| [第2章 赋值与算术运算符](/python/python语法手册-赋值与算术运算符) | 算术、赋值、优先级、位运算 |
| [第3章 内置数据结构](/python/python语法手册-02-内置数据结构) | list / tuple / dict / set / str 及高频方法 |
| [第4章 函数与作用域](/python/python语法手册-函数与作用域) | 参数、LEGB、闭包、装饰器、递归 |
| [第5章 异常捕获与主动抛出](/python/python语法手册-03-异常) | 常见异常、捕获链路、抛出 |
| [第6章 格式化输出](/python/python语法手册-04-格式化与输出) | `print`、f-string、对齐、格式化 |
| [第7章 内置函数](/python/python语法手册-05-内置函数) | `len`、`sum`、`sorted`、`enumerate`、`zip` |
| [第8章 逻辑判断与真值检测](/python/python语法手册-06-逻辑与真值) | 逻辑运算、关系运算、三元表达式、switch 替代 |
| [第9章 身份与成员](/python/python语法手册-07-身份与成员) | `is`、`==`、成员运算 |
| [第10章 数据处理与进制表示](/python/python语法手册-08-数据处理) | 进制、单位换算、数值处理 |
| [第11章 字符编码](/python/python语法手册-09-字符编码) | `str` / `bytes`、编码解码、`utf-8` |
| [第12章 循环遍历](/python/python语法手册-10-循环) | `range`、`for/while`、大文件按行处理 |
| [第13章 标准库模块](/python/python语法手册-11-标准库) | `datetime`、`namedtuple`、`re`、`copy`、`pickle` |
| [语法手册完整版](/python/python语法手册-完整版备份) | 未拆分前的单页备份 |

## 进阶专题

| 文档 | 说明 |
| --- | --- |
| [Python 模块、包与导入机制](/python/Python模块包与导入机制) | `import`、包结构、`__init__.py`、`python -m` |
| [Python 迭代模型与生成器](/python/Python迭代模型与生成器) | iterable / iterator / generator、`yield` |
| [Python 面向对象基础](/python/Python面向对象基础) | 类、对象、继承、多重继承、MRO |
| [Python 对象模型与协议](/python/Python对象模型与协议) | 鸭子类型、魔术方法、描述符、猴子补丁 |
| [Python 运行时与内存机制](/python/Python运行时与内存机制) | 引用、GC、内存释放、尾递归 |
| [Python 并发基础](/python/Python并发基础) | 多线程、多进程、线程池 / 进程池 |
| [Python 性能分析与调优基础](/python/Python性能分析与调优基础) | `timeit`、`cProfile`、`tracemalloc` |

## 自测与面试

| 文档 | 说明 |
| --- | --- |
| [知识点导航](/python/Python-知识点导航) | 1–67 题及扩展主题的落点导航 |
| [核心语法自测试卷](/python/Python核心语法自测试卷) | 自测题（现已包含核心语法 + 补充专题） |
| [核心语法 · 错题本](/python/Python核心语法-错题本) | 复习与回看 |
| [Python 面试题](/python/python%20面试题) | 面试题汇总 |

## 标准库

总览见 [语法手册 · 第13章 标准库](/python/python语法手册-11-标准库)。课程中单独成篇的标准库模块：

| 主题 | 跳转 |
| --- | --- |
| `math` | [math 数学库](/python/AI课程-math数学库) |
| `typing` | [typing 类型提示](/python/AI课程-typing类型提示) |
| `collections` | [collections](/python/AI课程-collections) |
| `random` | [random](/python/AI课程-random) |
| `abc` | [abc 抽象基类](/python/AI课程-abc) |
| `dataclasses` | [dataclasses](/python/AI课程-dataclasses) |
| `heapq` | [heapq 使用指南](/python/heapq使用指南) |

## 第三方库（课程内）

| 主题 | 跳转 |
| --- | --- |
| jieba | [jieba](/python/AI课程-jieba) |
| BeautifulSoup4 | [BeautifulSoup4](/python/AI课程-beautifulsoup4) |
| lxml | [lxml](/python/AI课程-lxml) |
| OpenPyXL | [OpenPyXL](/python/AI课程-openpyxl) |
| PyMuPDF | [PyMuPDF](/python/AI课程-PyMuPDF) |
| Pydantic | [Pydantic](/python/AI课程-Pydantic) |
| python-docx | [python-docx](/python/AI课程-python-docx) |
| python-pptx | [python-pptx](/python/AI课程-python-pptx) |
| Requests | [Requests](/python/AI课程-requests) |
| text_splitter | [text_splitter](/python/AI课程-text_splitter) |
| Sentence Transformers | [Sentence Transformers](/python/AI课程-sentence_transformers) |
| OpenAI | [OpenAI](/python/AI课程-openai) |
| Flask | [Flask](/python/AI课程-Flask) |
| NumPy | [NumPy](/python/AI课程-numpy) |
| Scikit-learn | [Scikit-learn](/python/AI课程-scikit-learn) |
| LaTeX | [LaTeX](/python/AI课程-LaTeX) |
