**Python面试题库**

# 第一类：数据类型综合应用与数据处理

## [题目 1.1]：学生成绩管理系统 (综合大题)

**题目背景**：开发一个能处理学生信息转换、成绩等级计算及数据筛选统计的系统。

### **1. 核心考点拆解**：

- **脏数据清洗 (Sanitization)**：利用 `.strip()` 去除姓名空格，`.lower()` 统一布尔字符串。

- **防御性编程 (Validation)**：使用 `try-except` 捕获 `int()` 或 `float()` 转换失败的情况。

- **聚合统计 (Aggregation)**：组合使用 `sum()` / `len()` 计算平均分。

- **字典高级技巧**：利用 `**student` 快速解包合并字典字段。

- **报表对齐**：使用 f-string 的 `{:<10}` 进行表格化对齐输出。

### **2. 关联手册章节快速跳转**：

- [`1.2 字典解包`](#1.2--1)
- [`2.6 整型与浮点转换` ](#integer---)
- [`3.2 异常处理` ](#error-handling)
- [`4.0 格式化输出` ](#formatting)
- [`8.3 下载时间换算(逻辑参考)`](#the-8-bit-trap)
### **3.题目**
  请实现以下三个函数：
#### 数据类型转换与验证函数 
```python
def process_student_data(student_info):
    """
    处理学生数据，进行类型转换和验证

    参数:
        student_info: 字典，包含学生信息
        格式: {"name": "张三", "age": "20", "score": "85.5", "is_passed": "true"}

    返回:
        处理后的字典，所有值都转换为正确的Python数据类型
        如果数据无效，返回None

    要求:
        - name: 转换为字符串，去除首尾空格
        - age: 转换为整数，范围1-100
        - score: 转换为浮点数，范围0.0-100.0
        - is_passed: 转换为布尔值（"true"/"false"字符串转为True/False）
        - 如果任何转换失败或超出范围，返回None
    """
```
#### 成绩计算与格式化函数
```python
def calculate_and_format_grades(students):
    """
    计算学生成绩等级并格式化输出

    参数:
        students: 学生信息列表，每个元素是字典
        格式: [{"name": "张三", "score": 85.5}, ...]

    返回:
        格式化后的成绩报告字符串

    要求:
        - 根据分数计算等级：>=90为A，>=80为B，>=70为C，>=60为D，<60为F
        - 计算平均分、最高分、最低分
        - 统计各等级人数
        - 使用f-string格式化输出，保留2位小数
        - 输出格式要美观，包含表格样式
    """
```
#### 数据筛选与统计函数
```python
def analyze_student_performance(students, filters=None):
    """
    分析学生表现数据

    参数:
        students: 学生信息列表
        filters: 筛选条件字典，可选参数
        格式: {"min_score": 80, "max_score": 95, "grade": "A"}

    返回:
        分析结果字典，包含：
        {
            "total_count": 总人数,
            "filtered_count": 筛选后人数,
            "average_score": 平均分,
            "grade_distribution": 等级分布,
            "top_performers": 前3名学生,
            "pass_rate": 及格率
        }

    要求:
        - 支持按分数范围筛选
        - 支持按等级筛选
        - 计算及格率（>=60分）
        - 找出前3名高分学生
        - 处理边界情况（空数据、无效筛选条件等）
    """
```
#### 测试用例
```python
# 测试数据
test_students = [
    {"name": " 张三 ", "age": "20", "score": "85.5", "is_passed": "true"},
    {"name": "李四", "age": "19", "score": "92.0", "is_passed": "true"},
    {"name": "王五", "age": "21", "score": "78.3", "is_passed": "false"},
    {"name": "赵六", "age": "22", "score": "65.7", "is_passed": "true"},
    {"name": "钱七", "age": "20", "score": "45.2", "is_passed": "false"}
]

# 筛选条件测试
test_filters = [
    {"min_score": 80, "max_score": 95},
    {"grade": "A"},
    {"min_score": 60}
]
```
#### 预期结果
```python
=== 学生成绩管理系统 ===

处理后的学生数据:
姓名: 张三, 年龄: 20, 分数: 85.5, 及格: True

成绩报告:
==========================================
学生姓名    分数    等级
==========================================
张三       85.50    B
李四       92.00    A
王五       78.30    C
赵六       65.70    D
钱七       45.20    F
==========================================
平均分: 73.34
最高分: 92.00
最低分: 45.20
等级分布: A:1人, B:1人, C:1人, D:1人, F:1人

分析结果:
总人数: 5, 筛选后: 2, 平均分: 88.75, 及格率: 60.0%
```
#### 参考答案
```python
# 定义处理学生数据的函数，对数据进行类型转换与验证
def process_student_data(student_info):
    # 文档字符串：说明函数作用
    """
    处理学生数据，进行类型转换和验证
    """
    try:
        # 定义必须存在的字段
        required_fields = ["name", "age", "score", "is_passed"]
        # 检查每个必填字段是否在传入数据中
        for field in required_fields:
            # 如果字段缺失，返回None
            if field not in student_info:
                return None

        # 将姓名转换为字符串并去除首尾空格
        name = str(student_info["name"]).strip()
        # 检查姓名是否为空字符串
        if not name:
            return None

        # 尝试将年龄转换为整数并检查取值范围
        try:
            age = int(student_info["age"])
            # 年龄范围应在1到100之间
            if not (1 <= age <= 100):
                return None
        # 捕捉类型或取值转换异常
        except (ValueError, TypeError):
            return None

        # 尝试将分数转换为浮点数并检查取值范围
        try:
            score = float(student_info["score"])
            # 分数范围应在0.0到100.0之间
            if not (0.0 <= score <= 100.0):
                return None
        # 捕捉类型或取值转换异常
        except (ValueError, TypeError):
            return None

        # 将及格状态转为字符串并小写化
        is_passed_str = str(student_info["is_passed"]).lower()
        # 判断及格状态，转换为布尔值
        if is_passed_str == "true":
            is_passed = True
        elif is_passed_str == "false":
            is_passed = False
        else:
            # 若不是true/false字符串，返回None
            return None

        # 返回类型转换后，经过验证的学生信息字典
        return {
            "name": name,
            "age": age,
            "score": score,
            "is_passed": is_passed
        }
    # 捕获所有未预料的异常，返回None
    except Exception:
        return None

# 定义函数：计算学生成绩等级并格式化输出
def calculate_and_format_grades(students):
    # 文档字符串：函数描述
    """
    计算学生成绩等级并格式化输出
    """
    # 如果学生列表为空，返回提示字符串
    if not students:
        return "没有学生数据"

    # 定义嵌套函数，根据分数返回等级
    def get_grade(score):
        if score >= 90:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 70:
            return "C"
        elif score >= 60:
            return "D"
        else:
            return "F"

    # 创建带等级字典的新学生列表
    students_with_grades = []
    # 遍历学生列表，逐一计算等级并加入新列表
    for student in students:
        grade = get_grade(student["score"])
        students_with_grades.append({
            **student,
            "grade": grade
        })

    # 提取所有分数到新列表
    scores = [s["score"] for s in students_with_grades]
    # 计算平均分
    average_score = sum(scores) / len(scores)
    # 获取最高分
    max_score = max(scores)
    # 获取最低分
    min_score = min(scores)

    # 统计每个等级的人数
    grade_counts = {}
    for student in students_with_grades:
        grade = student["grade"]
        grade_counts[grade] = grade_counts.get(grade, 0) + 1

    # 格式化输出字符串
    result = "成绩报告:\n"
    # 添加分隔线
    result += "=" * 42 + "\n"
    # 添加表头
    result += f"{'学生姓名':<10} {'分数':<8} {'等级':<4}\n"
    # 添加分隔线
    result += "=" * 42 + "\n"

    # 格式化输出每个学生的信息
    for student in students_with_grades:
        result += f"{student['name']:<10} {student['score']:<8.2f} {student['grade']:<4}\n"

    # 添加分隔线
    result += "=" * 42 + "\n"
    # 添加平均分
    result += f"平均分: {average_score:.2f}\n"
    # 添加最高分
    result += f"最高分: {max_score:.2f}\n"
    # 添加最低分
    result += f"最低分: {min_score:.2f}\n"

    # 构造等级分布字符串，如“B:2人, D:1人”
    grade_dist = ", ".join([f"{grade}:{count}人" for grade, count in sorted(grade_counts.items())])
    result += f"等级分布: {grade_dist}\n"

    # 返回格式化后的结果
    return result

# 定义函数：分析学生表现数据，可以筛选并统计
def analyze_student_performance(students, filters=None):
    # 文档字符串：描述函数作用
    """
    分析学生表现数据
    """
    # 如果没有学生数据，返回默认的分析结果
    if not students:
        return {
            "total_count": 0,
            "filtered_count": 0,
            "average_score": 0.0,
            "grade_distribution": {},
            "top_performers": [],
            "pass_rate": 0.0
        }

    # 统计总人数
    total_count = len(students)

    # 拷贝学生列表
    filtered_students = students.copy()

    # 如果有筛选条件，则应用筛选
    if filters:
        # 如果有最小分数筛选，筛去低于该分数的学生
        if "min_score" in filters:
            filtered_students = [s for s in filtered_students if s["score"] >= filters["min_score"]]
        # 如果有最大分数筛选，筛去高于该分数的学生
        if "max_score" in filters:
            filtered_students = [s for s in filtered_students if s["score"] <= filters["max_score"]]
        # 如果有等级筛选，根据成绩等级过滤
        if "grade" in filters:
            # 定义返回成绩等级的辅助函数
            def get_grade(score):
                if score >= 90: return "A"
                elif score >= 80: return "B"
                elif score >= 70: return "C"
                elif score >= 60: return "D"
                else: return "F"
            # 取目标等级
            target_grade = filters["grade"]
            # 只保留等级等于目标等级的学生
            filtered_students = [s for s in filtered_students if get_grade(s["score"]) == target_grade]

    # 计算筛选后学生数量
    filtered_count = len(filtered_students)

    # 如果筛选后有学生，计算平均分，否则为0
    if filtered_students:
        average_score = sum(s["score"] for s in filtered_students) / len(filtered_students)
    else:
        average_score = 0.0

    # 统计筛选后学生各等级人数
    grade_distribution = {}
    for student in filtered_students:
        score = student["score"]
        if score >= 90: grade = "A"
        elif score >= 80: grade = "B"
        elif score >= 70: grade = "C"
        elif score >= 60: grade = "D"
        else: grade = "F"
        grade_distribution[grade] = grade_distribution.get(grade, 0) + 1

    # 前三名高分学生，按分数降序排列取前3
    sorted_students = sorted(filtered_students, key=lambda x: x["score"], reverse=True)
    top_performers = sorted_students[:3]

    # 筛选后及格人数（分数大于等于60）
    passed_count = sum(1 for s in filtered_students if s["score"] >= 60)
    # 计算及格率（百分比），若筛选人数为0则为0%
    pass_rate = (passed_count / filtered_count * 100) if filtered_count > 0 else 0.0

    # 返回分析结果字典
    return {
        "total_count": total_count,
        "filtered_count": filtered_count,
        "average_score": average_score,
        "grade_distribution": grade_distribution,
        "top_performers": top_performers,
        "pass_rate": pass_rate
    }

# 主程序入口，输出初始提示
print("=== 学生成绩管理系统 ===")

# 定义测试用的学生数据列表
test_students = [
    {"name": " 张三 ", "age": "20", "score": "85.5", "is_passed": "true"},
    {"name": "李四", "age": "19", "score": "92.0", "is_passed": "true"},
    {"name": "王五", "age": "21", "score": "78.3", "is_passed": "false"},
    {"name": "赵六", "age": "22", "score": "65.7", "is_passed": "true"},
    {"name": "钱七", "age": "20", "score": "45.2", "is_passed": "false"}
]

# 测试数据类型转换部分
print("1. 数据类型转换测试:")
# 存放处理后的学生数据
processed_students = []
# 遍历测试数据，逐个进行数据处理并输出结果
for i, student in enumerate(test_students):
    processed = process_student_data(student)
    if processed:
        processed_students.append(processed)
        print(f"学生{i+1}: {processed}")
    else:
        print(f"学生{i+1}: 数据无效")

# 测试成绩计算与格式化输出
print("\n2. 成绩计算与格式化:")
if processed_students:
    grade_report = calculate_and_format_grades(processed_students)
    print(grade_report)

# 测试数据筛选和统计分析
print("3. 数据筛选与统计:")
# 准备三组不同的筛选条件
test_filters = [
    {"min_score": 80},
    {"grade": "A"},
    {"min_score": 60, "max_score": 90}
]

# 遍历每组筛选条件，输出分析结果
for i, filter_condition in enumerate(test_filters, 1):
    print(f"\n筛选条件{i}: {filter_condition}")
    result = analyze_student_performance(processed_students, filter_condition)
    print(f"总人数: {result['total_count']}, 筛选后: {result['filtered_count']}")
    print(f"平均分: {result['average_score']:.2f}, 及格率: {result['pass_rate']:.1f}%")
    print(f"等级分布: {result['grade_distribution']}")
    print(f"前3名: {[s['name'] for s in result['top_performers']]}")

# 测试边界与异常情况
print("\n4. 边界情况测试:")

# 构造无效数据进行处理测试
invalid_data = {"name": "", "age": "150", "score": "abc", "is_passed": "maybe"}
result = process_student_data(invalid_data)
print(f"无效数据处理: {result}")

# 测试空数据分析
empty_result = analyze_student_performance([])
print(f"空数据分析: {empty_result}")
```
#### 运行结果示例
```python
=== 学生成绩管理系统 ===
1. 数据类型转换测试:
学生1: {'name': '张三', 'age': 20, 'score': 85.5, 'is_passed': True}
学生2: {'name': '李四', 'age': 19, 'score': 92.0, 'is_passed': True}
学生3: {'name': '王五', 'age': 21, 'score': 78.3, 'is_passed': False}
学生4: {'name': '赵六', 'age': 22, 'score': 65.7, 'is_passed': True}
学生5: {'name': '钱七', 'age': 20, 'score': 45.2, 'is_passed': False}

2. 成绩计算与格式化:
成绩报告:
==========================================
学生姓名       分数       等级  
==========================================
张三         85.50    B   
李四         92.00    A   
王五         78.30    C   
赵六         65.70    D   
钱七         45.20    F   
==========================================
平均分: 73.34
最高分: 92.00
最低分: 45.20
等级分布: A:1人, B:1人, C:1人, D:1人, F:1人

3. 数据筛选与统计:

筛选条件1: {'min_score': 80}
总人数: 5, 筛选后: 2
平均分: 88.75, 及格率: 100.0%
等级分布: {'B': 1, 'A': 1}
前3名: ['李四', '张三']

筛选条件2: {'grade': 'A'}
总人数: 5, 筛选后: 1
平均分: 92.00, 及格率: 100.0%
等级分布: {'A': 1}
前3名: ['李四']

筛选条件3: {'min_score': 60, 'max_score': 90}
总人数: 5, 筛选后: 3
平均分: 76.50, 及格率: 100.0%
等级分布: {'B': 1, 'C': 1, 'D': 1}
前3名: ['张三', '王五', '赵六']

4. 边界情况测试:
无效数据处理: None
空数据分析: {'total_count': 0, 'filtered_count': 0, 'average_score': 0.0, 'grade_distribution': {}, 'top_performers': [], 'pass_rate': 0.0}
```
---

## [题目 1.2]：进制转换与存储单位换算 (算法类)

**题目描述**：实现 `convert_base` 转换 2-16 进制，以及 `format_file_size` 格式化 B/KiB/MiB。

### **1. 核心考点拆解**：

- **十进制中转**：核心在于 `int(str, base)`。

- **循环降位算法**：利用 `//` 和 `%` 不断剥离数字位数。

- **单位跨越**：掌握 $1024$ 进制的 `while` 循环位移逻辑。

### **2. 关联手册章节快速跳转**：

- [`2.6 进制表示法`](#integer---)
- [`8.1 进制转换公式`](#8.1-)
- [`8.2 存储单位格式化`](#human-readable)
### **3.题目**
- 请实现以下三个函数

#### 进制转换函数
```python
def convert_base(number_str, from_base, to_base):
    """
    进制转换函数

    参数:
        number_str: 数字字符串
        from_base: 源进制 (2-16)
        to_base: 目标进制 (2-16)

    返回:
        转换后的数字字符串

    示例:
        convert_base("255", 10, 16) -> "FF"
        convert_base("1010", 2, 10) -> "10"
    """
```
#### 文件大小格式化函数
```python
def format_file_size(size_bytes):
    """
    将字节数转换为人类可读的格式

    参数:
        size_bytes: 文件大小（字节）

    返回:
        格式化后的字符串，如 "1.50 KiB"

    要求:
        - 使用二进制前缀 (1024进制): B, KiB, MiB, GiB, TiB
        - 自动选择最合适的单位
        - 保留2位小数

    示例:
        format_file_size(1536) -> "1.50 KiB"
        format_file_size(1048576) -> "1.00 MiB"
    """
```

#### 下载时间计算函数
```python
def calculate_download_time(file_size_mb, bandwidth_mbps):
    """
    计算文件下载所需时间

    参数:
        file_size_mb: 文件大小（MB）
        bandwidth_mbps: 网络带宽（Mbps）

    返回:
        下载时间字符串，根据时间长短选择合适单位

    要求:
        - 正确进行单位换算（注意 Byte vs bit 的区别）
        - 小于1分钟显示秒，小于1小时显示分钟，否则显示小时
        - 保留1位小数

    示例:
        calculate_download_time(100, 50) -> "16.0 秒"
        calculate_download_time(2048, 100) -> "2.7 分钟"
    """
```
#### 测试用例
```python
# 测试数据
test_cases = [
    # 进制转换测试
    ("255", 10, 16),     # 应输出: "FF"
    ("1010", 2, 10),     # 应输出: "10"
    ("FF", 16, 2),       # 应输出: "11111111"

    # 文件大小测试
    (500,),              # 应输出: "500.00 B"
    (1536,),             # 应输出: "1.50 KiB"
    (1048576,),          # 应输出: "1.00 MiB"
    (3221225472,),       # 应输出: "3.00 GiB"

    # 下载时间测试
    (100, 50),           # 应输出: "16.0 秒"
    (2048, 100),         # 应输出: "2.7 分钟"
    (10240, 10),         # 应输出: "22.8 小时"
]
```

###  参考答案  
```python
# 定义进制转换函数
def convert_base(number_str, from_base, to_base):
    """
    进制转换函数

    参数:
        number_str: 数字字符串
        from_base: 源进制 (2-16)
        to_base: 目标进制 (2-16)

    返回:
        转换后的数字字符串
    """
    # 检查输入进制是否合法（2-16之间）
    if not (2 <= from_base <= 16 and 2 <= to_base <= 16):
        raise ValueError("进制必须在2-16之间")

    # 将输入数字字符串从原进制转换为十进制整数
    decimal_value = int(number_str, from_base)

    # 如果目标进制为10，直接返回对应的十进制字符串
    if to_base == 10:
        return str(decimal_value)

    # 定义一个内部函数，将十进制整数转换为任意目标进制字符串
    def int_to_base(n, base):
        # 如果数值为0，直接返回"0"
        if n == 0:
            return "0"
        # 进制表示的字符
        digits = "0123456789ABCDEF"
        result = ""
        # 逐步取余并拼接各位数字字符
        while n > 0:
            result = digits[n % base] + result
            n //= base
        return result

    # 返回最终目标进制的字符串
    return int_to_base(decimal_value, to_base)


# 定义文件大小格式化函数
def format_file_size(size_bytes):
    """
    将字节数转换为人类可读的格式

    参数:
        size_bytes: 文件大小（字节）

    返回:
        格式化后的字符串
    """
    # 文件大小不能为负数，抛出异常
    if size_bytes < 0:
        raise ValueError("文件大小不能为负数")

    # 定义文件大小单位（1024进制）
    units = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
    # 转换为浮点数便于计算
    size = float(size_bytes)

    # 初始化单位索引
    unit_index = 0
    # 循环计算合适的单位，同时缩小size
    while size >= 1024 and unit_index < len(units) - 1:
        size /= 1024.0
        unit_index += 1

    # 返回两位小数的格式化字符串和单位
    return f"{size:.2f} {units[unit_index]}"


# 定义下载时间计算函数
def calculate_download_time(file_size_mb, bandwidth_mbps):
    """
    计算文件下载所需时间

    参数:
        file_size_mb: 文件大小（MB）
        bandwidth_mbps: 网络带宽（Mbps）

    返回:
        下载时间字符串
    """
    # 检查传入的文件大小和带宽都大于0
    if file_size_mb <= 0 or bandwidth_mbps <= 0:
        raise ValueError("文件大小和带宽必须大于0")

    # 文件大小从兆字节（MB）转换为兆比特（Mb）：1 字节=8位
    file_size_mb_bits = file_size_mb * 8

    # 计算下载时间（秒）
    time_seconds = file_size_mb_bits / bandwidth_mbps

    # 根据总秒数判断选择合适的单位输出
    if time_seconds < 60:
        return f"{time_seconds:.1f} 秒"
    elif time_seconds < 3600:
        time_minutes = time_seconds / 60
        return f"{time_minutes:.1f} 分钟"
    else:
        time_hours = time_seconds / 3600
        return f"{time_hours:.1f} 小时"


# 进制转换测试用例
test_cases = [
    ("255", 10, 16, "FF"),
    ("1010", 2, 10, "10"),
    ("FF", 16, 2, "11111111")
]

# 遍历进制转换测试用例，分别调用转换函数并输出结果
for number, from_b, to_b, expected in test_cases:
    result = convert_base(number, from_b, to_b)
    print(f"{number} ({from_b}进制) -> {result} ({to_b}进制) [期望: {expected}]")

# 输出文件大小格式化测试分割线
print("\n=== 文件大小格式化测试 ===")

# 文件大小格式化测试用例
size_tests = [500, 1536, 1048576, 3221225472]
# 遍历文件大小测试用例，格式化并输出结果
for size in size_tests:
    result = format_file_size(size)
    print(f"{size:,} 字节 -> {result}")

# 输出下载时间计算测试分割线
print("\n=== 下载时间计算测试 ===")

# 下载时间计算测试用例
download_tests = [
    (100, 50, "16.0 秒"),
    (2048, 100, "2.7 分钟"),
    (10240, 10, "2.3 小时")
]

# 遍历下载时间测试用例，调用计算函数并输出结果
for file_size, bandwidth, expected in download_tests:
    result = calculate_download_time(file_size, bandwidth)
    print(f"{file_size} MB, {bandwidth} Mbps -> {result} [期望: {expected}]")
```

####  运行结果示例

```python
255 (10进制) -> FF (16进制) [期望: FF]
1010 (2进制) -> 10 (10进制) [期望: 10]
FF (16进制) -> 11111111 (2进制) [期望: 11111111]

=== 文件大小格式化测试 ===
500 字节 -> 500.00 B
1,536 字节 -> 1.50 KiB
1,048,576 字节 -> 1.00 MiB
3,221,225,472 字节 -> 3.00 GiB

=== 下载时间计算测试 ===
100 MB, 50 Mbps -> 16.0 秒 [期望: 16.0 秒]
2048 MB, 100 Mbps -> 2.7 分钟 [期望: 2.7 分钟]
10240 MB, 10 Mbps -> 2.3 小时 [期望: 2.3 小时]
```






---

## [题目 1.3]：变量赋值与身份校验 (基础类)

**题目背景**：考察 `is` vs == 的区别，以及 `None` 的判断标准。

**1. 核心考点拆解**：7316

- **单例判断**：始终使用 `is None` 检查空值以保证性能和准确性。

- **缓存陷阱**：理解 `[-5, 256]` 小整数池对 `is` 判断的影响。

**2. 关联手册章节快速跳转**：

- `7.1 身份vs内容区别表` 
- `7.3 None判断标准` 
- `7.4 整数缓存陷阱`
https://python.docs-hub.com/html/9.!=%E5%92%8Cis%20not%E8%BF%90%E7%AE%97%E7%AC%A6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F.html