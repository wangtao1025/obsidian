import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  lang: 'zh-CN',
  title: '个人文档',
  description: 'Python、前端、AI、Linux、Docker 等分类笔记与文档',

  // 笔记内容独立目录，与 VitePress 工程分离
  srcDir: 'docs',

  // 首页显示学习路径总览；语法手册见 /python/python语法手册
  rewrites: {
    '学习路径总览.md': 'index.md',
  },
  // 排除非文档文件（路径相对于 srcDir 即 docs/）
  srcExclude: ['README.md'],
  ignoreDeadLinks: 'localhostLinks',
  appearance: 'dark',
  
  // 注入 Mermaid CSS
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.css' }],
  ],

  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(katex, { throwOnError: false, errorColor: '#cc0000' })
      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const lang = (token.info || '').trim().split(/\s/)[0]
        if (lang === 'mermaid') {
          const code = (token.content || '').trim()
          return '<div class="mermaid-zoom-wrapper"><pre class="mermaid">' + code + '</pre></div>\n'
        }
        return defaultFence(tokens, idx, options, env, self)
      }
    },
  },

  themeConfig: {
    // 顶栏：按分类入口，不重复列单篇文档
    nav: [
      { text: '学习路径', link: '/' },
      { text: 'Python', link: '/python/' },
      { text: '前端', link: '/frontend/' },
      { text: 'AI', link: '/ai/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'Docker', link: '/docker/' },
    ],
    // 侧栏：按路径显示当前分类下的文档，避免与顶栏重复
    sidebar: {
      // 首页（/）与 /学习路径总览 均显示学习路径侧栏
      '/': [
        {
          text: '全站学习路径',
          items: [
            { text: '学习路径总览', link: '/' },
            { text: 'Python 分类', link: '/python/' },
            { text: '前端 分类', link: '/frontend/' },
            { text: 'AI 分类', link: '/ai/' },
            { text: 'Linux 分类', link: '/linux/' },
            { text: 'Docker 分类', link: '/docker/' },
          ],
        },
      ],
      '/学习路径总览': [
        {
          text: '全站学习路径',
          items: [
            { text: '学习路径总览', link: '/' },
            { text: 'Python 分类', link: '/python/' },
            { text: '前端 分类', link: '/frontend/' },
            { text: 'AI 分类', link: '/ai/' },
            { text: 'Linux 分类', link: '/linux/' },
            { text: 'Docker 分类', link: '/docker/' },
          ],
        },
      ],
      // Python 分类（/python/ 与 /python 均配置）
      '/python/': [
        {
          text: '入口',
          items: [
            { text: 'Python 首页', link: '/python/' },
            { text: '语法手册总览', link: '/python/python语法手册' },
          ],
        },
        {
          text: '语法手册（按章）',
          items: [
            { text: '第1章 变量与解包', link: '/python/python语法手册-01-变量与解包' },
            { text: '第2章 内置数据结构', link: '/python/python语法手册-02-内置数据结构' },
            { text: '第3章 异常', link: '/python/python语法手册-03-异常' },
            { text: '第4章 格式化与输出', link: '/python/python语法手册-04-格式化与输出' },
            { text: '第5章 内置函数', link: '/python/python语法手册-05-内置函数' },
            { text: '第6章 逻辑与真值', link: '/python/python语法手册-06-逻辑与真值' },
            { text: '第7章 身份与成员', link: '/python/python语法手册-07-身份与成员' },
            { text: '第8章 数据处理', link: '/python/python语法手册-08-数据处理' },
            { text: '第9章 字符编码', link: '/python/python语法手册-09-字符编码' },
            { text: '第10章 循环', link: '/python/python语法手册-10-循环' },
            { text: '第11章 标准库', link: '/python/python语法手册-11-标准库' },
            { text: '语法手册完整版', link: '/python/python语法手册-完整版备份' },
          ],
        },
        {
          text: '标准库',
          items: [
            { text: '语法手册 · 第11章 标准库', link: '/python/python语法手册-11-标准库' },
            { text: 'math 数学库', link: '/python/AI课程-math数学库' },
            { text: 'typing 类型提示', link: '/python/AI课程-typing类型提示' },
            { text: 'collections', link: '/python/AI课程-collections' },
            { text: 'random', link: '/python/AI课程-random' },
            { text: 'abc 抽象基类', link: '/python/AI课程-abc' },
            { text: 'dataclasses', link: '/python/AI课程-dataclasses' },
            { text: 'heapq 使用指南', link: '/python/heapq使用指南' },
          ],
        },
        {
          text: '第三方库（课程内）',
          items: [
            { text: 'jieba', link: '/python/AI课程-jieba' },
            { text: 'BeautifulSoup4', link: '/python/AI课程-beautifulsoup4' },
            { text: 'lxml', link: '/python/AI课程-lxml' },
            { text: 'OpenPyXL', link: '/python/AI课程-openpyxl' },
            { text: 'PyMuPDF', link: '/python/AI课程-PyMuPDF' },
            { text: 'Pydantic', link: '/python/AI课程-Pydantic' },
            { text: 'python-docx', link: '/python/AI课程-python-docx' },
            { text: 'python-pptx', link: '/python/AI课程-python-pptx' },
            { text: 'Requests', link: '/python/AI课程-requests' },
            { text: 'text_splitter', link: '/python/AI课程-text_splitter' },
            { text: 'Sentence Transformers', link: '/python/AI课程-sentence_transformers' },
            { text: 'OpenAI', link: '/python/AI课程-openai' },
            { text: 'Flask', link: '/python/AI课程-Flask' },
            { text: 'NumPy', link: '/python/AI课程-numpy' },
            { text: 'Scikit-learn', link: '/python/AI课程-scikit-learn' },
            { text: 'LaTeX', link: '/python/AI课程-LaTeX' },
          ],
        },
        {
          text: '自测与面试',
          items: [
            { text: '核心语法自测试卷', link: '/python/Python核心语法自测试卷' },
            { text: '核心语法 · 错题本', link: '/python/Python核心语法-错题本' },
            { text: 'Python 面试题', link: '/python/python 面试题' },
          ],
        },
      ],
      '/python': [
        {
          text: '入口',
          items: [
            { text: 'Python 首页', link: '/python/' },
            { text: '语法手册总览', link: '/python/python语法手册' },
          ],
        },
        {
          text: '语法手册（按章）',
          items: [
            { text: '第1章 变量与解包', link: '/python/python语法手册-01-变量与解包' },
            { text: '第2章 内置数据结构', link: '/python/python语法手册-02-内置数据结构' },
            { text: '第3章 异常', link: '/python/python语法手册-03-异常' },
            { text: '第4章 格式化与输出', link: '/python/python语法手册-04-格式化与输出' },
            { text: '第5章 内置函数', link: '/python/python语法手册-05-内置函数' },
            { text: '第6章 逻辑与真值', link: '/python/python语法手册-06-逻辑与真值' },
            { text: '第7章 身份与成员', link: '/python/python语法手册-07-身份与成员' },
            { text: '第8章 数据处理', link: '/python/python语法手册-08-数据处理' },
            { text: '第9章 字符编码', link: '/python/python语法手册-09-字符编码' },
            { text: '第10章 循环', link: '/python/python语法手册-10-循环' },
            { text: '第11章 标准库', link: '/python/python语法手册-11-标准库' },
            { text: '语法手册完整版', link: '/python/python语法手册-完整版备份' },
          ],
        },
        {
          text: '标准库',
          items: [
            { text: '语法手册 · 第11章 标准库', link: '/python/python语法手册-11-标准库' },
            { text: 'math 数学库', link: '/python/AI课程-math数学库' },
            { text: 'typing 类型提示', link: '/python/AI课程-typing类型提示' },
            { text: 'collections', link: '/python/AI课程-collections' },
            { text: 'random', link: '/python/AI课程-random' },
            { text: 'abc 抽象基类', link: '/python/AI课程-abc' },
            { text: 'dataclasses', link: '/python/AI课程-dataclasses' },
            { text: 'heapq 使用指南', link: '/python/heapq使用指南' },
          ],
        },
        {
          text: '第三方库（课程内）',
          items: [
            { text: 'jieba', link: '/python/AI课程-jieba' },
            { text: 'BeautifulSoup4', link: '/python/AI课程-beautifulsoup4' },
            { text: 'lxml', link: '/python/AI课程-lxml' },
            { text: 'OpenPyXL', link: '/python/AI课程-openpyxl' },
            { text: 'PyMuPDF', link: '/python/AI课程-PyMuPDF' },
            { text: 'Pydantic', link: '/python/AI课程-Pydantic' },
            { text: 'python-docx', link: '/python/AI课程-python-docx' },
            { text: 'python-pptx', link: '/python/AI课程-python-pptx' },
            { text: 'Requests', link: '/python/AI课程-requests' },
            { text: 'text_splitter', link: '/python/AI课程-text_splitter' },
            { text: 'Sentence Transformers', link: '/python/AI课程-sentence_transformers' },
            { text: 'OpenAI', link: '/python/AI课程-openai' },
            { text: 'Flask', link: '/python/AI课程-Flask' },
            { text: 'NumPy', link: '/python/AI课程-numpy' },
            { text: 'Scikit-learn', link: '/python/AI课程-scikit-learn' },
            { text: 'LaTeX', link: '/python/AI课程-LaTeX' },
          ],
        },
        {
          text: '自测与面试',
          items: [
            { text: '核心语法自测试卷', link: '/python/Python核心语法自测试卷' },
            { text: 'Python 面试题', link: '/python/python 面试题' },
          ],
        },
      ],
      '/ai/': [
        {
          text: '入口',
          items: [
            { text: 'AI 首页', link: '/ai/' },
            { text: '知识体系与学习路径', link: '/ai/知识体系与学习路径' },
          ],
        },
        {
          text: '主线课程',
          items: [
            { text: 'RAG 与向量基础', link: '/ai/AI课程-RAG与向量基础' },
            { text: 'Milvus 与 PyMilvus', link: '/ai/AI课程-Milvus向量数据库与PyMilvus' },
            { text: 'RAG 检索增强生成', link: '/ai/AI课程-RAG检索增强生成' },
            { text: 'RAG 评估与 RAGAs', link: '/ai/AI课程-RAG评估与RAGAs' },
            { text: 'RAGAS', link: '/ai/AI课程-RAGAS' },
            { text: 'RAGFlow', link: '/ai/AI课程-RAGFlow' },
            { text: 'LangChain（LCEL 与链）', link: '/ai/AI课程-LangChain' },
            { text: 'Runnable（LCEL 核心）', link: '/ai/AI课程-Runnable' },
          ],
        },
        {
          text: '向量与检索',
          items: [
            { text: '余弦相似度', link: '/ai/AI课程-余弦相似度' },
            { text: 'HNSW', link: '/ai/AI课程-HNSW' },
            { text: 'ChromaDB', link: '/ai/AI课程-chromadb' },
            { text: 'FAISS', link: '/ai/AI课程-faiss' },
            { text: 'all-MiniLM-L6-v2', link: '/ai/AI课程-all-MiniLM-L6-v2' },
          ],
        },
        {
          text: '检索与排序',
          items: [
            { text: '词袋模型（BagofWords）', link: '/ai/AI课程-BagofWords' },
            { text: 'TF-IDF', link: '/ai/AI课程-TF-IDF' },
            { text: 'BM25（rank_bm25）', link: '/ai/AI课程-rank_bm25' },
            { text: 'MMR（最大边际相关性）', link: '/ai/AI课程-MMR' },
          ],
        },
        {
          text: '工具与存储',
          items: [
            { text: 'etcd', link: '/ai/AI课程-etcd' },
            { text: 'MinIO', link: '/ai/AI课程-minio' },
          ],
        },
        {
          text: '附录',
          items: [
            { text: '大语言模型（llm）', link: '/ai/AI课程-llm' },
            { text: 'BPETokenizer', link: '/ai/AI课程-BPETokenizer' },
            { text: '提示词工程（Prompt Engineering）', link: '/ai/AI课程-PromptEngineering' },
            { text: '模型与 API 速查', link: '/ai/AI课程-模型与API速查' },
          ],
        },
      ],
      '/frontend/': [
        {
          text: '前端',
          items: [
            { text: '首页', link: '/frontend/' },
            { text: '占位目录（JS / TS / Vue / React / Next / Vite）', link: '/frontend/#占位目录' },
          ],
        },
      ],
      '/linux/': [
        {
          text: 'Linux',
          items: [
            { text: '首页', link: '/linux/' },
            { text: 'Linux 入门与常用命令手册', link: '/linux/Linux入门与常用命令手册' },
          ],
        },
      ],
      '/docker/': [
        {
          text: 'Docker',
          items: [
            { text: '首页', link: '/docker/' },
            { text: 'Docker 入门与常用命令手册', link: '/docker/Docker入门与常用命令手册' },
            { text: 'Kubernetes 入门', link: '/docker/Kubernetes入门' },
          ],
        },
      ],
    },
    outline: { level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: '个人文档 · 按分类整理',
      copyright: '内容仅供学习参考',
    },
    // 编辑链接（如果托管在 GitHub，取消注释并填入你的仓库）
    // editLink: {
    //   pattern: 'https://github.com/你的用户名/你的仓库/edit/main/:path',
    //   text: '在 GitHub 上编辑此页',
    // },
    // 社交链接（可选）
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/你的用户名' },
    // ],
    // 本地搜索（基于 minisearch，无需后端）
    search: {
      provider: 'local',
      options: {
        locales: {
          zh_CN: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询',
                footer: { closeText: '关闭', navigateText: '切换', selectText: '选择' },
              },
            },
          },
        },
      },
    },
  },
})
