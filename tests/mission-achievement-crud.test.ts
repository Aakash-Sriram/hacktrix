import assert from "node:assert/strict";
import test from "node:test";

import { parseAchievementMutation } from "../features/achievements/data/achievement-mutations.ts";
import {
  buildMissionPresentation,
  parseMissionIntentInput,
  type MissionSourceRow,
} from "../features/missions/data/mission-intents.ts";

test("parseMissionIntentInput trims mission inputs and normalizes optional image fields", () => {
  const mission = parseMissionIntentInput({
    title: "  Build runway  ",
    description: "  Weekly transfer  ",
    monthlyInvestmentAmount: " 5000 ",
    goalAmount: " 100000 ",
    targetDate: " 2030-06-01 ",
    imageUrl: "   ",
    imageDescription: "   ",
  });

  assert.deepEqual(mission, {
    title: "Build runway",
    description: "Weekly transfer",
    monthlyInvestmentAmount: 5000,
    goalAmount: 100000,
    targetDate: "2030-06-01",
    imageUrl: null,
    imageDescription: null,
  });
});

test("parseMissionIntentInput rejects invalid numeric mission inputs", () => {
  assert.throws(
    () =>
      parseMissionIntentInput({
        title: "Emergency fund",
        description: "Rainy day savings",
        monthlyInvestmentAmount: "0",
        goalAmount: "10000",
        targetDate: "2030-01-01",
      }),
    /Monthly investment amount must be greater than 0\./,
  );
});

test("buildMissionPresentation derives progress, target, and streak server-side", () => {
  const mission = buildMissionPresentation({
    id: "mission-1",
    user_id: "user-1",
    title: "House",
    description: "#WELIVINGBIG",
    monthly_investment_amount: 5000,
    goal_amount: 100000,
    target_date: "2030-06-01",
    total_invested_amount: 25000,
    image_url: null,
    image_description: null,
    status: "Active",
  } satisfies MissionSourceRow);

  assert.equal(mission.description, "#WELIVINGBIG");
  assert.equal(mission.targetDisplay, "100,000 by 2030-06-01");
  assert.equal(mission.progressDisplay, "25%");
  assert.equal(mission.streakDisplay, "0 months");
  assert.equal(mission.status, "Active");
});

test("buildMissionPresentation marks a finished mission as completed", () => {
  const mission = buildMissionPresentation({
    id: "mission-2",
    user_id: "user-2",
    title: "Emergency Fund",
    description: "Six months of safety",
    monthly_investment_amount: 1000,
    goal_amount: 10000,
    target_date: "2029-01-01",
    total_invested_amount: 15000,
    image_url: "https://example.com/fund.png",
    image_description: "Emergency fund artwork",
    status: "Active",
  } satisfies MissionSourceRow);

  assert.equal(mission.progressDisplay, "100%");
  assert.equal(mission.status, "Completed");
  assert.equal(mission.imageSrc, "https://example.com/fund.png");
});

test("parseAchievementMutation trims fields and keeps a valid badge label", () => {
  const achievement = parseAchievementMutation({
    title: "  First $1k Saved  ",
    description: "  You crossed your first major milestone.  ",
    criteria: "  Save $1,000 total  ",
    badgeLabel: "Certificate",
    imageSrc: " https://example.com/achievement.png ",
    imageAlt: " achievement art ",
    imageDataAlt: " framed certificate ",
  });

  assert.deepEqual(achievement, {
    title: "First $1k Saved",
    description: "You crossed your first major milestone.",
    criteria: "Save $1,000 total",
    badgeLabel: "Certificate",
    imageSrc: "https://example.com/achievement.png",
    imageAlt: "achievement art",
    imageDataAlt: "framed certificate",
  });
});

test("parseAchievementMutation rejects unsupported badge labels", () => {
  assert.throws(
    () =>
      parseAchievementMutation({
        title: "Top Saver",
        description: "Stayed consistent",
        criteria: "Save every week",
        badgeLabel: "Trophy",
        imageSrc: "https://example.com/top-saver.png",
        imageAlt: "Top saver artwork",
        imageDataAlt: "Top saver artwork",
      }),
    /Badge label must be Badge, Streak Reward, or Certificate\./,
  );
});
