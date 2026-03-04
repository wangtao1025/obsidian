# 复习状态跨设备同步（Supabase）

自测卷等页面的「已复习」勾选状态可同步到 Supabase，实现跨设备一致。

## 1. 创建项目

1. 打开 [Supabase](https://supabase.com) 并登录。
2. 新建项目，记下 **Project URL** 和 **anon public** key（Settings → API）。

## 2. 执行建表脚本

在 Supabase 控制台打开 **SQL Editor**，执行本目录下 `review_state.sql` 中的全部 SQL。

## 3. 开启匿名登录

在 **Authentication → Providers** 中启用 **Anonymous**（Enable Anonymous Sign-In）。  
这样无需用户注册即可生成匿名用户，并用其存储复习状态。

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
- **已配置**：首次进入自测卷页会匿名登录，从 Supabase 拉取该页的复习状态并写入本地；勾选/取消会同时写 localStorage 并同步到 Supabase，换设备后打开同一页即可看到相同勾选状态。
