import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import PrimaryButton from "../components/Btn.tsx";
import { quizzes } from "../content/quizzes.ts";
import type { ModuleKey } from "../types/lesson.ts";
import { modules } from "../content/modules.ts";
import { getDoneLessonsForModule } from "../utils/progress.ts";

// funktion um die Lektionen eines Moduls zu holen, um den Quiz freizuschalten
function getLessonIdsFromModule(moduleKey: ModuleKey): string[] {
  const mod = modules.find(m => m.key === moduleKey);
  if (!mod) return [];

  const list = Array.isArray(mod.lessons) ? mod.lessons : [];
  return list.map((x: { id: string }) => String(x.id));
}

function isQuizUnlocked(moduleKey: ModuleKey): boolean {
  const lessonIds = getLessonIdsFromModule(moduleKey);
  if (lessonIds.length === 0) return false;

  const done = new Set(getDoneLessonsForModule(moduleKey));
  return lessonIds.every(id => done.has(id));
}

function unlockInfo(moduleKey: ModuleKey) {
  const lessonIds = getLessonIdsFromModule(moduleKey);
  const done = new Set(getDoneLessonsForModule(moduleKey));
  const doneCount = lessonIds.filter(id => done.has(id)).length;
  return { doneCount, total: lessonIds.length };
}

// fragen
const isModuleKey = (v: unknown): v is ModuleKey =>
  v === "online" || v === "privacy" || v === "chats" || v === "fake";
// Animation
type FeedbackType = "correct" | "wrong" | null;

function LottieFeedback({
  type,
  onDone
}: {
  type: Exclude<FeedbackType, null>;
  onDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const path =
      type === "correct"
        ? "/animations/Happy-boy.json" // richtig
        : "/animations/Wrong.json"; // falsch

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path
    });

    const finish = () => onDone();
    anim.addEventListener("complete", finish);

    return () => {
      anim.removeEventListener("complete", finish);
      anim.destroy();
    };
  }, [type, onDone]);

  return <div ref={containerRef} className="feedback-lottie" />;
}
// Graduation Lottie Component
function LottieGraduation({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/animations/completed.json"
    });

    const finish = () => onDone();
    anim.addEventListener("complete", finish);

    return () => {
      anim.removeEventListener("complete", finish);
      anim.destroy();
    };
  }, [onDone]);

  return <div ref={ref} className="feedback-lottie" />;
}

export default function Quiz() {
  const [mode, setMode] = useState<"select" | "play">("select");

  // Fragen
  const params = useParams<{ moduleKey?: string }>();
  const safeModuleKey: ModuleKey = isModuleKey(params.moduleKey) ? params.moduleKey : "online";
  const QUESTIONS = quizzes[safeModuleKey];

  const navigate = useNavigate();

  const moduleTitle = modules.find(m => m.key === safeModuleKey)?.title ?? "";

  //
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  // FÜR WEITERE FRAGEN
  const [qIndex, setQIndex] = useState(0);
  const current = QUESTIONS[qIndex];
  const progress = Math.round(((qIndex + 1) / QUESTIONS.length) * 100);
  // Fragen finished
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const winSoundPlayed = useRef(false);

  function onAnswer(id: string) {
    if (locked) return;
    setSelected(id);
    setLocked(true);

    const isCorrect = id === current.correctId;
    if (isCorrect) setScore(s => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");

    // Sound:
    new Audio(isCorrect ? "/sounds/correct.mp3" : "/sounds/wrong.mp3").play().catch(() => {});
  }

  function resetForNext() {
    setSelected(null);
    setLocked(false);
    setFeedback(null);

    // NEXT QUESTION
    setQIndex(i => {
      const next = i + 1;
      if (next >= QUESTIONS.length) {
        setFinished(true);
        return i; // bleibt auf letzter Frage
      }
      return next;
    });
  }

  const cardAnim =
    feedback === "wrong"
      ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
      : feedback === "correct"
      ? { scale: [1, 1.02, 1] }
      : {};

  // win sound
  useEffect(() => {
    if (finished && !winSoundPlayed.current) {
      new Audio("/sounds/win.mp3").play().catch(() => {});
      winSoundPlayed.current = true;
    }
  }, [finished]);

  // neue Quiz-Auswahl:
  if (mode === "select") {
    const items: { key: ModuleKey; title: string }[] = [
      { key: "online", title: "Online-Sicherheit" },
      { key: "privacy", title: "Privatsphäre" },
      { key: "chats", title: "Chats & Verhalten" },
      { key: "fake", title: "Fake erkennen" }
    ];

    return (
      <section className="pt-6">
        <div className="mx-auto max-w-5xl px-4">
          {/* HEADER CARD */}
          <div className="rounded-3xl bg-white border-(--color-dark-gray)/10 shadow-md p-6">
            <div className="flex gap-4 items-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-(--color-primary)/10 border border-(--color-dark-gray)/10">
                <img src="/icons/quiz.svg" alt="" className="h-10 w-10 " />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold">Quiz</h1>
                <p className="mt-1 text-sm">
                  Du kannst ein Quiz erst spielen, wenn du die Lektionen dazu geschafft hast.
                </p>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map(it => {
              const unlocked = isQuizUnlocked(it.key);
              const info = unlockInfo(it.key);
              const percent = info.total > 0 ? Math.round((info.doneCount / info.total) * 100) : 0;

              return (
                <button
                  key={it.key}
                  disabled={!unlocked}
                  onClick={() => {
                    if (!unlocked) return;
                    navigate(`/quiz/${it.key}`);
                    setMode("play");
                  }}
                  className={[
                    "group relative overflow-hidden rounded-3xl shadow-md transition",
                    "border-(--color-dark-gray)/10 p-5 text-left",
                    unlocked
                      ? "bg-white hover:shadow-lg hover:-translate-y-px"
                      : "bg-white/60 opacity-80 cursor-not-allowed"
                  ].join(" ")}
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between gap-4">
                    <div className="flex  gap-3">
                      {/* Animals */}
                      <div
                        className={[
                          "grid h-16 w-16 place-items-center rounded-2xl border",
                          unlocked
                            ? "bg-(--color-primary)/10 border-(--color-primary)/20"
                            : "bg-white/50 border-(--color-dark-gray)/10"
                        ].join(" ")}
                      >
                        {it.key === "online" && <img src="/elephant.svg" className="h-12 w-12" />}
                        {it.key === "privacy" && <img src="/hase.svg" className="h-12 w-12" />}
                        {it.key === "chats" && <img src="/animal.svg" className="h-12 w-12" />}
                        {it.key === "fake" && <img src="/duck.svg" className="h-12 w-12" />}
                      </div>

                      <div>
                        <div className="text-lg font-extrabold mt-2">{it.title}</div>
                        <div className="mt-1 text-xs font-semibold text-(--color-dark-gray)">
                          {unlocked ? "Bereit zum Spielen" : "Noch gesperrt"}
                        </div>
                      </div>
                    </div>

                    {/* Status Icon */}
                    <div>
                      {unlocked ? (
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-(--color-primary)/10  mt-2">
                          <img src="/icons/play.svg" className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-(--color-primary)/10  mt-2">
                          <img src="/icons/lock.svg" className="h-6 w-6 opacity-70" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-(--color-dark-gray)">
                      <div>
                        Fortschritt: <span className="font-extrabold">{info.doneCount}</span>/
                        {info.total}
                      </div>
                      <div className="font-extrabold">{percent}%</div>
                    </div>

                    <div className="mt-2 h-2 w-full rounded-full bg-(--color-dark-gray)/10 overflow-hidden ">
                      <div
                        className="h-full rounded-full bg-(--color-primary) transition-[width] duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKGROUND (Video) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/quiz-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 min-h-screen p-8">
        {/* X BUTTON  */}
        <button
          type="button"
          aria-label="Schließen"
          onClick={() => {
            setMode("select");
            navigate("/quiz");
          }}
          className="quiz-close-btn"
        >
          <svg
            className="h-10 w-10  "
            viewBox="0 0 512.001 512.001"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
          >
            {/* Kreis */}
            <path
              fill="#61033b"
              d="M256.001,512c141.384,0,255.999-114.615,255.999-256.001C512.001,114.615,397.386,0,256.001,0 S0.001,114.615,0.001,256.001S114.616,512,256.001,512z"
            />
            {/* Shadow */}
            <path
              className="opacity-10"
              d="M68.873,256.001c0-129.706,96.466-236.866,221.564-253.688 C279.172,0.798,267.681,0,256.001,0C114.616,0,0.001,114.615,0.001,256.001S114.616,512.001,256,512.001 c11.68,0,23.171-0.798,34.436-2.313C165.339,492.865,68.873,385.705,68.873,256.001z"
            />
            {/* X */}
            <path
              fill="#FFFFFF"
              d="M313.391,256.001l67.398-67.398c4.899-4.899,4.899-12.842,0-17.74l-39.65-39.65 c-4.899-4.899-12.842-4.899-17.74,0l-67.398,67.398l-67.398-67.398c-4.899-4.899-12.842-4.899-17.74,0l-39.65,39.65 c-4.899,4.899-4.899,12.842,0,17.74l67.398,67.398l-67.398,67.398c-4.899,4.899-4.899,12.842,0,17.741l39.65,39.65 c4.899,4.899,12.842,4.899,17.74,0l67.398-67.398L323.4,380.79c4.899,4.899,12.842,4.899,17.74,0l39.65-39.65 c4.899-4.899,4.899-12.842,0-17.741L313.391,256.001z"
            />
          </svg>
        </button>

        {/* HEADER  */}
        <div className=" flex flex-col items-center text-center gap-2 text-(--color-Deep-Wine) bg-(--color-bg-vanilla)/20 rounded-3xl px-6 py-4 max-w-1/2 mx-auto mt-2">
          <h3 className="text-2xl font-semibolddrop-shadow ">Quiz: {moduleTitle}</h3>
          <p className=" text-sm  font-bold">
            Lerne spielerisch, wie du sicher im Internet unterwegs bist.
          </p>
        </div>

        {/* Layout*/}
        <div className="quiz-scene relative rounded-4xl px-25 pt-12">
          {/* Feedback Overlay mit Animation */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className="feedback-overlay-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setFeedback(null)}
              >
                <motion.div
                  className="feedback-panel"
                  initial={{ y: 14, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 14, opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="feedback-title">
                    {feedback === "correct" ? "Richtig!" : "Nicht ganz…"}
                  </div>
                  <div className="feedback-subtitle">
                    {feedback === "correct"
                      ? "Stark! Genau so schützt du dich."
                      : "Versuch’s nochmal — du schaffst das!"}
                  </div>

                  <LottieFeedback key={feedback} type={feedback} onDone={() => {}} />
                  <PrimaryButton label="Weiter" onClick={() => setFeedback(null)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FINISH Overlay */}
          <AnimatePresence>
            {finished && (
              <motion.div
                className="feedback-overlay-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setFinished(false)}
              >
                <motion.div
                  className="feedback-panel"
                  initial={{ y: 14, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 14, opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="feedback-title">Geschafft! </div>

                  <div className="feedback-subtitle">
                    Du hast {score} von {QUESTIONS.length} richtig. Super stark!
                  </div>

                  <LottieGraduation onDone={() => {}} />

                  <div className="mt-4 flex justify-center gap-3">
                    <PrimaryButton
                      label="Wiederholen"
                      onClick={() => {
                        setFinished(false);
                        setScore(0);
                        setQIndex(0);
                        setSelected(null);
                        setLocked(false);
                        setFeedback(null);
                        winSoundPlayed.current = false;
                      }}
                    />
                    <PrimaryButton
                      label="Zurück zu Lektionen"
                      className="btn-secondary"
                      onClick={() => navigate("/lessons")}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wrapper Progress + Card  */}
          <div className="mx-auto mt-12 max-w-xl">
            {/* Progress */}
            <div className="quiz-progress">
              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="quiz-progress-label">
                Frage {qIndex + 1}/{QUESTIONS.length}
              </div>

              <div className="quiz-progress-dots">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={["quiz-dot", i < qIndex && "is-done", i === qIndex && "is-current"]
                      .filter(Boolean)
                      .join(" ")}
                  />
                ))}
              </div>
            </div>

            {/* QUIZ CARD */}
            <motion.div
              className="quiz-card-bg relative mx-auto max-w-xl rounded-2xl px-6 flex flex-col items-center justify-center"
              animate={cardAnim}
              transition={{ duration: 0.45 }}
            >
              <div className="w-full max-w-md mt-12">
                <div className="text-xl font-semibold quiz-headline">Situation:</div>
                <p className="mt-1 text-sm font-semibold">{current.situation}</p>

                <div className="mt-4 space-y-2">
                  {current.answers.map(a => {
                    const isSelected = selected === a.id;
                    const isCorrect = a.id === current.correctId;

                    return (
                      // Optionen Buttons
                      <motion.button
                        key={a.id}
                        onClick={() => onAnswer(a.id)}
                        disabled={locked}
                        whileHover={!locked ? { scale: 1.02 } : undefined}
                        whileTap={{ scale: 0.98 }}
                        className={[
                          "w-full max-w-md rounded-full px-4 py-2 text-sm transition",
                          !locked &&
                            "bg-(--color-skyblue) border-b-4 border-t-4 border-r-2 border-l-2 border-(--color-Deep-Wine) ransition-transform hover:scale-105",
                          locked && isSelected && isCorrect && "bg-success text-white",
                          locked && isSelected && !isCorrect && "bg-warnung text-white",
                          locked && !isSelected && "opacity-60"
                        ].join(" ")}
                      >
                        {a.text}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-center">
                  <PrimaryButton label="Weiter" disabled={!locked} onClick={resetForNext} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
