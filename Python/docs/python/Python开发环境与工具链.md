# Python 开发环境与工具链

← [Python 首页](/python/) | [语法手册总览](/python/python语法手册)

---

**适合什么时候看**：刚开始学 Python，或者已经会写代码，但对 `pip`、`python -m pip`、`uv`、VSCode、虚拟环境还比较混乱时。  
**学完能做什么**：能把 Python 开发环境搭起来，知道怎么装包、隔离依赖、选解释器、遵守基础编码规范，并理解 `pip`、`python -m pip`、`uv` 的使用边界。

---

## 一、先建立整体认识：写 Python 不只是会语法

很多初学者一开始只盯着语法，比如变量、循环、函数。

但一旦你真正开始写项目，很快就会遇到这些问题：
- 解释器装在哪里
- VSCode 为什么选不到正确环境
- `pip install` 装的包到底进了哪个 Python
- 为什么同一台机器上有的命令能跑、有的不能跑
- 为什么别人项目里有 `requirements.txt`、`pyproject.toml`、`.venv`

**一句话先懂**：工具链就是“你怎么运行 Python、怎么管理依赖、怎么写得规范、怎么让项目可重复运行”的整套方法。

---

## 二、Python、解释器、包管理器，到底分别是什么

### 2.1 Python 解释器

你平时说“我安装了 Python”，本质上通常是：
- 安装了 `python` / `python3` 这个解释器
- 安装了标准库
- 顺带带上了一些基础工具

解释器负责：
- 运行 `.py` 文件
- 进入交互式解释器
- 执行 `python -m 某模块`

常见查看方式：

```bash
python --version
python3 --version
which python
which python3
```

### 2.2 `pip`

`pip` 是 Python 生态里最常见的包安装工具，用来：
- 安装第三方库
- 卸载第三方库
- 查看已安装包
- 导出依赖清单

例如：

```bash
pip install requests
pip uninstall requests
pip list
pip freeze
```

### 2.3 为什么经常推荐 `python -m pip`

**一句话先懂**：它的重点不是“语法更高级”，而是**更明确地告诉系统：我要用当前这个 Python 去运行它自己的 pip**。

```bash
python -m pip install requests
```

这样做的好处是：
- 避免系统里多个 Python / 多个 `pip` 搞混
- 更容易确认“装包”和“运行代码”用的是同一个解释器
- 在虚拟环境里更稳定

---

## 三、VSCode 开发 Python 的最小必备配置

### 3.1 装哪些扩展

最常用的是：
- Python
- Pylance

如果你要做格式化 / 检查，还常配：
- Ruff
- Black Formatter

### 3.2 VSCode 里最重要的一步：选对解释器

很多“明明装了包但就是导不进来”的问题，根源不是语法，而是 **VSCode 当前项目用错了 Python 解释器**。

通常要做的是：
1. 打开命令面板
2. 选择 `Python: Select Interpreter`
3. 选当前项目的虚拟环境解释器

如果你项目里有 `.venv`，通常应该选它里面的 Python。

### 3.3 建议打开的几个习惯

- 打开集成终端，在项目根目录执行命令
- 让编辑器使用和终端同一个虚拟环境
- 保存时自动格式化
- 开启基本 lint 检查

这样你看到的问题会更接近真实运行环境。

---

## 四、虚拟环境：为什么项目最好不要直接装到全局

### 4.1 虚拟环境是干什么的

**一句话先懂**：给每个项目准备一套独立的 Python 和依赖，不要让所有项目共用一锅环境。

比如：
- A 项目要 `Django 4`
- B 项目要 `Django 5`

如果都装到全局，很容易互相冲突。

### 4.2 用 `venv` 创建虚拟环境

```bash
python -m venv .venv
```

激活后再装包：

```bash
source .venv/bin/activate
python -m pip install requests
```

退出虚拟环境：

```bash
deactivate
```

### 4.3 初学者要记住的直觉

- `.venv` 不是“项目源码”，而是“项目环境”
- 你进没进虚拟环境，会影响 `python`、`pip` 指向谁
- 最稳的写法仍然是：`python -m pip ...`

---

## 五、`pip` 的高频命令和正确心智模型

### 5.1 安装、升级、卸载

```bash
python -m pip install requests
python -m pip install -U requests
python -m pip uninstall requests
```

### 5.2 查看包信息

```bash
python -m pip list
python -m pip show requests
python -m pip freeze
```

### 5.3 `requirements.txt` 是什么

它通常是“这个项目依赖了哪些包”的清单：

```bash
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

不过现在越来越多新项目也会使用 `pyproject.toml` 来做依赖管理。

### 5.4 `pip` 和 `python -m pip` 的区别到底怎么答

面试或开发里可以这样回答：
- `pip` 是安装包的命令
- `python -m pip` 是让当前解释器去运行 `pip` 模块
- 当系统存在多个 Python 时，`python -m pip` 更不容易装错环境

---

## 六、`uv` 是什么，和传统工作流有什么不同

### 6.1 一句话先懂

`uv` 是一个更现代、更快的 Python 工具链工具，常见用途包括：
- 管理虚拟环境
- 管理依赖
- 运行命令
- 初始化项目

### 6.2 为什么很多新项目开始用它

因为它通常更强调：
- 速度快
- 工作流统一
- 对现代项目结构更友好

### 6.3 常见 `uv` 工作流

```bash
uv init my-project
cd my-project
uv venv
uv add requests
uv add --dev pytest ruff black
uv run python main.py
uv run pytest
```

### 6.4 `uv`、`pip`、`venv` 的关系

可以这样理解：
- `pip`：更传统的“装包工具”
- `venv`：更传统的“建虚拟环境工具”
- `uv`：试图把环境、依赖、运行流程整合起来

### 6.5 初学者怎么选

- 如果你在学基础课程，先掌握 `venv + python -m pip`
- 如果你开始做新项目，`uv` 值得尽早接触
- 面试时最好两套都能说清楚

---

## 七、编码规范：为什么 Python 特别强调“看起来像 Python”

### 7.1 PEP 8 是什么

PEP 8 是 Python 的官方风格指南。

它不只是“格式好看”，更重要的是：
- 让团队代码风格统一
- 降低阅读成本
- 减少一些低级错误

### 7.2 最应该先记住的几条

- 变量名、函数名一般用 `snake_case`
- 类名一般用 `PascalCase`
- 常量常用全大写，如 `MAX_RETRY`
- 缩进用 4 个空格
- 不要一行塞太多逻辑
- import 通常放文件顶部
- 空格、空行要有一致性

### 7.3 比“死记规则”更重要的事

真正的目标不是背规范，而是形成这三个意识：
- 代码要让别人一眼能读懂
- 命名要表达意图
- 同一个项目里风格要稳定

### 7.4 常见工具

- `ruff`：检查风格、潜在错误，很多项目也拿它做部分格式化
- `black`：强调统一格式

如果你不是在练“手动排版”，就尽量交给工具自动完成。

---

## 八、一个最小可用 Python 项目长什么样

```text
my_project/
├─ .venv/
├─ app/
│  ├─ __init__.py
│  └─ main.py
├─ tests/
├─ requirements.txt 或 pyproject.toml
└─ README.md
```

### 8.1 为什么很多项目根目录会有这些文件

- `app/`：源码
- `tests/`：测试
- `.venv/`：虚拟环境
- `requirements.txt` / `pyproject.toml`：依赖说明
- `README.md`：项目用途、运行方式

### 8.2 初学者常见误区

- 把 `.venv` 当源码目录改来改去
- 直接在系统 Python 上胡乱装包
- VSCode 解释器没切对
- 运行用一个解释器，装包用另一个解释器

---

## 九、开发里最常见的三个环境问题

### 9.1 `ModuleNotFoundError`

优先排查：
- 包有没有装成功
- 装到哪个 Python 里了
- VSCode 当前解释器是不是项目环境

### 9.2 命令能跑，但编辑器报红

通常是：
- 终端环境对了
- 编辑器解释器错了

### 9.3 明明 `pip install` 了，运行时还是找不到

大概率就是：
- 当前 `pip` 和当前 `python` 不是同一个环境

此时优先试：

```bash
python -m pip install 包名
python -c "import 包名; print(包名.__file__)"
```

---

## 十、本章高频问法速记

- **VSCode 开发 Python 最重要的点是什么**：选对解释器。
- **为什么推荐 `python -m pip`**：更明确地使用当前解释器对应的 `pip`。
- **虚拟环境的作用是什么**：隔离项目依赖，避免不同项目互相污染。
- **`pip` 和 `uv` 怎么区分**：一个是传统装包工具，一个是更现代的一体化工具链。
- **PEP 8 是什么**：Python 官方风格指南，核心目的是统一和可读。

---

**本章小结**：学 Python 的工具链，不是为了“记更多命令”，而是为了建立稳定开发环境。你需要分清：谁是解释器，谁负责装包，谁负责隔离环境，谁负责项目运行。把 `VSCode 解释器`、`虚拟环境`、`python -m pip`、`uv` 这几件事理顺之后，后面很多“环境玄学问题”都会自动消失。
