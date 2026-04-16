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
  className: string;
};

export type Achievement = {
  title: string;
  description: string;
  criteria: string;
  badgeLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageDataAlt: string;
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

export const achievementStats: AchievementStat[] = [
  {
    label: "Total Achievements",
    value: "8",
    icon: "military_tech",
    cardClassName:
      "bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(28,28,25,0.06)]",
    labelClassName: "text-on-surface-variant font-bold text-sm uppercase tracking-widest",
    iconClassName: "text-primary",
    valueClassName: "text-on-surface",
  },
  {
    label: "Streak Badges",
    value: "0",
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
    value: "7",
    icon: "verified",
    cardClassName:
      "bg-primary text-on-primary shadow-[0_32px_64px_-15px_rgba(164,58,61,0.2)]",
    labelClassName: "text-on-primary/60 font-bold text-sm uppercase tracking-widest",
    iconClassName: "text-on-primary",
    valueClassName: "",
  },
];

export const achievementFilters: AchievementFilter[] = [
  {
    label: "All",
    className:
      "bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/20",
  },
  {
    label: "Milestones",
    className:
      "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant px-8 py-3 rounded-full font-bold text-sm transition-all",
  },
  {
    label: "Streaks",
    className:
      "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant px-8 py-3 rounded-full font-bold text-sm transition-all",
  },
  {
    label: "Completions",
    className:
      "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant px-8 py-3 rounded-full font-bold text-sm transition-all",
  },
  {
    label: "Special",
    className:
      "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant px-8 py-3 rounded-full font-bold text-sm transition-all",
  },
];

export const achievements: Achievement[] = [
  {
    title: "First Step Forward",
    description: "Completed your very first lesson on the path to financial literacy.",
    criteria: "Finish 1 Introductory Lesson",
    badgeLabel: "Badge",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCVlcneUnYqSJVSrhg9L06FPXCANuZ8gOJvacvOEcMzb9FZfBe6ThjVnFZoBBg-lFWcjxxplxAvYX2mpTfdbfJN6Gmk8UnjFZqPp68gOe6qoeO2zQwwwBJXwQzOp1j7VE815Y31K_Z7ER7xYKyLVcWCl92QmNTd1sCLYKjZMyYSYpYJG3MUG7WrBWVwWpc4-T68LIPwUpewkDVFYKaIbieok-2-EOTPlFUExEdJn4k0vtr7dmcsOiuMPLK_7mn72pN0w_uuJ2zwlA",
    imageAlt: "Achievement badge image",
    imageDataAlt:
      "Abstract vibrant coral and gold geometric shapes exploding from the center with soft textured grain background",
    mobileBadgeClassName: "bg-secondary text-on-secondary",
    desktopBadgeClassName: "bg-secondary-fixed text-on-secondary-fixed",
  },
  {
    title: "Learning Enthusiast",
    description:
      "You've reached double digits! 10 lessons completed and your knowledge is blooming.",
    criteria: "Complete 10 Unique Lessons",
    badgeLabel: "Badge",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4cxAQT6jEupHTvQKXuoX3RQf2IuhY36HJI5BK3AhcK6oDuxcKu1QZH2HpcS8zfxq1cf83g80E5RQxdenkYb0oZcFroHe5d7qF3NmhH4FD38Wfsi7VStv9XbEjIZqmxI7wLPDNymAAJjErzXlovB_N-gvBylSs5TY3cCGiZd_bO1IEpqX4FWUWyYeYwlVcQ9Z7scd3J7fNyj0cjjkjug7ph6wXhWrPMbXyEam_yaSa88lVtXblbaFgPABPE5u4kYOAWGqJeO3tnF0",
    imageAlt: "Learning achievement",
    imageDataAlt:
      "Stack of minimalist design books on a warm wooden desk with bright morning sunlight and long soft shadows",
    mobileBadgeClassName: "bg-secondary text-on-secondary",
    desktopBadgeClassName: "bg-secondary-fixed text-on-secondary-fixed",
  },
  {
    title: "Daily Learner",
    description:
      "The secret of success is consistency. You maintained a perfect 7-day streak.",
    criteria: "Study 7 Days Consecutively",
    badgeLabel: "Streak Reward",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0KgW67Lf6KToLVt1z8aWt1XOHm-rF93--_hsYWk1BmU5oWjLxxMny_kajJOWDy03eBHdzUCz7MAf_EFUc54-roOg2rZKx8cvYDuGekbPnu6UIUUvlUlLgyFvhk7r-bSkrni4DSKiRpu7t0-DeOApMu_yIO4vax_bCEkbvJ6XLjUoyHB-YyGCw8QobZSypH-JHlZLKIvcBoCYRIj5og6_ZRruBkxSutza4GXtkLDBA21XG_skH8OX8GDGvevbaqVDH62ylwmf2MMk",
    imageAlt: "Streak achievement",
    imageDataAlt:
      "Close-up of a modern laptop and a warm cup of coffee on a minimal white desk during a peaceful sunrise",
    mobileBadgeClassName: "bg-tertiary-container text-on-tertiary",
    desktopBadgeClassName: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    title: "Master of Basics",
    description:
      "A major milestone! You've completed all beginner-level courses with distinction.",
    criteria: "Complete Beginner Curriculum",
    badgeLabel: "Certificate",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC1PgPYDOwLcoCxLL5ERP6cNtWmNBiIJm6hDFQVYhOLJsNsWE0ElS8lRlHIeYL4zVKRXh_HFtBAbKSpOyHJg6nrkALvuyGjx4cC0bFYjGJgQEGs3IG__XAZqcGokE6SzB5ZxmJfX3FXWHo-vzDN-wQ4QieFTJnRB95c4gYutx1Sgh2FIJrwOljfbK-U8E9UKpP0EQ8DHykSBNiANRB8eKUAW2rUU5RLjjYRm82qDIICjCbLPXoI9FsNfFlXlut7GWLG6w_ADtcsJw",
    imageAlt: "Certificate achievement",
    imageDataAlt:
      "High-end elegant certificate design with sophisticated serif typography on heavy textured parchment paper with gold foil seal",
    mobileBadgeClassName: "bg-primary text-on-primary",
    desktopBadgeClassName: "bg-primary-fixed text-on-primary-fixed-variant",
  },
];

export const footerLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Support", href: "#" },
];
