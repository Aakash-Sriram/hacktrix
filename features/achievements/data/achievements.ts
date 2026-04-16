export type NavigationLink = {
  label: string;
  href: string;
  className: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type AchievementStat = {
  label: string;
  value: string;
  icon: string;
  cardClassName: string;
  labelClassName: string;
  iconClassName: string;
  valueClassName: string;
};

export type AchievementFilter = {
  label: string;
  value: "All" | AchievementBadgeLabel;
};

export type AchievementBadgeLabel = "Badge" | "Streak Reward" | "Certificate";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  criteria: string;
  badgeLabel: AchievementBadgeLabel;
  imageSrc: string;
  imageAlt: string;
  imageDataAlt: string;
};

export type AchievementBadgeClasses = {
  mobileBadgeClassName: string;
  desktopBadgeClassName: string;
};

export const navigationLinks: NavigationLink[] = [
  {
    label: "Missions",
    href: "#",
    className:
      "text-[#1C1C19]/60 hover:text-[#A43A3D] transition-colors duration-300",
  },
  {
    label: "Achievements",
    href: "#",
    className:
      "text-[#A43A3D] relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#006A63] after:rounded-full transition-colors duration-300",
  },
  {
    label: "Challenges",
    href: "#",
    className:
      "text-[#1C1C19]/60 hover:text-[#A43A3D] transition-colors duration-300",
  },
  {
    label: "Admin",
    href: "#",
    className:
      "text-[#1C1C19]/60 hover:text-[#A43A3D] transition-colors duration-300",
  },
];

export const achievementFilters: AchievementFilter[] = [
  { label: "All", value: "All" },
  { label: "Badge", value: "Badge" },
  { label: "Streak Reward", value: "Streak Reward" },
  { label: "Certificate", value: "Certificate" },
];

export const footerLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Support", href: "#" },
];

const achievementBadgeClassesByLabel: Record<AchievementBadgeLabel, AchievementBadgeClasses> = {
  Badge: {
    mobileBadgeClassName: "bg-secondary text-on-secondary",
    desktopBadgeClassName: "bg-secondary-fixed text-on-secondary-fixed",
  },
  "Streak Reward": {
    mobileBadgeClassName: "bg-tertiary-container text-on-tertiary",
    desktopBadgeClassName: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  Certificate: {
    mobileBadgeClassName: "bg-primary text-on-primary",
    desktopBadgeClassName: "bg-primary-fixed text-on-primary-fixed-variant",
  },
};

export function getAchievementBadgeClasses(
  badgeLabel: AchievementBadgeLabel,
): AchievementBadgeClasses {
  return achievementBadgeClassesByLabel[badgeLabel];
}

export function buildAchievementStats(achievements: Achievement[]): AchievementStat[] {
  const streakBadgeCount = achievements.filter(
    (achievement) => achievement.badgeLabel === "Streak Reward",
  ).length;
  const certificateCount = achievements.filter(
    (achievement) => achievement.badgeLabel === "Certificate",
  ).length;

  return [
    {
      label: "Total Achievements",
      value: achievements.length.toString(),
      icon: "military_tech",
      cardClassName:
        "bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(28,28,25,0.06)]",
      labelClassName: "text-on-surface-variant font-bold text-sm uppercase tracking-widest",
      iconClassName: "text-primary",
      valueClassName: "text-on-surface",
    },
    {
      label: "Streak Badges",
      value: streakBadgeCount.toString(),
      icon: "local_fire_department",
      cardClassName:
        "bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(28,28,25,0.06)] border-l-4 border-secondary",
      labelClassName:
        "text-on-surface-variant font-bold text-sm uppercase tracking-widest text-secondary",
      iconClassName: "text-secondary",
      valueClassName: "text-on-surface",
    },
    {
      label: "Shareable Certificates",
      value: certificateCount.toString(),
      icon: "verified",
      cardClassName:
        "bg-primary text-on-primary shadow-[0_32px_64px_-15px_rgba(164,58,61,0.2)]",
      labelClassName: "text-on-primary/60 font-bold text-sm uppercase tracking-widest",
      iconClassName: "text-on-primary",
      valueClassName: "",
    },
  ];
}

export type AchievementRow = {
  id: string;
  title: string;
  description: string;
  criteria: string;
  badge_label: AchievementBadgeLabel;
  image_src: string;
  image_alt: string;
  image_data_alt: string;
};

export const achievementSelectColumns =
  "id, title, description, criteria, badge_label, image_src, image_alt, image_data_alt";

export function mapAchievementRow(achievement: AchievementRow): Achievement {
  return {
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    criteria: achievement.criteria,
    badgeLabel: achievement.badge_label,
    imageSrc: achievement.image_src,
    imageAlt: achievement.image_alt,
    imageDataAlt: achievement.image_data_alt,
  };
}
