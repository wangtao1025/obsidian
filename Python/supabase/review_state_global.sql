-- 复习状态表（全局一份，不区分用户）：任意设备打开均为同一套勾选
-- 在 Supabase Dashboard -> SQL Editor 中执行本脚本（若已有 review_state 可保留不动，本表独立）

-- 表结构：仅按页面 + 题目存储，无需登录
create table if not exists public.review_state_global (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  question_key text not null,
  checked boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(page_slug, question_key)
);

create index if not exists idx_review_state_global_page
  on public.review_state_global(page_slug);

alter table public.review_state_global enable row level security;

-- 允许匿名（anon）读写：站点仅个人使用，前端用 anon key 直接读写
create policy "Allow anon read review_state_global"
  on public.review_state_global for select to anon using (true);

create policy "Allow anon insert review_state_global"
  on public.review_state_global for insert to anon with check (true);

create policy "Allow anon update review_state_global"
  on public.review_state_global for update to anon using (true) with check (true);

create policy "Allow anon delete review_state_global"
  on public.review_state_global for delete to anon using (true);
