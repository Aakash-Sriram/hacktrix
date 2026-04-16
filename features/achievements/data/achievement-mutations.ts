import type { AchievementBadgeLabel } from "@/features/achievements/data/achievements";

export type AchievementMutation = {
  title: string;
  description: string;
  criteria: string;
  badgeLabel: AchievementBadgeLabel;
  imageSrc: string;
  imageAlt: string;
  imageDataAlt: string;
};

const badgeLabels: AchievementBadgeLabel[] = ["Badge", "Streak Reward", "Certificate"];

export const emptyAchievementMutation: AchievementMutation = {
  title: "",
  description: "",
  criteria: "",
  badgeLabel: "Badge",
  imageSrc: "",
  imageAlt: "",
  imageDataAlt: "",
};

function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function parseBadgeLabel(value: unknown): AchievementBadgeLabel {
  if (typeof value === "string" && badgeLabels.includes(value as AchievementBadgeLabel)) {
    return value as AchievementBadgeLabel;
  }

  throw new Error("Badge label must be Badge, Streak Reward, or Certificate.");
}

export function parseAchievementMutation(value: unknown): AchievementMutation {
  if (!value || typeof value !== "object") {
    throw new Error("Achievement payload is required.");
  }

  const input = value as Record<string, unknown>;

  return {
    title: requireNonEmptyString(input.title, "Title"),
    description: requireNonEmptyString(input.description, "Description"),
    criteria: requireNonEmptyString(input.criteria, "Criteria"),
    badgeLabel: parseBadgeLabel(input.badgeLabel),
    imageSrc: requireNonEmptyString(input.imageSrc, "Image source"),
    imageAlt: requireNonEmptyString(input.imageAlt, "Image alt text"),
    imageDataAlt: requireNonEmptyString(input.imageDataAlt, "Image description"),
  };
}
