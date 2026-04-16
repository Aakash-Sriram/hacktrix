drop policy if exists "Users can delete their own missions" on public.missions;
create policy "Users can delete their own missions"
on public.missions
for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own achievements" on public.achievements;
create policy "Users can delete their own achievements"
on public.achievements
for delete
to authenticated
using ((select auth.uid()) = user_id);
