export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  isDevelopment: process.env.NODE_ENV === "development",
};

// Simple validation
if (!env.supabase.url || !env.supabase.anonKey || !env.supabase.serviceRoleKey) {
  if (!env.isDevelopment) {
    console.warn("Supabase environment variables are missing!");
  }
}
