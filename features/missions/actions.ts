"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseMissionIntentInput } from "@/features/missions/data/mission-intents";
import type { MissionStatus } from "@/features/missions/data/missions";
import { createClient } from "@/utils/supabase/server";

async function getAuthenticatedMissionContext() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

function deriveMissionStatus(
  currentStatus: MissionStatus,
  totalInvestedAmount: number,
  goalAmount: number,
): MissionStatus {
  if (goalAmount > 0 && totalInvestedAmount >= goalAmount) {
    return "Completed";
  }

  return currentStatus === "Paused" ? "Paused" : "Active";
}

export async function createMission(input: unknown) {
  const { supabase, user } = await getAuthenticatedMissionContext();
  const mission = parseMissionIntentInput(input);

  const { error } = await supabase.from("missions").insert({
    user_id: user.id,
    title: mission.title,
    description: mission.description,
    monthly_investment_amount: mission.monthlyInvestmentAmount,
    goal_amount: mission.goalAmount,
    target_date: mission.targetDate,
    total_invested_amount: 0,
    image_url: mission.imageUrl,
    image_description: mission.imageDescription,
    status: "Active",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function updateMission(id: string, input: unknown) {
  const { supabase, user } = await getAuthenticatedMissionContext();
  const mission = parseMissionIntentInput(input);
  const { data: existingMission, error: existingMissionError } = await supabase
    .from("missions")
    .select("id, total_invested_amount, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single<{ id: string; total_invested_amount: number; status: MissionStatus }>();

  if (existingMissionError) {
    throw new Error(existingMissionError.message);
  }

  const { error } = await supabase
    .from("missions")
    .update({
      title: mission.title,
      description: mission.description,
      monthly_investment_amount: mission.monthlyInvestmentAmount,
      goal_amount: mission.goalAmount,
      target_date: mission.targetDate,
      image_url: mission.imageUrl,
      image_description: mission.imageDescription,
      status: deriveMissionStatus(
        existingMission.status,
        existingMission.total_invested_amount,
        mission.goalAmount,
      ),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteMission(id: string) {
  const { supabase, user } = await getAuthenticatedMissionContext();
  const { error } = await supabase
    .from("missions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
