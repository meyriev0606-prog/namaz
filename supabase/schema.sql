-- Seynaro / «Намаз»: облачные Push-подписки по устройствам
-- Выполнить целиком в Supabase → SQL Editor → New query.
-- В браузере используется только publishable/anon key. SERVICE_ROLE_KEY хранится
-- исключительно в GitHub Secrets и никогда не публикуется на сайте.

create table if not exists public.prayer_devices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  subscription jsonb not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  timezone text not null default 'UTC',
  city_label text not null default 'Моё местоположение',
  calculation_method text not null default 'MuslimWorldLeague',
  madhab text not null default 'shafi' check (madhab in ('shafi', 'hanafi')),
  prayer_preferences jsonb not null default
    '{"fajr":true,"dhuhr":true,"asr":true,"maghrib":true,"isha":true}'::jsonb,
  notify_before_minutes integer not null default 10
    check (notify_before_minutes between 0 and 120),
  notify_at_start boolean not null default true,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prayer_devices_enabled_idx
  on public.prayer_devices (enabled);

create index if not exists prayer_devices_owner_idx
  on public.prayer_devices (owner_id);

alter table public.prayer_devices enable row level security;

drop policy if exists "Users can read their own prayer devices" on public.prayer_devices;
create policy "Users can read their own prayer devices"
  on public.prayer_devices for select
  to authenticated
  using (auth.uid() = owner_id);

drop policy if exists "Users can add their own prayer devices" on public.prayer_devices;
create policy "Users can add their own prayer devices"
  on public.prayer_devices for insert
  to authenticated
  with check (auth.uid() = owner_id);

drop policy if exists "Users can update their own prayer devices" on public.prayer_devices;
create policy "Users can update their own prayer devices"
  on public.prayer_devices for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Users can delete their own prayer devices" on public.prayer_devices;
create policy "Users can delete their own prayer devices"
  on public.prayer_devices for delete
  to authenticated
  using (auth.uid() = owner_id);

grant select, insert, update, delete on public.prayer_devices to authenticated;
revoke all on public.prayer_devices from anon;

-- Не создаём публичную политику на подписки: endpoint и subscription — приватные данные.
-- GitHub Actions использует SUPABASE_SERVICE_ROLE_KEY, который обходит RLS.
