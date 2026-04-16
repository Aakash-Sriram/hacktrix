import { createClient } from "@supabase/supabase-js";
import { env } from "../../config/env";

// Initialize Supabase client
// We initialize it only if the environment variables are present to avoid crashing
// in environments where only dummy auth is being tested.
export const supabase = (env.supabase.url && env.supabase.anonKey)
    ? createClient(env.supabase.url, env.supabase.anonKey)
    : null as unknown as ReturnType<typeof createClient>;

if (!supabase) {
    console.warn("[AuthService] Supabase client not initialized: Missing environment variables.");
}

// Dummy user for testing (not stored in Supabase)
const DUMMY_USER = {
    id: "dummy-user-id-123",
    email: "test@example.com",
    user_metadata: {
        full_name: "Test User (Dummy)",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=finance",
    },
};

export const authService = {
    /**
     * Dummy sign-in for testing purposes (Not Supabase)
     */
    async signInWithDummy(email: string, password: string) {
        console.log("[AuthService] Dummy sign-in attempt:", { email });

        // Hardcoded credentials for simulation/testing
        if (email === "test@example.com" && password === "password123") {
            return {
                data: {
                    user: DUMMY_USER,
                    session: { access_token: "dummy-secret-token", expires_in: 3600 }
                },
                error: null
            };
        }

        return {
            data: { user: null, session: null },
            error: { message: "Invalid dummy credentials. Use test@example.com / password123" }
        };
    },

    /**
     * Signs the user out
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    /**
     * Retrieves the current user
     * Returns Supabase user if logged in, otherwise null
     */
    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            // Logic could be added here to check for a dummy session in cookies/localStorage
            return null;
        }
        return user;
    }
};
