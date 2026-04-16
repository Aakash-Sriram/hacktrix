import type { Metadata } from "next";

import { AchievementsPage } from "@/features/achievements";

export const metadata: Metadata = {
  title: "Your Achievements | Mission Saver",
};

export default function AchievementsRoute() {
  return <AchievementsPage />;
}
