# 逻辑判断 与 真值检测

← [语法手册总览](/python/python语法手册) | [上一章 内置函数](/python/python语法手册-05-内置函数) | [下一章 身份与成员](/python/python语法手册-07-身份与成员)

---

**本章对应自测卷**：[七、逻辑判断与真值检测（共 33 题）](/python/Python核心语法自测试卷#七逻辑判断与真值检测-共-33-题)  
**学完能做什么**：理解 `and`/`or` 的返回值规则、假值列表、短路带来的安全写法、自定义对象真值优先级，以及关系运算符（六种、链式比较、浮点数与类型注意）。  
**小白注意**：① `and` 返第一个假或最后一个，`or` 返第一个真或最后一个（不是只返 True/False）。② 假值除 None/False/0 外还有 `''`、`[]`、`{}` 等。③ 自定义对象先看 `__bool__()`，没有则看 `__len__()`，都没有则 True。④ 关系运算符比较浮点数不要用 `==`，用 `math.isclose()`；set/dict 只支持 `==`、`!=`。

---

## 一、逻辑判断 与 真值检测

核心直觉： **Python 的逻辑运算不只是 `True/False`，更是“寻找结果”的过程。**

- `all(iterable)`：
  - 逻辑：只有全部为 `True` 才返回 `True`。
  - 例子：`all(s >= 60 for s in scores)` $\rightarrow$ 全员及格。
- `any(iterable)`：
  - 逻辑：只要有一个为 `True` 就返回 `True`。
  - 例子：`any(s < 60 for s in scores)` $\rightarrow$ 是否有人挂科。

### 1.1 逻辑运算符 and 、or、 not（自测卷 7.3、7.4 待复习）

|**运算符**|**语义**|**短路逻辑 (关键)**|**返回值规则**|
|---|---|---|---|
|**`and`**|且 (找假)|若第一个为假，直接返回，不再看后面。|**“与”返首假**：返回第一个遇到的假值；若全是真，返回最后一个。|
|**`or`**|或 (找真)|若第一个为真，直接返回，不再看后面。|**“或”返首真**：返回第一个遇到的真值；若全是假，返回最后一个。|
|**`not`**|非|总是评估操作数，并强制取反。|**必返布尔值**：强制转换为 `True` 或 `False`。|

### 1.2 真值测试：谁是“假”？ (Truth Value Testing)（自测卷 7.5 待复习）

在 Python 中，以下对象在逻辑判断时被视为 **`False`**，其余皆为 `True`：

1. **常量**：`None`, `False`
    
2. **数值零**：`0`, `0.0`, `0j`
    
3. **空容器**：`''`, `[]`, `()`, `{}`, `set()`, `range(0)`
    
4. **自定义对象**：定义了 `__bool__()` 返回 `False` 或 `__len__()` 返回 `0` 的类。
    

### 1.3 短路计算 (Short-circuiting) 的妙用

短路特性不仅为了性能，更是为了**程序安全**。

- **安全检查**：避免报错。
    ``` Python
    # 如果 user 为 None，后面 user.name 不会执行，避免了 AttributeError
    if user is not None and user.name == "Admin":
        pass
    ```
    
- **设置默认值**：
    ``` Python
    # 如果 input_name 是空字符串(假)，则取 "Guest"
    name = input_name or "Guest" 
    ```
    
### 1.4 进阶：自定义对象的真值（自测卷 7.8 待复习）

Python 判断对象真值的优先级：
1. **`__bool__()`**：最优先，返回布尔值。
2. **`__len__()`**：次优先，若返回 `0` 则为假。
3. **默认**：若两者都未定义，对象永远为 `True`。

### 1.5 关系运算符（自测卷 7.11～7.28）

关系运算符用于比较两个值之间的关系，**返回布尔值**（True/False），常与逻辑运算符结合做条件判断。以下为完整说明。

#### 1.5.1 六种关系运算符

| 运算符 | 含义 | 示例 | 返回值 |
|--------|------|------|--------|
| `<` | 小于 | `5 < 3` | False |
| `<=` | 小于等于 | `5 <= 5` | True |
| `>` | 大于 | `5 > 3` | True |
| `>=` | 大于等于 | `5 >= 5` | True |
| `==` | 等于 | `5 == 3` | False |
| `!=` | 不等于 | `5 != 3` | True |

#### 1.5.2 基本用法

**数值比较**：可用于整数、浮点数等，结果用于 if、while 等条件。

```python
x, y = 7, 3
print(x > y)      # True
print(x == 7)     # True
if x >= 5:
    print("x不小于5")

a, b = 10, 5
print(f"{a} < {b}: {a < b}")   # False
print(f"{a} >= {b}: {a >= b}") # True
# 整数与浮点数可比较
print(10 == 10.0)  # True
```

**字符串比较**：按**字典序（Unicode 码点）**逐字符比较。区分大小写（`'A'` < `'a'`）。

```python
print("apple" == "apple")    # True
print("apple" < "banana")    # True
print("Apple" < "apple")    # True（'A' 码点小于 'a'）
print(sorted(["banana", "apple", "cherry"]))  # ['apple', 'banana', 'cherry']
```

**列表比较**：**元素逐一、从左到右**比较；若前面相同则较短者小。常用于版本号比较。

```python
list1, list2 = [1, 2, 3], [1, 2, 4]
print(list1 < list2)   # True
v1 = [int(x) for x in "3.9.1".split('.')]
v2 = [int(x) for x in "3.10.0".split('.')]
print(v1 < v2)  # True
```

#### 1.5.3 链式比较

`a < b < c` 等价于 `(a < b) and (b < c)`，且 **b 只求值一次**，写法简洁且高效。

- 只对**相邻**对象比较，如 `a < b > c` 等价于 `(a < b) and (b > c)`，不比较 a 与 c。
- 从左到右短路，一旦为 False 即停止。

```python
x, y, z = 3, 7, 12
print(1 < x < 10)      # True
print(x < y < z)       # True
print(60 <= 76 < 90)   # True，成绩良好

# 实际应用：范围判定、严格递增
if 60 <= score < 90:
    print("成绩良好")
if a < b < c < d:
    print("严格递增")
```

#### 1.5.4 类型比较

- **同类型**：可用全部六种运算符。
- **int 与 float**：可比较，自动提升。
- **集合、字典**：**只支持 `==` 和 `!=`**，使用 `<`、`>` 会抛出 `TypeError`。
- **不同类型**（如 int 与 str）：一般只有 `==`、`!=` 可用，或抛 `TypeError`（如 `5 < '10'`）。

| 类型 | 支持比较 | 备注 |
|------|----------|------|
| int/float | 全部 | 自动类型提升 |
| str | 全部 | 按 Unicode 顺序 |
| list/tuple | 全部 | 按元素依次对比 |
| set/dict | `==`, `!=` | 只支持等于和不等于 |

```python
print({1, 2} == {2, 1})       # True
print({'x': 1} == {'x': 1})   # True
# print({1} < {2})            # TypeError
```

#### 1.5.5 浮点数比较

在实际编程中，比较浮点数（如 `float` 类型）时需要格外小心。由于计算机存储浮点数采用**二进制近似表示**，存在精度误差，导致一些看似“相等”的数用 `==` 直接比较时可能为 `False`。

**常见注意事项：**

- **不要直接用 `==` 或 `!=` 判断浮点数是否相等**，通常会因精度误差导致判断不准确。
- 使用**“接近”**（即误差不超过很小的范围）来比较两个浮点数，可用 `abs(a - b) < 1e-9` 等方法，或 `math.isclose()` 函数。
- 在数学或科学计算中尤其要注意比较容差，结果判断要考虑有效位数。

**解决办法**：可用 `math.isclose()` 进行比较，也可指定**绝对误差**（`abs_tol`）或**相对误差**（`rel_tol`）。

**常见应用场景：**

- 判断计算结果、测量数据、科学实验中的浮点数是否“足够接近”。
- 业务开发中，涉及金额、比率、分数等浮点结果时的比较与容差判断。

**代码示例：**

```python
# 导入 math 模块
import math

# 定义两个浮点数
a = 0.1 * 3
b = 0.3

# 错误的方式，可能为 False
print(a == b)  # False，因为浮点数存在精度误差

# 正确方式 1：用 abs() 判断是否足够接近
print(abs(a - b) < 1e-9)  # True，差距小于指定容差，认为相等

# 正确方式 2：用 math.isclose()，推荐方式
print(math.isclose(a, b))  # True，默认容差设置适用大多数场景

# math.isclose 可以自定义容差
print(math.isclose(a, b, rel_tol=1e-12))  # True，可以调整容差要求
```

#### 1.5.6 复杂数据结构比较

- **嵌套列表/元组**：仍按元素逐层比较。
- **嵌套字典**：只支持 `==`、`!=`，键值对完全一致才判等。

```python
print([[1,2],[3,4]] < [[1,2],[3,5]])  # True
dict1 = {"a": 1, "b": {"x": 2, "y": 3}}
dict2 = {"a": 1, "b": {"x": 2, "y": 3}}
print(dict1 == dict2)  # True
```

#### 1.5.7 自定义类比较

在 Python 中，除了内置数据类型可以直接使用关系运算符之外，还可以通过在**自定义类**中实现特定的**魔术方法**（如 `__eq__`、`__lt__` 等）来定义类的比较行为。这样可以让自定义对象像数值、字符串一样进行大小、相等等比较操作，非常适合在需要**排序、自定义判等、查找最大/最小对象**时使用。

**魔术方法与运算符对应：**

- **相等比较**：实现 `__eq__`（等于）、`__ne__`（不等于）。
- **大小比较**：实现 `__lt__`（小于）、`__le__`（小于等于）、`__gt__`（大于）、`__ge__`（大于等于）。

**使用要点：**

- 只要实现部分魔术方法，Python 只支持对应的运算符；**建议完整实现**，行为更统一。
- 若对象不支持某种比较，魔术方法应返回 `NotImplemented`，Python 会适当处理或抛出 `TypeError`。
- 比较时可以**自由定义规则**，如按“年龄”、“工资”或“姓名”等字段进行。

**代码示例：**

```python
# 定义一个 Person 类，支持自定义比较
class Person:
    def __init__(self, name, age, salary):
        self.name = name
        self.age = age
        self.salary = salary

    def __eq__(self, other):
        # 相等比较：姓名和年龄都相同即为相等
        if isinstance(other, Person):
            return self.name == other.name and self.age == other.age
        return False

    def __lt__(self, other):
        # 小于比较：按年龄进行比较
        if isinstance(other, Person):
            return self.age < other.age
        return NotImplemented

    def __le__(self, other):
        if isinstance(other, Person):
            return self.age <= other.age
        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, Person):
            return self.age > other.age
        return NotImplemented

    def __ge__(self, other):
        if isinstance(other, Person):
            return self.age >= other.age
        return NotImplemented

    def __ne__(self, other):
        return not self.__eq__(other)

    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age}, salary={self.salary})"

# 创建对象进行比较
person1 = Person("Alice", 25, 50000)
person2 = Person("Bob", 30, 60000)
person3 = Person("Alice", 25, 55000)

# 按自定义规则比较
print(person1 == person3)   # True，名字与年龄都相同
print(person1 == person2)   # False，名字或年龄不同
print(person1 < person2)    # True，因为 25 < 30
print(person2 > person1)    # True，因为 30 > 25
print(person2 != person3)   # True

# 实际开发：自定义对象排序
person_list = [person2, person1, person3]
print(sorted(person_list))  # 将依据年龄完成排序
```

**关于「自定义对象排序」的说明（小白向）：**

- `person_list` 是一个列表，里面按顺序放了三个 `Person` 对象：`person2`（Bob, 30 岁）、`person1`（Alice, 25 岁）、`person3`（Alice, 25 岁）。
- 内置函数 **`sorted(列表)`** 会对列表里的元素进行**升序排序**，并返回一个新的已排序列表（不修改原列表）。
- 对自定义对象排序时，`sorted()` 在比较两个元素谁大谁小时，会去调用我们写好的魔术方法（例如 `__lt__`）。因为我们把「小于」定义成了「年龄更小」，所以 `sorted(person_list)` 实际上是**按年龄从小到大**排：先 25 岁的两个 Alice，再 30 岁的 Bob。
- 如果类里没有实现 `__lt__` 等比较方法，`sorted()` 就不知道如何比较两个 `Person`，会报错。实现这些方法后，自定义对象就可以像数字、字符串一样参与排序、求最值等操作。

**常见应用场景：**

- 排序员工信息、学生成绩单、自定义数据对象等。
- 实现业务逻辑中的自定义比较需求（如唯一性判定、分组、筛选）。

**补充说明：**

- 通过自定义这些比较方法，可以让自己的类与内置类型一样方便地在各种比较、算法中使用。
- 若只有部分比较方法实现，可能导致部分操作（如排序）报错，建议使用 **`functools.total_ordering`** 装饰器减少重复实现。
- 如果只关心某些字段（比如只按 `salary` 比较），可调整魔术方法的逻辑。

#### 1.5.8 与布尔运算符结合

关系运算符常与 `and`、`or`、`not` 结合，做多条件判断与范围验证。

```python
if 10 < x < 20:
    print("x 在 10 到 20 之间")
# 用户输入验证
if not (18 <= age <= 65):
    errors.append("年龄必须在18到65之间")
filtered = [x for x in data_list if min_val <= x <= max_val]
```

#### 1.5.9 参考回答（面试向）

- **概述**：关系运算符用于比较两个值的关系，有六种（`<` `<=` `>` `>=` `==` `!=`），均返回布尔值。
- **要点**：链式比较如 `1 < x < 10` 等价于 and 且中间只求值一次；set/dict 只支持 `==`、`!=`；浮点数用 `math.isclose()` 判等。
- **应用**：数据验证、排序与最值、版本号比较、成绩等级等。

---

**本章小结**：`and` 返首假或末值，`or` 返首真或末值；假值有 None、False、0、空串、空容器等。自定义对象真值：`__bool__` → `__len__` → 默认 True。短路可用来写 `user and user.name` 避免报错。关系运算符六种（`<` `<=` `>` `>=` `==` `!=`）返回布尔值；链式比较等价于 and 且中间只求值一次；浮点数用 `math.isclose`；set/dict 只支持 `==`、`!=`。

---

## 二、三元表达式（条件表达式）

### 2.1 概述：一行写完简单条件

三元表达式（Ternary Expression，也叫**条件表达式**）是 Python 提供的一种**在一行里写简单 if-else** 的语法糖，用来根据条件选择**一个值**。

经典语法（一定要记住这个顺序）：

```python
value_if_true if condition else value_if_false
```

- `condition`：条件表达式，结果为 `True` 或 `False`。
- `value_if_true`：条件为 `True` 时，整个表达式的值。
- `value_if_false`：条件为 `False` 时，整个表达式的值。

特点：

- **只返回一个值**（而不是执行多行语句）。
- **只会执行一个分支**（和 if-else 一样，有短路，不会同时执行两边）。
- 适合写**简单清晰的条件赋值 / 参数选择 / 返回值**。

### 2.2 基本语法与 if-else 对比

等价关系可以这样理解：

```python
# 三元表达式
result = A if condition else B

# 等价的 if-else
if condition:
    result = A
else:
    result = B
```

再看一个具体例子：

```python
x = 10
result = "正数" if x > 0 else "非正数"

# 等价写法：
if x > 0:
    result = "正数"
else:
    result = "非正数"
```

**什么时候用三元表达式，什么时候用 if-else？**

- 逻辑**简单、只是在两个值之间二选一** → 用三元表达式可读且紧凑。
- 逻辑比较复杂（多步计算、多个分支） → 用正常 `if / elif / else`，可读性远好于一行塞满逻辑。

### 2.3 实际应用场景

#### 2.3.1 简单条件赋值：给变量/配置选值

**场景 1：根据用户输入设置默认值**

```python
def get_user_preference():
    user_input = input("请输入您的偏好（1-3）：")
    # 如果 user_input 合法就用它，否则用 '1' 作为默认值
    preference = user_input if user_input in ["1", "2", "3"] else "1"
    return preference
```

**场景 2：根据环境选择不同配置**

```python
is_production = True

database_url = (
    "mysql://prod-server:3306/db"
    if is_production
    else "mysql://localhost:3306/db"
)
```

**场景 3：处理空值（fallback）**

```python
def safe_get_name(user_dict):
    # 有 name 且非空就用它，否则用“未知用户”
    return user_dict.get("name") if user_dict.get("name") else "未知用户"
```

#### 2.3.2 在列表推导式中做“按条件转换”

三元表达式和列表推导式一起用时非常常见，用来**按条件决定每个元素如何变形**：

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 偶数转成字符串，奇数保持整数
processed_numbers = [str(x) if x % 2 == 0 else x for x in numbers]

scores = [85, 92, 78, 96, 88, 91, 87, 94]
# 高分（>=90）标记为“优秀”，否则“良好”
grade_list = ["优秀" if score >= 90 else "良好" for score in scores]

words = ["hello", "world", "python", "programming"]
# 长度大于 5 的单词转换为大写，其他保持原样
processed_words = [w.upper() if len(w) > 5 else w for w in words]
```

#### 2.3.3 在函数返回值中根据条件选择结果

```python
def get_user_role(user_type):
    # 根据用户类型返回角色
    return "管理员" if user_type == "admin" else "普通用户"

def calculate_discount(amount, is_vip):
    # 计算折扣：VIP 且金额 > 1000 打 8 折，否则原价
    discount_rate = 0.8 if is_vip and amount > 1000 else 1.0
    return amount * discount_rate

def format_phone_number(phone):
    # 11 位手机号格式化为 138-1234-5678，其它长度按原样返回
    return f"{phone[:3]}-{phone[3:7]}-{phone[7:]}" if len(phone) == 11 else phone
```

### 2.4 总结与使用建议

**语法**：`value_if_true if condition else value_if_false`

**适用场景**：

- 简单的**条件赋值 / 选择返回值**。
- 列表推导式中按条件转换元素。
- 函数中根据条件返回两种结果之一。

**不适用场景**：

- 有很多分支（`if / elif / else` 很多）。
- 条件内部需要多步逻辑（读起来费劲）。

**与 if-else 对比**：

- 三元表达式：更紧凑，适合“一行搞定”的简单判断。
- if-else：更清晰，适合复杂逻辑和多语句分支。

**使用建议（给小白）**：

- 优先保证**可读性**：看一眼能懂比省一行代码重要得多。
- 避免**嵌套多个三元表达式**，一行里嵌套多层会非常难读。
- 把三元表达式当成**“值的选择器”**：只在“这个值还是那个值”的场景用它，其它一律先考虑普通 if-else。
