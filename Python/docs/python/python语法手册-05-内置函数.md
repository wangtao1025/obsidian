# Python 语法手册：内置函数

← [语法手册总览](/python/python语法手册) | 下一章见总览

---

## 五、内置函数

- `len(iterable)`：返回长度（个数）。
  - 应用：计算平均分时的分母 `sum(scores) / len(scores)`。
  - （对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `sum(iterable)`：对序列内所有数值求和。
  - 应用：累加总分。
  - （对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `max(iterable)`：返回最大值。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
- `min(iterable)`：返回最小值。（对应例题：[[python 面试题#[题目 1.1]：学生成绩管理系统 (综合大题)]]）
  - 应用：计算极差 `max(scores) - min(scores)` 判断是否偏科。
- `reversed()`：返回反向迭代器（不改变原数据）。
- **`sorted(iterable, key=None, reverse=False)`**：对可迭代对象排序，**返回一个新的列表**，不修改原数据。
  - 默认**升序**；`reverse=True` 为降序。
  - `key` 可传函数，按“函数的返回值”排序，例如 `sorted(students, key=lambda x: x["score"], reverse=True)` 按分数降序。
  - 可排序列表、元组、字符串等；元组和字符串没有 `.sort()`，只能用 `sorted()`，得到的是列表。
  - 与列表的 `.sort()` 区别：`.sort()` 只用于列表且**原地修改**、返回 `None`；`sorted()` **不改原数据**、返回新列表。详见 [第二章 2.1.1 sorted() 与 .sort() 详解](/python/python语法手册-02-内置数据结构#211-sorted-与-sort-详解小白必读)。
