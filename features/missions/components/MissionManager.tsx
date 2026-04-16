"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { requestJson } from "@/lib/api";
import { MissionFilterBar } from "@/features/missions/components/MissionFilterBar";
import { MissionForm } from "@/features/missions/components/MissionForm";
import { MissionGrid } from "@/features/missions/components/MissionGrid";
import { emptyMissionMutation } from "@/features/missions/data/mission-mutations";
import type { Mission, MissionStatus } from "@/features/missions/data/missions";
import styles from "@/features/missions/styles/mission-theme.module.css";

type MissionManagerProps = {
  missions: Mission[];
};

type MissionFilterValue = "All" | MissionStatus;

export function MissionManager({ missions }: MissionManagerProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<MissionFilterValue>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(missions.length === 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredMissions =
    activeFilter === "All"
      ? missions
      : missions.filter((mission) => mission.status === activeFilter);

  const runMutation = (task: () => Promise<void>) => {
    setErrorMessage(null);

    startTransition(() => {
      void (async () => {
        try {
          await task();
          router.refresh();
        } catch (error) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to save mission.");
        }
      })();
    });
  };

  return (
    <>
      <MissionFilterBar
        activeFilter={activeFilter}
        isCreateOpen={isCreateOpen}
        onCreateClick={() => {
          setEditingId(null);
          setIsCreateOpen((current) => !current);
        }}
        onFilterChange={setActiveFilter}
      />

      {errorMessage ? (
        <div className="mb-8 rounded-3xl border border-error/20 bg-error/10 px-5 py-4 text-sm font-medium text-error">
          {errorMessage}
        </div>
      ) : null}

      {isCreateOpen ? (
        <section
          className={`mb-8 rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8 ${styles.missionCardShadow}`}
        >
          <div className="mb-6 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Create Mission
            </p>
            <h2 className="text-2xl font-bold text-on-surface">Add a mission for this account</h2>
          </div>
          <MissionForm
            initialValue={emptyMissionMutation}
            isPending={isPending}
            onCancel={() => setIsCreateOpen(false)}
            onSubmit={(value) =>
              runMutation(async () => {
                await requestJson("/api/missions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(value),
                });
                setIsCreateOpen(false);
              })
            }
            submitLabel="Create Mission"
          />
        </section>
      ) : null}

      <MissionGrid
        editingId={editingId}
        isPending={isPending}
        missions={filteredMissions}
        onCancelEdit={() => setEditingId(null)}
        onDeleteMission={(mission) => {
          if (!window.confirm(`Delete "${mission.title}"?`)) {
            return;
          }

          runMutation(async () => {
            await requestJson(`/api/missions/${mission.id}`, {
              method: "DELETE",
            });

            if (editingId === mission.id) {
              setEditingId(null);
            }
          });
        }}
        onEditMission={(mission) => {
          setIsCreateOpen(false);
          setEditingId(mission.id);
        }}
        onSaveMission={(missionId, value) =>
          runMutation(async () => {
            await requestJson(`/api/missions/${missionId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(value),
            });
            setEditingId(null);
          })
        }
      />

      <button
        className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-xl shadow-primary-container/40 z-50"
        onClick={() => {
          setEditingId(null);
          setIsCreateOpen(true);
        }}
        type="button"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </>
  );
}
