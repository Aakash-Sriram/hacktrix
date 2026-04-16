"use client";

import { useEffect, useState } from "react";

import {
  emptyMissionMutation,
  type MissionMutation,
} from "@/features/missions/data/mission-mutations";
import type { MissionStatus } from "@/features/missions/data/missions";

type MissionFormProps = {
  initialValue?: MissionMutation;
  isPending: boolean;
  onCancel?: () => void;
  onSubmit: (value: MissionMutation) => void;
  submitLabel: string;
};

const missionStatuses: MissionStatus[] = ["Active", "Completed", "Paused"];

export function MissionForm({
  initialValue = emptyMissionMutation,
  isPending,
  onCancel,
  onSubmit,
  submitLabel,
}: MissionFormProps) {
  const [formValue, setFormValue] = useState<MissionMutation>(initialValue);

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
            Tagline
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, tagline: event.target.value }))
            }
            required
            value={formValue.tagline}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Target
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, target: event.target.value }))
            }
            required
            value={formValue.target}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Streak
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, streak: event.target.value }))
            }
            required
            value={formValue.streak}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Progress
          </span>
          <input
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({ ...current, progress: event.target.value }))
            }
            pattern="^(100|[1-9]?\d)%$"
            placeholder="75%"
            required
            value={formValue.progress}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Status
          </span>
          <select
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
            onChange={(event) =>
              setFormValue((current) => ({
                ...current,
                status: event.target.value as MissionStatus,
              }))
            }
            value={formValue.status}
          >
            {missionStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
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
              setFormValue((current) => ({ ...current, imageSrc: event.target.value }))
            }
            required
            type="url"
            value={formValue.imageSrc}
          />
        </label>
        <label className="space-y-2">
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
