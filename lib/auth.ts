/**
 * Google sign-in via Supabase OAuth
 */
import { client } from '@/lib/client';

export async function signInWithGoogle() {
    return client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    });
}