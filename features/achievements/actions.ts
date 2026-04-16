"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseAchievementMutation } from "@/features/achievements/data/achievement-mutations";
import { createClient } from "@/utils/supabase/server";

async function getAuthenticatedAchievementContext() {
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

export async function createAchievement(input: unknown) {
  const { supabase, user } = await getAuthenticatedAchievementContext();
  const achievement = parseAchievementMutation(input);

  const { error } = await supabase.from("achievements").insert({
    user_id: user.id,
    title: achievement.title,
    description: achievement.description,
    criteria: achievement.criteria,
    badge_label: achievement.badgeLabel,
    image_src: achievement.imageSrc,
    image_alt: achievement.imageAlt,
    image_data_alt: achievement.imageDataAlt,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/achievements");
}

export async function updateAchievement(id: string, input: unknown) {
  const { supabase, user } = await getAuthenticatedAchievementContext();
  const achievement = parseAchievementMutation(input);

  const { error } = await supabase
    .from("achievements")
    .update({
      title: achievement.title,
      description: achievement.description,
      criteria: achievement.criteria,
      badge_label: achievement.badgeLabel,
      image_src: achievement.imageSrc,
      image_alt: achievement.imageAlt,
      image_data_alt: achievement.imageDataAlt,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/achievements");
}

export async function deleteAchievement(id: string) {
  const { supabase, user } = await getAuthenticatedAchievementContext();
  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/achievements");
}
