import type { AchievementStat } from "@/features/achievements/data/achievements";

type StatsGridProps = {
  stats: AchievementStat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-8 rounded-lg flex flex-col justify-between min-h-[160px] group hover:translate-y-[-4px] transition-transform duration-300 ${stat.cardClassName}`}
        >
          <div className="flex justify-between items-start">
            <span className={stat.labelClassName}>{stat.label}</span>
            <span className={`material-symbols-outlined text-3xl ${stat.iconClassName}`}>
              {stat.icon}
            </span>
          </div>
          <div className={`text-6xl font-extrabold ${stat.valueClassName}`}>{stat.value}</div>
        </div>
      ))}
    </section>
  );
}
