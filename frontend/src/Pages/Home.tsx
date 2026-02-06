// hallo (user) fehlt noch

import PrimaryButton from "../components/Btn";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const progressLevel = 2; // 1–5
  const total = 5;

  const navigate = useNavigate();
  // Fortschritte für Module

  const [progress, setProgress] = useState({
    online: 0,
    privacy: 0,
    chats: 0,
    fake: 0
  });

  // 2) Einmal beim Laden holen
  // useEffect(() => {
  //   fetch("/api/progress")
  //     .then((r) => r.json())
  //     .then((data) => setProgress(data))
  //     .catch(() => {});
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        // 1) Profile holen (Cookie Auth!)
        const profilesRes = await fetch("/profiles", { credentials: "include" });
        if (!profilesRes.ok) return;

        const profiles = await profilesRes.json();
        if (!profiles?.length) return;

        // 2) Erstes Profil wählen (später: aktive Auswahl)
        const profileId = profiles[0].id;

        // 3) Progress holen
        const progressRes = await fetch(`/profiles/progress/${profileId}`, {
          credentials: "include"
        });
        if (!progressRes.ok) return;

        const data = await progressRes.json();

        // data.progress ist ein Array
        setProgress({
          online: data.progress?.length ?? 0,
          privacy: 0,
          chats: 0,
          fake: 0
        });
      } catch (error) {
        console.log("Progress konnte nicht geladen werden");
      }
    })();
  }, []);

  return (
    <section className="space-y-10 pt-6">
      {/* Hero */}
      <div className="home-hero relative rounded-3xl bg-white p-8 shadow-sm overflow-visible mt-10 mb-20">
        {/* Bild */}
        <img
          src="/hero-2.svg"
          alt="Sichere digitale Welt"
          className=" absolute right-10 top-1/2 -translate-y-1/2  h-110 w-auto drop-shadow-md home-hero-art"
        />

        {/* Inhalt links  */}
        <div className="max-w-5xl pr-40">
          <h1 className="home-hero-title text-3xl font-bold">
            Sicher <br></br>
            <span className="inline-block text-6xl text-(--color-primary) pr-2 ">wachsen</span>
            im Internet
          </h1>
          <p className="mt-3 text-md">
            Lerne spielerisch, wie du sicher im Internet unterwegs bist.
          </p>

          {/* Fortschritte */}
          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="min-w-28">Dein Fortschritt:</span>

            <div className="flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => {
                const level = i + 1;
                const isActive = level <= progressLevel;

                return (
                  <img
                    key={level}
                    src={`/sakura-${level}.svg`}
                    alt={`Sakura ${level}`}
                    className={`h-7 w-auto transition ${
                      isActive ? "sakura-active" : "sakura-inactive"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <PrimaryButton label="Los geht!" className="mt-2" />
        </div>
      </div>

      {/* Module */}
      <div className="rounded-3xl bg-white p-8 shadow-sm  ">
        <h2 className="mb-4 text-2xl font-bold ">Module</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Erste Module */}
          <Link
            to="/module/online-sicherheit"
            data-badge={`${progress.online}/${total}`}
            className="module-headline module-card rounded-2xl bg-(--color-blue) p-6 font-semibold flex items-center justify-between"
          >
            <span>Online Sicherheit</span>
            <img src="/elephant.svg" alt="" className="w-36 drop-shadow-sm module-card-art" />
          </Link>
          {/* Zweite Module */}
          <Link
            to="/module/Privatsphäre"
            data-badge={`${progress.privacy}/${total}`}
            className=" module-headline  rounded-2xl bg-(--color-light-yellow) p-6 font-semibold flex items-center justify-between home-module"
          >
            <span> Privatsphäre</span>
            <img src="/hase.svg" alt="" className="w-36 drop-shadow-sm module-illustration" />
          </Link>
          {/* Dritte Module */}
          <Link
            to="/module/Privatsphäre"
            data-badge={`${progress.chats}/${total}`}
            className="module-headline  rounded-2xl bg-(--color-peach) p-6 font-semibold flex items-center justify-between home-module"
          >
            <span> Chats & Verhalten</span>
            <img src="/animal.svg" alt="" className="w-36 drop-shadow-sm module-illustration" />
          </Link>
          {/* Vierte Module */}
          <Link
            to="/module/Privatsphäre"
            data-badge={`${progress.fake}/${total}`}
            className="module-headline  rounded-2xl bg-(--color-green) p-6 font-semibold flex items-center justify-between home-module"
          >
            <span> Fake erkennen</span>
            <img src="/duck.svg" alt="" className="w-36 drop-shadow-sm module-illustration" />
          </Link>
        </div>
      </div>

      {/* Quiz Teaser */}
      <div className="quiz-teaser rounded-3xl p-8">
        <div className="flex items-center justify-between gap-6">
          {/* Left */}
          <div>
            <h2 className="quiz-title text-2xl font-extrabold">Quiz </h2>

            <p className="mt-2 text-md text-(--color-dark-gray)">
              Finde heraus, wie gut du dich im Internet auskennst!
            </p>

            <PrimaryButton
              className="mt-2"
              label="Quiz starten"
              onClick={() => navigate("/quiz")}
            />
          </div>

          {/* Right */}
          <img
            src="/quiz-home.svg"
            alt="Quiz Illustration"
            className="quiz-illustration h-36 w-auto"
          />
        </div>
      </div>

      {/* Sicherheits-Tipp Card */}
      <div className="flex justify-center">
        <div className="tip-card-wrapper w-4/12 ">
          <div className="tip-card h-52">
            {/* Front */}
            <div className="tip-face tip-front">
              <img src="/tips.svg" alt="" className="h-16 w-16" />
              <h2 className="text-sm font-bold text-center">Bonus-Tipp</h2>
            </div>

            {/* Back */}
            <div className="tip-face tip-back">
              <p className="text-md text-center ">
                Teile dein Passwort niemals – auch nicht mit Freundinnen oder Freunden.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kontakt & Feedback */}
      <div className="rounded-3xl bg-white p-8">
        <h3 className="text-lg font-bold">Deine Meinung zählt!</h3>

        <p className="mt-2 text-sm ">Hast du eine Frage, ein Problem oder eine Idee für uns?</p>

        <div className="mt-4 flex gap-3">
          <PrimaryButton label="Kontakt & Feedback" onClick={() => navigate("/feedback")} />
        </div>
      </div>
    </section>
  );
}
