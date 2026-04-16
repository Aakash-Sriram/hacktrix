import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MissionPage } from "@/features/missions";
import {
  mapMissionRow,
  missionSelectColumns,
  type Mission,
  type MissionRow,
} from "@/features/missions/data/missions";
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
    .order("title");

  if (error) {
    throw error;
  }

  return (data ?? []).map((mission) => mapMissionRow(mission as MissionRow));
}

export default async function HomePage() {
  const missions = await getUserMissions();

  return <MissionPage missions={missions} />;
}
