import DefaultTheme from 'vitepress/theme'
import './custom.css'
// KaTeX 数学公式样式
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    const routerRef = router
    // 客户端增强功能
    if (typeof window !== 'undefined') {
      // 初始化 Mermaid（图表渲染）
      import('mermaid').then((mermaidModule) => {
        mermaidModule.default.initialize({ 
          startOnLoad: false, // 手动控制渲染时机
          theme: 'dark',
          themeVariables: {
            background: '#000000',
            primaryColor: '#646cff',
            primaryTextColor: '#ededed',
            primaryBorderColor: '#646cff',
            lineColor: '#a1a1a1',
            secondaryColor: '#0a0a0a',
            tertiaryColor: '#111111',
          },
        })
        
        // 查找所有 mermaid 代码块并渲染
        function renderMermaid() {
          const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid, pre code.lang-mermaid')
          mermaidBlocks.forEach((block) => {
            const parent = block.closest('pre')
            if (parent && !parent.classList.contains('mermaid-rendered')) {
              parent.classList.add('mermaid-rendered')
              const mermaidDiv = document.createElement('div')
              mermaidDiv.className = 'mermaid'
              mermaidDiv.textContent = block.textContent
              parent.replaceWith(mermaidDiv)
            }
          })
          mermaidModule.default.run()
        }
        
        // 初始渲染
        renderMermaid()
        
        // 路由切换后重新渲染（监听路由变化）
        const originalGo = routerRef.go
        routerRef.go = function(...args) {
          originalGo.apply(this, args)
          setTimeout(renderMermaid, 200)
        }
        
        // 监听页面内容更新
        const observer = new MutationObserver(() => {
          renderMermaid()
        })
        observer.observe(document.body, { childList: true, subtree: true })
      })
      
      // 等待 DOM 加载完成
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancements)
      } else {
        initEnhancements()
      }
    }
  }
}

function initEnhancements() {
  createReadingProgress()
  createBackToTop()
  enableImageZoom()
  enableSmoothScroll()
  enableOutlineHighlight()
  enableCodeBlockCollapse()
  enableKeyboardShortcuts()
  addCodeLanguageLabels()
  enableFullscreenReading()
  enableCopyToast()
  addReadingTime()
}

// 阅读进度条
function createReadingProgress() {
  try {
    const progressBar = document.createElement('div')
    progressBar.id = 'reading-progress'
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: var(--vp-c-brand-1);
      z-index: 9999;
      transition: width 0.1s ease;
      width: 0;
    `
    document.body.appendChild(progressBar)

    let progressTimer = null
    function updateProgress() {
      try {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0
        if (progressBar) {
          progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%'
        }
      } catch (e) {
        console.warn('更新阅读进度失败:', e)
      }
    }

    // 使用 requestAnimationFrame 优化性能
    function rafUpdateProgress() {
      if (progressTimer) return
      progressTimer = requestAnimationFrame(() => {
        updateProgress()
        progressTimer = null
      })
    }

    window.addEventListener('scroll', rafUpdateProgress, { passive: true })
    updateProgress()
  } catch (e) {
    console.warn('创建阅读进度条失败:', e)
  }
}

// 返回顶部按钮
function createBackToTop() {
  const btn = document.createElement('button')
  btn.id = 'back-to-top'
  btn.innerHTML = '↑'
  btn.setAttribute('aria-label', '返回顶部')
  btn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--vp-c-bg-elv);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    font-size: 20px;
    cursor: pointer;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--vp-shadow-2);
  `
  btn.onmouseenter = () => {
    btn.style.background = 'var(--vp-c-default-soft)'
    btn.style.color = 'var(--vp-c-text-1)'
  }
  btn.onmouseleave = () => {
    btn.style.background = 'var(--vp-c-bg-elv)'
    btn.style.color = 'var(--vp-c-text-2)'
  }
  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  document.body.appendChild(btn)

  function toggleButton() {
    if (window.scrollY > 300) {
      btn.style.opacity = '1'
      btn.style.visibility = 'visible'
    } else {
      btn.style.opacity = '0'
      btn.style.visibility = 'hidden'
    }
  }

  window.addEventListener('scroll', toggleButton)
  toggleButton()
}

// 图片点击放大
function enableImageZoom() {
  document.addEventListener('click', (e) => {
    try {
      const img = e.target.closest('.content img')
      if (!img || img.closest('a')) return
      
      // 防止重复创建
      if (document.querySelector('.vp-image-overlay')) return

      const overlay = document.createElement('div')
      overlay.className = 'vp-image-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        opacity: 0;
        transition: opacity 0.2s;
      `
      
      const zoomedImg = document.createElement('img')
      zoomedImg.src = img.src
      zoomedImg.alt = img.alt || ''
      zoomedImg.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
      `
      
      // 图片加载错误处理
      zoomedImg.onerror = () => {
        overlay.remove()
        document.body.style.overflow = ''
      }
      
      overlay.appendChild(zoomedImg)
      document.body.appendChild(overlay)
      document.body.style.overflow = 'hidden'
      
      requestAnimationFrame(() => {
        overlay.style.opacity = '1'
      })

      function close() {
        overlay.style.opacity = '0'
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.remove()
          }
          document.body.style.overflow = ''
        }, 200)
      }

      overlay.onclick = close
      overlay.onkeydown = (e) => {
        if (e.key === 'Escape') close()
      }
      overlay.setAttribute('tabindex', '0')
      overlay.focus()
    } catch (e) {
      console.warn('图片放大功能失败:', e)
    }
  })
}

// 平滑滚动
function enableSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // 处理锚点链接的平滑滚动
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (link && link.hash) {
      e.preventDefault()
      const target = document.querySelector(link.hash)
      if (target) {
        const offset = 80 // 顶栏高度偏移
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      }
    }
  })
}

// 目录自动高亮（右侧大纲）
function enableOutlineHighlight() {
  const headings = []
  const outlineLinks = []
  let scrollTimer = null
  
  function updateOutline() {
    try {
      headings.length = 0
      outlineLinks.length = 0
      
      // 收集所有标题
      document.querySelectorAll('.content h2, .content h3').forEach((h) => {
        if (h && h.id) headings.push({ id: h.id, element: h })
      })
      
      // 收集右侧大纲链接
      document.querySelectorAll('#VPSidebar .outline-link').forEach((link) => {
        if (link) outlineLinks.push(link)
      })
    } catch (e) {
      console.warn('更新目录大纲失败:', e)
    }
  }
  
  function highlightActive() {
    try {
      if (headings.length === 0 || outlineLinks.length === 0) return
      
      const scrollTop = window.pageYOffset + 100
      let activeId = ''
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.element && heading.element.offsetTop <= scrollTop) {
          activeId = heading.id
          break
        }
      }
      
      outlineLinks.forEach((link) => {
        if (link) {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active')
          }
        }
      })
    } catch (e) {
      console.warn('高亮目录项失败:', e)
    }
  }
  
  // 防抖滚动事件
  function debouncedHighlight() {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(highlightActive, 50)
  }
  
  window.addEventListener('scroll', debouncedHighlight, { passive: true })
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      updateOutline()
      highlightActive()
    }, 100)
  })
  
  // 初始化和路由切换后更新
  setTimeout(() => {
    updateOutline()
    highlightActive()
  }, 500)
  
  // 监听路由变化（防抖）
  let mutationTimer = null
  const observer = new MutationObserver(() => {
    clearTimeout(mutationTimer)
    mutationTimer = setTimeout(() => {
      updateOutline()
      highlightActive()
    }, 200)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

// 代码块折叠（长代码）
function enableCodeBlockCollapse() {
  function processCodeBlocks() {
    document.querySelectorAll('pre:not(.processed-collapse)').forEach((pre) => {
      const code = pre.querySelector('code')
      if (!code) return
      
      pre.classList.add('processed-collapse')
      
      // 超过 30 行才显示折叠按钮
      const lines = code.textContent.split('\n').filter(l => l.trim())
      if (lines.length < 30) return
      
      const btn = document.createElement('button')
      btn.className = 'code-collapse-btn'
      btn.innerHTML = '展开代码'
      btn.setAttribute('aria-label', '展开/折叠代码')
      btn.onclick = () => {
        const isExpanded = pre.classList.contains('expanded')
        if (isExpanded) {
          pre.classList.remove('expanded')
          btn.innerHTML = '展开代码'
        } else {
          pre.classList.add('expanded')
          btn.innerHTML = '折叠代码'
        }
      }
      
      pre.style.position = 'relative'
      // 插入到代码块开头（左上角），避免与语言标签（右上角）冲突
      pre.insertBefore(btn, pre.firstChild)
      pre.classList.add('collapsible-code')
    })
  }
  
  // 初始执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processCodeBlocks)
  } else {
    processCodeBlocks()
  }
  
  // 监听动态添加的代码块
  const observer = new MutationObserver(() => {
    processCodeBlocks()
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

// 键盘快捷键
function enableKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 打开搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const searchBtn = document.querySelector('.VPNavBarSearch button, .VPLocalSearch button')
      if (searchBtn) searchBtn.click()
    }
    
    // Ctrl/Cmd + /: 显示快捷键帮助
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault()
      showKeyboardShortcuts()
    }
    
    // ESC: 关闭各种弹窗
    if (e.key === 'Escape') {
      const overlay = document.querySelector('#image-overlay')
      if (overlay) overlay.click()
    }
  })
}

function showKeyboardShortcuts() {
  const modal = document.createElement('div')
  modal.className = 'shortcuts-modal'
  modal.innerHTML = `
    <div class="shortcuts-content">
      <h3>键盘快捷键</h3>
      <ul>
        <li><kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> - 搜索文档</li>
        <li><kbd>Ctrl</kbd> + <kbd>/</kbd> / <kbd>Cmd</kbd> + <kbd>/</kbd> - 显示快捷键</li>
        <li><kbd>ESC</kbd> - 关闭弹窗/图片</li>
        <li><kbd>↑</kbd> / <kbd>↓</kbd> - 搜索结果导航</li>
      </ul>
      <button class="close-btn">关闭</button>
    </div>
  `
  modal.onclick = (e) => {
    if (e.target === modal || e.target.classList.contains('close-btn')) {
      modal.remove()
    }
  }
  document.body.appendChild(modal)
}

// 代码块语言标签
function addCodeLanguageLabels() {
  function processLabels() {
    document.querySelectorAll('pre code:not(.processed-label)').forEach((code) => {
      const pre = code.closest('pre')
      if (!pre || pre.querySelector('.code-lang-label')) return
      
      code.classList.add('processed-label')
      
      const classList = Array.from(code.classList)
      const langClass = classList.find(c => c.startsWith('language-') || c.startsWith('lang-'))
      if (!langClass) return
      
      const lang = langClass.replace(/^(language-|lang-)/, '').toUpperCase()
      const label = document.createElement('span')
      label.className = 'code-lang-label'
      label.textContent = lang
      pre.style.position = 'relative'
      // 插入到代码块末尾（右上角），避免与折叠按钮（左上角）冲突
      pre.appendChild(label)
    })
  }
  
  // 初始执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processLabels)
  } else {
    processLabels()
  }
  
  // 监听动态添加的代码块
  const observer = new MutationObserver(() => {
    processLabels()
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

// 全屏阅读模式（隐藏侧栏与大纲）
function enableFullscreenReading() {
  const KEY = 'vp-fullscreen-reading'
  
  function apply() {
    try {
      const on = localStorage.getItem(KEY) === '1'
      document.body.classList.toggle('vp-fullscreen-reading', on)
    } catch (e) {
      // localStorage 可能被禁用
      console.warn('无法访问 localStorage:', e)
    }
  }
  
  apply()
  
  // 在顶栏右侧加一个切换按钮（插入到搜索框附近）
  let insertTimer = null
  function insertButton() {
    try {
      const search = document.querySelector('.VPNavBarSearch, .VPLocalSearch, [class*="Search"]')
      const navActions = document.querySelector('.VPNavBarActions, [class*="Actions"]')
      const target = navActions || search?.parentElement
      
      if (!target || target.querySelector('.vp-fullscreen-btn')) return
      
      const btn = document.createElement('button')
      btn.className = 'vp-fullscreen-btn'
      btn.setAttribute('aria-label', '全屏阅读')
      btn.innerHTML = '⛶'
      btn.title = '全屏阅读（隐藏侧栏）'
      btn.onclick = () => {
        try {
          const on = document.body.classList.toggle('vp-fullscreen-reading')
          localStorage.setItem(KEY, on ? '1' : '0')
          btn.title = on ? '退出全屏阅读' : '全屏阅读（隐藏侧栏）'
        } catch (e) {
          console.warn('无法保存全屏状态:', e)
        }
      }
      
      if (search) {
        search.after(btn)
      } else if (target) {
        target.appendChild(btn)
      }
    } catch (e) {
      console.warn('插入全屏按钮失败:', e)
    }
  }
  
  setTimeout(insertButton, 1000)
  const observer = new MutationObserver(() => {
    clearTimeout(insertTimer)
    insertTimer = setTimeout(insertButton, 200)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

// 复制代码成功提示
function enableCopyToast() {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.vp-code-copy-btn, [class*="copy"]')
    if (!copyBtn) return
    
    const toast = document.createElement('div')
    toast.className = 'vp-copy-toast'
    toast.textContent = '已复制'
    document.body.appendChild(toast)
    requestAnimationFrame(() => toast.classList.add('show'))
    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => toast.remove(), 300)
    }, 1500)
  })
}

// 预估阅读时间（中文阅读速度约 300-400 字/分钟）
function addReadingTime() {
  let cachedMinutes = null
  let lastUrl = ''
  
  function run() {
    // 如果URL没变且已有缓存，直接使用缓存
    const currentUrl = window.location.pathname
    if (currentUrl === lastUrl && cachedMinutes !== null) {
      return
    }
    lastUrl = currentUrl
    
    // 找到VitePress文档主容器（.vp-doc是文档内容区域）
    const doc = document.querySelector('.vp-doc') || document.querySelector('.content') || document.querySelector('[class*="VPDoc"]')
    if (!doc) return
    
    const existing = doc.querySelector('.vp-reading-time')
    if (existing) existing.remove()
    
    // 克隆整个文档内容用于统计（避免影响显示）
    const clone = doc.cloneNode(true)
    
    // 只移除导航、侧边栏、按钮等UI元素，保留代码块内容（代码也需要阅读）
    clone.querySelectorAll('nav, .sidebar, aside, .outline, .vp-reading-time, button, .vp-copy-btn, .vp-code-lang, .vp-reading-progress, .vp-back-to-top, .vp-doc-footer, .vp-doc-footer-nav').forEach(el => el.remove())
    
    // 移除所有script和style标签
    clone.querySelectorAll('script, style').forEach(el => el.remove())
    
    // 获取所有文本内容（使用textContent获取纯文本，包括代码块内容）
    const allText = clone.textContent || clone.innerText || ''
    
    // 统计所有非空白字符（包括中英文、数字、标点、代码等）
    // 移除所有空白字符（空格、换行、制表符等），只统计实际字符
    const nonWhitespaceChars = allText.replace(/[\s\n\r\t\u00A0\u2000-\u200B\u2028\u2029\uFEFF]/g, '').length
    
    // 中文阅读速度约 300-400 字/分钟，取 350
    // 对于混合内容（中文+代码+英文），使用稍慢的速度更合理，取 300
    const minutes = Math.max(1, Math.round(nonWhitespaceChars / 300))
    cachedMinutes = minutes
    
    const el = document.createElement('div')
    el.className = 'vp-reading-time'
    el.textContent = `约 ${minutes} 分钟阅读`
    
    // 插入到第一个 h1 标题之后
    const firstH1 = doc.querySelector('h1')
    if (firstH1 && firstH1.parentElement) {
      firstH1.after(el)
    } else {
      // 如果没有 h1，插入到内容开头
      const firstChild = doc.firstElementChild
      if (firstChild) {
        firstChild.before(el)
      } else {
        doc.prepend(el)
      }
    }
  }
  
  // 防抖函数
  let debounceTimer = null
  function debouncedRun() {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(run, 1000)
  }
  
  // 等待页面完全加载后再统计
  if (document.readyState === 'complete') {
    setTimeout(run, 2000)
  } else {
    window.addEventListener('load', () => setTimeout(run, 2000))
  }
  
  // 监听DOM变化，使用防抖避免频繁计算
  const observer = new MutationObserver(debouncedRun)
  observer.observe(document.body, { childList: true, subtree: true })
  
  // 路由变化时清除缓存
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('popstate', () => {
      cachedMinutes = null
      lastUrl = ''
      setTimeout(run, 500)
    })
  }
}
