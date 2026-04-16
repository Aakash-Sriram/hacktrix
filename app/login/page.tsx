"use client";

import { signInWithGoogle } from '@/lib/auth';

export default function LoginPage() {
    return (
        <div>
            <h1>Login</h1>

            <button onClick={() => signInWithGoogle()}>
                Continue with Google
            </button>
        </div>
    );
}