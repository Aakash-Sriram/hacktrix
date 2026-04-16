import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { AchievementManager } from "@/features/achievements/components/AchievementManager";
import { AchievementsFooter } from "@/features/achievements/components/AchievementsFooter";
import { AchievementsTopNavigation } from "@/features/achievements/components/AchievementsTopNavigation";
import { HeroSection } from "@/features/achievements/components/HeroSection";
import type { Achievement, AchievementStat } from "@/features/achievements/data/achievements";
import styles from "@/features/achievements/styles/achievements-theme.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-achievements-body",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-achievements-headline",
  weight: ["400", "500", "600", "700", "800"],
});

type AchievementsPageProps = {
  achievements: Achievement[];
  stats: AchievementStat[];
};

export function AchievementsPage({ achievements, stats }: AchievementsPageProps) {
  return (
    <div
      className={`${manrope.variable} ${plusJakartaSans.variable} ${styles.theme} bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container`}
    >
      <AchievementsTopNavigation />
      <main className="max-w-screen-2xl mx-auto px-8 py-12 space-y-16">
        <HeroSection />
        <AchievementManager achievements={achievements} stats={stats} />
      </main>
      <AchievementsFooter />
    </div>
  );
}
