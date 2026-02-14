# 笔记目录

本文件夹仅存放**笔记内容**（Markdown），按**分类**分子目录，与 VitePress 工程分离。

## 目录结构

```
docs/
├── python/     # Python 相关（语法手册、自测、面试题等）
├── ai/         # AI 相关
├── linux/      # Linux 相关
├── docker/     # Docker 相关
└── …           # 后续可新增分类，如 frontend/、database/ 等
```

- **顶栏**：按分类切换（Python / AI / Linux），不列单篇文档，避免与侧栏重复。
- **侧栏**：进入某分类后，只显示该分类下的文档列表。

## 新增笔记

1. 在对应分类下新建 `.md` 文件，例如 `ai/大模型入门.md`。
2. 在项目根目录的 `.vitepress/config.mts` 中：
   - 若新分类：在 `themeConfig.nav` 加一项，并在 `themeConfig.sidebar` 加对应路径的侧栏配置；
   - 若已有分类：在 `themeConfig.sidebar` 里该分类的 `items` 中加一条 `{ text: '标题', link: '/ai/大模型入门' }`。

## 首页与结构

- **站点根 `/`**：由 `rewrites` 映射为「语法手册总览」页（`python/python语法手册.md`）。
- **Python 分类**：顶栏「Python」指向 `/python/`；侧栏分组为「入口」「语法手册（按章）」「标准库」「第三方库（课程内）」「自测与面试」。
- **AI 分类**：侧栏分组为「入口」「主线课程」「向量与检索」「工具与存储」「附录」。
- **学习路径**：全站见 [学习路径总览](/学习路径总览)；各分类内跳转与名称已与侧栏、首页统一（如语法手册总览、语法手册完整版、math 数学库、heapq 使用指南等）。
