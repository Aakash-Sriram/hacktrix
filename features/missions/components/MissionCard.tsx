import type { Mission } from "@/features/missions/data/missions";
import styles from "@/features/missions/styles/mission-theme.module.css";

type MissionCardProps = {
  mission: Mission;
};

export function MissionCard({ mission }: MissionCardProps) {
  return (
    <article
      className={`bg-surface-container-lowest rounded-lg p-6 ${styles.missionCardShadow} flex flex-col group hover:-translate-y-1 transition-transform duration-300 ${mission.articleClassName ?? ""}`}
    >
      <div
        className={`relative w-full h-48 mb-6 rounded-md overflow-hidden ${mission.imageWrapperClassName ?? ""}`}
      >
        <img
          alt={mission.title}
          className={`w-full h-full object-cover ${mission.imageClassName ?? ""}`}
          data-alt={mission.imageDataAlt}
          src={mission.imageSrc}
        />
        <div
          className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${mission.statusBadgeClassName}`}
        >
          {mission.status}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-on-surface mb-1">{mission.title}</h3>
        <p className={`text-xs font-bold uppercase tracking-wider ${mission.taglineClassName}`}>
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
          <span className={`text-xs font-bold ${mission.progressValueClassName}`}>
            {mission.progress}
          </span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden ${mission.progressTrackClassName}`}>
          <div
            className={`h-full rounded-full ${mission.progressBarClassName}`}
            style={{ width: mission.progress }}
          />
        </div>
      </div>
    </article>
  );
}
