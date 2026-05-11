-- Duit GenZ Supabase schema
-- Jalankan di Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  type text not null check (type in ('income', 'expense')) default 'expense',
  title text not null,
  amount numeric(14,2) not null check (amount >= 0),
  category text not null default 'lainnya',
  note text,
  source text not null default 'manual' check (source in ('manual', 'chat', 'photo', 'split_bill')),
  receipt_image_url text,
  happened_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  category text not null,
  limit_amount numeric(14,2) not null check (limit_amount >= 0),
  period text not null default 'monthly',
  created_at timestamptz not null default now()
);

create table if not exists public.split_bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  total numeric(14,2) not null check (total >= 0),
  participants jsonb not null default '[]'::jsonb,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'settled')),
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.split_bills enable row level security;

-- MVP policy: user hanya akses data sendiri saat auth sudah dipasang.
create policy "transactions_owner_all" on public.transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "budgets_owner_all" on public.budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "split_bills_owner_all" on public.split_bills
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
