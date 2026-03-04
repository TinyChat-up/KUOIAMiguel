-- KUOIA schema for Supabase (Auth + DB + Storage + Stripe)
create extension if not exists "pgcrypto";

create type public.profile_role as enum ('user', 'admin');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role public.profile_role not null default 'user',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  city text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  title text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  title text not null,
  description text,
  category text not null,
  city text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid references public.services(id) on delete cascade,
  school_id uuid references public.schools(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check ((service_id is not null) <> (school_id is not null))
);

create table if not exists public.stripe_customers (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  customer_id text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  subscription_id text not null unique,
  status text not null,
  price_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.reviews enable row level security;
alter table public.stripe_customers enable row level security;
alter table public.stripe_subscriptions enable row level security;

create policy "profiles readable by authenticated users" on public.profiles
for select to authenticated using (true);
create policy "profiles owner update" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "schools public read" on public.schools
for select using (true);
create policy "schools owner write" on public.schools
for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "products public read" on public.products
for select using (true);
create policy "products owner write" on public.products
for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "services public read" on public.services
for select using (true);
create policy "services owner write" on public.services
for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "reviews public read" on public.reviews
for select using (true);
create policy "reviews author write" on public.reviews
for all to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "stripe customers owner read" on public.stripe_customers
for select to authenticated using (auth.uid() = user_id);
create policy "stripe subscriptions owner read" on public.stripe_subscriptions
for select to authenticated using (auth.uid() = user_id);

-- Service role bypasses RLS and will be used by Stripe webhook for upserts.

insert into storage.buckets (id, name, public)
values ('public-images', 'public-images', true)
on conflict (id) do nothing;

create policy "public-images read" on storage.objects
for select using (bucket_id = 'public-images');

create policy "public-images owner insert" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'public-images'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "public-images owner update" on storage.objects
for update to authenticated
using (
  bucket_id = 'public-images'
  and auth.uid()::text = split_part(name, '/', 1)
)
with check (
  bucket_id = 'public-images'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "public-images owner delete" on storage.objects
for delete to authenticated
using (
  bucket_id = 'public-images'
  and auth.uid()::text = split_part(name, '/', 1)
);
