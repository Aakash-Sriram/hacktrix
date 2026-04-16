import { NextResponse } from "next/server";

import { parseMissionMutation } from "@/features/missions/data/mission-mutations";
import { mapMissionRow, missionSelectColumns, type MissionRow } from "@/features/missions/data/missions";
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
    const payload = parseMissionMutation(await parseJsonBody(request));
    const { data, error } = await session.supabase
      .from("missions")
      .update({
        title: payload.title,
        tagline: payload.tagline,
        target: payload.target,
        streak: payload.streak,
        progress: payload.progress,
        image_src: payload.imageSrc,
        image_data_alt: payload.imageDataAlt,
        status: payload.status,
      })
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select(missionSelectColumns)
      .single<MissionRow>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ mission: mapMissionRow(data) });
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
      .from("missions")
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
