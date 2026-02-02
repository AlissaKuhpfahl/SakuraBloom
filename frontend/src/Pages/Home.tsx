// hallo (user) fehlt noch

export default function Home() {
  // const progressLevel = 1; // später aus DB / State
  // const progressSrc = `/sakura-${progressLevel}.svg`;
  const progressLevel = 2; // 1–5
  const total = 5;

  return (
    <section className="space-y-10 pt-6">
      {/* Hero / Intro */}
      {/* <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className=" font-bold">Sicher wachsen im Internet</h1>

        <p className="mt-3 max-w-md text-sm ">
          Lerne spielerisch, wie du sicher im Internet unterwegs bist.
        </p>

        <button
          className="button-primary mt-4
          "
        >
          Starten
        </button> */}

      {/* Fortschritt */}
      {/* <div className="mt-6 flex items-center gap-2 text-sm ">
          <span>Deine Fortschritt:</span>
          <span>.... </span>
        </div>
      </div> */}

      {/* Hero */}
      <div className="relative rounded-3xl bg-white p-8 shadow-sm overflow-visible mt-10 mb-20">
        {/* Bild absolut positioniert */}
        <img
          src="/hero-2.svg"
          alt="Sichere digitale Welt"
          className="
      absolute right-10 top-1/2 -translate-y-1/2
      h-110 w-auto
      drop-shadow-md
    "
        />

        {/* Inhalt links — Platz lassen fürs Bild */}
        <div className="max-w-md pr-40">
          <h1 className="text-3xl font-bold">Sicher wachsen im Internet</h1>

          <p className="mt-3 text-sm">
            Lerne spielerisch, wie du sicher im Internet unterwegs bist.
          </p>

          <button className="button-primary mt-5">Starten</button>
          <button className="button-52 mt-5" role="button">
            test
          </button>
          {/* Fortschritte */}

          <div className="mt-6 flex items-center gap-3 text-sm">
            <span>Dein Fortschritt:</span>

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
          {/* <div className="mt-6 flex items-center gap-3 text-sm">
            <span>Dein Fortschritt:</span>
            <img
              src={progressSrc}
              alt={`Fortschritt ${progressLevel} von 5`}
              className="h-7 w-auto"
            />
          </div> */}
        </div>
      </div>

      {/* Sakura Petals */}
      {/* <span className="absolute bottom-6 right-24 opacity-20">🌸</span>
        <span className="absolute top-8 right-8 opacity-10">🌸</span> */}

      {/* Module */}
      <div className="rounded-3xl bg-white p-8 shadow-sm  ">
        <h2 className="mb-4 text-2xl font-bold ">Module</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="module-headline rounded-2xl bg-(--color-blue) p-6 font-semibold flex items-center justify-between ">
            Online Sicherheit
            <img src="/elephant.svg" alt="" className="w-36 drop-shadow-sm" />
          </div>

          <div className=" module-headline  rounded-2xl bg-(--color-light-yellow) p-6 font-semibold flex items-center justify-between ">
            Privatsphäre
            <img src="/hase.svg" alt="" className="w-36 drop-shadow-sm" />
          </div>

          <div className="module-headline  rounded-2xl bg-(--color-peach) p-6 font-semibold flex items-center justify-between ">
            Chats & Verhalten
            <img src="/animal.svg" alt="" className="w-36 drop-shadow-sm" />
          </div>

          <div className="module-headline  rounded-2xl bg-(--color-green) p-6 font-semibold flex items-center justify-between ">
            Fake erkennen
            <img src="/duck.svg" alt="" className="w-36 drop-shadow-sm" />
          </div>
        </div>
      </div>

      {/* Quiz Teaser */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Text + Button */}
          <div>
            <h2 className="text-xl font-bold">Quiz</h2>

            <p className="mt-2 text-sm text-(--color-dark-gray)">
              Teste dein Wissen spielerisch.
            </p>

            <button className="button-74 mt-4">Quiz starten</button>
          </div>

          {/* Right: Image */}
          <img
            src="/quiz-home.svg"
            alt="Quiz Illustration"
            className="h-34 w-auto drop-shadow-sm transition-transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
