import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAchievementStats,
  getAchievementBadgeClasses,
  type Achievement,
} from "../features/achievements/data/achievements.ts";
import { getMissionAppearance } from "../features/missions/data/missions.ts";

test("getMissionAppearance returns paused mission styling from status", () => {
  const appearance = getMissionAppearance("Paused");

  assert.equal(appearance.articleClassName, "opacity-80");
  assert.equal(appearance.imageClassName, "grayscale");
  assert.equal(appearance.statusBadgeClassName, "bg-tertiary-container text-white");
});

test("getAchievementBadgeClasses returns certificate badge styling from badge label", () => {
  const badgeClasses = getAchievementBadgeClasses("Certificate");

  assert.deepEqual(badgeClasses, {
    mobileBadgeClassName: "bg-primary text-on-primary",
    desktopBadgeClassName: "bg-primary-fixed text-on-primary-fixed-variant",
  });
});

test("buildAchievementStats counts achievements by controlled badge label", () => {
  const achievements: Achievement[] = [
    {
      id: "achievement-1",
      title: "First Step Forward",
      description: "Completed your first lesson.",
      criteria: "Finish 1 Introductory Lesson",
      badgeLabel: "Badge",
      imageSrc: "https://example.com/badge.png",
      imageAlt: "Badge artwork",
      imageDataAlt: "Badge artwork",
    },
    {
      id: "achievement-2",
      title: "Daily Learner",
      description: "Held a 7-day streak.",
      criteria: "Study 7 Days Consecutively",
      badgeLabel: "Streak Reward",
      imageSrc: "https://example.com/streak.png",
      imageAlt: "Streak artwork",
      imageDataAlt: "Streak artwork",
    },
    {
      id: "achievement-3",
      title: "Master of Basics",
      description: "Completed the beginner curriculum.",
      criteria: "Complete Beginner Curriculum",
      badgeLabel: "Certificate",
      imageSrc: "https://example.com/certificate.png",
      imageAlt: "Certificate artwork",
      imageDataAlt: "Certificate artwork",
    },
  ];

  const stats = buildAchievementStats(achievements);

  assert.deepEqual(
    stats.map(({ label, value }) => ({ label, value })),
    [
      { label: "Total Achievements", value: "3" },
      { label: "Streak Badges", value: "1" },
      { label: "Shareable Certificates", value: "1" },
    ],
  );
});
