-- 复习状态表（全局一份，不区分用户）：任意设备打开均为同一套勾选
-- 在 Supabase Dashboard -> SQL Editor 中执行本脚本整段

-- 1. 表结构
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

-- 2. 表权限（必须执行，否则 403）
grant usage on schema public to anon;
grant select, insert, update, delete on public.review_state_global to anon;

-- 3. RLS 策略：一条 FOR ALL 策略覆盖增删改查（避免 upsert 时 403）
drop policy if exists "Allow anon read review_state_global" on public.review_state_global;
drop policy if exists "Allow anon insert review_state_global" on public.review_state_global;
drop policy if exists "Allow anon update review_state_global" on public.review_state_global;
drop policy if exists "Allow anon delete review_state_global" on public.review_state_global;
drop policy if exists "allow_all_review_state_global" on public.review_state_global;

create policy "allow_all_review_state_global"
  on public.review_state_global for all to anon
  using (true)
  with check (true);
