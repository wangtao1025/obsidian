# AI 课程：Scikit-learn

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **scikit-learn** 文档，归在 **Python 分类**（第三方库）。Scikit-learn（sklearn）是 Python 中最常用的机器学习库，提供分类、回归、聚类、预处理、模型评估与交叉验证等，统一 API（fit/predict/transform），适合入门与中小规模数据。可与 [NumPy](/python/AI课程-numpy)、[RAG 与向量基础](/ai/AI课程-RAG与向量基础)（检索与 TF-IDF 等）搭配学习。

---

## 1. 机器学习与 Scikit-learn

- **机器学习**：从数据中学习规律，对新数据做预测或分类；类型包括监督学习（分类、回归）、无监督学习（聚类）、强化学习。
- **Scikit-learn**：简单易用、算法丰富、文档完善、开源；数据用 [NumPy](/python/AI课程-numpy) 数组（特征 X、标签 y）。

---

## 2. 前置与安装

- **前置**：NumPy 基础；理解**特征（Features）**与**标签（Labels）**（X 为输入，y 为要预测的目标）。
- **安装**：`pip install scikit-learn`；验证：`import sklearn`、`load_iris()` 等。

---

## 3. 统一接口与基本流程

所有模型遵循：**创建** → **fit(X_train, y_train)** → **predict(X_test)** / **score(X_test, y_test)**。

| 步骤 | 说明 |
|------|------|
| 准备数据 | 加载或生成 X、y（NumPy 数组） |
| 划分数据 | `train_test_split(X, y, test_size=0.2)` |
| 预处理 | StandardScaler / MinMaxScaler / LabelEncoder / OneHotEncoder 等 |
| 选模型 | 分类、回归、聚类等 |
| 训练 | `model.fit(X_train, y_train)` |
| 预测与评估 | `model.predict`、`accuracy_score` / `mean_squared_error` 等 |

---

## 4. 数据预处理

| 组件 | 说明 |
|------|------|
| **StandardScaler** | 标准化：均值为 0、标准差为 1 |
| **MinMaxScaler** | 归一化：缩放到指定范围（如 0～1） |
| **LabelEncoder** | 标签编码：类别标签转整数 |
| **OneHotEncoder** | 独热编码：类别特征转二值向量 |
| **SimpleImputer** | 缺失值填充：均值/中位数/众数等 |

---

## 5. 分类与回归

| 类型 | 常用模型 | 说明 |
|------|----------|------|
| **分类** | KNeighborsClassifier、DecisionTreeClassifier、RandomForestClassifier、GaussianNB、MultinomialNB | 预测类别；评估：accuracy、precision、recall、F1、confusion_matrix |
| **回归** | LinearRegression、DecisionTreeRegressor | 预测连续值；评估：MSE、RMSE、MAE、R² |

---

## 6. 模型评估与交叉验证

- **分类**：`accuracy_score`、`precision_score`、`recall_score`、`f1_score`、`confusion_matrix`、`classification_report`。
- **回归**：`mean_squared_error`、`mean_absolute_error`、`r2_score`。
- **交叉验证**：`cross_val_score(model, X, y, cv=5)` 多折评估；**GridSearchCV** 网格搜索超参数。

---

## 7. 数据分割与文本分类

- **train_test_split**：划分训练集/测试集；可选 `stratify=y` 保持类别比例。
- **文本分类**：`TfidfVectorizer` 将文本转为 TF-IDF 向量，再接分类器（如 MultinomialNB）；与课程中 [TF-IDF](https://rag.docs-hub.com/html/TF-IDF.html)、[BagofWords](/ai/AI课程-BagofWords) 相关。

---

## 8. 小结

- **sklearn**：统一 API、覆盖预处理→模型→评估，适合快速搭建机器学习流程。
- **在 RAG/检索中**：课程里检索与排序会涉及 TF-IDF、相似度等，sklearn 提供 `TfidfVectorizer`、`cosine_similarity`（如 `sklearn.metrics.pairwise.cosine_similarity`）等，可与 [RAG 与向量基础](/ai/AI课程-RAG与向量基础)、[词袋模型](/ai/AI课程-BagofWords) 配合使用。

---

**相关文档**：[NumPy](/python/AI课程-numpy) · [RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [词袋模型（BagofWords）](/ai/AI课程-BagofWords) · [知识体系与学习路径](/ai/知识体系与学习路径) · [scikit-learn（课程原文）](https://rag.docs-hub.com/html/scikit-learn.html)
