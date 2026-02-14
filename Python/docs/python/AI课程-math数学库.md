# AI 课程：Python math 数学库

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **math** 文档。`math` 是 Python 内置标准库，在向量计算、余弦相似度、几何与统计等场景中常用。建议与 [RAG 与向量基础](/ai/AI课程-RAG与向量基础)、[余弦相似度](/ai/AI课程-余弦相似度) 配合阅读。

---

## 1. 准备环境

`math` 为 Python **内置标准库**，无需安装。运行示例前请确认本机 Python 命令：

```bash
# Windows PowerShell
python --version

# macOS / Linux
python3 --version
```

若同时存在 `python` 与 `python3`，运行脚本时对应使用：

```bash
# Windows
python demo.py

# macOS / Linux
python3 demo.py
```

---

## 2. 导入与基本调用

```python
import math
print(math.pi)
```

---

## 3. 常用数学常量

```python
import math
print('π =', math.pi)
print('e =', math.e)
print('正无穷 =', math.inf)
print('非数字 =', math.nan)
```

| 常量   | 含义     |
|--------|----------|
| `math.pi` | 圆周率 π |
| `math.e`  | 自然常数 e |
| `math.inf`| 正无穷   |
| `math.nan`| 非数字 NaN |

---

## 4. 数值基础操作

适用于绝对值、取整、阶乘等。

```python
import math
print('fabs(-5.5) =', math.fabs(-5.5))
print('factorial(5) =', math.factorial(5))
print('floor(3.7) =', math.floor(3.7))
print('ceil(-3.2) =', math.ceil(-3.2))
print('trunc(-3.7) =', math.trunc(-3.7))
```

---

## 5. 幂与对数函数

**预备**：指数为重复乘法；对数为指数的反运算；平方根即「平方后等于原数」的值。

```python
import math
print('sqrt(16) =', math.sqrt(16))
print('pow(2, 3) =', math.pow(2, 3))
print('exp(2) =', math.exp(2))
print('log(10) =', math.log(10))
print('log10(100) =', math.log10(100))
print('log2(8) =', math.log2(8))
```

---

## 6. 三角函数与弧度

一整圈 = $2\pi$ 弧度 = 360°，故 1° = $\pi/180$ 弧度。若习惯用角度，可先用 `math.radians()` 转弧度。

```python
import math
print('180° 对应弧度 =', math.radians(180))
print('π 弧度对应角度 =', math.degrees(math.pi))

angle = math.radians(30)
print('sin 30° =', math.sin(angle))
print('cos 30° =', math.cos(angle))
print('tan 30° =', math.tan(angle))
print('asin 0.5 =', math.degrees(math.asin(0.5)))
print('acos 0.5 =', math.degrees(math.acos(0.5)))
print('atan 1 =', math.degrees(math.atan(1)))
```

在向量、余弦相似度中常用 `math.sqrt`、`math.cos` 及弧度与角度的转换。

---

## 7. 特殊但常用的函数

```python
import math
print('gcd(12, 18) =', math.gcd(12, 18))
print('lcm(12, 18) =', math.lcm(12, 18))
print('isfinite(10) =', math.isfinite(10))
print('isinf(inf) =', math.isinf(float('inf')))
print('isnan(nan) =', math.isnan(float('nan')))
```

---

## 8. 实战

### 8.1 计算圆的面积与周长

```python
import math

def circle_calculations(radius: float) -> tuple[float, float]:
    area = math.pi * math.pow(radius, 2)
    circumference = 2 * math.pi * radius
    return area, circumference

if __name__ == '__main__':
    r = 5
    area, length = circle_calculations(r)
    print(f'半径为 {r} 的圆：面积 {area:.2f}, 周长 {length:.2f}')
```

### 8.2 解一元二次方程

```python
import math

def solve_quadratic(a: float, b: float, c: float) -> None:
    discriminant = b ** 2 - 4 * a * c
    if discriminant < 0:
        print('无实数解')
    elif discriminant == 0:
        x = -b / (2 * a)
        print(f'唯一解：x = {x:.2f}')
    else:
        root = math.sqrt(discriminant)
        x1 = (-b + root) / (2 * a)
        x2 = (-b - root) / (2 * a)
        print(f'两个解：x1 = {x1:.2f}, x2 = {x2:.2f}')

if __name__ == '__main__':
    solve_quadratic(1, -5, 6)
```

### 8.3 计算两点之间的距离

欧氏距离公式，向量与几何中常用：

```python
import math

def distance(x1: float, y1: float, x2: float, y2: float) -> float:
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

if __name__ == '__main__':
    result = distance(1, 1, 4, 5)
    print(f'两点间距 = {result:.2f}')
```

---

## 9. 常见错误与调试

对负数开平方会得到复数，`math.sqrt` 只处理实数，会抛出 `ValueError`：

```python
import math
try:
    print(math.sqrt(-1))
except ValueError as err:
    print(f'出现数学错误：{err}')
```

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [余弦相似度](/ai/AI课程-余弦相似度) · [知识体系与学习路径](/ai/知识体系与学习路径) · [math（课程原文）](https://rag.docs-hub.com/html/math.html)
