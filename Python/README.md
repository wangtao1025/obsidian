# Python 文档（VitePress）

## 本地开发

```bash
npm install
npm run docs:dev
```

浏览器打开终端提示的本地地址（如 `http://localhost:5173`），默认首页为「Python 语法手册」。

## 部署到 Vercel（自动 Build）

### 方式一：整个仓库根目录就是 Python 文件夹

若你的 Git 仓库根目录就是当前 `Python` 文件夹：

1. 把本仓库推送到 GitHub。
2. 打开 [Vercel](https://vercel.com) → **Add New Project** → 导入该 GitHub 仓库。
3. **Root Directory** 留空（默认根目录）。
4. **Build and Output Settings** 使用项目里的 `vercel.json`（无需改）：
   - Build Command: `npm install && npm run docs:build`
   - Output Directory: `.vitepress/dist`
5. 点击 **Deploy**。之后每次推送到 GitHub，Vercel 会自动重新 build 并更新站点。

### 方式二：Python 是仓库里的子目录（例如在 Obsidian Vault 里）

若仓库结构是：

```
Obsidian Vault/   ← 仓库根
  Python/          ← 文档在这里
    package.json
    .vitepress/
    ...
```

1. 推送仓库到 GitHub，在 Vercel 里导入该仓库。
2. 在 Vercel 项目 **Settings → General** 里设置：
   - **Root Directory**：点 **Edit**，填 `Python`（或你的文档所在子目录），保存。
3. **Build and Output Settings**（若没有自动识别）：
   - Framework Preset：选 **Other** 或 **Vite**（没有 VitePress 就选 Other）。
   - Build Command：`npm run docs:build`
   - Output Directory：`.vitepress/dist`
   - Install Command：`npm install`
4. 保存后 **Redeploy**。之后每次 push，Vercel 会在 `Python` 目录下执行 `npm install` 和 `npm run docs:build`，并发布 `.vitepress/dist`。

### 常见问题

- **Build 失败**：在 Vercel 的 **Deployments → 某次部署 → Building** 里看日志，确认 Node 版本（建议 18+）。如需指定，在 `package.json` 里加 `"engines": { "node": ">=18" }`。
- **首页 404**：确认 `vercel.json` 的 `outputDirectory` 为 `.vitepress/dist`，且构建无报错。
