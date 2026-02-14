// LessonDetail.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import { modules } from "../content/modules.ts";
import PrimaryButton from "../components/Btn.tsx";
import type { ModuleKey, Step } from "../types";
import { markLessonDone, setPendingModuleComplete } from "../utils/progress.ts";

// Reward Overlay
type RewardOverlayProps = {
  open: boolean;
  title: string;
  message: string;
  videoSrc: string; // MP4
  soundSrc?: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
};

function RewardOverlay({
  open,
  title,
  message,
  videoSrc,
  soundSrc,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary
}: RewardOverlayProps) {
  const playedRef = useRef(false);

  // Sound einmal beim Öffnen
  useEffect(() => {
    if (!open) {
      playedRef.current = false;
      return;
    }
    if (soundSrc && !playedRef.current) {
      playedRef.current = true;
      const a = new Audio(soundSrc);
      a.volume = 0.7;
      a.play().catch(() => {});
    }
  }, [open, soundSrc]);

  if (!open) return null;

  return (
    <AnimatePresence>
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

          <video
            src={videoSrc}
            autoPlay
            playsInline
            muted
            controls={false}
            className="mx-auto mt-4 h-44 w-44 rounded-2xl object-cover"
          />

          <div className="mt-5 flex justify-center gap-3">
            <PrimaryButton label={secondaryLabel} className="btn-secondary" onClick={onSecondary} />
            <PrimaryButton label={primaryLabel} onClick={onPrimary} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Page
export default function LessonDetail() {
  const navigate = useNavigate();

  const params = useParams<{ moduleKey?: ModuleKey; lessonId?: string }>();
  const moduleKey = params.moduleKey;
  const lessonId = params.lessonId;

  const [stepIndex, setStepIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [rewardOpen, setRewardOpen] = useState(false);
  const rewardShownRef = useRef(false); // verhindert mehrfaches Öffnen

  if (!moduleKey || !lessonId) {
    return (
      <section className="pt-6">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h1 className="text-xl font-extrabold">Oops 😵‍💫</h1>
          <p className="mt-2 text-sm text-(--color-dark-gray)">
            Bitte öffne eine Lektion über die Lektionen-Seite.
          </p>
          <PrimaryButton className="mt-4" label="Zurück" onClick={() => navigate("/lessons")} />
        </div>
      </section>
    );
  }

  const module = modules.find(m => m.key === moduleKey);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <section className="pt-6">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h1 className="text-xl font-extrabold">Nicht gefunden</h1>
          <p className="mt-2 text-sm text-(--color-dark-gray)">
            Diese Lektion gibt es (noch) nicht in den Content-Daten.
          </p>
          <PrimaryButton className="mt-4" label="Zurück" onClick={() => navigate("/lessons")} />
        </div>
      </section>
    );
  }

  // Farben
  const moduleAccent: Record<ModuleKey, string> = {
    online: "bg-(--color-blue)",
    privacy: "bg-(--color-light-yellow)",
    chats: "bg-(--color-peach)",
    fake: "bg-(--color-green)"
  };

  const moduleAccentSoft: Record<ModuleKey, string> = {
    online: "bg-(--color-blue)/20",
    privacy: "bg-(--color-light-yellow)/30",
    chats: "bg-(--color-peach)/30",
    fake: "bg-(--color-green)/25"
  };

  const steps = lesson.steps;
  const current = steps[stepIndex] as Step;

  const nextLessonId = useMemo(() => {
    const ids = module.lessons.map(l => l.id);
    const idx = ids.indexOf(lessonId);
    if (idx === -1) return null;
    return ids[idx + 1] ?? null;
  }, [module.lessons, lessonId]);

  // Beim Stepwechsel resetten
  useEffect(() => {
    setPicked(null);
    setIsCorrect(null);
  }, [stepIndex]);

  // Reward Step: Fortschritt speichern + Overlay öffnen (einmal)
  useEffect(() => {
    if (current.type !== "reward") {
      rewardShownRef.current = false;
      return;
    }

    // nur einmal öffnen pro Reward-Step
    if (rewardShownRef.current) return;
    rewardShownRef.current = true;

    markLessonDone(moduleKey, lessonId);
    setRewardOpen(true);
  }, [current, moduleKey, lessonId]);

  const iconForStep = (i: number) => {
    if (i < stepIndex) return "/icons/check.svg";
    if (i === stepIndex) return "/icons/play.svg";
    return "/icons/lock.svg";
  };

  function selectAnswer(index: number) {
    if (current.type !== "task") return;
    setPicked(index);
    setIsCorrect(index === current.correctIndex);
  }

  function next() {
    if (current.type === "task" && isCorrect !== true) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex(v => v + 1);
    } else {
      // Fallback: falls content KEIN reward step hätte
      markLessonDone(moduleKey!, lessonId!);

      // wenn es auch wirklich keine nächste Lektion im Modul gibt: Modul Complete Overlay in Lessons
      if (!nextLessonId) {
        setPendingModuleComplete({
          moduleKey,
          title: "Modul geschafft! 🎉",
          message: "Mega! Du hast alle Lektionen in diesem Modul geschafft."
        });
      }

      navigate("/lessons", { replace: true });
    }
  }

  return (
    <section className="space-y-6 pt-6">
      {/* TOP */}
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-md aspect-4/3">
          <img src="/hase-lektion.jpg" alt="" className="h-auto w-full object-cover" />
          <div
            className={[
              "pointer-events-none absolute left-4 top-4 rounded-2xl px-3 py-2 text-xs font-bold",
              moduleAccentSoft[moduleKey]
            ].join(" ")}
          >
            Level {stepIndex + 1}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-md">
          <div className={`absolute left-0 top-0 h-2 w-full ${moduleAccent[moduleKey]}`} />

          <p className="text-xs text-(--color-dark-gray)">Modul</p>
          <h1 className="text-2xl font-extrabold">{module.title}</h1>

          <div className="mt-4 rounded-2xl bg-(--color-dark-gray)/5 p-4">
            <p className="text-xs text-(--color-dark-gray)">Lektion {lesson.id}</p>
            <h2 className="mt-1 text-xl font-extrabold text-(--color-primary)">{lesson.title}</h2>
            <p className="mt-2 text-sm text-(--color-dark-gray)">{lesson.subtitle}</p>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-3 py-1 text-xs font-semibold">
            <img src="/icons/play.svg" alt="" className="h-4 w-4" />
            Schritt {stepIndex + 1} von {steps.length}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* LEFT */}
        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold">Mini-Schritte</h3>
            <span className="rounded-full bg-(--color-dark-gray)/5 px-3 py-1 text-xs font-semibold">
              {stepIndex + 1}/{steps.length}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            {Array.from({ length: steps.length }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i <= stepIndex ? "bg-(--color-primary)" : "bg-(--color-dark-gray) opacity-25"
                }`}
              />
            ))}
          </div>

          <div className="mt-5 space-y-2">
            {steps.map((s, i) => {
              const active = i === stepIndex;
              const locked = i > stepIndex;

              return (
                <button
                  key={`${s.type}-${i}`}
                  type="button"
                  disabled={locked}
                  onClick={() => setStepIndex(i)}
                  className={[
                    "flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition",
                    active ? moduleAccentSoft[moduleKey] : "bg-(--color-dark-gray)/5",
                    locked ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-0.5"
                  ].join(" ")}
                >
                  <span className={locked ? "text-(--color-dark-gray)" : "font-semibold"}>
                    {i + 1}. {s.title}
                  </span>
                  <img src={iconForStep(i)} alt="" className="h-4 w-4 opacity-80" />
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            {current.type !== "reward" && (
              <PrimaryButton
                label={stepIndex < steps.length - 1 ? "Weiter" : "Fertig!"}
                onClick={next}
                className={
                  current.type === "task" && isCorrect !== true
                    ? "opacity-60 pointer-events-none"
                    : ""
                }
              />
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${moduleAccent[moduleKey]}`} />
              <p className="text-sm font-extrabold">{current.title}</p>
            </div>
            <span className="rounded-full bg-(--color-dark-gray)/5 px-3 py-1 text-xs font-semibold">
              Teil {stepIndex + 1}
            </span>
          </div>

          {/* READ/EXAMPLE/TIP/CHECK */}
          {current.type !== "task" && current.type !== "reward" && (
            <div className="mt-4 rounded-3xl bg-(--color-dark-gray)/5 p-5">
              <p className="whitespace-pre-line text-sm text-(--color-dark-gray)">
                {current.content}
              </p>
            </div>
          )}

          {/* TASK */}
          {current.type === "task" && (
            <div className="mt-4 rounded-3xl bg-(--color-dark-gray)/5 p-5">
              <p className="text-sm font-semibold text-(--color-dark-gray)">{current.content}</p>

              <div className="mt-4 grid gap-2">
                {current.answers.map((a, idx) => {
                  const selectedAnswer = picked === idx;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => selectAnswer(idx)}
                      className={[
                        "rounded-2xl px-4 py-3 text-left transition hover:-translate-y-0.5",
                        selectedAnswer ? moduleAccentSoft[moduleKey] : "bg-white"
                      ].join(" ")}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>

              {isCorrect === true && (
                <div className="mt-4 flex items-center gap-2 text-sm text-(--color-dark-gray)">
                  <img src="/icons/check.svg" alt="" className="h-4 w-4" />
                  <span>Richtig! Jetzt darfst du weiter 🎉</span>
                </div>
              )}

              {isCorrect === false && (
                <div className="mt-4 flex items-center gap-2 text-sm text-(--color-dark-gray)">
                  <img src="/icons/lock.svg" alt="" className="h-4 w-4" />
                  <span>Noch mal probieren 🙂</span>
                </div>
              )}
            </div>
          )}

          {/* Reward-Hinweis (nicht im Reward-Step) */}
          {current.type !== "reward" && (
            <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm border border-(--color-dark-gray)/10">
              <img src="/flower-full.svg" alt="" className="h-8 w-8" />
              <div>
                <p className="text-sm font-extrabold">Belohnung</p>
                <p className="text-xs text-(--color-dark-gray)">
                  Schaffe alle {steps.length} Teile und sammle eine Sakura
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reward Overlay */}
      <RewardOverlay
        open={rewardOpen && current.type === "reward"}
        title="Belohnung 🌸"
        message={current.type === "reward" ? current.content : "Super gemacht!"}
        videoSrc="/animations/sakura-animation.mp4"
        soundSrc={current.type === "reward" ? current.soundSrc : undefined}
        primaryLabel={nextLessonId ? "Nächste Lektion" : "Schließen"}
        secondaryLabel="Alle Lektionen"
        onSecondary={() => {
          setRewardOpen(false);
          navigate("/lessons", { replace: true });
        }}
        onPrimary={() => {
          setRewardOpen(false);

          if (nextLessonId) {
            navigate(`/lektion/${moduleKey}/${nextLessonId}`, { replace: true });
            return;
          }

          // letzte Lektion im Modul
          setPendingModuleComplete({
            moduleKey,
            title: "Modul geschafft! 🎉",
            message: "Mega! Du hast alle Lektionen in diesem Modul geschafft."
          });

          navigate("/lessons", { replace: true });
        }}
      />
    </section>
  );
}
