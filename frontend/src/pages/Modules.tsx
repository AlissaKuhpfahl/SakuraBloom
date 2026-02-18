import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import PrimaryButton from "../components/Btn.tsx";
import { backendServiceURL } from "../utils";

type ModuleItem = {
  key: "online" | "privacy" | "chats" | "fake";
  title: string;
  desc: string;
  route: string;
  art: string;
  bgClass: string;
};

export default function ModulesMainBigSlider() {
  const total = 5;

  const [progress, setProgress] = useState({
    online: 0,
    privacy: 0,
    chats: 0,
    fake: 0
  });

  const sakurasTotal = 5;
  const sakurasDone = 1;

  useEffect(() => {
    (async () => {
      try {
        const profilesRes = await fetch(`${backendServiceURL}/profiles`, {
          credentials: "include"
        });
        if (!profilesRes.ok) return;
        const profiles = await profilesRes.json();
        if (!profiles?.length) return;

        const profileId = profiles[0].id;

        const progressRes = await fetch(`${backendServiceURL}/profiles/progress/${profileId}`, {
          credentials: "include"
        });
        if (progressRes.ok) {
          const data = await progressRes.json();
          setProgress({
            online: data.progress?.length ?? 0,
            privacy: 0,
            chats: 0,
            fake: 0
          });
        }
      } catch (error) {
        console.error("Error on page _Module_", error);
      }
    })();
  }, []);

  const modules = useMemo<ModuleItem[]>(
    () => [
      {
        key: "online",
        title: "Online Sicherheit",
        desc: "Passwörter, Links & sicher klicken.",
        route: "/module/online-sicherheit",
        art: "/elephant.svg",
        bgClass: "bg-(--color-blue)"
      },
      {
        key: "privacy",
        title: "Privatsphäre",
        desc: "Was darf online über dich stehen?",
        route: "/module/Privatsphäre",
        art: "/hase.svg",
        bgClass: "bg-(--color-yellow)"
      },
      {
        key: "chats",
        title: "Chats & Verhalten",
        desc: "Freundlich bleiben & Grenzen kennen.",
        route: "/module/Privatsphäre",
        art: "/animal.svg",
        bgClass: "bg-(--color-peach)"
      },
      {
        key: "fake",
        title: "Fake erkennen",
        desc: "Echte Infos von Quatsch trennen.",
        route: "/module/Privatsphäre",
        art: "/duck.svg",
        bgClass: "bg-(--color-green)"
      }
    ],
    []
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const slides = Array.from(root.querySelectorAll("[data-slide]")) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => {
        const best = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!best) return;
        setActive(Number((best.target as HTMLElement).dataset.index || 0));
      },
      { root, threshold: [0.5, 0.65, 0.8] }
    );
    slides.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [modules.length]);

  const getBadge = (key: ModuleItem["key"]) => {
    const done = progress[key];
    return `${done}/${total}`;
  };

  const scrollTo = (idx: number) => {
    const root = viewportRef.current;
    if (!root) return;
    const el = root.querySelector(`[data-index="${idx}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="pt-6">
      {/* Kopf wie Home */}
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Welches Abenteuer willst du heute starten?</h1>
        <p className="mt-2 text-md">
          Heute schon etwas gelernt? Dein Sakura-Fortschritt wächst mit jeder Lektion.
        </p>
        {/* SAKURA BAR */}
        <div>
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
        </div>
      </div>

      {/* BIG Slider */}
      <div className="mx-auto mt-6 max-w-6xl px-2">
        <div
          ref={viewportRef}
          className="flex gap-5 px-0 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory
                 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {modules.map((m, idx) => (
            <article
              key={m.key}
              data-slide
              data-index={idx}
              className="snap-center shrink-0 w-[96%] md:w-[92%]"
            >
              <div
                className={[
                  "relative overflow-hidden rounded-[2.5rem] shadow-sm",
                  "min-h-420px sm:min-h-460px md:min-h-520px",
                  m.bgClass
                ].join(" ")}
              >
                {/* Shine */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/25 blur-2xl" />
                <div className="pointer-events-none absolute left-10 top-10 h-44 w-44 rounded-full bg-white/20 blur-xl" />

                {/* Badge */}
                <div className="progress-card absolute right-6 top-6 rounded-2xl bg-white/70 px-4 py-2 text-xs font-extrabold">
                  {getBadge(m.key)}
                </div>

                {/* Content */}
                <div className="relative grid h-full grid-cols-1 md:grid-cols-2 gap-6 p-7 sm:p-10">
                  {/* Left */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl font-extrabold leading-tight">{m.title}</h3>
                    <p className="mt-3 text-md sm:text-lg text-(--color-dark-gray)">{m.desc}</p>

                    {/* Small “what you learn” chips */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="progress-card rounded-2xl bg-white/65 px-4 py-2 text-xs font-bold">
                        Mini-Lektionen
                      </span>
                      <span className="progress-card rounded-2xl bg-white/65 px-4 py-2 text-xs font-bold">
                        Bilder & Beispiele
                      </span>
                      <span className="progress-card rounded-2xl bg-white/65 px-4 py-2 text-xs font-bold">
                        Kurzes Quiz
                      </span>
                    </div>

                    <div className="mt-7">
                      <Link to="/lessons">
                        <PrimaryButton label="Starten ➜" />
                      </Link>
                    </div>

                    <div className="mt-4 text-xs text-(--color-dark-gray)">
                      Tipp: Du kannst auch swipen 👆
                    </div>
                  </div>

                  {/* Right */}
                  <div className="relative grid place-items-center">
                    <img
                      src={m.art}
                      alt=""
                      className={[
                        "w-[320px] sm:w-380px md:w-460px lg:w-520px",
                        "drop-shadow-md transition-transform duration-300",
                        idx === active ? "scale-[1.03]" : "scale-100"
                      ].join(" ")}
                    />
                  </div>
                </div>

                {/* Bottom “swipe bar” */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1.5 w-20 rounded-full bg-white/60" />
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {modules.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              className={[
                "h-2.5 rounded-full transition-all",
                idx === active ? "w-10 bg-(--color-primary)" : "w-2.5 bg-(--color-dark-gray)/20"
              ].join(" ")}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
