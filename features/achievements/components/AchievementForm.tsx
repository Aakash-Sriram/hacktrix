"use client";

import { useEffect, useState } from "react";

import {
  emptyAchievementMutation,
  type AchievementMutation,
} from "@/features/achievements/data/achievement-mutations";
import type { AchievementBadgeLabel } from "@/features/achievements/data/achievements";

type AchievementFormProps = {
  initialValue?: AchievementMutation;
  isPending: boolean;
  onCancel?: () => void;
  onSubmit: (value: AchievementMutation) => void;
  submitLabel: string;
};

const badgeLabels: AchievementBadgeLabel[] = ["Badge", "Streak Reward", "Certificate"];

export function AchievementForm({
  initialValue = emptyAchievementMutation,
  isPending,
  onCancel,
  onSubmit,
  submitLabel,
}: AchievementFormProps) {
  const [formValue, setFormValue] = useState<AchievementMutation>(initialValue);

  useEffect(() => {
    setFormValue(initialValue);
  }, [initialValue]);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formValue);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Title
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, title: event.target.value }))
            }
            required
            value={formValue.title}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Badge Label
          </span>
          <select
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({
                ...current,
                badgeLabel: event.target.value as AchievementBadgeLabel,
              }))
            }
            value={formValue.badgeLabel}
          >
            {badgeLabels.map((badgeLabel) => (
              <option key={badgeLabel} value={badgeLabel}>
                {badgeLabel}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="space-y-2 block">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
          Description
        </span>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
          onChange={(event) =>
            setFormValue((current) => ({ ...current, description: event.target.value }))
          }
          required
          value={formValue.description}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Criteria
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, criteria: event.target.value }))
            }
            required
            value={formValue.criteria}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Image URL
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, imageSrc: event.target.value }))
            }
            required
            type="url"
            value={formValue.imageSrc}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Image Alt Text
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, imageAlt: event.target.value }))
            }
            required
            value={formValue.imageAlt}
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Image Description
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, imageDataAlt: event.target.value }))
            }
            required
            value={formValue.imageDataAlt}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-on-primary transition disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        {onCancel ? (
          <button
            className="rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-bold text-on-surface transition hover:bg-surface-container"
            disabled={isPending}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
