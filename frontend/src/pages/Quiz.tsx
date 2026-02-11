import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import PrimaryButton from "../components/Btn.tsx";

const QUESTIONS = [
  {
    situation: "Ein Spieler fragt nach deinem Passwort.",
    answers: [
      { id: "a", text: "Ich sage es ihm" },
      { id: "b", text: "Ich melde ihn" },
      { id: "c", text: "Ich ignoriere ihn" }
    ],
    correctId: "b"
  },
  {
    situation: "Du bekommst einen Link: „Gratis Robux / Coins – klick hier!“",
    answers: [
      { id: "a", text: "Ich klicke sofort drauf" },
      { id: "b", text: "Ich frage erst Mama/Papa oder eine Lehrkraft" },
      { id: "c", text: "Ich leite den Link an Freunde weiter" }
    ],
    correctId: "b"
  },
  {
    situation:
      "Ein fremder Spieler will mit dir privat chatten und fragt nach deinem Namen/Adresse.",
    answers: [
      { id: "a", text: "Ich erzähle es, damit wir Freunde werden" },
      { id: "b", text: "Ich sage nein, blockiere ihn und melde es" },
      { id: "c", text: "Ich schicke ihm ein Foto von mir" }
    ],
    correctId: "b"
  }
];

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

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      <p className="mt-1 text-sm">Lerne spielerisch, wie du sicher im Internet unterwegs bist.</p>

      <div className="quiz-scene relative mt-6 rounded-4xl p-6">
        {/* X BUTTON */}
        <button
          type="button"
          aria-label="Schließen"
          className="absolute right-4 top-4 grid place-items-center  h-10 w-10 transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg
            className=" h-10 w-10 fill-(--color-Deep-Wine) transition-colors duration-150  hover:fill-(--color-warnung)"
            viewBox="0 0 512.001 512.001"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
          >
            {/* kreis */}
            <path d="M256.001,512c141.384,0,255.999-114.615,255.999-256.001C512.001,114.615,397.386,0,256.001,0 S0.001,114.615,0.001,256.001S114.616,512,256.001,512z" />

            {/* Shadow / highlight*/}
            <path
              className="opacity-10"
              d="M68.873,256.001c0-129.706,96.466-236.866,221.564-253.688 C279.172,0.798,267.681,0,256.001,0C114.616,0,0.001,114.615,0.001,256.001S114.616,512.001,256,512.001 c11.68,0,23.171-0.798,34.436-2.313C165.339,492.865,68.873,385.705,68.873,256.001z"
            />

            {/* X (immer weiß) */}
            <path
              fill="#FFFFFF"
              d="M313.391,256.001l67.398-67.398c4.899-4.899,4.899-12.842,0-17.74l-39.65-39.65 c-4.899-4.899-12.842-4.899-17.74,0l-67.398,67.398l-67.398-67.398c-4.899-4.899-12.842-4.899-17.74,0l-39.65,39.65 c-4.899,4.899-4.899,12.842,0,17.74l67.398,67.398l-67.398,67.398c-4.899,4.899-4.899,12.842,0,17.741l39.65,39.65 c4.899,4.899,12.842,4.899,17.74,0l67.398-67.398L323.4,380.79c4.899,4.899,12.842,4.899,17.74,0l39.65-39.65 c4.899-4.899,4.899-12.842,0-17.741L313.391,256.001z"
            />
          </svg>
        </button>

        {/* Feedback Overlay mit Animation */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              className="feedback-overlay-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setFeedback(null)} //  Klick draußen schließt
            >
              <motion.div
                className="feedback-panel"
                initial={{ y: 14, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 14, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                onClick={e => e.stopPropagation()} //  Klick IM Panel schließt NICHT
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

                {/* Button zu näcshte frage */}

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
                <div className="feedback-title">Geschafft! 🎓</div>

                <div className="feedback-subtitle">
                  Du hast {score} von {QUESTIONS.length} richtig. Super stark!
                </div>

                <LottieGraduation onDone={() => {}} />

                <div className="mt-4 flex justify-center gap-3">
                  <PrimaryButton
                    label="Widerholen"
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
                    label="Nächste Lektion"
                    className="btn-secondary"
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
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wrapper hält Progress + Card zusammen */}
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
            {/* Innerer Content bleibt links, aber Block sitzt mittig */}
            <div className="w-full max-w-md mt-12">
              <div className="text-xl font-semibold quiz-headline ">Situation:</div>
              <p className="mt-1 text-sm font-semibold  ">{current.situation}</p>

              <div className="mt-4 space-y-2">
                {current.answers.map(a => {
                  const isSelected = selected === a.id;
                  const isCorrect = a.id === current.correctId;

                  return (
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
  );
}
