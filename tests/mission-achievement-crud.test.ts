import assert from "node:assert/strict";
import test from "node:test";

import { parseAchievementMutation } from "../features/achievements/data/achievement-mutations.ts";
import { parseMissionMutation } from "../features/missions/data/mission-mutations.ts";

test("parseMissionMutation trims text fields and keeps a valid mission status", () => {
  const mission = parseMissionMutation({
    title: "  Build runway  ",
    tagline: "  Weekly transfer  ",
    target: "  $500 / month  ",
    streak: "  4 weeks  ",
    progress: " 75% ",
    imageSrc: " https://example.com/mission.png ",
    imageDataAlt: " mission art ",
    status: "Completed",
  });

  assert.deepEqual(mission, {
    title: "Build runway",
    tagline: "Weekly transfer",
    target: "$500 / month",
    streak: "4 weeks",
    progress: "75%",
    imageSrc: "https://example.com/mission.png",
    imageDataAlt: "mission art",
    status: "Completed",
  });
});

test("parseMissionMutation rejects progress outside 0 to 100 percent", () => {
  assert.throws(
    () =>
      parseMissionMutation({
        title: "Emergency fund",
        tagline: "Rainy day savings",
        target: "$2,000",
        streak: "10 days",
        progress: "125%",
        imageSrc: "https://example.com/emergency.png",
        imageDataAlt: "Emergency fund illustration",
        status: "Active",
      }),
    /Progress must be a percentage between 0% and 100%\./,
  );
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
