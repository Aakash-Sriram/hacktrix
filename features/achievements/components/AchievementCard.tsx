import type { Achievement } from "@/features/achievements/data/achievements";

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <article className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col md:flex-row group transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(28,28,25,0.08)]">
      <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
        <img
          alt={achievement.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          data-alt={achievement.imageDataAlt}
          src={achievement.imageSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent flex items-end p-6 md:hidden">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${achievement.mobileBadgeClassName}`}
          >
            {achievement.badgeLabel}
          </span>
        </div>
      </div>
      <div className="md:w-3/5 p-8 flex flex-col justify-between space-y-6">
        <div>
          <div className="hidden md:block mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${achievement.desktopBadgeClassName}`}
            >
              {achievement.badgeLabel}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-on-surface mb-2">{achievement.title}</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm font-semibold text-secondary">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Criteria: {achievement.criteria}</span>
          </div>
          <button
            className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-bold flex items-center justify-center space-x-2 active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined">share</span>
            <span>Share Certificate</span>
          </button>
        </div>
      </div>
    </article>
  );
}
