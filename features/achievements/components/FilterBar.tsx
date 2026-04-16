import { achievementFilters } from "@/features/achievements/data/achievements";

export function FilterBar() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      {achievementFilters.map((filter) => (
        <button
          key={filter.label}
          className={filter.className}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </section>
  );
}
