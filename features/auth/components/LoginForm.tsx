"use client";

import { useState, useTransition } from "react";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoogleLogin = () => {
    setErrorMessage(null);

    startTransition(() => {
      void (async () => {
        try {
          const { signInWithGoogle } = await import("@/lib/auth");
          const result = await signInWithGoogle();

          if (result.error) {
            setErrorMessage(result.error.message);
          }
        } catch {
          setErrorMessage("Unable to start Google sign-in right now.");
        }
      })();
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-15px_rgba(28,28,25,0.08)] border border-outline-variant/20">
      <div className="space-y-3 mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
          Welcome Back
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
          Log in to Mission Saver
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
          Continue your savings journey, track your missions, and unlock achievements with your
          Google account.
        </p>
      </div>

      <button
        className="w-full bg-primary-container text-on-primary-container px-6 py-4 rounded-full font-bold text-base scale-95 active:scale-90 transition-transform shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isPending}
        onClick={handleGoogleLogin}
        type="button"
      >
        {isPending ? "Connecting..." : "Continue with Google"}
      </button>

      {errorMessage ? (
        <p className="mt-4 text-sm font-medium text-error">{errorMessage}</p>
      ) : null}

      <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
        By continuing, you&apos;ll be redirected to Google and then returned to your Mission Saver
        dashboard.
      </p>
    </div>
  );
}
