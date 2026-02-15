import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../components/Btn.tsx";
import { modules } from "../content/modules.ts";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import {
  isLessonDone,
  readPendingModuleComplete,
  clearPendingModuleComplete
} from "../utils/progress";

// Types
type ModuleKey = "online" | "privacy" | "chats" | "fake";
type LessonStatus = "done" | "active" | "locked";

// Overlay für Modul abgeschlossen
function RewardOverlay({
  open,
  title,
  message,
  lottiePath,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary
}: {
  open: boolean;
  title: string;
  message: string;
  lottiePath: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !ref.current) return;

    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: lottiePath
    });

    return () => anim.destroy();
  }, [open, lottiePath]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onSecondary}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
            initial={{ y: 14, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-xl font-extrabold">{title}</div>
            <div className="mt-2 text-sm text-(--color-dark-gray)">{message}</div>

            <div ref={ref} className="mx-auto mt-4 h-44 w-44" />

            <div className="mt-4 flex justify-center gap-3">
              <PrimaryButton label={primaryLabel} onClick={onPrimary} />
              <PrimaryButton
                label={secondaryLabel}
                className="btn-secondary"
                onClick={onSecondary}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Lessons() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ModuleKey>("online");

  // Modul-complete overlay state
  const [rewardOpen, setRewardOpen] = useState(false);
  const [completeModuleKey, setCompleteModuleKey] = useState<ModuleKey>("online");
  const [rewardTitle, setRewardTitle] = useState("Modul geschafft! 🎉");
  const [rewardMessage, setRewardMessage] = useState("Du hast alle Lektionen geschafft!");

  useEffect(() => {
    const pending = readPendingModuleComplete();
    if (!pending) return;

    // Defensive: only set if moduleKey is valid
    let mk: ModuleKey = "online";
    if (
      typeof pending.moduleKey === "string" &&
      ["online", "privacy", "chats", "fake"].includes(pending.moduleKey)
    ) {
      mk = pending.moduleKey as ModuleKey;
    }
    setTimeout(() => {
      setCompleteModuleKey(mk);
      setRewardTitle(pending.title ?? "Modul geschafft! ");
      setRewardMessage(pending.message ?? "Du hast alle Lektionen geschafft!");
      setRewardOpen(true);
    }, 0);

    new Audio("/sounds/module-complete.mp3").play().catch(() => {});
    clearPendingModuleComplete();
  }, []);

  // icons
  const statusIcon: Record<LessonStatus, string> = {
    done: "/icons/check.svg",
    active: "/icons/play.svg",
    locked: "/icons/lock.svg"
  };

  // hover bei module
  const moduleHoverBg: Record<ModuleKey, string> = {
    online: "hover:bg-(--color-blue)",
    privacy: "hover:bg-(--color-light-yellow)",
    chats: "hover:bg-(--color-peach)",
    fake: "hover:bg-(--color-green)"
  };

  const labelFor = (done: number, total: number) =>
    done === total ? "Abgeschlossen" : done > 0 ? "Fortsetzen" : "Starten";

  // computed modules (unlocking)
  const computedModules = useMemo(() => {
    return modules.map(m => {
      const isDone = (lessonId: string, status: LessonStatus) =>
        status === "done" || isLessonDone(m.key, lessonId);

      const doneCount = m.lessons.filter(l => isDone(l.id, l.status)).length;

      const firstNotDoneIndex = m.lessons.findIndex(l => !isDone(l.id, l.status));

      const lessonsDynamic = m.lessons.map((l, idx) => {
        const done = isDone(l.id, l.status);

        let status: LessonStatus = "locked";
        if (done) status = "done";
        else if (idx === (firstNotDoneIndex === -1 ? 0 : firstNotDoneIndex)) status = "active";

        return { ...l, status };
      });

      const nextLessonId =
        firstNotDoneIndex === -1
          ? m.lessons[m.lessons.length - 1]?.id ?? "1"
          : m.lessons[firstNotDoneIndex]?.id ?? "1";

      return { ...m, lessons: lessonsDynamic, doneCount, nextLessonId };
    });
  }, []); // modules ist statisch aus content

  const selectedModule = computedModules.find(m => m.key === selected)!;
  const nextLessonId = selectedModule.nextLessonId;

  return (
    <section className="space-y-6 pt-6">
      {/* Headline */}
      <div className="rounded-3xl p-6 ">
        <p className="text-xs uppercase tracking-widest text-(--color-dark-gray) opacity-70">
          SakuraBloom
        </p>

        <h1 className="mt-2 text-3xl font-extrabold">Deine Lernreise</h1>

        <p className="mt-2 max-w-lg text-sm text-(--color-dark-gray)">
          Wähle ein Modul und mach den nächsten Schritt. Kleine Levels, große Sicherheit.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-(--color-dark-gray)/5 px-3 py-1 text-xs font-semibold">
            Level-System
          </span>
          <span className="rounded-full bg-(--color-dark-gray)/5 px-3 py-1 text-xs font-semibold">
            Belohnungen
          </span>
          <span className="rounded-full bg-(--color-dark-gray)/5 px-3 py-1 text-xs font-semibold">
            Sicher online
          </span>
        </div>
      </div>

      {/* Background */}
      <div className="relative min-h-170 rounded-3xl py-6">
        <div className="absolute inset-0" />

        <img
          src="/bg-blumen.svg"
          alt=""
          className="pointer-events-none absolute right-6 top-5 z-0 w-48 opacity-30 rotate-8"
        />

        <div className="relative z-10 space-y-6">
          {/* Weiter lernen Karte */}
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer">
            <p className="text-xs uppercase tracking-widest text-(--color-dark-gray) opacity-70">
              Weiter lernen
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold">{selectedModule.title}</h2>
                <p className="mt-1 text-sm font-semibold">
                  Nächste Lektion: {nextLessonId}/{selectedModule.total}
                </p>

                <PrimaryButton
                  className="mt-3"
                  label="Los!"
                  onClick={() => navigate(`/lektion/${selectedModule.key}/${nextLessonId}`)}
                />
              </div>

              <img src={selectedModule.icon} alt="" className="h-24 w-auto select-none" />
            </div>
          </div>

          {/* Module */}
          <div className="space-y-3">
            {computedModules.map(m => {
              const isSelected = m.key === selected;
              const label = labelFor(m.doneCount, m.total);
              const pct = Math.round((m.doneCount / m.total) * 100);

              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setSelected(m.key)}
                  className={[
                    "w-full rounded-3xl bg-white px-5 py-4 text-left shadow-md transition hover:-translate-y-0.5",
                    moduleHoverBg[m.key],
                    isSelected ? "ring-2 ring-(--color-primary)" : ""
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <img src={m.icon} alt="" className="h-12 w-12" />
                    <div>
                      <div className="font-extrabold">{m.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-(--color-primary)/10 px-2 py-0.5 font-semibold">
                          {m.doneCount}/{m.total}
                        </span>
                        <span className="opacity-80 px-2">{pct}%</span>
                        <span>{label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    {Array.from({ length: m.total }).map((_, i) => {
                      const active = i < m.doneCount;

                      return (
                        <div key={i} className="flex items-center">
                          <img
                            src={active ? "/flower-full.svg" : "/flower-empty.svg"}
                            alt=""
                            className="h-5 w-5"
                          />
                          {i < m.total - 1 && (
                            <div
                              className={`h-0.75 w-8 rounded-full ${
                                active ? "bg-(--color-primary)" : "bg-(--color-dark-gray)/20"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Alle Lektionen anzeigen */}
          <div className="grid grid-cols-2 gap-6">
            {selectedModule.lessons.map(l => {
              const storedDone = isLessonDone(selectedModule.key, l.id);

              const isLocked = l.status === "locked";
              const isDone = storedDone || l.status === "done";
              const isActive = !isDone && l.status === "active";

              return (
                <div
                  key={l.id}
                  className={[
                    "rounded-3xl bg-white p-6 shadow-md",
                    isLocked ? "opacity-80" : ""
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <img
                      src={isDone ? "/icons/check.svg" : statusIcon[l.status]}
                      alt=""
                      className="h-4 w-4"
                    />
                    <span>Lektion {l.id}</span>
                    <span className="ml-auto rounded-full bg-(--color-dark-gray)/5 px-2 py-0.5 text-xs">
                      {isDone ? "Fertig" : isLocked ? "Gesperrt" : "Aktiv"}
                    </span>
                  </div>

                  <h2 className="mt-2 font-extrabold">{l.title}</h2>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <PrimaryButton
                      label={isDone ? "Nochmal" : isActive ? "Weiter" : "Starten"}
                      className={isLocked ? "pointer-events-none opacity-50" : ""}
                      onClick={() => navigate(`/lektion/${selectedModule.key}/${l.id}`)}
                    />

                    {(isActive || isDone) && (
                      <div className="flex items-center gap-1.5 text-xs text-(--color-dark-gray)">
                        {isActive && (
                          <>
                            <img src="/icons/weiter.svg" alt="" className="h-4 w-4" />
                            <span>Weiter zur nächsten Aufgabe</span>
                          </>
                        )}
                        {isDone && (
                          <>
                            <img src="/icons/star.svg" alt="" className="h-4 w-4" />
                            <span>Super gemacht!</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modul-Abschluss Overlay */}
      <RewardOverlay
        open={rewardOpen}
        title={rewardTitle}
        message={rewardMessage}
        lottiePath="/animations/module-complete.json"
        primaryLabel="Zum Quiz"
        secondaryLabel="Schließen"
        onPrimary={() => {
          setRewardOpen(false);
          navigate(`/quiz/${completeModuleKey}`);
        }}
        onSecondary={() => setRewardOpen(false)}
      />
    </section>
  );
}
