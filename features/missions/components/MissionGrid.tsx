import { MissionCard } from "@/features/missions/components/MissionCard";
import type { MissionIntentFormValue } from "@/features/missions/data/mission-intents";
import type { Mission } from "@/features/missions/data/missions";

type MissionGridProps = {
  editingId: string | null;
  isPending: boolean;
  missions: Mission[];
  onCancelEdit: () => void;
  onDeleteMission: (mission: Mission) => void;
  onEditMission: (mission: Mission) => void;
  onSaveMission: (missionId: string, value: MissionIntentFormValue) => void;
};

export function MissionGrid({
  editingId,
  isPending,
  missions,
  onCancelEdit,
  onDeleteMission,
  onEditMission,
  onSaveMission,
}: MissionGridProps) {
  if (missions.length === 0) {
    return (
      <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 p-10 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">target</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">No missions yet</h2>
          <p className="text-on-surface-variant">
            Your saved missions will appear here once they exist in Supabase for this account.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {missions.map((mission) => (
        <MissionCard
          isEditing={editingId === mission.id}
          isPending={isPending}
          key={mission.id}
          mission={mission}
          onCancelEdit={onCancelEdit}
          onDelete={() => onDeleteMission(mission)}
          onEdit={() => onEditMission(mission)}
          onSave={(value) => onSaveMission(mission.id, value)}
        />
      ))}
    </div>
  );
}
