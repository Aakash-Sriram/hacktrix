import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MissionPage } from "@/features/missions";
import {
  buildMissionPresentation,
  missionSelectColumns,
  type MissionSourceRow,
} from "@/features/missions/data/mission-intents";
import type { Mission } from "@/features/missions/data/missions";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Your Missions | Mission Saver",
};

async function getUserMissions(): Promise<Mission[]> {
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
    .from("missions")
    .select(missionSelectColumns)
    .eq("user_id", user.id)
    .gt("monthly_investment_amount", 0)
    .gt("goal_amount", 0)
    .not("target_date", "is", null)
    .order("title");

  if (error) {
    throw error;
  }

  const missionRows = (data ?? []) as unknown as MissionSourceRow[];

  return missionRows.map((mission) => buildMissionPresentation(mission));
}

export default async function HomePage() {
  const missions = await getUserMissions();

  return <MissionPage missions={missions} />;
}
