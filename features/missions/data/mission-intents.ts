import type { Mission, MissionStatus } from "@/features/missions/data/missions";

export type MissionIntentInput = {
  title: string;
  description: string;
  monthlyInvestmentAmount: number;
  goalAmount: number;
  targetDate: string;
  imageUrl: string | null;
  imageDescription: string | null;
};

export type MissionIntentFormValue = {
  title: string;
  description: string;
  monthlyInvestmentAmount: string;
  goalAmount: string;
  targetDate: string;
  imageUrl: string;
  imageDescription: string;
};

export type MissionSourceRow = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  monthly_investment_amount: number;
  goal_amount: number;
  target_date: string;
  total_invested_amount: number;
  image_url: string | null;
  image_description: string | null;
  status: MissionStatus;
};

export const missionSelectColumns = [
  "id",
  "user_id",
  "title",
  "description",
  "monthly_investment_amount",
  "goal_amount",
  "target_date",
  "total_invested_amount",
  "image_url",
  "image_description",
  "status",
].join(", ");

export const emptyMissionIntentFormValue: MissionIntentFormValue = {
  title: "",
  description: "",
  monthlyInvestmentAmount: "",
  goalAmount: "",
  targetDate: "",
  imageUrl: "",
  imageDescription: "",
};

const fallbackMissionImage =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 480'%3E%3Crect width='800' height='480' fill='%23E9E2D8'/%3E%3Ccircle cx='640' cy='120' r='84' fill='%23C7B9A5' opacity='0.6'/%3E%3Ccircle cx='180' cy='360' r='110' fill='%23D7C6B2' opacity='0.8'/%3E%3Cpath d='M0 380C86 314 176 294 272 316C364 336 430 404 520 408C614 412 690 356 800 286V480H0Z' fill='%23B98F67' opacity='0.9'/%3E%3Ctext x='64' y='118' fill='%23492F1D' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EMission Saver%3C/text%3E%3Ctext x='64' y='176' fill='%236B4B33' font-family='Arial, sans-serif' font-size='24'%3EAdd an image to personalize this goal.%3C/text%3E%3C/svg%3E";

function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function parsePositiveAmount(value: unknown, fieldName: string): number {
  const normalized = requireNonEmptyString(value, fieldName);
  const amount = Number(normalized);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`${fieldName} must be greater than 0.`);
  }

  return amount;
}

function parseTargetDate(value: unknown): string {
  const normalized = requireNonEmptyString(value, "Target date");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error("Target date must be a valid YYYY-MM-DD date.");
  }

  return normalized;
}

function parseOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function clampProgressPercent(totalInvestedAmount: number, goalAmount: number): number {
  if (goalAmount <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((totalInvestedAmount / goalAmount) * 100)));
}

function formatGoal(goalAmount: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(goalAmount);
}

function deriveMissionStatus(row: MissionSourceRow, progressPercent: number): MissionStatus {
  if (progressPercent >= 100) {
    return "Completed";
  }

  return row.status === "Paused" ? "Paused" : "Active";
}

function deriveMissionStreak(): string {
  // No monthly investment ledger exists yet, so streak remains a system-derived zero state.
  return "0 months";
}

export function parseMissionIntentInput(value: unknown): MissionIntentInput {
  if (!value || typeof value !== "object") {
    throw new Error("Mission payload is required.");
  }

  const input = value as Record<string, unknown>;

  return {
    title: requireNonEmptyString(input.title, "Title"),
    description: requireNonEmptyString(input.description, "Description"),
    monthlyInvestmentAmount: parsePositiveAmount(
      input.monthlyInvestmentAmount,
      "Monthly investment amount",
    ),
    goalAmount: parsePositiveAmount(input.goalAmount, "Goal amount"),
    targetDate: parseTargetDate(input.targetDate),
    imageUrl: parseOptionalString(input.imageUrl),
    imageDescription: parseOptionalString(input.imageDescription),
  };
}

export function buildMissionPresentation(row: MissionSourceRow): Mission {
  const progressPercent = clampProgressPercent(row.total_invested_amount, row.goal_amount);
  const status = deriveMissionStatus(row, progressPercent);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    monthlyInvestmentAmount: row.monthly_investment_amount,
    goalAmount: row.goal_amount,
    targetDate: row.target_date,
    totalInvestedAmount: row.total_invested_amount,
    targetDisplay: `${formatGoal(row.goal_amount)} by ${row.target_date}`,
    streakDisplay: deriveMissionStreak(),
    progressDisplay: `${progressPercent}%`,
    imageUrl: row.image_url,
    imageDescription: row.image_description,
    imageSrc: row.image_url ?? fallbackMissionImage,
    imageDataAlt: row.image_description ?? row.title,
    status,
  };
}

export function toMissionIntentFormValue(mission: Mission): MissionIntentFormValue {
  return {
    title: mission.title,
    description: mission.description,
    monthlyInvestmentAmount: mission.monthlyInvestmentAmount.toString(),
    goalAmount: mission.goalAmount.toString(),
    targetDate: mission.targetDate,
    imageUrl: mission.imageUrl ?? "",
    imageDescription: mission.imageDescription ?? "",
  };
}
