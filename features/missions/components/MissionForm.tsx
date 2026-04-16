"use client";

import { useEffect, useState } from "react";

import {
  emptyMissionIntentFormValue,
  type MissionIntentFormValue,
} from "@/features/missions/data/mission-intents";

type MissionFormProps = {
  initialValue?: MissionIntentFormValue;
  isPending: boolean;
  onCancel?: () => void;
  onSubmit: (value: MissionIntentFormValue) => void;
  submitLabel: string;
};

export function MissionForm({
  initialValue = emptyMissionIntentFormValue,
  isPending,
  onCancel,
  onSubmit,
  submitLabel,
}: MissionFormProps) {
  const [formValue, setFormValue] = useState<MissionIntentFormValue>(initialValue);

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
            Description
          </span>
          <textarea
            className="min-h-24 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, description: event.target.value }))
            }
            required
            value={formValue.description}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Monthly Investment Amount
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            min="0.01"
            onChange={(event) =>
              setFormValue((current) => ({
                ...current,
                monthlyInvestmentAmount: event.target.value,
              }))
            }
            required
            step="0.01"
            type="number"
            value={formValue.monthlyInvestmentAmount}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Goal Amount
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            min="0.01"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, goalAmount: event.target.value }))
            }
            required
            step="0.01"
            type="number"
            value={formValue.goalAmount}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Target Date
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, targetDate: event.target.value }))
            }
            required
            type="date"
            value={formValue.targetDate}
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Image URL
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, imageUrl: event.target.value }))
            }
            type="url"
            value={formValue.imageUrl}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Image Description
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({
                ...current,
                imageDescription: event.target.value,
              }))
            }
            value={formValue.imageDescription}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full bg-primary-container px-6 py-3 text-sm font-bold text-on-primary-container transition disabled:cursor-not-allowed disabled:opacity-70"
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
