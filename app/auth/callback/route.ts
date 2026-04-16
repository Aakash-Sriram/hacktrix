import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);

    const code = url.searchParams.get("code");

    // Debug
    console.log("OAuth code:", code);

    // TODO: exchange code for session (Supabase etc.)

    return NextResponse.redirect(new URL("/", req.url));
}