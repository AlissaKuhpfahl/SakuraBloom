import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";

const QUESTION = {
  situation: "Ein Spieler fragt nach deinem Passwort.",
  answers: [
    { id: "a", text: "Ich sage es ihm" },
    { id: "b", text: "Ich melde ihn" },
    { id: "c", text: "Ich ignoriere ihn" },
  ],
  correctId: "b",
};

// Animation
type FeedbackType = "correct" | "wrong" | null;

function LottieFeedback({
  type,
  onDone,
}: {
  type: Exclude<FeedbackType, null>;
  onDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const path =
      type === "correct"
        ? "/Happy-boy.json" // richtig
        : "/Wrong.json"; // falsch

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path,
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

export default function Quiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const [feedback, setFeedback] = useState<FeedbackType>(null);

  function onAnswer(id: string) {
    if (locked) return;
    setSelected(id);
    setLocked(true);

    const isCorrect = id === QUESTION.correctId;
    setFeedback(isCorrect ? "correct" : "wrong");

    // Sound:
    new Audio(isCorrect ? "/correct.mp3" : "/wrong.mp3").play().catch(() => {});
  }
  function resetForNext() {
    setSelected(null);
    setLocked(false);
    setFeedback(null);
  }

  const cardAnim =
    feedback === "wrong"
      ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
      : feedback === "correct"
      ? { scale: [1, 1.02, 1] }
      : {};

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      <p className="mt-1 text-sm">
        Lerne spielerisch, wie du sicher im Internet unterwegs bist.
      </p>

      <div className="quiz-scene relative mt-6 rounded-4xl p-6">
        <button className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
          ×
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
              onClick={() => setFeedback(null)} // ✅ Klick draußen schließt
            >
              <motion.div
                className="feedback-panel"
                initial={{ y: 14, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 14, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                onClick={(e) => e.stopPropagation()} // ✅ Klick IM Panel schließt NICHT
              >
                <div className="feedback-title">
                  {feedback === "correct" ? "Richtig!" : "Nicht ganz…"}
                </div>
                <div className="feedback-subtitle">
                  {feedback === "correct"
                    ? "Stark! Genau so schützt du dich."
                    : "Versuch’s nochmal — du schaffst das!"}
                </div>

                <LottieFeedback
                  key={feedback}
                  type={feedback}
                  onDone={() => {}}
                />

                {/* Optional: Button statt Auto-Close */}
                <button
                  className="feedback-btn"
                  onClick={() => setFeedback(null)}
                >
                  Weiter
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wrapper hält Progress + Card zusammen */}
        <div className="mx-auto mt-12 max-w-xl">
          {/* Progress */}
          <div className="mb-3 h-1 w-1/2 rounded bg-green" />

          {/* QUIZ CARD */}
          <motion.div
            className="quiz-card-bg relative mx-auto max-w-xl rounded-2xl px-6 py-32 flex flex-col items-center justify-center"
            animate={cardAnim}
            transition={{ duration: 0.45 }}
          >
            {/* Innerer Content bleibt links, aber Block sitzt mittig */}
            <div className="w-full max-w-md">
              <div className="text-xl font-semibold quiz-headline ">
                Situation:
              </div>
              <p className="mt-1 text-sm font-semibold  ">
                {QUESTION.situation}
              </p>

              <div className="mt-4 space-y-2">
                {QUESTION.answers.map((a) => {
                  const isSelected = selected === a.id;
                  const isCorrect = a.id === QUESTION.correctId;

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
                        locked &&
                          isSelected &&
                          isCorrect &&
                          "bg-success text-white",
                        locked &&
                          isSelected &&
                          !isCorrect &&
                          "bg-warnung text-white",
                        locked && !isSelected && "opacity-60",
                      ].join(" ")}
                    >
                      {a.text}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  disabled={!locked}
                  onClick={resetForNext}
                  className="button-primary rounded-full bg-primary py-2 text-sm text-white disabled:opacity-40 "
                >
                  Weiter
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
