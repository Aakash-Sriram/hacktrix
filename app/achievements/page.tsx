import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AchievementsPage } from "@/features/achievements";
import {
  achievementSelectColumns,
  buildAchievementStats,
  mapAchievementRow,
  type Achievement,
  type AchievementRow,
} from "@/features/achievements/data/achievements";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Your Achievements | Mission Saver",
};

async function getUserAchievements(): Promise<Achievement[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("achievements")
    .select(achievementSelectColumns)
    .eq("user_id", user.id)
    .order("title");

  if (error) {
    throw error;
  }

  return (data ?? []).map((achievement) => mapAchievementRow(achievement as AchievementRow));
}

export default async function AchievementsRoute() {
  const achievements = await getUserAchievements();
  const stats = buildAchievementStats(achievements);

  return <AchievementsPage achievements={achievements} stats={stats} />;
}
