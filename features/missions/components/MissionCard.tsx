import { MissionForm } from "@/features/missions/components/MissionForm";
import type { MissionMutation } from "@/features/missions/data/mission-mutations";
import { getMissionAppearance, type Mission } from "@/features/missions/data/missions";
import styles from "@/features/missions/styles/mission-theme.module.css";

type MissionCardProps = {
  isEditing?: boolean;
  isPending?: boolean;
  mission: Mission;
  onCancelEdit?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onSave?: (value: MissionMutation) => void;
};

export function MissionCard({
  isEditing = false,
  isPending = false,
  mission,
  onCancelEdit,
  onDelete,
  onEdit,
  onSave,
}: MissionCardProps) {
  const appearance = getMissionAppearance(mission.status);

  if (isEditing && onSave) {
    return (
      <article
        className={`bg-surface-container-lowest rounded-lg p-6 ${styles.missionCardShadow} ${appearance.articleClassName ?? ""}`}
      >
        <div className="mb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Edit Mission</p>
          <h3 className="text-2xl font-bold text-on-surface">{mission.title}</h3>
        </div>
        <MissionForm
          initialValue={{
            title: mission.title,
            tagline: mission.tagline,
            target: mission.target,
            streak: mission.streak,
            progress: mission.progress,
            imageSrc: mission.imageSrc,
            imageDataAlt: mission.imageDataAlt,
            status: mission.status,
          }}
          isPending={isPending}
          onCancel={onCancelEdit}
          onSubmit={onSave}
          submitLabel="Save Mission"
        />
      </article>
    );
  }

  return (
    <article
      className={`bg-surface-container-lowest rounded-lg p-6 ${styles.missionCardShadow} flex flex-col group hover:-translate-y-1 transition-transform duration-300 ${appearance.articleClassName ?? ""}`}
    >
      <div
        className={`relative w-full h-48 mb-6 rounded-md overflow-hidden ${appearance.imageWrapperClassName ?? ""}`}
      >
        <img
          alt={mission.title}
          className={`w-full h-full object-cover ${appearance.imageClassName ?? ""}`}
          data-alt={mission.imageDataAlt}
          src={mission.imageSrc}
        />
        <div
          className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${appearance.statusBadgeClassName}`}
        >
          {mission.status}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-on-surface mb-1">{mission.title}</h3>
        <p className={`text-xs font-bold uppercase tracking-wider ${appearance.taglineClassName}`}>
          {mission.tagline}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Target</p>
          <p className="text-sm font-bold text-on-surface">{mission.target}</p>
        </div>
        <div>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Streak</p>
          <p className="text-sm font-bold text-on-surface">{mission.streak}</p>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-on-surface">Progress</span>
          <span className={`text-xs font-bold ${appearance.progressValueClassName}`}>
            {mission.progress}
          </span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden ${appearance.progressTrackClassName}`}>
          <div
            className={`h-full rounded-full ${appearance.progressBarClassName}`}
            style={{ width: mission.progress }}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="flex-1 rounded-full border border-outline-variant/20 px-4 py-3 text-sm font-bold text-on-surface transition hover:bg-surface-container"
            onClick={onEdit}
            type="button"
          >
            Edit
          </button>
          <button
            className="flex-1 rounded-full bg-error/10 px-4 py-3 text-sm font-bold text-error transition hover:bg-error/15"
            onClick={onDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
