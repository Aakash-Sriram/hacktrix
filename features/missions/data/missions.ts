export type NavigationLink = {
  href: string;
  label: string;
  isActive?: boolean;
};

export type MissionFilter = {
  label: string;
  isActive?: boolean;
};

export type MissionStatus = "Active" | "Completed" | "Paused";

export type Mission = {
  title: string;
  tagline: string;
  target: string;
  streak: string;
  progress: string;
  imageSrc: string;
  imageDataAlt: string;
  status: MissionStatus;
  articleClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  taglineClassName: string;
  statusBadgeClassName: string;
  progressValueClassName: string;
  progressTrackClassName: string;
  progressBarClassName: string;
};

export const navigationLinks: NavigationLink[] = [
  { href: "#", label: "Missions", isActive: true },
  { href: "#", label: "Achievements" },
  { href: "#", label: "Challenges" },
  { href: "#", label: "Admin" },
];

export const missionFilters: MissionFilter[] = [
  { label: "All", isActive: true },
  { label: "Active" },
  { label: "Completed" },
  { label: "Paused" },
];

export const missions: Mission[] = [
  {
    title: "Emergency Fund Starter",
    tagline: "do or die",
    target: "$677,895,656",
    streak: "0 days",
    progress: "0%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOu6H0eblvuuxmM8u55aiWdV2qN4_eGPYCXZhpYw3gJXs0JWlIbewXW05gX4HSGGXzOgYXoRe2aYeu5Sr0njQqnpKT1KBkTlVKHzT6ny63w0KidAKC8tNGf5pgCD3UJ_TdU4AQv-7EUK-hN7DZTZlg6XH3K7MUD4iqa4u2J2zkynwMknBO05J6UnUJpM_lgvGpeWPpw3R5bE50wTrjLgII2dUmzM-Q9JkgZxCsy-0goi8hcpcTp3Gt7TdBNpR14ljzQa38_GkbPKs",
    imageDataAlt:
      "close-up of growing green sprout in a glass jar filled with coins on a wooden desk",
    status: "Active",
    taglineClassName: "text-[#A43A3D]",
    statusBadgeClassName: "bg-secondary text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-secondary",
  },
  {
    title: "Dream Vacation to Japan",
    tagline: "adventure awaits",
    target: "$5,000",
    streak: "12 days",
    progress: "50%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJG5x21IYqid7UfPU4DrhG13ycYKX1bUGogmM7NNBNJRJejyP2f3RT0EZh80LSqL_ZaEopej0OomhFkMx5DpfoER39mofPhBL26_zAL_HPYoikUW5e9RsLgLR36b8IlofJcyWAqblPjr9lpccmPD4FRCZ0Vm5CfDSUB0eoJMOlijd2ChxM_plJ_0SyO1aaMz4lIlb1YKX5EvCPoru14yzEEKlmNJCApP-x9dXvizNcgZ5u9y1GGg0aSpOOPyDaTpYk7tC8EzLbW8I",
    imageDataAlt:
      "serene traditional japanese pagoda surrounded by cherry blossoms at sunrise with soft pink lighting",
    status: "Active",
    taglineClassName: "text-[#A43A3D]",
    statusBadgeClassName: "bg-secondary text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-secondary",
  },
  {
    title: "New MacBook Pro",
    tagline: "power user",
    target: "$2,400",
    streak: "45 days",
    progress: "60%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA94B-qujUJT7apw_itXLpOg-rYIGH7PUvWbMulpPwUlXlcEu5VeVCnBp6gkZJBQArimucoKglWAL5-YWPJz_KuHWLy1HFpgA4RFDKdnU5D0mPpwj5e5_0AhmpwJnG4QtYRiWrBYQvnCMtgAIuHmOYxnCU3Od26uCHWF7Z0ttjCRJsFIvqYswCV_R3gz2AKgEb6ZnyLdg1wMMa60BqEENWhD2tJpqH2G9sBCquxtK2xcYuJK553T95thrzdcUfor8bGJYeKsH78CZE",
    imageDataAlt:
      "clean minimal workspace with a modern silver laptop on a white desk with a small plant",
    status: "Active",
    taglineClassName: "text-[#A43A3D]",
    statusBadgeClassName: "bg-secondary text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-secondary",
  },
  {
    title: "Emergency Fund Boost",
    tagline: "security first",
    target: "$10,000",
    streak: "180 days",
    progress: "100%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATpaardYkpUydSvFvSF6Ivyne1wkQtiqXfw1-aWWWfl0klkqu4lU5GnBHv92cAeNSH5xkdr8gRJ1Mq_khcGfi6xzUlzC4Nf8Cg9YMJ-jZxWobjKubplmT-zdA0i5TQJ_R2viKzBipVRWBOZxjThOvQb4sWysEd0f6Zoqym0HWDHzaAmQOWW10l-pvCjr453BeL09lQ5rOjuuNaQaafdEr5xrLwJ7GeFbe_L90ZuRQbhRWPLNwFRlknGv-pBqXubaRNXIgSuF9GAkM",
    imageDataAlt:
      "overhead view of organized financial documents and a calculator on a textured ivory surface",
    status: "Completed",
    articleClassName: "opacity-90",
    imageWrapperClassName: "grayscale-[0.2]",
    taglineClassName: "text-on-surface-variant",
    statusBadgeClassName: "bg-on-surface text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-secondary/20",
    progressBarClassName: "bg-secondary",
  },
  {
    title: "House Down Payment",
    tagline: "building foundations",
    target: "$50,000",
    streak: "92 days",
    progress: "25%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgFus0RbKb0OyXVE1bb1GPjHsh-RdRXs4O9ImZ8hMsQtDBBpBo2ElQ9xE_9UC4hlTW9_ZZCPCaUb2zLqi10pGGCJPXMra5hv6l7lifmJ2bIUeCZcihEzyNns8XkknX2rDCY9syuWW0rxNDbcElnjnxk--PXo0ainI0COjd14B_EFW_yz6M66Ru1FjreWaNqLLphD98HmMNvpPWtTyooDWR9ZA6qJhdQrfvmIyYTCes51nimxVm1BZTT3SXQTo6YxgJYpg1kPNofAQ",
    imageDataAlt:
      "modern minimalist house keys resting on a clean wooden table with sunlight streaming in",
    status: "Active",
    taglineClassName: "text-[#A43A3D]",
    statusBadgeClassName: "bg-secondary text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-secondary",
  },
  {
    title: "New Electric Car",
    tagline: "green future",
    target: "$45,000",
    streak: "Paused",
    progress: "15%",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAekbl7cdOy1YywU4aFYzqUdSMATJmfBV9WB_DKo_w42-hkWzN0sBCRUE-XvgFmzVYnO3jGIeBuO092_bBkXbOiP0F5w-qmi3Nt9Mje1wusyELNMNus7ZhQ5ufjCa4EIj8to65m7Yc7E4b8H0KfM5XL05AkYN8zRDAWcVm7eECupZDP4ubjG6FzIJQAmuohnmjGYrLYCdD4ofawGp1N8m3Cd0CfBSwoSxU0Lt_kqjfEGr1A-mMUsBW0cILNDTR4gmEgLb8o4xo1h4o",
    imageDataAlt:
      "sleek white electric vehicle charging at a modern station in a clean urban environment",
    status: "Paused",
    articleClassName: "opacity-80",
    imageClassName: "grayscale",
    taglineClassName: "text-on-surface-variant",
    statusBadgeClassName: "bg-tertiary-container text-white",
    progressValueClassName: "text-on-surface-variant",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-surface-variant",
  },
];
