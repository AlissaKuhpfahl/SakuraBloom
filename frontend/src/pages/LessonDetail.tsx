import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { modules } from "../content/modules.ts";
import PrimaryButton from "../components/Btn.tsx";
import type { ModuleKey, Step } from "../types";
import { markLessonDone } from "../utils/progress.ts";
import Lottie from "lottie-react";

export default function LessonDetail() {
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Lottie data für Reward
  const [rewardAnim, setRewardAnim] = useState<any>(null);
  const playedRewardRef = useRef<string>("");

  const params = useParams<{ moduleKey: ModuleKey; lessonId: string }>();
  const moduleKey = params.moduleKey;
  const lessonId = params.lessonId;

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

  // Modul-Farben
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

  const steps = lesson.steps;
  const current = steps[stepIndex] as Step;

  // Next lesson id (Reihenfolge wie im Content)
  const nextLessonId = useMemo(() => {
    const ids = module.lessons.map(l => l.id);
    const idx = ids.indexOf(lessonId);
    if (idx === -1) return null;
    return ids[idx + 1] ?? null;
  }, [module.lessons, lessonId]);

  // Beim Step-Wechsel: Quiz Auswahl resetten
  useEffect(() => {
    setPicked(null);
    setIsCorrect(null);
  }, [stepIndex]);

  // Reward: speichern + Lottie laden + Sound (einmal)
  useEffect(() => {
    if (current?.type !== "reward") return;

    // 1) Fortschritt speichern
    markLessonDone(moduleKey, lessonId);

    // 2) Lottie laden (aus public)
    setRewardAnim(null);
    fetch(current.lottieSrc)
      .then(r => r.json())
      .then(setRewardAnim)
      .catch(() => setRewardAnim(null));

    // 3) Sound (optional) nur einmal pro lesson+step
    const key = `${moduleKey}:${lessonId}:reward`;
    if (playedRewardRef.current !== key) {
      playedRewardRef.current = key;

      if (current.soundSrc) {
        const audio = new Audio(current.soundSrc);
        audio.volume = 0.7;
        audio.play().catch(() => {});
      }
    }
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
    // Bei Quiz: nur weiter, wenn richtig
    if (current.type === "task" && isCorrect !== true) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex(v => v + 1);
    } else {
      // Falls letztes kein reward ist (fallback)
      markLessonDone(moduleKey, lessonId);
      navigate("/lessons", { replace: true });
    }
  }

  return (
    <section className="space-y-6 pt-6">
      {/* TOP: Bild links , Modul-Karte rechts */}
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* LEFT: Bild */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-md aspect-4/3">
          <img src="/hase-lektion.jpg" alt="" className="w-full object-cover h-auto" />

          <div
            className={[
              "pointer-events-none absolute left-4 top-4 rounded-2xl px-3 py-2 text-xs font-bold",
              moduleAccentSoft[moduleKey]
            ].join(" ")}
          >
            Level {stepIndex + 1}
          </div>
        </div>

        {/* RIGHT: Modul/Lektion Karte */}
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
        {/* LEFT: Steps */}
        <div className="rounded-3xl bg-white p-5 shadow-md aspect-4/3">
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
                  <span className={`${locked ? "text-(--color-dark-gray)" : "font-semibold"}`}>
                    {i + 1}. {s.title}
                  </span>
                  <img src={iconForStep(i)} alt="" className="h-4 w-4 opacity-80" />
                </button>
              );
            })}
          </div>

          {/* Buttons unten links */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <PrimaryButton label="Zurück" onClick={() => navigate("/lessons")} />

            {current.type === "reward" ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-full bg-(--color-dark-gray)/10 px-6 py-4 font-bold hover:bg-(--color-dark-gray)/15 transition"
                  onClick={() => navigate("/lessons")}
                >
                  Alle Lektionen
                </button>

                <PrimaryButton
                  label="Nächste Lektion"
                  onClick={() => {
                    if (nextLessonId) navigate(`/lektion/${moduleKey}/${nextLessonId}`);
                    else navigate("/lessons");
                  }}
                />
              </div>
            ) : (
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

        {/* RIGHT: Content */}
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

          {/* REWARD */}
          {current.type === "reward" && (
            <div className="mt-4">
              <div className="rounded-3xl bg-(--color-primary)/10 p-5">
                <p className="whitespace-pre-line text-sm font-semibold text-(--color-dark-gray)">
                  {current.content}
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-3xl bg-(--color-dark-gray)/5 p-4">
                {rewardAnim ? (
                  <Lottie animationData={rewardAnim} loop={false} />
                ) : (
                  <div className="h-48 w-full" />
                )}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm border border-(--color-dark-gray)/10">
                <img src="/flower-full.svg" alt="" className="h-8 w-8" />
                <div>
                  <p className="text-sm font-extrabold">Belohnung</p>
                  <p className="text-xs text-(--color-dark-gray)">
                    Du hast alle Teile geschafft und sammelst eine Sakura 🌸
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NORMAL (read/example/tip/check) */}
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

          {/* Belohnungs-Karte auch bei normalen Steps */}
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
    </section>
  );
}
