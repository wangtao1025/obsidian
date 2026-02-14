# AI 课程：abc 抽象基类

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **abc** 文档，归在 **Python 分类**（标准库）。`abc`（Abstract Base Classes）用于定义抽象基类与抽象方法，强制子类实现约定接口，避免遗漏、提高可读性与类型检查，在插件系统、策略模式、框架 API 中常用。可与 [typing 类型提示](/python/AI课程-typing类型提示)、[Pydantic](/python/AI课程-Pydantic) 等搭配理解「接口与契约」。

---

## 1. 什么是抽象类？为什么需要？

| 要点 | 说明 |
|------|------|
| **抽象类** | 只规定子类「必须实现哪些方法」，自己不提供（或只提供部分）实现的「模板/契约」类。 |
| **作用** | 定义接口、防止子类漏实现、统一规范；未实现全部抽象方法时**不能实例化**，会报 `TypeError`。 |
| **无抽象类时** | 父类用 `pass` 空实现，子类忘记重写也不会报错，运行时才暴露问题。 |

---

## 2. 前置知识（简要）

需具备：**类与继承**、**装饰器**（`@abstractmethod` 等）、**@property**、**@classmethod / @staticmethod**。见课程原文或 [typing 类型提示](/python/AI课程-typing类型提示)。

---

## 3. abc 模块

- **作用**：提供定义抽象基类的机制，用装饰器与元类强制子类实现指定方法。
- **核心**：`ABC`（抽象基类基类）、`abstractmethod`（标记抽象方法）。
- **导入**：`from abc import ABC, abstractmethod`（另有 `abstractclassmethod`、`abstractstaticmethod` 等按需导入）。

---

## 4. 基本用法

- 定义抽象类：类继承 `ABC`，方法用 `@abstractmethod` 标记，方法体通常 `pass`。
- 规则：抽象类**不能直接实例化**；子类必须**实现所有抽象方法**才能实例化，否则 `TypeError: Can't instantiate abstract class ... with abstract method ...`。

---

## 5. 抽象方法、属性与类/静态方法

| 类型 | 写法 | 说明 |
|------|------|------|
| **抽象方法** | `@abstractmethod` def method(self): pass | 子类必须实现该实例方法。 |
| **抽象属性** | `@property` + `@abstractmethod`（**property 在上**） | 子类必须实现该属性。 |
| **抽象类方法** | `@classmethod` + `@abstractmethod` | 子类必须实现该类方法。 |
| **抽象静态方法** | `@staticmethod` + `@abstractmethod` | 子类必须实现该静态方法。 |

装饰器顺序：`@property` / `@classmethod` / `@staticmethod` 在 **上**，`@abstractmethod` 在 **下**。

---

## 6. 实际应用场景

| 场景 | 说明 |
|------|------|
| **策略模式** | 抽象基类定义「支付策略」接口（如 `pay(amount)`），子类实现信用卡/支付宝/微信等；调用方依赖抽象接口，可替换具体策略。 |
| **插件/格式化器** | 抽象基类定义「数据格式化」接口（如 `name` 属性、`format(data)` 方法），子类实现 JSON/CSV 等；管理器注册并按名调用。 |
| **框架 API** | 规定子类必须实现的钩子方法，保证扩展行为一致。 |

---

## 7. 常见错误与最佳实践

- **错误**：子类未实现某抽象方法即实例化 → 报错；装饰器顺序反了（如 `@abstractmethod` 在 `@property` 上）→ 行为异常；直接实例化抽象类 → 报错。
- **实践**：只把「必须实现」的方法标为抽象；为抽象方法写清文档；抽象类用于接口契约、框架、插件，不用于简单继承。

---

## 8. 小结

- **ABC + @abstractmethod**：定义「子类必须实现」的接口，未实现则不可实例化。
- **抽象属性/类方法/静态方法**：同上逻辑，注意装饰器顺序。
- **适用**：策略模式、插件系统、框架 API、类型检查（如 `isinstance`/`issubclass`）。

---

**相关文档**：[typing 类型提示](/python/AI课程-typing类型提示) · [Pydantic](/python/AI课程-Pydantic) · [知识体系与学习路径](/ai/知识体系与学习路径) · [abc（课程原文）](https://rag.docs-hub.com/html/abc.html)
