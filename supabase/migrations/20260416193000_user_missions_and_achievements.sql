create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  tagline text not null,
  target text not null,
  streak text not null,
  progress text not null,
  image_src text not null,
  image_data_alt text not null,
  status text not null check (status in ('Active', 'Completed', 'Paused'))
);

create index if not exists missions_user_id_idx on public.missions (user_id);

alter table public.missions enable row level security;

drop policy if exists "Users can view their own missions" on public.missions;
create policy "Users can view their own missions"
on public.missions
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own missions" on public.missions;
create policy "Users can insert their own missions"
on public.missions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own missions" on public.missions;
create policy "Users can update their own missions"
on public.missions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text not null,
  criteria text not null,
  badge_label text not null check (badge_label in ('Badge', 'Streak Reward', 'Certificate')),
  image_src text not null,
  image_alt text not null,
  image_data_alt text not null
);

create index if not exists achievements_user_id_idx on public.achievements (user_id);

alter table public.achievements enable row level security;

drop policy if exists "Users can view their own achievements" on public.achievements;
create policy "Users can view their own achievements"
on public.achievements
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own achievements" on public.achievements;
create policy "Users can insert their own achievements"
on public.achievements
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own achievements" on public.achievements;
create policy "Users can update their own achievements"
on public.achievements
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
