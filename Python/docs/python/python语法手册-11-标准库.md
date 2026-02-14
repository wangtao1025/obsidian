# Python 语法手册：标准库模块

← [语法手册总览](/) | 下一章见总览

---

## 十一、标准库模块

### 11.1 `datetime` 日期时间处理
#### 11.1.1 功能概述
`datetime` 模块提供日期和时间处理功能，支持时间获取、格式化、运算和解析。

#### 11.1.2 主要类型
- `datetime`  包含日期和时间
- `date` 仅包含日期
- `time` 仅包含时间
- `timedelta` 时间间隔

#### 11.1.3 基本用法

##### 11.1.3.1 获取当前时间
```python
from datetime import datetime, date, time, timedelta

# 获取当前时间
now = datetime.now()
print("当前时间:", now)
print("格式化时间:", now.strftime("%Y-%m-%d %H:%M:%S"))
 
```

##### 11.1.3.2 创建特定时间
```python
# 创建特定时间
dt = datetime(2024, 1, 15, 14, 30, 0)
print("特定时间:", dt)
```

##### 11.1.3.3 时间运算
```python
# 时间加减
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)
print("明天:", tomorrow)
print("上周:", last_week)

# 时间差计算
time_diff = tomorrow - now
print("时间差:", time_diff)
print("相差天数:", time_diff.days)
print("相差秒数:", time_diff.total_seconds())
```

##### 11.1.3.4 时间组件
```python
# 获取时间各部分
print("年:", now.year)
print("月:", now.month)
print("日:", now.day)
print("时:", now.hour)
print("分:", now.minute)
print("星期:", now.weekday())
```

##### 11.1.3.5 字符串解析
```python
# 字符串解析为时间对象
date_str = "2024-01-15 14:30:00"
parsed_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print("解析后的时间:", parsed_date)
```
- strptime 就是将字符串的时间转换为时间对象
- strftime 就是将时间对象转换成时间字符串
- https://docs.python.org/zh-cn/3/library/datetime.html#strftime-and-strptime-behavior
#### 11.1.4 使用场景
- 日志记录和时间戳
- 数据分析和统计
- 定时任务和调度
- 用户界面时间显示

### 11.2 `collections` - 高级数据结构
`collections` 模块提供高性能、多用途的数据结构，扩展了内置类型的功能。

##### 11.2.1 `namedtuple` - 命名元组

`namedtuple`是Python标准库`collections`模块中的一个工厂函数，用于创建具名元组。它允许你像访问对象的属性一样访问元组元素，主要作用是提高代码的可读性和可维护性。

- 主要特点
	-  **具名访问**：可以通过属性名访问元组元素
	- **索引访问**：仍然支持传统的索引访问方式
	- **不可变性**：与普通元组一样，创建后不可修改
	- **内存效率**：比普通类更节省内存
	- **自描述性**：通过字段名提供更好的代码可读性
-  **导入 `namedtuple`**
	```python
		# 从 collections 模块导入 namedtuple 
		from collections import namedtuple
	```
-  **定义具名元组类型**
    - 通过字段名创建一个新的具名元组类```
    ```python
    # 从 collections 模块导入 namedtuple 
    from collections import namedtuple 
    # 创建一个名为 'Point' 的具名元组类 # 该类将拥有 'x' 和 'y' 两个字段 
    Point = namedtuple('Point', ['x', 'y'])
    ```
-  **实例化具名元组对象**
    - 传入各字段对应的值，获得该对象
	```python
	# 从 collections 模块导入 namedtuple 
	from collections import namedtuple 
	# 创建一个名为 'Point' 的具名元组类 # 该类将拥有 'x' 和 'y' 两个字段 
	Point = namedtuple('Point', ['x', 'y']) 
	
	# 创建一个 Point 具名元组对象 
	# 传入 x 值为 10，y 值为 20 
	p = Point(10, 20)
	```
- 访问元素
	- 既可以用“点.属性名”方式，也可以用索引方式
	```python
	# 从 collections 模块导入 namedtuple 
	from collections import namedtuple 
	# 创建一个名为 'Point' 的具名元组类 
	# 该类将拥有 'x' 和 'y' 两个字段 
	Point = namedtuple('Point', ['x', 'y']) 
	
	# 创建一个 Point 具名元组对象 
	# 传入 x 值为 10，y 值为 20 
	p = Point(10, 20) 
	
	# 访问具名元组的属性 
	# 打印 x 属性的值 
	print(f"p.x = {p.x}") 
	# 预期输出: p.x = 10 
	
	# 打印 y 属性的值 
	print(f"p.y = {p.y}") 
	# 预期输出: p.y = 20 
	
	# 也可以像普通元组一样通过索引访问元素 
	# 打印第一个元素 (索引为 0) 的值 
	print(f"p[0] = {p[0]}") 
	# 预期输出: p[0] = 10 
	
	# 打印第二个元素 (索引为 1) 的值 
	print(f"p[1] = {p[1]}") 
	# 预期输出: p[1] = 20 
	
	# 打印整个具名元组对象 
	print(f"Point对象: {p}") 
	# 预期输出: Point对象: Point(x=10, y=20)
	```
- 其他功能
	- `_fields`、
		- 获取具名元组的字段名 
		- `print(f"字段名: {p._fields}") # 预期输出: 字段名: ('x', 'y')`
	- `_replace()`
		- 使用`_replace`方法，替换a字段，生成新的对象
		- `new_person = person._replace(age=26, city='Boston')`
	- `_asdict()`
		- 转换为字典
		- `# 将Person实例转换为字典`
		- `person_dict = person._asdict()`
- 多种创建方式
	```python
		from collections import namedtuple
		# 方式1：使用列表定义字段
		Person1 = namedtuple('Person', ['name', 'age', 'city'])
		# 创建Person具名元组类
		person1 = Person1('Alice', 25, 'New York')
		# 创建Person实例
		print(f"方式1 - 列表定义: {person1}")
		# 打印方式1的结果
		
		# 方式2：使用字符串定义字段（空格分隔）
		Person2 = namedtuple('Person', 'name age city')
		# 创建Person具名元组类
		person2 = Person2('Bob', 30, 'London')
		# 创建Person实例
		print(f"方式2 - 字符串定义: {person2}")
		# 打印方式2的结果
		
		# 方式3：使用字符串定义字段（逗号分隔）
		Person3 = namedtuple('Person', 'name, age, city')
		# 创建Person具名元组类
		person3 = Person3('Charlie', 35, 'Tokyo')
		# 创建Person实例
		print(f"方式3 - 逗号分隔: {person3}")
		# 打印方式3的结果
		
		# 方式4：使用元组定义字段
		Person4 = namedtuple('Person', ('name', 'age', 'city'))
		# 创建Person具名元组类
		person4 = Person4('David', 28, 'Paris')
		# 创建Person实例
		print(f"方式4 - 元组定义: {person4}")
		# 打印方式4的结果
		
		# 打印功能验证标题
		for i, person in enumerate([person1, person2, person3, person4], 1):
		    # 遍历所有person对象
		    print(f"方式{i} - 姓名: {person.name}, 年龄: {person.age}, 城市: {person.city}")
	    # 打印每个person的属性
	```

---

**延伸**：课程（RAG/向量）中用到的标准库另有单篇详解，见 [Python 首页](/python/) 的「标准库」：math、typing、collections、random、heapq；第三方库见「第三方库（课程内）」：jieba、BeautifulSoup4。
