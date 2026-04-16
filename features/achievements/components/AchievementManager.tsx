"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  createAchievement,
  deleteAchievement,
  updateAchievement,
} from "@/features/achievements/actions";
import { AchievementCard } from "@/features/achievements/components/AchievementCard";
import { AchievementForm } from "@/features/achievements/components/AchievementForm";
import { EmptyStatePromo } from "@/features/achievements/components/EmptyStatePromo";
import { FilterBar } from "@/features/achievements/components/FilterBar";
import { StatsGrid } from "@/features/achievements/components/StatsGrid";
import {
  emptyAchievementMutation,
  type AchievementMutation,
} from "@/features/achievements/data/achievement-mutations";
import type {
  Achievement,
  AchievementFilter,
  AchievementStat,
} from "@/features/achievements/data/achievements";

type AchievementManagerProps = {
  achievements: Achievement[];
  stats: AchievementStat[];
};

function toAchievementMutation(achievement: Achievement): AchievementMutation {
  return {
    title: achievement.title,
    description: achievement.description,
    criteria: achievement.criteria,
    badgeLabel: achievement.badgeLabel,
    imageSrc: achievement.imageSrc,
    imageAlt: achievement.imageAlt,
    imageDataAlt: achievement.imageDataAlt,
  };
}

export function AchievementManager({ achievements, stats }: AchievementManagerProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<AchievementFilter["value"]>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(achievements.length === 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredAchievements =
    activeFilter === "All"
      ? achievements
      : achievements.filter((achievement) => achievement.badgeLabel === activeFilter);
  const filteredStats =
    activeFilter === "All"
      ? stats
      : [
          {
            ...stats[0],
            value: filteredAchievements.length.toString(),
          },
          stats[1],
          stats[2],
        ];

  const runMutation = (task: () => Promise<void>) => {
    setErrorMessage(null);

    startTransition(() => {
      void (async () => {
        try {
          await task();
          router.refresh();
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "Unable to save achievement.",
          );
        }
      })();
    });
  };

  return (
    <>
      <FilterBar
        activeFilter={activeFilter}
        isCreateOpen={isCreateOpen}
        onCreateClick={() => {
          setEditingId(null);
          setIsCreateOpen((current) => !current);
        }}
        onFilterChange={setActiveFilter}
      />

      {errorMessage ? (
        <div className="rounded-3xl border border-error/20 bg-error/10 px-5 py-4 text-sm font-medium text-error">
          {errorMessage}
        </div>
      ) : null}

      {isCreateOpen ? (
        <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8 shadow-[0_32px_64px_-15px_rgba(28,28,25,0.06)]">
          <div className="mb-6 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Create Achievement
            </p>
            <h2 className="text-2xl font-bold text-on-surface">
              Add an achievement for this account
            </h2>
          </div>
          <AchievementForm
            initialValue={emptyAchievementMutation}
            isPending={isPending}
            onCancel={() => setIsCreateOpen(false)}
            onSubmit={(value) =>
              runMutation(async () => {
                await createAchievement(value);
                setIsCreateOpen(false);
              })
            }
            submitLabel="Create Achievement"
          />
        </section>
      ) : null}

      <StatsGrid stats={filteredStats} />

      {filteredAchievements.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              achievement={achievement}
              isEditing={editingId === achievement.id}
              isPending={isPending}
              key={achievement.id}
              onDelete={() => {
                if (!window.confirm(`Delete "${achievement.title}"?`)) {
                  return;
                }

                runMutation(async () => {
                  await deleteAchievement(achievement.id);

                  if (editingId === achievement.id) {
                    setEditingId(null);
                  }
                });
              }}
              onEdit={() => {
                setIsCreateOpen(false);
                setEditingId(achievement.id);
              }}
            >
              <AchievementForm
                initialValue={toAchievementMutation(achievement)}
                isPending={isPending}
                onCancel={() => setEditingId(null)}
                onSubmit={(value) =>
                  runMutation(async () => {
                    await updateAchievement(achievement.id, value);
                    setEditingId(null);
                  })
                }
                submitLabel="Save Achievement"
              />
            </AchievementCard>
          ))}
        </section>
      ) : (
        <EmptyStatePromo isEmpty={achievements.length === 0} />
      )}
    </>
  );
}
