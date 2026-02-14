# AI 课程：NumPy

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **numpy** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、Sentence Transformers 同为课程用到的第三方库）。NumPy 是 Python 中最基础的数值计算库，提供高性能多维数组（ndarray）与丰富数学函数，数据科学、机器学习与 RAG 中的向量运算常用；可与 [math 数学库](/python/AI课程-math数学库)、[Sentence Transformers](/python/AI课程-sentence_transformers) 搭配学习。

---

## 1. 什么是 NumPy？

**NumPy（Numerical Python）** 提供高性能多维数组对象（ndarray）与大量数学函数，Pandas、Matplotlib、Scikit-learn、Sentence Transformers 等均依赖它。

**优势**：C 实现、速度快；向量化计算（整数组运算无需循环）；内存高效；生态基础。

**前置概念**：数组、向量（一维数组）、矩阵（二维数组）、向量化计算。

---

## 2. 环境准备

- Python ≥ 3.8。
- 安装：`python -m pip install numpy`（或 `python3 -m pip install numpy`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。
- 验证：`import numpy as np` → `np.array([1,2,3])` → `print(np.__version__)`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **ndarray** | 多维数组对象，元素同类型（int32、float64、bool 等） |
| **维度** | 0 维标量、1 维向量、2 维矩阵、高维数组 |
| **shape** | 各维度大小，如 `(3,)`、`(2,3)` |
| **dtype** | 元素数据类型 |

---

## 4. 创建数组

- **从列表**：`np.array([1,2,3])`、`np.array([[1,2],[3,4]])`
- **特殊数组**：`np.zeros((2,3))`、`np.ones((3,2))`、`np.eye(3)`、`np.arange(0,10,2)`、`np.linspace(0,1,5)`、`np.empty((2,3))`
- **属性**：`.ndim`、`.shape`、`.size`、`.dtype`、`.itemsize`、`.nbytes`

---

## 5. 索引与切片

- **基本**：`arr[i,j]`、`arr[i]`（行）、`arr[:,j]`（列）
- **切片**：`arr[0:2, 1:3]`、`arr[-1]`、`arr[:, :]`
- **布尔索引**：`arr[arr > 5]`、`(arr > 3) & (arr < 7)`、`arr[arr > 5] = 0`
- **花式索引**：`arr[[0,2]]`、`arr[[0,2], [2,0]]`、`np.ix_(rows, cols)`

---

## 6. 数组操作

- **形状**：`.reshape(3,4)`、`.flatten()`、`.ravel()`、`arr[:, None]`（增维）
- **拼接**：`np.vstack([a,b])`、`np.hstack([a,b])`、`np.concatenate([a,b], axis=0)`
- **拆分**：`np.hsplit(arr, 2)`、`np.vsplit(arr, 3)`、`np.split(arr, 3, axis=0)`

---

## 7. 数学运算

- **逐元素**：`a + b`、`a - b`、`a * b`、`a / b`、`a ** 2`、`a + 10`（广播）
- **函数**：`np.sin/cos/tan`、`np.exp`、`np.log`/`np.log10`、`np.sqrt`/`np.cbrt`、`np.abs`、`np.floor`/`np.ceil`/`np.round`、`np.pi`

---

## 8. 统计函数

- **基本**：`np.sum`、`np.mean`、`np.std`、`np.var`、`np.max`/`np.min`、`np.argmax`/`np.argmin`
- **按轴**：`np.mean(matrix, axis=0)`（每列）、`np.mean(matrix, axis=1)`（每行）

---

## 9. 随机数

- **生成**：`np.random.seed(42)`、`np.random.rand(2,3)`、`np.random.randn(2,3)`、`np.random.randint(0,10,(2,3))`、`np.random.normal(loc=100, scale=15, size=(2,3))`
- **选择与打乱**：`np.random.choice(arr, size=5, replace=True)`、`np.random.shuffle(arr)`、`np.random.permutation(arr)`

---

## 10. 文件操作

- **文本**：`np.savetxt("data.txt", data, fmt="%.4f", delimiter=",")`、`np.loadtxt("data.txt", delimiter=",")`
- **二进制**：`np.save("data.npy", data)`、`np.load("data.npy")`；多数组：`np.savez("out.npz", a=arr1, b=arr2)`，加载后 `loaded["a"]`。
- **校验**：`np.allclose(a, b)` 检查近似相等。

---

## 11. 实战案例：销售数据分析

示例：生成 12×4 销售矩阵，按列求和/求均、按行求和、`np.diff` 算月度增长、`np.argmax` 找最佳月份/产品。掌握 `sum(axis=0/1)`、`mean(axis=0/1)`、`diff`、`argmax` 即可复现。

---

## 12. 性能优化与常见问题

- **向量化 vs 循环**：尽量用 `arr * arr` 等向量化，避免 Python 循环，可提速数十倍。
- **数据类型**：合理选用 `dtype`（如 `int32` vs `int64`）节省内存；`.astype()` 转换。
- **广播**：形状兼容时自动扩展，如 `matrix + vector`、`matrix + scalar`。
- **视图与副本**：切片多为视图，修改会影响原数组；需独立拷贝时用 `.copy()`。整数除法结果多为浮点。

---

## 13. 学习资源

- [NumPy 官方文档](https://numpy.org/doc/)
- [NumPy 快速入门](https://numpy.org/doc/stable/user/quickstart.html)

---

**相关文档**：[math 数学库](/python/AI课程-math数学库) · [random](/python/AI课程-random) · [Sentence Transformers](/python/AI课程-sentence_transformers) · [余弦相似度](/ai/AI课程-余弦相似度) · [知识体系与学习路径](/ai/知识体系与学习路径) · [numpy（课程原文）](https://rag.docs-hub.com/html/numpy.html)
