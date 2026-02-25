# Python 语法手册：异常捕获与主动抛出

← [语法手册总览](/python/python语法手册) | 下一章见总览

---

**本章对应自测卷**：[三、异常捕获与主动抛出（共 8 题）](/python/Python核心语法自测试卷#三异常捕获与主动抛出-共-8-题)  
**学完能做什么**：用 `try/except` 处理非法输入，用 `raise` 做业务边界校验，分清 `else` 与 `finally`。  
**小白注意**：① `except` 尽量写具体类型（如 `ValueError`），避免裸 `except`。② `else` 是 try 里**没异常**时才执行；`finally` 是**无论是否异常**都执行（常用来关文件、释放资源）。

---

## 三、异常捕获与主动抛出

- **对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]][[python 面试题#[题目 1.2]：进制转换与存储单位换算 (算法类)]]**
- **核心直觉**：
	- **被动捕获 (`try-except`)**：用于预测并优雅地处理潜在的崩溃（如前端传来的脏数据）。
	    
	- **主动抛出 (`raise`)**：用于当逻辑不符合业务要求时，果断中断程序并告知原因。
#### 3.1 被动捕获（处理非法转换）
在处理外部输入（API 请求、文件读取）时，必须保护程序不被 `ValueError` 或 `TypeError` 击垮。
```python
# 对应例题：[题目 1.1] 中的数据清洗
try:
    # 尝试将前端传来的字符串转为数字
    age = int(student_info["age"]) 
except (ValueError, TypeError):
    # 捕获转换失败，不让程序崩溃，而是返回 None 标记数据无效
    return None
```
#### 3.2 主动抛出（执行业务规则）

在底层函数中，如果输入参数合法但**不符合业务逻辑**（例如：进制转换超出了 2-16 进制），应主动抛出异常，让调用者知道哪里出错了。
```python
# 对应例题：[题目 1.2] 中的进制校验
def convert_base(number_str, from_base, to_base):
    # 防御性编程：主动检查业务边界
    if not (2 <= from_base <= 16) or not (2 <= to_base <= 16):
        # 抛出异常：强制调用者必须传入正确的进制范围
        raise ValueError("进制范围必须在 2 到 16 之间") 
    
    # 后续逻辑...
```
#### 3.3 常见的异常类型 

- **`ValueError`**：传入的值类型正确但内容非法（如 `int("abc")` 或进制不在 2-16 范围内）。
    
- **`TypeError`**：操作或函数应用于不适当类型的对象（如对 `None` 进行加法）。
    
- **`KeyError`**：试图访问字典中不存在的键。
    
- **`IndexError`**：序列索引超出范围。

- **编码专用异常**：（**自测卷 3.5 待复习**）
	- `UnicodeEncodeError`：字符串转字节失败（如 ASCII 编码中文）。
	- `UnicodeDecodeError`：字节转字符串失败（如 用 UTF-8 去读 GBK 字节流）。
	- `LookupError`：使用了不存在的编码名称。
#### 3.4 专家级贴士：`try-except-else-finally`

- **`else`**：当 `try` 块没有发生异常时执行（用于区分“成功执行”的逻辑）。（**自测卷 3.6 待复习**）
    
- **`finally`**：无论是否发生异常都会执行（常用于关闭文件句柄、释放数据库连接等工业级清理操作）。

---

**本章小结**：被动捕获用 `try/except`，主动校验用 `raise ValueError("...")`。常见异常：ValueError、TypeError、KeyError、IndexError；编码相关 UnicodeEncodeError/UnicodeDecodeError。`else` 在无异常时执行，`finally` 必定执行。
