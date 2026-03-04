# 复习状态跨设备同步（Supabase）

自测卷等页面的「已复习」勾选状态可同步到 Supabase，实现跨设备一致。

## 1. 创建项目

1. 打开 [Supabase](https://supabase.com) 并登录。
2. 新建项目，记下 **Project URL** 和 **anon public** key（Settings → API）。

## 2. 执行建表脚本

在 Supabase 控制台打开 **SQL Editor**，执行本目录下 **`review_state_global.sql`** 中的全部 SQL。

复习状态按「页面 + 题目」存一份全局数据，不区分用户，任意浏览器/设备打开都是同一套勾选，无需登录或开启匿名登录。

## 4. 配置前端环境变量

在项目根目录复制 `.env.example` 为 `.env.local`，填入你的 Supabase 信息：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

- `VITE_SUPABASE_URL`：Project URL  
- `VITE_SUPABASE_ANON_KEY`：anon public key  

**注意**：`.env.local` 不要提交到 Git；Vercel 部署时在项目设置里添加同名环境变量即可。

## 5. 行为说明

- **未配置**：不设置上述环境变量时，仅使用浏览器 localStorage，行为与之前一致。
- **已配置**：进入自测卷页会从 Supabase 拉取该页的复习状态；勾选/取消会同时写 localStorage 并同步到 Supabase。任意设备/浏览器打开均为同一套状态（全局一份，不区分用户）。

**若配置后未生效**：请确认 `.env.local` 在项目根目录（与 `package.json` 同级），修改后**重启**开发服务器（`npm run docs:dev`）。

### Vercel 部署

`.env.local` 不会随代码提交，因此 **Vercel 上必须单独配置环境变量**：

1. 打开 Vercel 项目 → **Settings** → **Environment Variables**
2. 新增两条变量（Production / Preview / Development 按需勾选）：
   - `VITE_SUPABASE_URL` = 你的 Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase anon public key
3. 保存后重新 **Redeploy** 一次，构建时才会把上述值打进页面，线上自测卷的复习状态才会同步到 Supabase。
