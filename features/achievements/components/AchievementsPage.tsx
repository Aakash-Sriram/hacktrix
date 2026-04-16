import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { AchievementCard } from "@/features/achievements/components/AchievementCard";
import { AchievementsFooter } from "@/features/achievements/components/AchievementsFooter";
import { AchievementsTopNavigation } from "@/features/achievements/components/AchievementsTopNavigation";
import { EmptyStatePromo } from "@/features/achievements/components/EmptyStatePromo";
import { FilterBar } from "@/features/achievements/components/FilterBar";
import { HeroSection } from "@/features/achievements/components/HeroSection";
import { StatsGrid } from "@/features/achievements/components/StatsGrid";
import { achievements } from "@/features/achievements/data/achievements";
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

export function AchievementsPage() {
  return (
    <div
      className={`${manrope.variable} ${plusJakartaSans.variable} ${styles.theme} bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container`}
    >
      <AchievementsTopNavigation />
      <main className="max-w-screen-2xl mx-auto px-8 py-12 space-y-16">
        <HeroSection />
        <StatsGrid />
        <FilterBar />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </section>
        <EmptyStatePromo />
      </main>
      <AchievementsFooter />
    </div>
  );
}
