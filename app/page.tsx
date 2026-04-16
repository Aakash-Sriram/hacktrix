import type { Metadata } from "next";

import { MissionPage } from "@/features/missions";

export const metadata: Metadata = {
  title: "Your Missions | Mission Saver",
};

export default function HomePage() {
  return <MissionPage />;
}
