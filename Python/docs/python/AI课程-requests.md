# AI 课程：Requests

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **Requests** 文档，文档归在 **Python 分类**（与 jieba、BeautifulSoup4、PyMuPDF、python-docx 等同为课程用到的第三方库）。Requests 是 Python 最常用的 HTTP 客户端库，用于发送 GET/POST 等请求、调用 API、下载文件、保持会话；RAG 数据采集、调用嵌入/LLM API 时常用；可与 [BeautifulSoup4](/python/AI课程-beautifulsoup4)、[lxml](/python/AI课程-lxml) 等配合做网页抓取。

---

## 1. 什么是 Requests？

Requests 是「为人类设计」的 HTTP 库，API 简洁、自动处理编码与 Cookie。支持所有 HTTP 方法、认证、代理、超时、Session；RAG 中常用于拉取网页、调用外部 API、下载资源。**导入**：`import requests`。

**前置概念**：HTTP、URL、GET/POST、状态码（200/404/500）、Cookie、JSON。

---

## 2. 环境准备

- Python ≥ 3.7。
- 安装：`python -m pip install requests`（或 `python3 -m pip install requests`）；国内镜像可加 `-i https://pypi.tuna.tsinghua.edu.cn/simple`。
- 验证：`import requests` → `r = requests.get("https://httpbin.org/get")` → `r.status_code == 200`，`r.json()`。

---

## 3. 核心概念

| 概念 | 说明 |
|------|------|
| **Request** | 客户端发出的请求，含 URL、方法、头、体；`requests.get/post/put/delete/patch/head()` |
| **Response** | 服务器返回，`r.status_code`、`r.headers`、`r.text`、`r.content`、`r.json()` |
| **Session** | 会话，保持 Cookie 与连接池，`requests.Session()` |

---

## 4. 快速体验：GET 请求

- `response = requests.get("https://httpbin.org/get")` → `response.status_code`、`response.text`、`response.json()`；带参数用 `params={"key": "value"}`，带请求头用 `headers={...}`。

---

## 5. 基本使用：HTTP 方法

- **GET**：`requests.get(url, params=dict, headers=dict)`。
- **POST**：`requests.post(url, data=dict)`（表单）、`requests.post(url, json=dict)`（JSON）、`requests.post(url, files={"file": open(...)})`（上传文件）。
- **其他**：`put()`、`delete()`、`patch()`、`head()`。

---

## 6. 响应处理

- **状态**：`r.status_code`、`r.reason`、`r.headers`、`r.url`、`r.cookies`；`r.raise_for_status()` 在非 2xx 时抛 `HTTPError`。
- **内容**：`r.text`（文本）、`r.content`（字节）、`r.json()`（解析 JSON）；`r.encoding` 可读/写，乱码时可设 `r.encoding = "utf-8"` 或对 `r.content` 手动 `decode()`。

---

## 7. 请求参数：头、Cookie、超时

- **请求头**：`requests.get(url, headers={"User-Agent": "...", "Authorization": "Bearer ..."})`。
- **Cookie**：`requests.get(url, cookies={"name": "value"})`；响应里 `r.cookies`、`r.cookies.get("name")`。
- **超时**：`requests.get(url, timeout=5)` 或 `timeout=(connect_timeout, read_timeout)`；超时抛 `requests.exceptions.Timeout`。

---

## 8. 会话管理（Session）

- `with requests.Session() as s:` → `s.headers.update({...})` 设置会话级头 → `s.get(url)`、`s.post(url, json=data)`；Cookie 自动保持，连接可复用。用完可 `s.close()`，或用 `with` 自动关闭。

---

## 9. 文件下载

- 小文件：`r = requests.get(url)` → `with open(path, "wb") as f: f.write(r.content)`。
- 大文件（流式）：`r = requests.get(url, stream=True)` → `r.raise_for_status()` → `for chunk in r.iter_content(chunk_size=8192): f.write(chunk)`；可用 `r.headers.get("content-length")` 做进度。

---

## 10. 错误处理

- `requests.exceptions.HTTPError`（`raise_for_status()`）、`ConnectionError`、`Timeout`、`RequestException`（基类）。建议用 `try/except`，并始终设置 `timeout`。

---

## 11. 实战案例：API 客户端

- 封装 `APIClient(base_url, api_key=None)`：内部 `self.session = requests.Session()`，`headers` 里设 `Content-Type: application/json` 与 `Authorization: Bearer ...`；提供 `get(endpoint, params)`、`post(endpoint, data)`，内部拼 URL、`session.get/post`、`raise_for_status()`、`response.json()`；用毕 `session.close()`。

---

## 12. 常见问题与排查

| 问题 | 处理 |
|------|------|
| 连接错误 | 检查 URL、网络、DNS；用 `try/except ConnectionError`，建议默认 `timeout=10` |
| 响应乱码 | 设 `response.encoding = "utf-8"` 或 `response.content.decode("gbk")` 等 |
| SSL 证书错误 | 生产环境保持 `verify=True`；仅测试可 `verify=False`（不安全），可配合 `urllib3.disable_warnings(InsecureRequestWarning)` |

---

## 13. 参考

- [Requests 官方文档](https://requests.readthedocs.io/)
- [Requests GitHub](https://github.com/psf/requests)

---

**相关文档**：[BeautifulSoup4](/python/AI课程-beautifulsoup4) · [lxml](/python/AI课程-lxml) · [RAG 检索增强生成](/ai/AI课程-RAG检索增强生成) · [知识体系与学习路径](/ai/知识体系与学习路径) · [Requests（课程原文）](https://rag.docs-hub.com/html/requests.html)
