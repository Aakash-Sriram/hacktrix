import { NextResponse } from "next/server";

import { parseAchievementMutation } from "@/features/achievements/data/achievement-mutations";
import {
  achievementSelectColumns,
  mapAchievementRow,
  type AchievementRow,
} from "@/features/achievements/data/achievements";
import {
  jsonErrorResponse,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/utils/supabase/route";

export async function POST(request: Request) {
  try {
    const session = await requireAuthenticatedUser();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = parseAchievementMutation(await parseJsonBody(request));
    const { data, error } = await session.supabase
      .from("achievements")
      .insert({
        user_id: session.user.id,
        title: payload.title,
        description: payload.description,
        criteria: payload.criteria,
        badge_label: payload.badgeLabel,
        image_src: payload.imageSrc,
        image_alt: payload.imageAlt,
        image_data_alt: payload.imageDataAlt,
      })
      .select(achievementSelectColumns)
      .single<AchievementRow>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ achievement: mapAchievementRow(data) }, { status: 201 });
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
