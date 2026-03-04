-- 复习状态表：用于自测卷等页面的「已复习」勾选跨设备同步
-- 在 Supabase Dashboard -> SQL Editor 中执行本脚本

-- 表结构
create table if not exists public.review_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  page_slug text not null,
  question_key text not null,
  checked boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(user_id, page_slug, question_key)
);

-- 索引：按用户 + 页面查询
create index if not exists idx_review_state_user_page
  on public.review_state(user_id, page_slug);

-- 启用行级安全（RLS）
alter table public.review_state enable row level security;

-- 策略：用户只能读写自己的记录
create policy "Users can read own review_state"
  on public.review_state for select
  using (auth.uid() = user_id);

create policy "Users can insert own review_state"
  on public.review_state for insert
  with check (auth.uid() = user_id);

create policy "Users can update own review_state"
  on public.review_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own review_state"
  on public.review_state for delete
  using (auth.uid() = user_id);

-- 启用匿名登录（若尚未启用）：
-- Authentication -> Providers -> Email -> 保持启用；
-- Authentication -> Providers -> Anonymous 开启 "Enable Anonymous Sign-In"
