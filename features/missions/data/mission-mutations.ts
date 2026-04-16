import type { MissionStatus } from "@/features/missions/data/missions";

export type MissionMutation = {
  title: string;
  tagline: string;
  target: string;
  streak: string;
  progress: string;
  imageSrc: string;
  imageDataAlt: string;
  status: MissionStatus;
};

const missionStatuses: MissionStatus[] = ["Active", "Completed", "Paused"];

export const emptyMissionMutation: MissionMutation = {
  title: "",
  tagline: "",
  target: "",
  streak: "",
  progress: "0%",
  imageSrc: "",
  imageDataAlt: "",
  status: "Active",
};

function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function parseMissionStatus(value: unknown): MissionStatus {
  if (typeof value === "string" && missionStatuses.includes(value as MissionStatus)) {
    return value as MissionStatus;
  }

  throw new Error("Status must be Active, Completed, or Paused.");
}

function parseMissionProgress(value: unknown): string {
  const progress = requireNonEmptyString(value, "Progress");
  const match = /^(100|[1-9]?\d)%$/.exec(progress);

  if (!match) {
    throw new Error("Progress must be a percentage between 0% and 100%.");
  }

  return progress;
}

export function parseMissionMutation(value: unknown): MissionMutation {
  if (!value || typeof value !== "object") {
    throw new Error("Mission payload is required.");
  }

  const input = value as Record<string, unknown>;

  return {
    title: requireNonEmptyString(input.title, "Title"),
    tagline: requireNonEmptyString(input.tagline, "Tagline"),
    target: requireNonEmptyString(input.target, "Target"),
    streak: requireNonEmptyString(input.streak, "Streak"),
    progress: parseMissionProgress(input.progress),
    imageSrc: requireNonEmptyString(input.imageSrc, "Image source"),
    imageDataAlt: requireNonEmptyString(input.imageDataAlt, "Image description"),
    status: parseMissionStatus(input.status),
  };
}
