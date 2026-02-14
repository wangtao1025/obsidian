# AI 课程：余弦相似度

本文属于**向量与检索**基础，对应课程 [1.vector](https://rag.docs-hub.com/html/1.vector.html) 中的 cosine_similarity 部分。适合先学完 [RAG 与向量基础](/ai/AI课程-RAG与向量基础) 中的向量与嵌入概念后再阅读。

---

## 1. 什么是余弦相似度？

### 1.1 生活中的例子

想象你在网上购物，想找和你兴趣相似的人来参考他们的购买记录：

- **用户 A**：喜欢买很多书（100 本），偶尔买几件衣服（2 件）
- **用户 B**：也喜欢买很多书（50 本），偶尔买几件衣服（1 件）

虽然用户 A 买的书是用户 B 的 2 倍，但他们的**购买偏好方向是相同的**（都喜欢书，不太喜欢衣服）。**余弦相似度**就能识别出这种相似性，而欧氏距离可能会认为他们差异很大（因为数量差异大）。

### 1.2 余弦相似度的核心思想

余弦相似度通过计算**两个向量夹角的余弦值**来衡量相似程度：

| 夹角   | 含义           | 相似度 |
|--------|----------------|--------|
| 0°     | 方向完全相同   | 1（最相似） |
| 90°    | 垂直（正交）   | 0（不相关） |
| 180°   | 方向完全相反   | -1（最不相似） |

**关键优势**：余弦相似度**不受向量大小（长度）的影响**，只关注方向。因此特别适合：

- 文本相似度（不同长度的文档）
- 推荐系统（不同用户的行为强度不同）
- 特征比较（关注特征的比例而非绝对值）

### 1.3 为什么需要余弦相似度？

**问题场景**：比较两篇文章的相似度。

- 文章 A：1000 字，提到「Python」10 次、「编程」5 次  
- 文章 B：500 字，提到「Python」5 次、「编程」2.5 次  

若用**欧氏距离**，两篇文章会显得差异很大（字数不同）；但实际上**主题比例相同**（都是 Python : 编程 = 2 : 1）。

**余弦相似度的优势**：

- 不受文档长度影响  
- 关注内容的**比例和方向**  
- 对稀疏数据友好（很多值为 0 的情况）  

---

## 2. 前置知识

### 2.1 什么是向量？

向量是一组**有序的数字**，如 `[1, 2, 3]` 就是一个 3 维向量。在数学和编程中，向量用来表示具有多个特征的对象。

```python
import numpy as np

# 创建一个 3 维向量（如：身高、体重、年龄）
vector = np.array([1.2, 3.4, 5.6])
print(f"向量维度: {vector.shape}")
print(f"向量内容: {vector}")
print(f"向量长度: {len(vector)}")
```

### 2.2 什么是余弦

**余弦（cosine）**是三角函数，表示角的**邻边长度与斜边长度之比**。在余弦相似度中，用余弦值衡量两个向量夹角的大小。

数学上，对于角 $\theta$，有：$\cos\theta = \frac{\text{邻边}}{\text{斜边}}$。

### 2.3 什么是余弦定理

**余弦定理**描述三角形三边与夹角的关系（勾股定理的推广）：

对于三角形三边 $a,\,b,\,c$，角 $C$ 对边为 $c$，则：

$$c^2 = a^2 + b^2 - 2ab\cos C$$

当角为直角时，$\cos C=0$，即勾股定理 $c^2=a^2+b^2$。

### 2.4 什么是向量的点积（内积）

**点积（内积）**衡量两个向量在多大程度上指向同一方向，即一个向量在另一个向量方向上的「投影」贡献。

#### 2.4.1 直观例子：马里奥赛车加速带

- 加速带方向为向量 $\vec{a}$，赛车方向为向量 $\vec{b}$。  
- **点积 $\vec{a}\cdot\vec{b}$** = 实际获得的加速效果：  
  - 同向：加速最大（点积为正最大）  
  - 垂直：无加速（点积为 0）  
  - 反向：减速（点积为负）  

#### 2.4.2 几何视角：投影

点积 = 向量 $\vec{a}$ 的长度 × 向量 $\vec{b}$ 在 $\vec{a}$ 方向上的投影长度。  
投影同向为正，反向为负，垂直为 0。

#### 2.4.3 代数计算

若 $\vec{a}=(a_1,a_2)$，$\vec{b}=(b_1,b_2)$，则：

$$\vec{a}\cdot\vec{b} = a_1 b_1 + a_2 b_2$$

高维同理：对应分量相乘再求和。

### 2.5 什么是向量的模长（长度）

**模长**即向量的「长度」。对向量 $\vec{A}=(a_1,a_2,\ldots,a_n)$：

$$\|\vec{A}\| = \sqrt{a_1^2 + a_2^2 + \cdots + a_n^2}$$

```python
import numpy as np
vector = np.array([3, 4])
norm_v1 = np.linalg.norm(vector)
print(f"方法1（norm）: {norm_v1}")
norm_v2 = np.sqrt(np.sum(vector ** 2))
print(f"方法2（手动）: {norm_v2}")
# 3²+4²=25, √25=5
```

---

## 3. 余弦相似度原理

### 3.1 数学公式

对两个向量 $\vec{A}$、$\vec{B}$：

$$\text{余弦相似度} = \frac{\vec{A}\cdot\vec{B}}{\|\vec{A}\|\,\|\vec{B}\|} = \cos\theta$$

其中 $\theta$ 为两向量夹角。

### 3.2 数学证明（简述）

在三角形 OAB 中（O 为原点），设 $|\vec{A}|=a$，$|\vec{B}|=b$，$\vec{A}$ 与 $\vec{B}$ 夹角为 $\theta$。由余弦定理和坐标展开可推出上述公式（推导过程略，见课程原文）。

### 3.3 取值范围和含义

| 取值    | 含义           |
|---------|----------------|
| 1       | 方向完全相同   |
| 接近 1  | 非常相似       |
| 0       | 垂直，不相关   |
| 接近 -1 | 方向相反       |
| -1      | 完全相反       |

### 3.4 代码实现

```python
import numpy as np

def cosine_similarity(a, b):
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot_product / (norm_a * norm_b)

# 方向相同 → 接近 1
vector_a = np.array([1, 2, 3])
vector_b = np.array([2, 4, 6])
print(f"方向相同: {cosine_similarity(vector_a, vector_b):.4f}")

# 方向相反 → 接近 -1
vector_c = np.array([1, 2, 3])
vector_d = np.array([-1, -2, -3])
print(f"方向相反: {cosine_similarity(vector_c, vector_d):.4f}")

# 垂直 → 接近 0
vector_e = np.array([1, 0])
vector_f = np.array([0, 1])
print(f"垂直: {cosine_similarity(vector_e, vector_f):.4f}")
```

---

## 4. 实际应用示例

### 4.1 文本相似度计算

```python
import numpy as np
from collections import Counter

def text_to_vector(text):
    words = text.lower().split()
    word_counts = Counter(words)
    unique_words = sorted(word_counts.keys())
    vector = np.array([word_counts[w] for w in unique_words])
    return vector, unique_words

def align_vectors(vec1, words1, vec2, words2):
    all_words = sorted(set(words1 + words2))
    aligned1 = np.array([words1.count(w) if w in words1 else 0 for w in all_words])
    aligned2 = np.array([words2.count(w) if w in words2 else 0 for w in all_words])
    return aligned1, aligned2

def text_similarity(text1, text2):
    vec1, w1 = text_to_vector(text1)
    vec2, w2 = text_to_vector(text2)
    a1, a2 = align_vectors(vec1, w1, vec2, w2)
    dot = np.dot(a1, a2)
    n1, n2 = np.linalg.norm(a1), np.linalg.norm(a2)
    if n1 == 0 or n2 == 0:
        return 0.0
    return dot / (n1 * n2)

# 示例
text1 = "apple banana apple fruit"
text2 = "banana fruit orange"
text3 = "car bike vehicle"
print(f"文本1 vs 文本2: {text_similarity(text1, text2):.4f}")
print(f"文本1 vs 文本3: {text_similarity(text1, text3):.4f}")
```

### 4.2 推荐系统示例

用余弦相似度找「兴趣相似」的用户：

```python
import numpy as np

class SimpleRecommender:
    def __init__(self):
        self.user_profiles = {}

    def add_user_rating(self, user_id, item_ratings):
        self.user_profiles[user_id] = np.array(item_ratings, dtype=float)

    def cosine_similarity(self, vec1, vec2):
        dot = np.dot(vec1, vec2)
        n1, n2 = np.linalg.norm(vec1), np.linalg.norm(vec2)
        if n1 == 0 or n2 == 0:
            return 0.0
        return dot / (n1 * n2)

    def recommend_similar_users(self, target_user, top_k=3):
        if target_user not in self.user_profiles:
            return []
        target = self.user_profiles[target_user]
        sims = []
        for uid, uvec in self.user_profiles.items():
            if uid != target_user:
                sims.append((self.cosine_similarity(target, uvec), uid))
        sims.sort(reverse=True)
        return sims[:top_k]

# 示例
r = SimpleRecommender()
r.add_user_rating('user1', [5, 3, 0, 1, 4])
r.add_user_rating('user2', [4, 2, 1, 2, 5])
r.add_user_rating('user3', [0, 1, 5, 4, 2])
for sim, uid in r.recommend_similar_users('user1', top_k=2):
    print(f"用户 {uid}, 相似度 {sim:.4f}")
```

### 4.3 图像特征相似度

图像检索中，用余弦相似度比较特征向量（特征通常来自深度学习模型）：

```python
import numpy as np

def find_similar_images(query_features, image_database, top_k=5):
    similarities = []
    for img_id, features in image_database.items():
        dot = np.dot(query_features, features)
        nq = np.linalg.norm(query_features)
        nf = np.linalg.norm(features)
        sim = dot / (nq * nf) if nq and nf else 0.0
        similarities.append((sim, img_id))
    similarities.sort(reverse=True)
    return similarities[:top_k]
```

---

## 5. 与欧氏距离的对比

### 5.1 核心区别

- **欧氏距离**：关注「直线距离」，**受向量大小影响**。  
- **余弦相似度**：关注「角度/方向」，**不受向量大小影响**。

### 5.2 对比示例

```python
import numpy as np

def euclidean_distance(a, b):
    return np.sqrt(np.sum((a - b) ** 2))

def cosine_similarity(a, b):
    dot = np.dot(a, b)
    n1, n2 = np.linalg.norm(a), np.linalg.norm(b)
    if n1 == 0 or n2 == 0:
        return 0.0
    return dot / (n1 * n2)

# 方向相同、大小不同
a, b = np.array([1, 1]), np.array([2, 2])
c = np.array([100, 100])
print("方向相同：")
print(f"  A与B 余弦: {cosine_similarity(a, b):.4f}, 欧氏: {euclidean_distance(a, b):.4f}")
print(f"  A与C 余弦: {cosine_similarity(a, c):.4f}, 欧氏: {euclidean_distance(a, c):.4f}")
print("结论：余弦不受大小影响，欧氏受大小影响")
```

### 5.3 如何选择？

| 用余弦相似度       | 用欧氏距离           |
|--------------------|----------------------|
| 关注方向、比例     | 需要实际距离/数值差  |
| 文本、推荐、稀疏   | 物理坐标、绝对差异   |

---

## 6. 常见问题和注意事项

### 6.1 零向量处理

模长为 0 会除零，需单独处理：

```python
def safe_cosine_similarity(a, b):
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return np.dot(a, b) / (norm_a * norm_b)
```

### 6.2 向量维度必须相同

点积要求两向量维度一致，否则需先对齐或报错提示。

### 6.3 归一化的影响

归一化（模长变为 1）后，**余弦相似度 = 点积**，计算更简单：

```python
def normalize_vector(v):
    norm = np.linalg.norm(v)
    return v if norm == 0 else v / norm

def cosine_similarity_normalized(a, b):
    a_norm = normalize_vector(a)
    b_norm = normalize_vector(b)
    return np.dot(a_norm, b_norm)
```

---

## 7. 总结

### 7.1 核心要点

- 余弦相似度看**方向**：不受向量长度影响，看夹角。  
- 取值范围 **[-1, 1]**：1 最相似，-1 最不相似。  
- 公式：点积 ÷ (‖A‖ × ‖B‖)。  
- 适用：文本相似度、推荐、图像检索等。

### 7.2 优势

- 不受长度影响，适合不同长度文档、不同强度行为。  
- 对稀疏数据友好。  
- 用 numpy 易实现、效率高。

### 7.3 适用场景

**适合**：文本相似度、推荐系统、图像特征比较、任何「看方向」的任务。  
**不适合**：需要真实距离或绝对数值差异的场景（如物理坐标）。

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [math 数学库](/python/AI课程-math数学库)（三角函数、弧度） · [HNSW](/ai/AI课程-HNSW) · [知识体系与学习路径](/ai/知识体系与学习路径) · [cosine_similarity（课程原文）](https://rag.docs-hub.com/html/cosine_similarity.html)
