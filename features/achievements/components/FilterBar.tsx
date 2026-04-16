import {
  achievementFilters,
  type AchievementFilter,
} from "@/features/achievements/data/achievements";

type FilterBarProps = {
  activeFilter: AchievementFilter["value"];
  isCreateOpen: boolean;
  onCreateClick: () => void;
  onFilterChange: (filter: AchievementFilter["value"]) => void;
};

export function FilterBar({
  activeFilter,
  isCreateOpen,
  onCreateClick,
  onFilterChange,
}: FilterBarProps) {
  return (
    <section className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex flex-wrap items-center gap-3">
      {achievementFilters.map((filter) => (
        <button
          key={filter.label}
          className={
            filter.value === activeFilter
              ? "bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/20"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant px-8 py-3 rounded-full font-bold text-sm transition-all"
          }
          onClick={() => onFilterChange(filter.value)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
      </div>
      <button
        className="bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-surface-variant"
        onClick={onCreateClick}
        type="button"
      >
        {isCreateOpen ? "Close Creator" : "Create Achievement"}
      </button>
    </section>
  );
}
