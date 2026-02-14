# AI 课程：Python typing 类型提示

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **typing** 文档。`typing` 是 Python 内置的类型提示工具，用于显式标注函数与变量的类型，便于阅读、调试与静态检查，在 RAG 与数据处理代码中常用。

---

## 1. typing 模块

`typing` 模块帮助我们用**类型注解**明确函数参数与返回值的类型，从而：

- 提高可读性  
- 获得更好的 IDE 补全与错误提示  
- 配合 mypy、Pyright 等做静态检查  

---

## 2. 导入 typing 模块

```python
from typing import List, Dict, Tuple, Set, Optional, Union, Any, Callable
# 或
import typing
```

---

## 3. 基本类型提示

### 3.1 简单类型

用于标量：`str`、`int`、`float`、`bool`。

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

def calculate_area(radius: float) -> float:
    return 3.14159 * radius ** 2

def is_even(number: int) -> bool:
    return number % 2 == 0

if __name__ == "__main__":
    result: str = greet("Alice")
    area: float = calculate_area(5.0)
    check: bool = is_even(10)
    print(result, area, check)
```

### 3.2 容器类型

列表、字典、元组、集合需同时标注**元素类型**。

```python
from typing import List, Dict, Tuple, Set

def process_numbers(numbers: List[int]) -> List[float]:
    return [x * 1.5 for x in numbers]

def get_student_grades() -> Dict[str, int]:
    return {"Alice": 95, "Bob": 87, "Charlie": 92}

def get_coordinates() -> Tuple[float, float]:
    return (40.7128, -74.0060)

def get_unique_items(items: List[str]) -> Set[str]:
    return set(items)

if __name__ == "__main__":
    numbers: List[int] = [1, 2, 3, 4, 5]
    grades: Dict[str, int] = get_student_grades()
    coordinates: Tuple[float, float] = get_coordinates()
    unique: Set[str] = get_unique_items(["a", "b", "a", "c"])
    print(process_numbers(numbers), grades, coordinates, unique)
```

---

## 4. 高级类型提示

### 4.1 Optional 类型

返回值可能为某类型或 `None` 时，用 `Optional[T]`（等价于 `Union[T, None]`）。

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# Python 3.10+ 可写为 str | None
def find_user_v2(user_id: int) -> str | None:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

if __name__ == "__main__":
    user: Optional[str] = find_user(1)
    if user is not None:
        print(f"Found user: {user}")
    else:
        print("User not found")
```

### 4.2 Union 类型

表示「多种类型之一」。Python 3.10+ 可用 `A | B` 简写。

```python
from typing import Union

def process_value(value: Union[int, float, str]) -> str:
    return str(value)

# Python 3.10+
def process_value_v2(value: int | float | str) -> str:
    return str(value)
```

### 4.3 Any 类型

`Any` 表示任意类型，会跳过静态检查，应谨慎使用。

```python
from typing import Any

def process_anything(data: Any) -> Any:
    return data
```

### 4.4 Callable 类型

描述「函数作为参数或返回值」的签名。

```python
from typing import Callable, List

def apply_operation(numbers: List[int], operation: Callable[[int], int]) -> List[int]:
    return [operation(x) for x in numbers]

def multiplier(factor: int) -> Callable[[int], int]:
    def multiply(x: int) -> int:
        return x * factor
    return multiply

if __name__ == "__main__":
    numbers = [1, 2, 3, 4]
    squared = apply_operation(numbers, lambda x: x ** 2)
    double_func = multiplier(2)
    doubled = apply_operation(numbers, double_func)
    print(squared, doubled)
```

---

## 5. 泛型和类型变量

### 5.1 TypeVar

用 `TypeVar` 声明类型占位符，使函数在不同类型下保持类型一致。

```python
from typing import List, Sequence, Tuple, TypeVar

T = TypeVar('T')
U = TypeVar('U')

def first_element(seq: Sequence[T]) -> T:
    return seq[0]

def swap_pair(pair: Tuple[T, U]) -> Tuple[U, T]:
    a, b = pair
    return b, a

if __name__ == "__main__":
    first_num: int = first_element([1, 2, 3])
    first_str: str = first_element(["a", "b", "c"])
    swapped: Tuple[str, int] = swap_pair((10, "hello"))
    print(first_num, first_str, swapped)
```

### 5.2 泛型类

配合 `Generic[T]` 写出可复用于多种元素类型的类。

```python
from typing import Generic, List, TypeVar

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: List[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

    def is_empty(self) -> bool:
        return len(self.items) == 0

if __name__ == "__main__":
    int_stack: Stack[int] = Stack()
    int_stack.push(1)
    int_stack.push(2)
    value: int = int_stack.pop()

    str_stack: Stack[str] = Stack()
    str_stack.push("hello")
    text: str = str_stack.pop()
    print(value, text, int_stack.is_empty())
```

---

## 6. 更复杂的类型

### 6.1 Literal 类型

限定参数只能取某几个字面值，常用于状态或配置。

```python
from typing import Literal

def set_status(status: Literal["active", "inactive", "pending"]) -> None:
    print(f"Status set to: {status}")

if __name__ == "__main__":
    set_status("active")  # 正确
    # set_status("invalid")  # IDE 会提示错误
```

### 6.2 Final 类型

声明常量或不可被子类覆盖的属性。

```python
from typing import Final

MAX_SIZE: Final[int] = 100
API_URL: Final[str] = "https://api.example.com"

class Config:
    TIMEOUT: Final[int] = 30
```

### 6.3 NewType

为基础类型创建语义化别名，减少误用。

```python
from typing import NewType

UserId = NewType('UserId', int)
Email = NewType('Email', str)

def get_user_name(user_id: UserId) -> str:
    return f"User_{user_id}"

def send_email(address: Email, message: str) -> None:
    print(f"Sending to {address}: {message}")

if __name__ == "__main__":
    user_id: UserId = UserId(12345)
    email: Email = Email("user@example.com")
    get_user_name(user_id)
    send_email(email, "Hello")
```

---

## 7. 实际应用示例

### 7.1 数据处理函数

使用 `List`、`Dict`、`Optional`、`Tuple` 表达复杂入参与返回值。

```python
from typing import Dict, List, Optional, Tuple

def process_user_data(
    users: List[Dict[str, str]],
    filters: Optional[Dict[str, str]] = None
) -> Tuple[List[Dict[str, str]], int]:
    if filters is None:
        filters = {}
    filtered_users = [
        user for user in users
        if all(user.get(key) == value for key, value in filters.items())
    ]
    return filtered_users, len(filtered_users)

if __name__ == "__main__":
    users_data = [
        {"name": "Alice", "role": "admin", "status": "active"},
        {"name": "Bob", "role": "user", "status": "inactive"},
        {"name": "Charlie", "role": "admin", "status": "active"}
    ]
    filtered, count = process_user_data(users_data, {"role": "admin"})
    print(f"Found {count} admin users: {filtered}")
```

### 7.2 回调系统

用 `Callable` 描述事件回调签名。

```python
from typing import Any, Callable, List

class EventHandler:
    def __init__(self) -> None:
        self._callbacks: List[Callable[[Any], None]] = []

    def register_callback(self, callback: Callable[[Any], None]) -> None:
        self._callbacks.append(callback)

    def trigger_event(self, data: Any) -> None:
        for callback in self._callbacks:
            callback(data)

def log_callback(data: Any) -> None:
    print(f"Event received: {data}")

def process_callback(data: Any) -> None:
    if isinstance(data, str):
        print(f"Processing string: {data.upper()}")

if __name__ == "__main__":
    handler = EventHandler()
    handler.register_callback(log_callback)
    handler.register_callback(process_callback)
    handler.trigger_event("Hello, World!")
```

---

## 8. Python 3.9+ 的新语法

Python 3.9 起可直接用内置泛型写法，无需从 `typing` 导入 `List`、`Dict` 等：

```python
# 旧写法
from typing import Dict, List
def process_data_old(items: List[int]) -> Dict[str, float]:
    return {str(item): float(item) for item in items}

# 3.9+ 新语法
def process_data(items: list[int]) -> dict[str, float]:
    return {str(item): float(item) for item in items}

# 联合类型也可用 |
def find_item(collection: list[str] | set[str]) -> str | None:
    if collection:
        return collection[0] if isinstance(collection, list) else next(iter(collection))
    return None
```

---

## 9. 总结

- **可读性**：参数与返回值一目了然。  
- **IDE 支持**：补全、错误提示、重构更可靠。  
- **静态检查**：配合 mypy/Pyright 提前发现类型错误。  
- **文档作用**：类型即文档，便于维护与协作。  

适度使用类型提示即可，不必强求每行都写；在 RAG 与数据处理函数、API 接口处标注收益最大。

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [知识体系与学习路径](/ai/知识体系与学习路径) · [typing（课程原文）](https://rag.docs-hub.com/html/typing.html)
