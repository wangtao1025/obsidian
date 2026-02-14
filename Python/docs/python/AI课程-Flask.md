# AI 课程：Flask

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **Flask** 文档，文档归在 **Python 分类**（与 Requests、OpenAI 等同为课程用到的第三方库）。Flask 是轻量级 Python Web 框架，用于构建 Web 应用与 API；RAG 服务、演示后端常用。可与 [Requests](/python/AI课程-requests)、[RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) 搭配学习。

---

## 1. 什么是 Flask？

Flask 是**微框架**：核心简单、易扩展、无强制项目结构。适用场景：个人博客、小型 API、RAG 演示服务。安装：`pip install flask`。

---

## 2. 核心概念

| 概念 | 说明 |
|------|------|
| **应用对象** | `app = Flask(__name__)`，整个应用的入口 |
| **路由** | `@app.route('/')`、`@app.route('/user/<name>')`、`@app.route('/post/<int:id>')`，URL 映射到视图函数 |
| **视图函数** | 处理请求、返回响应（字符串/HTML/JSON）；可读 `request` |
| **request** | 表单 `request.form`、URL 参数 `request.args`、方法 `request.method`、JSON `request.json` |
| **g** | 请求级全局变量，`before_request` 里设、同一请求内共享；请求结束自动清空 |
| **模板** | `render_template('hello.html', name=name)`，Jinja2；`{{ name }}`、`{% for %}`
| **context_processor** | `@app.context_processor` 向所有模板注入全局变量或函数 |
| **Flash** | `flash('消息', 'success')`，重定向后一次显示；模板里 `get_flashed_messages(with_categories=true)` |

---

## 3. 应用配置

- 直接：`app.config['DEBUG'] = True`，或 `app.config.from_object(Config)`。
- **推荐**：定义配置类（如 `DevelopmentConfig`、`ProductionConfig`），`app.config.from_object(config[os.getenv('FLASK_ENV','development')])`；敏感项用环境变量。
- 优先级：后加载的覆盖先加载的；生产务必关 `DEBUG`、用强 `SECRET_KEY`。

---

## 4. 返回 JSON（API）

- `from flask import jsonify` → `return jsonify(list_or_dict)` 或 `return jsonify({'error':'...'}), 404`。可配合 `request.json` 做 POST API。

---

## 5. Blueprint（大型应用）

- `bp = Blueprint('auth', __name__, url_prefix='/auth')` → 在 bp 上定义 `@bp.route('/login')` → `app.register_blueprint(bp)`。
- 多模块：按功能拆成 auth、blog、api 等 Blueprint；模板中 `url_for('auth.login')` 跨 Blueprint 引用。
- 可指定 `template_folder` 让 Blueprint 使用独立模板目录。

---

## 6. 静态文件

- 默认 `static/` 下放 css、js、图片；模板中 `url_for('static', filename='css/style.css')` 引用。

---

## 7. 常见问题

| 问题 | 处理 |
|------|------|
| 调试模式 | 开发用 `debug=True`，生产必须 `debug=False` |
| 端口占用 | `app.run(port=8080)` |
| 模板/静态找不到 | 确认 `templates/`、`static/` 在应用根下，或设 `template_folder`、`static_folder` |

---

**相关文档**：[Requests](/python/AI课程-requests) · [OpenAI](/python/AI课程-openai) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [Flask（课程原文）](https://rag.docs-hub.com/html/Flask.html)
