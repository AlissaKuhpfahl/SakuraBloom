import PrimaryButton from "../components/Btn.tsx";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function Progress() {
  // Demo
  const lessonsDone = 7;
  const nextGoal = 10;

  const sakurasTotal = 5;
  const sakurasDone = 2;

  // Katze
  const [catAnim, setCatAnim] = useState<null>(null);

  useEffect(() => {
    fetch("/animations/cat.json")
      .then(r => r.json())
      .then(setCatAnim)
      .catch(() => setCatAnim(null));
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 pt-6">
      {/* Sakura BG img */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/trees.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Blur  */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      {/*  Content */}
      <div className="relative z-10 space-y-6">
        {/* HERO */}
        <div className="mx-auto max-w-xl rounded-3xl bg-white/80 p-6 shadow-md text-center backdrop-blur border border-(--color-dark-gray)/10">
          <div className="mx-auto w-80 -mt-8">
            {catAnim ? (
              <Lottie animationData={catAnim} loop />
            ) : (
              <div className="h-56 w-56 rounded-3xl bg-(--color-dark-gray)/5" />
            )}
          </div>

          <h1 className="-mt-8 text-3xl font-extrabold">Dein Fortschritt</h1>

          <p className="mt-2 text-sm text-(--color-dark-gray)">
            Du hast schon{" "}
            <span className="font-extrabold text-(--color-primary)">{lessonsDone}</span> Lektionen
            geschafft 🌸
          </p>

          <p className="mt-1 text-xs text-(--color-dark-gray)">
            Noch {Math.max(0, nextGoal - lessonsDone)} bis zum nächsten Ziel ⭐
          </p>

          <PrimaryButton className="mt-4" label="Weiter lernen" onClick={() => {}} />
        </div>

        {/* SAKURA BAR */}
        <div className="mx-auto max-w-xl rounded-3xl bg-white/80 p-6 shadow-md backdrop-blur border border-(--color-dark-gray)/10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold">Sakura-Stufen</p>
            <span className="rounded-full bg-(--color-primary)/10 px-3 py-1 text-xs font-semibold">
              {sakurasDone}/{sakurasTotal}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {Array.from({ length: sakurasTotal }).map((_, i) => {
              const active = i < sakurasDone;

              return (
                <img
                  key={i}
                  src={active ? "/flower-full.svg" : "/flower-empty.svg"}
                  alt=""
                  className={[
                    "h-8 w-8 transition-transform duration-300",
                    active ? "hover:scale-110" : "opacity-50"
                  ].join(" ")}
                />
              );
            })}
          </div>

          <p className="mt-3 text-xs text-(--color-dark-gray)">
            Sammle Sakuras, indem du Lektionen abschließt
          </p>
        </div>

        {/* Erfolge */}
        <div className="mx-auto max-w-xl mt-6 grid grid-cols-2 gap-4">
          {/* Erfolg 1 - unlocked */}
          <div className="rounded-3xl bg-white/80 p-6 text-center shadow-sm backdrop-blur border border-(--color-dark-gray)/10">
            <img
              src="/icons/progress1.svg"
              alt=""
              className="mx-auto h-24 w-24 transition-transform duration-300 hover:scale-110"
            />

            <p className="mt-4 text-sm font-extrabold">Erste Lektion</p>
            <p className="mt-1 text-xs text-(--color-dark-gray)">Freigeschaltet</p>
          </div>

          {/* Achievement 2 - locked */}
          <div className="rounded-3xl bg-white/60 p-6 text-center opacity-80 shadow-sm backdrop-blur border border-(--color-dark-gray)/10">
            <img src="/icons/progress2.svg" alt="" className="mx-auto h-24 w-24 grayscale" />

            <p className="mt-4 text-sm font-extrabold">Modul-Meister</p>
            <p className="mt-1 text-xs text-(--color-dark-gray)">Noch gesperrt</p>
          </div>
        </div>
      </div>
    </section>
  );
}
