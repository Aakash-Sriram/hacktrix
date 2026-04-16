import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { MissionFilterBar } from "@/features/missions/components/MissionFilterBar";
import { MissionGrid } from "@/features/missions/components/MissionGrid";
import { PageIntro } from "@/features/missions/components/PageIntro";
import { TopNavigation } from "@/features/missions/components/TopNavigation";
import styles from "@/features/missions/styles/mission-theme.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-mission-body",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-mission-headline",
  weight: ["400", "500", "600", "700", "800"],
});

export function MissionPage() {
  return (
    <div
      className={`${manrope.variable} ${plusJakartaSans.variable} ${styles.theme} bg-background text-on-surface min-h-screen`}
    >
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <PageIntro />
        <MissionFilterBar />
        <MissionGrid />
      </main>
      <button
        className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-xl shadow-primary-container/40 z-50"
        type="button"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}
