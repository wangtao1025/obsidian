import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Python 文档',
  description: 'Python 全栈开发：核心语法查漏补缺手册与自测',

  // 首页显示语法手册（不新增 index.md）
  rewrites: {
    'python语法手册.md': 'index.md',
  },
  srcExclude: ['_sidebar.md', '_navbar.md', 'index.html', 'README.md'],
  ignoreDeadLinks: 'localhostLinks',

  themeConfig: {
    nav: [
      { text: '语法手册', link: '/' },
      { text: '自测试卷', link: '/Python核心语法自测试卷' },
      { text: '面试题', link: '/python 面试题' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: 'Python 语法手册', link: '/' },
          { text: '核心语法自测试卷', link: '/Python核心语法自测试卷' },
          { text: 'Python 面试题', link: '/python 面试题' },
        ],
      },
    ],
    outline: { level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
  },
})
