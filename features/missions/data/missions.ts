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
  id: string;
  title: string;
  tagline: string;
  target: string;
  streak: string;
  progress: string;
  imageSrc: string;
  imageDataAlt: string;
  status: MissionStatus;
};

export type MissionAppearance = {
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
  { href: "/", label: "Missions", isActive: true },
  { href: "/achievements", label: "Achievements" },
  { href: "#", label: "Challenges" },
  { href: "#", label: "Admin" },
];

export const missionFilters: MissionFilter[] = [
  { label: "All", isActive: true },
  { label: "Active" },
  { label: "Completed" },
  { label: "Paused" },
];

const missionAppearanceByStatus: Record<MissionStatus, MissionAppearance> = {
  Active: {
    taglineClassName: "text-[#A43A3D]",
    statusBadgeClassName: "bg-secondary text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-secondary",
  },
  Completed: {
    articleClassName: "opacity-90",
    imageWrapperClassName: "grayscale-[0.2]",
    taglineClassName: "text-on-surface-variant",
    statusBadgeClassName: "bg-on-surface text-white",
    progressValueClassName: "text-secondary",
    progressTrackClassName: "bg-secondary/20",
    progressBarClassName: "bg-secondary",
  },
  Paused: {
    articleClassName: "opacity-80",
    imageClassName: "grayscale",
    taglineClassName: "text-on-surface-variant",
    statusBadgeClassName: "bg-tertiary-container text-white",
    progressValueClassName: "text-on-surface-variant",
    progressTrackClassName: "bg-surface-container",
    progressBarClassName: "bg-surface-variant",
  },
};

export function getMissionAppearance(status: MissionStatus): MissionAppearance {
  return missionAppearanceByStatus[status];
}

export type MissionRow = {
  id: string;
  title: string;
  tagline: string;
  target: string;
  streak: string;
  progress: string;
  image_src: string;
  image_data_alt: string;
  status: MissionStatus;
};

export const missionSelectColumns =
  "id, title, tagline, target, streak, progress, image_src, image_data_alt, status";

export function mapMissionRow(mission: MissionRow): Mission {
  return {
    id: mission.id,
    title: mission.title,
    tagline: mission.tagline,
    target: mission.target,
    streak: mission.streak,
    progress: mission.progress,
    imageSrc: mission.image_src,
    imageDataAlt: mission.image_data_alt,
    status: mission.status,
  };
}
