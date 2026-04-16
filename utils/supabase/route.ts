import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    return null;
  }

  return { supabase, user };
}

export function jsonErrorResponse(error: unknown, status = 400) {
  const message = error instanceof Error ? error.message : "Something went wrong.";

  return NextResponse.json({ error: message }, { status });
}

export async function parseJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}
