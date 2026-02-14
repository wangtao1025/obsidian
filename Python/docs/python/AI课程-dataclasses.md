# AI 课程：dataclasses

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **dataclasses** 文档，归在 **Python 分类**（标准库）。`dataclasses`（Python 3.7+）通过 `@dataclass` 装饰器自动生成 `__init__`、`__repr__`、`__eq__` 等样板代码，适合配置对象、DTO、API 请求/响应结构；与 [typing 类型提示](/python/AI课程-typing类型提示)、[Pydantic](/python/AI课程-Pydantic) 搭配可理解「数据建模」的多种方式。

---

## 1. 什么是 dataclasses？为什么用？

- **是什么**：标准库模块，用 `@dataclass` 装饰器 + 类型注解声明字段，自动生成构造、打印、等值比较等方法，减少手写样板代码。
- **为什么用**：比普通类简洁；类型注解清晰；支持默认值、排序、不可变、`asdict`/`astuple`/`replace` 等；适合「纯数据」结构（配置、DTO、API 结构体）。

---

## 2. 快速上手

- **导入**：`from dataclasses import dataclass`（另可 `field`、`asdict`、`astuple`、`replace`）。
- **定义**：`@dataclass` 修饰类，用类型注解声明字段，无需手写 `__init__`；实例化后自带友好 `repr` 与 `==` 比较。
- **注意**：无默认值字段必须排在有默认值字段之前；可变默认值（如 `list`、`dict`）必须用 `field(default_factory=list)`，否则多实例共享同一引用。

---

## 3. 自动生成的方法与装饰器参数

| 生成方法 | 说明 | 装饰器控制 |
|----------|------|------------|
| `__init__` | 按字段构造 | `init=True`（默认） |
| `__repr__` | 打印友好字符串 | `repr=True` |
| `__eq__` | 等值比较 | `eq=True` |
| 排序方法 `__lt__` 等 | 用于 `sorted`/min/max | `order=True`（默认 False） |
| `__hash__` | 可放入 set/dict 作 key | `unsafe_hash` 或 `frozen=True` |

常用装饰器参数：`frozen=True`（只读实例）、`order=True`（支持排序）、`repr=False` 等。

---

## 4. field() 与字段控制

| 参数 | 说明 |
|------|------|
| `default` | 默认值；不可与 `default_factory` 同用。 |
| `default_factory` | 工厂函数，每次创建时生成默认值；**列表/字典等必须用此**。 |
| `repr` / `compare` / `hash` | 是否参与打印、比较、哈希。 |
| `init` | 是否出现在 `__init__` 参数中；`init=False` 常用于由 `__post_init__` 计算的字段。 |
| `metadata` | 任意元信息，供框架或工具使用。 |

---

## 5. 高级特性

- **冻结（不可变）**：`@dataclass(frozen=True)`，实例创建后字段不可赋值；适合值类型、作 dict key。
- **排序**：`@dataclass(order=True)`，按字段定义顺序比较；某字段不参与比较可用 `field(compare=False)`。
- **继承**：子类继承父类字段，子类新字段在后；与普通类继承一致。
- **__post_init__**：在自动 `__init__` 之后调用，用于校验、计算派生属性（如面积 = 宽×高）；校验失败可 `raise ValueError`。
- **转换与复制**：`asdict(obj)`、`astuple(obj)` 递归转字典/元组；`replace(obj, **changes)` 生成修改后的新实例（原实例不变）。

---

## 6. 实战场景与对比

| 场景 | 说明 |
|------|------|
| **配置管理** | 数据库/API 等配置项用 dataclass，类型+默认值清晰，易与 JSON/YAML 互转。 |
| **API 响应封装** | 统一结构（success、data、message、code）；可配合 `Generic[T]` 做泛型 data。 |
| **数据校验** | 在 `__post_init__` 中检查价格≥0、库存≥0、名称非空等。 |

与 **namedtuple**：dataclass 默认可变、支持默认值与继承、类型注解更自然。与 **普通类**：少写大量样板代码。与 **[Pydantic](/python/AI课程-Pydantic)**：Pydantic 侧重「校验+转换+序列化」，适合 API 边界；dataclass 侧重「轻量数据结构」，不做运行时类型转换。

---

## 7. 常见错误与小结

- **错误**：可变默认值直接写 `[]`/`{}` → 用 `field(default_factory=list)`；逻辑校验放在 `__init__` → 推荐放 `__post_init__`。
- **小结**：dataclass 适合配置、DTO、简单数据结构；善用类型注解、`default_factory`、`__post_init__`、`frozen`；目标是少样板、提可读性与安全性。

---

**相关文档**：[typing 类型提示](/python/AI课程-typing类型提示) · [Pydantic](/python/AI课程-Pydantic) · [abc 抽象基类](/python/AI课程-abc) · [知识体系与学习路径](/ai/知识体系与学习路径) · [dataclasses（课程原文）](https://rag.docs-hub.com/html/dataclasses.html)
