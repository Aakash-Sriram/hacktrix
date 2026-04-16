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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuthenticatedUser();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    const payload = parseAchievementMutation(await parseJsonBody(request));
    const { data, error } = await session.supabase
      .from("achievements")
      .update({
        title: payload.title,
        description: payload.description,
        criteria: payload.criteria,
        badge_label: payload.badgeLabel,
        image_src: payload.imageSrc,
        image_alt: payload.imageAlt,
        image_data_alt: payload.imageDataAlt,
      })
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select(achievementSelectColumns)
      .single<AchievementRow>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ achievement: mapAchievementRow(data) });
  } catch (error) {
    return jsonErrorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuthenticatedUser();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    const { error } = await session.supabase
      .from("achievements")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      throw error;
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
