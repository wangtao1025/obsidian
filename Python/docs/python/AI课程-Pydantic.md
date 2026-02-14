# AI 课程：Pydantic

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **Pydantic** 相关文档，归在 **Python 分类**（第三方库）。Pydantic 是基于类型注解的 Python 数据验证库，提供自动类型检查、转换与清洗，常用于 API 请求/响应校验（如 FastAPI 中）、配置文件管理以及 RAG/LLM 流程中的结构化输出（如 [LangChain](/ai/AI课程-LangChain) 的 PydanticOutputParser）。可与 [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)、[LangChain（LCEL 与链）](/ai/AI课程-LangChain) 搭配使用。

---

## 1. 什么是 Pydantic？

| 要点 | 说明 |
|------|------|
| **定位** | 基于类型注解的数据验证库：创建对象时自动检查类型、可自动转换、错误信息清晰。 |
| **核心特点** | 类型注解驱动、自动验证、自动类型转换（如 `"123"` → `123`）、API 简洁。 |
| **类比** | 像智能表格模板：定义列类型与必填项，填写时自动校验并提示错误。 |

---

## 2. 为什么需要 Pydantic？

- **传统方式**：手写大量 `if-else` 检查字段存在性、类型，冗长易漏、难维护。
- **Pydantic 优势**：继承 `BaseModel` 定义字段类型即可自动验证；代码短、错误信息明确、改模型即改校验逻辑。

---

## 3. 前置知识（简要）

| 知识 | 用途 |
|------|------|
| **类型注解** | `str`、`int`、`List[str]`、`Optional[str]` 等，供 Pydantic 做校验与转换。 |
| **类与继承** | 模型类继承 `BaseModel` 获得验证能力。 |
| **字典解包 `**kwargs`** | `User(**user_data)` 从字典创建实例。 |
| **装饰器** | `@validator` 定义字段级验证与清洗逻辑。 |

---

## 4. 安装与验证

- **安装**：`pip install pydantic`（Windows/Mac 可用 `pip3`）。
- **验证**：`from pydantic import BaseModel` 无报错即安装成功。

---

## 5. 快速开始

- 定义模型：`class User(BaseModel): id: int; name: str; email: str; age: int = 18`。
- 创建实例时自动验证类型；缺少必需字段或类型错误会抛出 `ValidationError`。
- 可从字典创建：`User(**user_data)`；错误数据会得到清晰错误信息（字段名 + 错误类型）。

---

## 6. 核心功能

### 6.1 数据验证

- **类型验证**：字段类型不符会报错；若可转换（如 `"123"` → `int`）则自动转换。
- **可选与默认**：`Optional[str] = None`、`age: int = 18`；缺省时使用默认值。
- **ValidationError**：可遍历 `e.errors()` 获取 `loc`、`type`、`msg` 等详情。

### 6.2 数据序列化

| 方法 | 说明 |
|------|------|
| **dict()** | 模型实例转普通字典。 |
| **json()** | 转 JSON 字符串；`json(indent=2)` 可格式化。 |
| **parse_raw(json_string)** | 从 JSON 字符串反序列化为模型实例。 |

### 6.3 字段验证器

- 使用 `@validator('field_name')` 定义校验函数；可对值做清洗（如 `strip()`、`lower()`）再 `return`。
- 校验失败时 `raise ValueError('...')`，会进入 `ValidationError`。

### 6.4 字段配置（Field）

- `Field(..., min_length=1, max_length=50)`：必填、长度限制。
- `Field(..., gt=0)`、`ge=0`、`le=100`：数值范围。
- `Field(default_factory=list)`：可变默认值用 `default_factory`，避免多实例共享同一引用。

### 6.5 嵌套模型

- 字段类型为另一个 `BaseModel`：如 `address: Address`、`company: Company`；可用字典嵌套创建，Pydantic 递归验证。

---

## 7. 高级用法

- **可选字段与默认值**：`Optional[str] = None`、`List[str] = Field(default_factory=list)`（列表默认用 factory）。
- **数据转换与清洗**：在 `@validator` 中 `strip()`、`title()`、`lower()` 等，返回处理后的值。
- **Config**：`class Config: extra = "ignore"` 忽略未定义字段，避免外部多传字段报错。

---

## 8. 实际应用场景

| 场景 | 说明 |
|------|------|
| **API 数据验证（FastAPI）** | 请求体/响应体用 Pydantic 模型，自动校验与文档生成；可用 `EmailStr` 等。 |
| **配置文件管理** | 使用 `BaseSettings`，从环境变量或 `.env` 加载（`env_file=".env"`）。 |
| **数据验证与清洗工具** | 封装 `Model(**raw_data)` + `ValidationError` 处理，返回统一 `{ success, data, errors }`。 |

---

## 9. 常见问题（简要）

- **与普通类的区别**：普通类不校验类型；Pydantic 创建时即校验并可选转换。
- **查看字段信息**：`Model.schema()` 或 `Model.schema_json(indent=2)`。
- **日期时间**：`created_at: datetime`，传入字符串可自动解析为 `datetime`。
- **性能**：一般足够；大批量时可考虑关闭赋值验证或缓存。

---

## 10. 小结

- **定义即校验**：继承 `BaseModel` + 类型注解，自动验证与转换。
- **序列化**：`dict()`、`json()`、`parse_raw()` 便于与 API/存储交互。
- **扩展**：`@validator`、`Field`、嵌套模型、`BaseSettings` 覆盖大部分业务需求。
- **在 RAG/LLM 中**：与 [LangChain](/ai/AI课程-LangChain) 的 PydanticOutputParser 结合，用于结构化输出；与 FastAPI 结合做请求/响应校验。

---

**相关文档**：[LangChain（LCEL 与链）](/ai/AI课程-LangChain) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [Pydantic（课程原文）](https://rag.docs-hub.com/html/Pydantic.html)
