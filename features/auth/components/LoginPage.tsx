import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { CheckCheck, Flame, Target } from 'lucide-react';



import { LoginForm } from "@/features/auth/components/LoginForm";
import styles from "@/features/auth/styles/login-theme.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-login-body",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-login-headline",
  weight: ["400", "500", "600", "700", "800"],
});

export function LoginPage() {
  return (
    <div
      className={`${manrope.variable} ${plusJakartaSans.variable} ${styles.theme} min-h-screen bg-background text-on-surface`}
    >
      <header className="sticky top-0 z-20 bg-[#FCF9F4]">
        <div className="bg-[#DCDAD5]/20">
          <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
            <div className={`text-2xl font-black text-[#A43A3D] tracking-tight ${styles.brandLogo}`}>
              Mission Saver
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm font-bold text-on-surface-variant">
              <span className="rounded-full bg-surface-container-high px-4 py-2">
                Financial goals, simplified
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-8 py-12 md:py-20">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="space-y-5 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-secondary">
                Mission Saver
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface">
                Save with intention.
                <br />
                Grow with consistency.
              </h2>
              <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
                A calm workspace for building savings habits, tracking progress, and celebrating
                milestones with the same visual system used across your missions and achievements.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_24px_48px_-20px_rgba(28,28,25,0.08)]">
                <div className="material-symbols-outlined text-primary text-3xl mb-4">
                  <Target/>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                  Missions
                </p>
                <p className="text-2xl font-extrabold text-on-surface">Focused</p>
              </div>
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_24px_48px_-20px_rgba(28,28,25,0.08)] border-l-4 border-secondary">
                <div className="material-symbols-outlined text-secondary text-3xl mb-4">
                  <Flame/>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                  Streaks
                </p>
                <p className="text-2xl font-extrabold text-on-surface">Steady</p>
              </div>
              <div className="bg-primary text-on-primary rounded-3xl p-6 shadow-[0_24px_48px_-20px_rgba(164,58,61,0.25)]">
                <div className="material-symbols-outlined text-on-primary text-3xl mb-4">
                  <CheckCheck/>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-on-primary/70 mb-2">
                  Rewards
                </p>
                <p className="text-2xl font-extrabold">Earned</p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <LoginForm />
          </div>
        </section>
      </main>
    </div>
  );
}
