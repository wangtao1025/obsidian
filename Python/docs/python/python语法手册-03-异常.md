# 异常捕获与主动抛出

← [语法手册总览](/python/python语法手册) | [上一章 内置数据结构](/python/python语法手册-02-内置数据结构) | [下一章 格式化与输出](/python/python语法手册-04-格式化与输出)

---

**本章对应自测卷**：[异常捕获与主动抛出（共 14 题）](/python/Python核心语法自测试卷#四异常捕获与主动抛出-共-8-题)
**学完能做什么**：理解 `try` / `except` / `else` / `finally` 的职责分工，知道什么时候被动捕获、什么时候主动 `raise`，并能分清 `ValueError`、`TypeError`、`KeyError`、编码异常等常见错误。  
**小白注意**：① 不要随手写裸 `except:`。② `else` 是“没异常才执行”，`finally` 是“无论怎样都执行”。③ 判断业务规则不满足时，常常应该主动 `raise`。④ 转抛时 `raise` 和 `raise e` 的效果不一样。

---

## 一、先建立直觉：异常不是“程序坏了”，而是“程序遇到了异常情况”

**一句话先懂**：异常是 Python 在告诉你——当前这一步做不下去了，需要你决定是处理它，还是继续往上抛。

比如：

```python
int('abc')
```

这一步会失败，因为 `'abc'` 不能转成整数，于是 Python 抛出 `ValueError`。

---

## 二、两种核心思路：被动捕获 和 主动抛出

### 2.1 被动捕获：`try-except`

**一句话先懂**：你预判某一步可能出错，于是提前把它包起来，避免程序直接崩掉。

```python
try:
  age = int('abc')
except ValueError:
  print('年龄格式不对')
```

适合场景：
- 用户输入不可靠
- 文件内容可能脏
- 接口返回值可能不稳定
- 类型转换、字典取值、下标访问这类操作可能失败

### 2.2 主动抛出：`raise`

**一句话先懂**：不是等 Python 自己报错，而是你觉得当前数据不符合业务规则，于是主动中断。

```python
def set_age(age):
  if age < 0:
    raise ValueError('年龄不能为负数')
  return age
```

适合场景：
- 参数范围不合法
- 业务规则不满足
- 你想把错误明确交给调用者处理

### 2.3 `try-except` 和 `raise` 的分工

- `try-except`：偏“接住错误”
- `raise`：偏“制造并抛出错误”

一个常见搭配是：
- 底层函数负责 `raise`
- 上层调用代码负责 `try-except`

---

## 三、最常见的异常类型先分清

### 3.1 `ValueError`

**一句话先懂**：类型看起来对，但值本身不合法。

```python
int('abc')  # ValueError
```

### 3.2 `TypeError`

**一句话先懂**：类型就不适合当前操作。

```python
1 + '2'  # TypeError
```

### 3.3 `KeyError`

**一句话先懂**：字典里没有这个键。

```python
d = {'name': 'Tom'}
print(d['age'])  # KeyError
```

### 3.4 `IndexError`

**一句话先懂**：索引越界了。

```python
nums = [1, 2, 3]
print(nums[10])  # IndexError
```

### 3.5 编码相关异常

```python
# '中'.encode('ascii')  # UnicodeEncodeError
# b'\xff'.decode('utf-8')  # UnicodeDecodeError
```

- `UnicodeEncodeError`：字符串转字节失败
- `UnicodeDecodeError`：字节转字符串失败
- `LookupError`：编码名称本身写错了，比如用了不存在的编码名

### 3.6 三个最容易混淆的：`KeyError` / `ValueError` / `TypeError`

```python
d = {'name': 'Tom'}

# KeyError
# print(d['age'])

# ValueError
# int('abc')

# TypeError
# 1 + '2'
```

快速记忆：
- **KeyError**：键不对
- **ValueError**：值不对
- **TypeError**：类型不对

---

## 四、`try-except-else-finally` 四块分别干什么

### 4.1 基本结构

```python
try:
  可能出错的代码
except 某种异常:
  出错后的处理
else:
  没出错时执行
finally:
  不管出没出错都执行
```

### 4.2 `else`：只有没异常才执行

```python
try:
  num = int('123')
except ValueError:
  print('转换失败')
else:
  print('转换成功:', num)
```

### 4.3 `finally`：无论如何都执行

```python
try:
  f = open('demo.txt', 'r', encoding='utf-8')
except FileNotFoundError:
  print('文件不存在')
else:
  print(f.read())
finally:
  print('收尾动作一定会执行')
```

**典型用途**：
- 关闭文件
- 关闭数据库连接
- 释放锁
- 结束计时、打日志

### 4.4 一个完整示例

```python
try:
  text = '100'
  num = int(text)
except ValueError as error:
  print('转换失败:', error)
else:
  print('转换成功:', num)
finally:
  print('流程结束')
```

---

## 五、`except` 的几种常见写法

### 5.1 捕获单个异常

```python
try:
  age = int('abc')
except ValueError:
  print('不是合法整数')
```

### 5.2 捕获多个异常

```python
try:
  value = int(None)
except (ValueError, TypeError):
  print('输入不合法')
```

**一句话先懂**：这表示“只要是这几种异常中的任意一种，都按这里处理”。

### 5.3 把异常对象绑定给变量

```python
try:
  int('abc')
except ValueError as error:
  print('错误信息是:', error)
```

`except Exception as e` 里的 `e`：
- 是异常对象本身
- 常用来打印报错信息
- 也常拿去记录日志

### 5.4 为什么更具体的异常要写前面

```python
try:
  int('abc')
except ValueError:
  print('值错误')
except Exception:
  print('其他错误')
```

如果把 `Exception` 写在前面，它会把很多更具体的异常都先吃掉，后面的分支就没有机会执行了。

### 5.5 为什么不推荐裸 `except:`

```python
try:
  do_something()
except:
  print('出错了')
```

不推荐原因：
- 它太宽了，什么都接
- 容易把不该吞掉的错误也吞掉
- 调试时不容易定位问题

更好的做法通常是：
- 捕获具体异常类型
- 或者至少写 `except Exception as e:` 再记录信息

---

## 六、`raise` 的细节：主动抛出、转抛与自定义异常

### 6.1 最常见写法：主动抛出一个异常

```python
def divide(a, b):
  if b == 0:
    raise ValueError('除数不能为 0')
  return a / b
```

### 6.2 `raise` 和 `raise e` 的区别

假设你已经在 `except` 里接住了一个异常：

```python
try:
  int('abc')
except ValueError as e:
  raise
```

这里的 `raise` 表示：
- 原样重新抛出当前异常
- 更能保留原始报错链路和栈信息

而：

```python
try:
  int('abc')
except ValueError as e:
  raise e
```

这表示：
- 把 `e` 当作一个新的异常对象再抛一次
- 栈信息展示效果可能和直接 `raise` 不一样

**开发建议**：如果你只是想继续往上抛，通常优先用裸 `raise`。

### 6.3 自定义异常为什么一般继承 `Exception`

因为这样它就能自然地融入 Python 的异常体系里，被正常捕获和识别。

```python
class AgeError(Exception):
  pass
```

然后你就可以这样用：

```python
def set_age(age):
  if age < 0:
    raise AgeError('年龄不能为负数')
```

---

## 七、面向自测题的常见模板

### 7.1 捕获 `ValueError` 和 `TypeError`

```python
try:
  value = int(user_input)
except ValueError:
  print('值格式不对')
except TypeError:
  print('类型不对')
```

### 7.2 `except (ValueError, TypeError)` 合并写法

```python
try:
  value = int(user_input)
except (ValueError, TypeError):
  print('输入不合法')
```

### 7.3 一个完整的 `try-except-else-finally`

```python
try:
  result = int(text)
except ValueError as error:
  print('转换失败:', error)
else:
  print('成功结果:', result)
finally:
  print('收尾清理')
```

---

## 八、本章高频问法速记

- **`try-except` 和 `raise` 的区别**：前者负责捕获处理，后者负责主动抛出。
- **`ValueError` / `TypeError` / `KeyError` 的区别**：值不对、类型不对、键不存在。
- **`UnicodeEncodeError` 和 `UnicodeDecodeError` 分别出现在什么时候**：编码到字节失败、从字节解码失败。
- **`else` 在什么时候执行**：`try` 里没有异常时执行。
- **`finally` 会不会一定执行**：通常会，无论有没有异常都执行。
- **`except Exception as e` 里的 `e` 是什么**：异常对象本身，可拿来打印和记录日志。
- **为什么更具体的异常要写前面**：否则会被更宽泛的异常先匹配掉。
- **为什么不推荐裸 `except:`**：太宽泛，容易掩盖真正问题。
- **`raise` 和 `raise e` 的区别**：前者更适合保留原始异常链路，后者是把异常对象再抛一次。
- **自定义异常为什么一般继承 `Exception`**：这样能融入 Python 标准异常体系。

---

**本章小结**：异常这一章最关键的是先分清“谁负责发现问题，谁负责处理问题”：程序运行时遇到异常情况会抛错，你可以用 `try-except` 接住；当你自己发现业务规则不成立时，也可以用 `raise` 主动抛出。再把异常类型、`else/finally`、多个 `except`、转抛和自定义异常这些高频点连起来，日常开发里大多数异常场景就都能看懂、写对、查清。 
