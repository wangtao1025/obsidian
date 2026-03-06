# Python 知识点导航

← [Python 首页](/python/) | [语法手册总览](/python/python语法手册)

---

本文把 `python.docs-hub.com` 的 66 道题（题号表现为 `1–65、67`）以及站内几个扩展主题，统一映射到当前笔记体系中。  
使用方式很简单：**先按题号找主题，再跳到对应文档系统复习知识点，不要只背题目答案。**

## 一、66 题知识点落点总表

| 题号 | 主题 | 当前文档落点 |
| --- | --- | --- |
| 1 | VSCode 开发 | [Python 开发环境与工具链](/python/Python开发环境与工具链) |
| 2 | 什么是 Python？ | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| 3 | 请详细解释 Python 代码的执行过程 | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| 4 | 请详细解释解释型语言与编译型语言的主要区别 | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| 5 | 你知道哪些 Python 的编码规范？ | [Python 开发环境与工具链](/python/Python开发环境与工具链) |
| 6 | 数据类型 | [Python 数据类型总览](/python/Python数据类型总览) |
| 7 | Python 中如何声明多个变量并赋值 | [语法手册 · 第1章 变量与解包](/python/python语法手册-01-变量与解包) |
| 8 | Python 有哪些内置数据结构 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 9 | `!=` 和 `is not` 运算符有什么区别？ | [语法手册 · 第9章 身份与成员](/python/python语法手册-07-身份与成员) |
| 10 | 进制 | [语法手册 · 第10章 数据处理](/python/python语法手册-08-数据处理) |
| 11 | 编码 | [语法手册 · 第11章 字符编码](/python/python语法手册-09-字符编码) |
| 12 | `print` | [语法手册 · 第6章 格式化输出](/python/python语法手册-04-格式化与输出) |
| 13 | `break`、`continue`、`pass` | [语法手册 · 第12章 循环遍历](/python/python语法手册-10-循环) |
| 14 | `namedtuple` 有什么作用 | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 15 | `range()` 如何运用 | [语法手册 · 第12章 循环遍历](/python/python语法手册-10-循环) |
| 16 | `join()` 和 `split()` 的区别 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 17 | 字符串转小写 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 18 | 删除字符串前置空格 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 19 | 使用索引反转字符串 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 20 | 什么是成员运算符 | [语法手册 · 第9章 身份与成员](/python/python语法手册-07-身份与成员) |
| 21 | 逻辑运算符 `and` / `or` / `not` | [语法手册 · 第8章 逻辑与真值](/python/python语法手册-06-逻辑与真值) |
| 22 | 关系运算符 | [语法手册 · 第8章 逻辑与真值](/python/python语法手册-06-逻辑与真值) |
| 23 | 赋值和算术运算符 | [语法手册 · 第2章 赋值与算术运算符](/python/python语法手册-赋值与算术运算符) |
| 24 | 整数除法、取模、幂运算 | [语法手册 · 第2章 赋值与算术运算符](/python/python语法手册-赋值与算术运算符) |
| 25 | 不同进制的表示和转换 | [语法手册 · 第10章 数据处理](/python/python语法手册-08-数据处理) |
| 26 | 位运算符 | [语法手册 · 第2章 赋值与算术运算符](/python/python语法手册-赋值与算术运算符) |
| 27 | 三元表达式 | [语法手册 · 第8章 逻辑与真值](/python/python语法手册-06-逻辑与真值) |
| 28 | Python 中如何实现 switch | [语法手册 · 第8章 逻辑与真值](/python/python语法手册-06-逻辑与真值) |
| 29 | 负索引 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 30 | 字符串替换操作 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 31 | `append`、`insert`、`extend` 的区别 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 32 | `enumerate()` 的作用 | [语法手册 · 第7章 内置函数](/python/python语法手册-05-内置函数) |
| 33 | `remove`、`del`、`pop` 的区别 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 34 | 更改列表元素的数据类型 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 35 | 列表和元组的区别 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 36 | 元组解包 / 解封装 | [语法手册 · 第1章 变量与解包](/python/python语法手册-01-变量与解包) |
| 37 | 详细说明字典 | [语法手册 · 第3章 内置数据结构](/python/python语法手册-02-内置数据结构) |
| 38 | `KeyError`、`TypeError`、`ValueError` 的区别 | [语法手册 · 第5章 异常](/python/python语法手册-03-异常) |
| 39 | `read()`、`readline()`、`readlines()` | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 40 | iterable、iterator、generator | [Python 迭代模型与生成器](/python/Python迭代模型与生成器) |
| 41 | 如何读取大文件 | [Python 迭代模型与生成器](/python/Python迭代模型与生成器) |
| 42 | 浅拷贝和深拷贝 | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 43 | Lambda 函数 | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) |
| 44 | `reduce` 的作用 | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 45 | `zip` 的作用 | [语法手册 · 第7章 内置函数](/python/python语法手册-05-内置函数) |
| 46 | `any()` 和 `all()` | [语法手册 · 第7章 内置函数](/python/python语法手册-05-内置函数) |
| 47 | 为什么 Python 中没有函数重载 | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) |
| 48 | 变量作用域（Scope） | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) |
| 49 | 闭包 | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) |
| 50 | Python 内存管理机制 | [Python 运行时与内存机制](/python/Python运行时与内存机制) |
| 51 | Python 程序退出时内存的释放情况 | [Python 运行时与内存机制](/python/Python运行时与内存机制) |
| 52 | Python 中是否有严格意义上的 `main` 函数 | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| 53 | pickling 和 unpickling | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 54 | 猴子补丁（monkey patching） | [Python 对象模型与协议](/python/Python对象模型与协议) |
| 55 | 鸭子类型（Duck Typing） | [Python 对象模型与协议](/python/Python对象模型与协议) |
| 56 | 面向对象编程 | [Python 面向对象基础](/python/Python面向对象基础) |
| 57 | Python 是否支持多重继承 | [Python 面向对象基础](/python/Python面向对象基础) |
| 58 | Python3 中装饰器的用法 | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) |
| 59 | 模块和包 | [Python 模块、包与导入机制](/python/Python模块包与导入机制) |
| 60 | 使用过哪些 Python 标准库模块 | [语法手册 · 第13章 标准库模块](/python/python语法手册-11-标准库) |
| 61 | Python 魔术方法 | [Python 对象模型与协议](/python/Python对象模型与协议) |
| 62 | 多线程、多进程和线程池 | [Python 并发基础](/python/Python并发基础) |
| 63 | 如何分析 Python 代码的执行性能 | [Python 性能分析与调优基础](/python/Python性能分析与调优基础) |
| 64 | `pip` | [Python 开发环境与工具链](/python/Python开发环境与工具链) |
| 65 | `python -m pip` | [Python 开发环境与工具链](/python/Python开发环境与工具链) |
| 67 | `uv` | [Python 开发环境与工具链](/python/Python开发环境与工具链) |

## 二、题站扩展主题落点

| 扩展主题 | 当前文档落点 |
| --- | --- |
| `utf8` | [语法手册 · 第11章 字符编码](/python/python语法手册-09-字符编码) |
| `ast` | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| `dis` | [Python 语言认知与执行模型](/python/Python语言认知与执行模型) |
| `尾递归` | [语法手册 · 第4章 函数与作用域](/python/python语法手册-函数与作用域) · [Python 运行时与内存机制](/python/Python运行时与内存机制) |
| `MethodType` | [Python 对象模型与协议](/python/Python对象模型与协议) |

## 三、推荐学习顺序

如果你是从零开始，建议按这个顺序：

1. [Python 开发环境与工具链](/python/Python开发环境与工具链)
2. [Python 语言认知与执行模型](/python/Python语言认知与执行模型)
3. [Python 数据类型总览](/python/Python数据类型总览)
4. 核心语法 13 章
5. [Python 模块、包与导入机制](/python/Python模块包与导入机制)
6. [Python 迭代模型与生成器](/python/Python迭代模型与生成器)
7. [Python 面向对象基础](/python/Python面向对象基础)
8. [Python 对象模型与协议](/python/Python对象模型与协议)
9. [Python 运行时与内存机制](/python/Python运行时与内存机制)
10. [Python 并发基础](/python/Python并发基础)
11. [Python 性能分析与调优基础](/python/Python性能分析与调优基础)

## 四、使用建议

- **按题回查**：面试前直接从题号跳到落点文档。
- **按知识体系学**：优先从章节和专题系统学习，不要把题目答案当唯一入口。
- **按空白补漏**：如果你发现某题会背不会讲，就回到对应文档看“一句话先懂 + 规则 + 示例 + 易错点”。
