alter table public.missions
  add column if not exists description text,
  add column if not exists monthly_investment_amount numeric(12, 2),
  add column if not exists goal_amount numeric(12, 2),
  add column if not exists target_date date,
  add column if not exists total_invested_amount numeric(12, 2) not null default 0,
  add column if not exists image_url text,
  add column if not exists image_description text;

update public.missions
set
  description = coalesce(description, tagline),
  image_url = coalesce(image_url, image_src),
  image_description = coalesce(image_description, image_data_alt)
where
  description is null
  or image_url is null
  or image_description is null;

alter table public.missions
  drop column if exists tagline,
  drop column if exists target,
  drop column if exists streak,
  drop column if exists progress,
  drop column if exists image_src,
  drop column if exists image_data_alt;

alter table public.missions
  alter column description set not null,
  alter column total_invested_amount set default 0;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'missions_monthly_investment_amount_positive'
  ) then
    alter table public.missions
      add constraint missions_monthly_investment_amount_positive
      check (monthly_investment_amount is null or monthly_investment_amount > 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'missions_goal_amount_positive'
  ) then
    alter table public.missions
      add constraint missions_goal_amount_positive
      check (goal_amount is null or goal_amount > 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'missions_total_invested_amount_nonnegative'
  ) then
    alter table public.missions
      add constraint missions_total_invested_amount_nonnegative
      check (total_invested_amount >= 0);
  end if;
end
$$;
