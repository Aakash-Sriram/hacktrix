import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { MissionManager } from "@/features/missions/components/MissionManager";
import { PageIntro } from "@/features/missions/components/PageIntro";
import { TopNavigation } from "@/features/missions/components/TopNavigation";
import type { Mission } from "@/features/missions/data/missions";
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

type MissionPageProps = {
  missions: Mission[];
};

export function MissionPage({ missions }: MissionPageProps) {
  return (
    <div
      className={`${manrope.variable} ${plusJakartaSans.variable} ${styles.theme} bg-background text-on-surface min-h-screen`}
    >
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <PageIntro />
        <MissionManager missions={missions} />
      </main>
    </div>
  );
}
