# AI 课程：Python random 模块

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **random** 文档。`random` 是 Python 内置的**伪随机数**模块，可生成随机整数/浮点数、打乱序列、加权抽样等，在数据增强、采样、测试与小游戏中常用；密码等安全场景请用 `secrets`。

---

## 1. random 模块

**random** 为内置模块，无需安装，直接 `import random`。生成的是伪随机数，对教学、测试、小游戏足够；安全相关用 `secrets`。

---

## 2. 环境确认

```bash
python --version   # Windows
python3 --version  # macOS / Linux
```

---

## 3. 基础随机数函数

### 3.1 random()：\[0.0, 1.0) 浮点数

```python
import random
for i in range(3):
    print(f"第 {i+1} 次：{random.random():.4f}")
```

### 3.2 randint(a, b)：\[a, b] 整数（含两端）

```python
print("掷骰子：", random.randint(1, 6))
print("0~100：", random.randint(0, 100))
```

### 3.3 uniform(a, b)：区间浮点

```python
print("0~1：", random.uniform(0, 1))
print("2.5~5.5：", random.uniform(2.5, 5.5))
```

---

## 4. 序列相关操作

### 4.1 choice(seq)：随机取一个

```python
fruits = ["apple", "banana", "orange", "grape"]
print("随机水果：", random.choice(fruits))
```

### 4.2 choices(population, weights=None, k=1)：可带权重、有放回

```python
fruits = ["apple", "banana", "orange"]
weights = [0.1, 0.6, 0.3]
print("带权重抽 5 次：", random.choices(fruits, weights=weights, k=5))
```

### 4.3 sample(population, k)：无放回抽样

```python
participants = ["Alice", "Bob", "Charlie", "David", "Eve"]
winners = random.sample(participants, 2)
print("获奖者：", winners)
```

### 4.4 shuffle(seq)：原地打乱

```python
cards = ["A", "2", "3", "4", "5", "J", "Q", "K"]
random.shuffle(cards)
print("打乱后：", cards)
```

---

## 5. 常见概率分布

### 5.1 正态分布（高斯）

```python
values = [random.gauss(mu=0, sigma=1) for _ in range(5)]
print("标准正态样本：", values)
```

### 5.2 其他分布

```python
print("指数分布：", random.expovariate(1.0))
print("伽马分布：", random.gammavariate(alpha=2.0, beta=2.0))
print("贝塔分布：", random.betavariate(alpha=0.5, beta=0.5))
```

---

## 6. 实战案例

### 6.1 掷骰子

```python
def dice_game() -> str:
    player1 = random.randint(1, 6)
    player2 = random.randint(1, 6)
    print(f"玩家1：{player1}，玩家2：{player2}")
    if player1 > player2: return "玩家1获胜"
    if player2 > player1: return "玩家2获胜"
    return "平局"
print(dice_game())
```

### 6.2 随机密码

```python
import string
def generate_password(length: int = 12, use_special: bool = True) -> str:
    chars = string.ascii_letters + string.digits
    if use_special:
        chars += string.punctuation
    return "".join(random.choices(chars, k=length))
print("简单密码：", generate_password(8, False))
print("复杂密码：", generate_password(12, True))
```

### 6.3 抽奖

```python
def lottery_draw(participants: list[str], prizes: list[str]) -> dict[str, str]:
    random.shuffle(participants)
    results = {}
    for prize, person in zip(prizes, participants):
        results[prize] = person
        print(f"{prize} -> {person}")
    return results
lottery_draw(
    ["张三", "李四", "王五", "赵六", "钱七"],
    ["一等奖", "二等奖", "三等奖"],
)
```

### 6.4 抛硬币统计

```python
from collections import Counter
def coin_flip_simulation(times: int = 1000) -> Counter:
    results = [random.choice(["正面", "反面"]) for _ in range(times)]
    counter = Counter(results)
    for side, count in counter.items():
        print(f"{side}: {count} 次 ({count/times*100:.1f}%)")
    return counter
coin_flip_simulation()
```

---

## 7. 进阶技巧

### 7.1 固定随机种子（可复现）

```python
random.seed(42)
for _ in range(3):
    print(random.randint(1, 100))
```

### 7.2 保存 / 恢复状态

```python
state = random.getstate()
print(random.randint(1, 100), random.randint(1, 100))
random.setstate(state)
print(random.randint(1, 100), random.randint(1, 100))  # 与上面相同
```

### 7.3 SystemRandom：更安全

利用系统熵源，仍不用于密码学密钥（密钥用 `secrets`）。

```python
secure_random = random.SystemRandom()
print(secure_random.randint(1, 100))
print(secure_random.choice(["a", "b", "c"]))
```

---

## 8. 常见问题

- **密码学安全？** 不适用。生成密钥、验证码等请用 `secrets`：
  ```python
  import secrets
  token = secrets.token_hex(16)
  ```
- **性能**：大批量时用 `random.choices(range(1, 101), k=1000)` 比循环里多次 `randint` 更高效。
- **边界**：`random()` 为 [0.0, 1.0)；`randint(a, b)` 含两端；`uniform` 视实现可能含端点。

---

## 9. 总结

| 函数 | 描述 | 适用场景 |
|------|------|----------|
| random() | [0.0, 1.0) 浮点 | 基础随机 |
| randint(a, b) | [a, b] 整数 | 骰子、抽奖 |
| uniform(a, b) | 区间浮点 | 连续值采样 |
| choice / choices / sample | 序列操作 | 抽奖、抽样 |
| shuffle() | 原地打乱 | 洗牌、重排 |
| gauss() 等 | 概率分布 | 仿真、建模 |

---

**相关文档**：[collections](/python/AI课程-collections) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成)（数据增强/采样） · [知识体系与学习路径](/ai/知识体系与学习路径) · [random（课程原文）](https://rag.docs-hub.com/html/random.html)
