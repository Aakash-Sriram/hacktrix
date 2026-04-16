import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const nextPath = url.searchParams.get("next");
  const redirectPath = nextPath?.startsWith("/") ? nextPath : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
