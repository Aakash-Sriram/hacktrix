import { missionFilters } from "@/features/missions/data/missions";
import styles from "@/features/missions/styles/mission-theme.module.css";

export function MissionFilterBar() {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="flex flex-wrap items-center gap-3">
        {missionFilters.map((filter) => (
          <button
            key={filter.label}
            className={
              filter.isActive
                ? "px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-sm transition-all"
                : "px-6 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-sm hover:bg-surface-container-high transition-all"
            }
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <button
        className={`flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-6 py-2.5 rounded-full text-sm font-bold text-on-surface ${styles.missionCardShadow} hover:bg-surface-container transition-all`}
        type="button"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        <span>Create Mission</span>
      </button>
    </section>
  );
}
