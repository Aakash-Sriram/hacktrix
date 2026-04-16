import { missions } from "@/features/missions/data/missions";
import { MissionCard } from "@/features/missions/components/MissionCard";

export function MissionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {missions.map((mission) => (
        <MissionCard key={mission.title} mission={mission} />
      ))}
    </div>
  );
}
