import { NextResponse } from "next/server";

import { parseMissionMutation } from "@/features/missions/data/mission-mutations";
import { mapMissionRow, missionSelectColumns, type MissionRow } from "@/features/missions/data/missions";
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

    const payload = parseMissionMutation(await parseJsonBody(request));
    const { data, error } = await session.supabase
      .from("missions")
      .insert({
        user_id: session.user.id,
        title: payload.title,
        tagline: payload.tagline,
        target: payload.target,
        streak: payload.streak,
        progress: payload.progress,
        image_src: payload.imageSrc,
        image_data_alt: payload.imageDataAlt,
        status: payload.status,
      })
      .select(missionSelectColumns)
      .single<MissionRow>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ mission: mapMissionRow(data) }, { status: 201 });
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
