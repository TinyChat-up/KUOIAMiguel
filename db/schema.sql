-- KUOIA Supabase schema
create extension if not exists "pgcrypto";

create type public.user_role as enum ('visitor', 'user', 'school_admin', 'service_provider', 'admin');
create type public.product_condition as enum ('nuevo', 'segunda_mano');
create type public.product_status as enum ('active', 'sold', 'hidden');
create type public.review_target_type as enum ('school', 'service');
create type public.report_target_type as enum ('product', 'service', 'review');
create type public.report_status as enum ('open', 'in_review', 'resolved', 'rejected');
create type public.subscription_status as enum ('inactive', 'active', 'canceled', 'past_due');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'user',
  name text not null,
  avatar_url text,
  city text,
  created_at timestamptz not null default now()
);

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  logo_url text,
  verified boolean not null default false,
  description text,
  created_at timestamptz not null default now()
);

create table public.school_members (
  school_id uuid references public.schools(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text not null,
  primary key (school_id, user_id)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  title text not null,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  condition product_condition not null,
  category text not null,
  city text not null,
  status product_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  city text not null,
  images text[] not null default '{}',
  subscription_status subscription_status not null default 'inactive',
  created_at timestamptz not null default now()
);

create table public.service_schools (
  service_id uuid references public.services(id) on delete cascade,
  school_id uuid references public.schools(id) on delete cascade,
  primary key (service_id, school_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  target_type review_target_type not null,
  target_id uuid not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type report_target_type not null,
  target_id uuid not null,
  reason text not null,
  status report_status not null default 'open',
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references public.profiles(id) on delete cascade,
  user_b uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_a, user_b)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.stripe_customers (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  customer_id text not null unique
);

create table public.stripe_subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  subscription_id text not null unique,
  status text not null,
  price_id text,
  current_period_end timestamptz
);

create index idx_products_filters on public.products (status, category, condition, city, created_at desc);
create index idx_services_filters on public.services (category, city, subscription_status, created_at desc);
create index idx_reviews_target on public.reviews (target_type, target_id, created_at desc);
create index idx_reports_status on public.reports (status, created_at desc);
create index idx_messages_conversation on public.messages (conversation_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.school_members enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.service_schools enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.stripe_customers enable row level security;
alter table public.stripe_subscriptions enable row level security;

create function public.is_admin() returns boolean language sql stable as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

create policy "profiles readable" on public.profiles for select using (true);
create policy "profiles self update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "schools readable" on public.schools for select using (true);
create policy "schools admin manage" on public.schools for all using (public.is_admin()) with check (public.is_admin());

create policy "school_members visible" on public.school_members for select using (true);
create policy "school_members admin manage" on public.school_members for all using (public.is_admin()) with check (public.is_admin());

create policy "products public read" on public.products for select using (status != 'hidden');
create policy "products owner insert" on public.products for insert with check (auth.uid() = user_id);
create policy "products owner update" on public.products for update using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());
create policy "products owner delete" on public.products for delete using (auth.uid() = user_id or public.is_admin());

create policy "services public read" on public.services for select using (true);
create policy "services owner insert" on public.services for insert with check (auth.uid() = owner_id);
create policy "services owner update" on public.services for update using (auth.uid() = owner_id or public.is_admin()) with check (auth.uid() = owner_id or public.is_admin());
create policy "services owner delete" on public.services for delete using (auth.uid() = owner_id or public.is_admin());

create policy "service_schools read" on public.service_schools for select using (true);
create policy "service_schools owner manage" on public.service_schools for all using (
  exists(select 1 from public.services s where s.id = service_id and s.owner_id = auth.uid()) or public.is_admin()
) with check (
  exists(select 1 from public.services s where s.id = service_id and s.owner_id = auth.uid()) or public.is_admin()
);

create policy "reviews read" on public.reviews for select using (true);
create policy "reviews author insert" on public.reviews for insert with check (auth.uid() = author_id);
create policy "reviews author update" on public.reviews for update using (auth.uid() = author_id or public.is_admin()) with check (auth.uid() = author_id or public.is_admin());
create policy "reviews author delete" on public.reviews for delete using (auth.uid() = author_id or public.is_admin());

create policy "reports own insert" on public.reports for insert with check (auth.uid() = reporter_id);
create policy "reports own read" on public.reports for select using (auth.uid() = reporter_id or public.is_admin());
create policy "reports admin update" on public.reports for update using (public.is_admin()) with check (public.is_admin());

create policy "conversations member read" on public.conversations for select using (auth.uid() in (user_a, user_b));
create policy "conversations member insert" on public.conversations for insert with check (auth.uid() in (user_a, user_b));

create policy "messages member read" on public.messages for select using (
  exists(select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.user_a, c.user_b))
);
create policy "messages sender insert" on public.messages for insert with check (
  auth.uid() = sender_id and exists(select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.user_a, c.user_b))
);

create policy "stripe_customers owner read" on public.stripe_customers for select using (auth.uid() = user_id or public.is_admin());
create policy "stripe_customers admin manage" on public.stripe_customers for all using (public.is_admin()) with check (public.is_admin());

create policy "stripe_subscriptions owner read" on public.stripe_subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "stripe_subscriptions admin manage" on public.stripe_subscriptions for all using (public.is_admin()) with check (public.is_admin());

-- Storage policies (execute in SQL editor with your bucket names)
-- insert into storage.buckets(id, name, public) values ('product-images','product-images', true);
-- insert into storage.buckets(id, name, public) values ('service-images','service-images', true);
-- create policy "public read product images" on storage.objects for select using (bucket_id = 'product-images');
-- create policy "user upload own product images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.uid()::text = (storage.foldername(name))[1]);
-- create policy "public read service images" on storage.objects for select using (bucket_id = 'service-images');
-- create policy "user upload own service images" on storage.objects for insert with check (bucket_id = 'service-images' and auth.uid()::text = (storage.foldername(name))[1]);
