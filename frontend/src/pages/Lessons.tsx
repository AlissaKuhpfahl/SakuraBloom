import { useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../components/Btn.tsx";
import { isLessonDone } from "../utils/progress.tsx";

type ModuleKey = "online" | "privacy" | "chats" | "fake";
type LessonStatus = "done" | "active" | "locked";

export default function Lessons() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ModuleKey>("online");

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

  // Dummy Daten
  const modules = [
    {
      key: "online" as ModuleKey,
      title: "Online–Sicherheit",
      total: 5,
      icon: "/elephant.svg",
      lessons: [
        { id: "1", title: "Passwörter verstehen", status: "done" as LessonStatus, stepsDone: 5 },
        { id: "2", title: "Sichere Passwörter", status: "active" as LessonStatus, stepsDone: 2 },
        { id: "3", title: "Links & Nachrichten", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "4", title: "Phishing erkennen", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "5", title: "Hilfe holen", status: "locked" as LessonStatus, stepsDone: 0 }
      ]
    },
    {
      key: "privacy" as ModuleKey,
      title: "Privatsphäre",
      total: 4,
      icon: "/hase.svg",
      lessons: [
        { id: "1", title: "Was sind Daten?", status: "done" as LessonStatus, stepsDone: 5 },
        { id: "2", title: "Privat bleibt privat", status: "active" as LessonStatus, stepsDone: 1 },
        { id: "3", title: "Standort & Fotos", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "4", title: "Einstellungen checken", status: "locked" as LessonStatus, stepsDone: 0 }
      ]
    },
    {
      key: "chats" as ModuleKey,
      title: "Chats & Verhalten",
      total: 3,
      icon: "/animal.svg",
      lessons: [
        { id: "1", title: "Freundlich schreiben", status: "active" as LessonStatus, stepsDone: 0 },
        { id: "2", title: "Nein sagen lernen", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "3", title: "Blockieren & Melden", status: "locked" as LessonStatus, stepsDone: 0 }
      ]
    },
    {
      key: "fake" as ModuleKey,
      title: "Fake erkennen",
      total: 5,
      icon: "/duck.svg",
      lessons: [
        { id: "1", title: "Echt oder Fake?", status: "active" as LessonStatus, stepsDone: 0 },
        { id: "2", title: "Bilder prüfen", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "3", title: "Schock-Nachrichten", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "4", title: "Quellen checken", status: "locked" as LessonStatus, stepsDone: 0 },
        { id: "5", title: "Kurz nachdenken!", status: "locked" as LessonStatus, stepsDone: 0 }
      ]
    }
  ];

  // computed: doneCount + nextLessonId aus localStorage
  const computedModules = modules.map(m => {
    const isDone = (lessonId: string, status: LessonStatus) =>
      status === "done" || isLessonDone(m.key, lessonId);

    const doneCount = m.lessons.filter(l => isDone(l.id, l.status)).length;

    const next =
      // 1) erst aktive Lektion bevorzugen
      m.lessons.find(l => l.status === "active") ??
      // 2) sonst erste nicht-done und nicht-locked
      m.lessons.find(l => !isDone(l.id, l.status) && l.status !== "locked") ??
      // 3) sonst erste nicht-locked
      m.lessons.find(l => l.status !== "locked") ??
      m.lessons[0];

    return { ...m, doneCount, nextLessonId: next.id };
  });

  const selectedModule = computedModules.find(m => m.key === selected)!;
  const nextLessonId = selectedModule.nextLessonId;

  return (
    <section className="space-y-6 pt-6">
      <div>
        <h1 className="text-3xl font-extrabold">Lektionen</h1>
        <p className="mt-1 text-sm text-(--color-dark-gray)">Wähle ein Modul und lerne weiter.</p>
      </div>

      {/* Background */}
      <div className="relative min-h-170 overflow-hidden rounded-3xl p-6">
        <div className="absolute inset-0" />

        {/* Sakura in BG */}
        <img
          src="/bg-blumen.svg"
          alt=""
          className="pointer-events-none absolute right-6 top-5 z-0 w-48 opacity-30 rotate-8"
        />

        <div className="relative z-10 space-y-6">
          {/* Weiter lernen Karte */}
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer">
            <p className="text-xs">Weiter lernen</p>

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
                    <div className="flex items-center gap-3">
                      <img src={m.icon} alt="" className="h-12 w-12" />
                      <div>
                        <div className="font-extrabold">{m.title}</div>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-(--color-primary)/10 px-2 py-0.5 font-semibold">
                            {m.doneCount}/{m.total}
                          </span>
                          <span className="opacity-80 px-2">{pct}%</span>
                          {/* <span className="rounded-full bg-(--color-primary)/10 px-2 py-0.5 font-semibold">
                            Sakura{" "}
                            {Math.min(5, Math.max(1, Math.ceil((m.doneCount / m.total) * 5)))}/5
                          </span> */}
                          <span>{label}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blumen-Progress */}
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

                  <h3 className="mt-2 text-lg font-extrabold">{l.title}</h3>

                  {/* 5 Kreise */}
                  <div className="mt-3 flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const circlesDone = isDone ? 5 : l.stepsDone;

                      return (
                        <span
                          key={i}
                          className={[
                            "h-2.5 w-2.5 rounded-full",
                            i < circlesDone
                              ? "bg-(--color-primary)"
                              : "bg-(--color-dark-gray) opacity-25"
                          ].join(" ")}
                        />
                      );
                    })}
                  </div>

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
    </section>
  );
}
