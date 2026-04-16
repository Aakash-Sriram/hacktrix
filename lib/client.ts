import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/config/env";

export const client = createBrowserClient(
  env.supabase.url,
  env.supabase.anonKey,
);
