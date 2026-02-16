import type { ModuleKey, Step } from "../types";

export type LessonStatus = "done" | "active" | "locked";

export type ContentLesson = {
  id: string; // "1", "2", ...
  title: string;
  subtitle: string;
  status: LessonStatus;
  stepsDone: number;
  steps: Step[];
};

export type ContentModule = {
  key: ModuleKey;
  title: string;
  total: number;
  icon: string;
  lessons: ContentLesson[];
};

const REWARD = (text: string): Step => ({
  title: "Belohnung 🌸",
  type: "reward",
  content: text,
  lottieSrc: "/animations/reward.json",
  soundSrc: "/sounds/reward.mp3",
  primaryLabel: "Nächste Lektion",
  secondaryLabel: "Alle Lektionen"
});

export const modules: ContentModule[] = [
  // =========================
  // 1) ONLINE-SICHERHEIT (5)
  // =========================
  {
    key: "online",
    title: "Online–Sicherheit",
    total: 5,
    icon: "/elephant.svg",
    lessons: [
      {
        id: "1",
        title: "Passwörter verstehen",
        subtitle: "Warum Passwörter wichtig sind.",
        status: "active",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Ein Passwort ist wie ein Schlüssel für dein Konto. Es schützt deine Sachen im Internet."
          },
          {
            title: "Beispiel",
            type: "example",
            content:
              "Du spielst ein Game. Jemand schreibt: „Hey, gib mir dein Passwort, dann bekommst du ein Geschenk!“"
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Ein Spieler fragt nach deinem Passwort. Was machst du?",
            answers: ["Ich sage es ihm", "Ich melde ihn", "Ich ignoriere ihn"],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Passwort = Geheimnis. Nicht teilen – auch nicht mit Freunden."
          },
          REWARD("Super! Du hast alle 5 Teile geschafft und bekommst eine Sakura! 🌸")
        ]
      },
      {
        id: "2",
        title: "Sichere Passwörter",
        subtitle: "So machst du es richtig stark.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Ein sicheres Passwort ist lang und schwer zu erraten. Gut ist: Wörter + Zahl + Zeichen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "„katze“ ist leicht zu raten. „K@tze!2026“ ist schon viel besser."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Welches Passwort ist am sichersten?",
            answers: ["123456", "hallo123", "S@kuR4_2026!"],
            correctIndex: 2
          },
          {
            title: "Tipp",
            type: "tip",
            content:
              "Benutze nicht überall das gleiche Passwort. Sonst ist alles auf einmal in Gefahr."
          },
          REWARD("Mega! Dein Passwort-Boost ist aktiviert 🔐✨")
        ]
      },
      {
        id: "3",
        title: "Links & Nachrichten",
        subtitle: "Nicht jeder Link ist freundlich.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Links können gefährlich sein. Manche wollen, dass du klickst und dann werden Daten geklaut."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Du bekommst: „Gratis Robux/Coins! Klick hier!“ — das ist oft ein Trick."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Du bekommst einen Link: „Gratis Robux / Coins – klick hier!“ Was machst du?",
            answers: [
              "Ich klicke sofort drauf",
              "Ich frage erst Mama/Papa oder eine Lehrkraft",
              "Ich leite den Link an Freunde weiter"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Wenn du unsicher bist: nicht klicken. Erst fragen. Sicher ist sicher."
          },
          REWARD("Nice! Du erkennst fiese Links jetzt viel besser 🕵️‍♀️🌸")
        ]
      },
      {
        id: "4",
        title: "Phishing erkennen",
        subtitle: "Tricks von Betrügern durchschauen.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Phishing bedeutet: Jemand tut so, als wäre er echt, um deine Daten zu bekommen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "„Dein Account wird gesperrt! Melde dich hier an!“ — das ist oft Phishing."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content:
              "Du bekommst eine Nachricht: „Dein Account wird gelöscht! Gib sofort dein Passwort ein!“",
            answers: [
              "Ich mache das schnell",
              "Ich prüfe die echte Website/App und frage Hilfe",
              "Ich schicke die Nachricht weiter"
            ],
            correctIndex: 1
          },
          {
            title: "Check",
            type: "check",
            content:
              "Check: Macht die Nachricht Druck? Komische Links? Viele Fehler? Dann: Stopp und Hilfe holen."
          },
          REWARD("Super! Phishing hat heute keine Chance mehr 🛡️🌸")
        ]
      },
      {
        id: "5",
        title: "Hilfe holen",
        subtitle: "Du musst das nicht allein lösen.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Wenn dir etwas komisch vorkommt, hol dir Hilfe. Das ist mutig und richtig."
          },
          {
            title: "Beispiel",
            type: "example",
            content:
              "Jemand ist im Chat gemein. Du fühlst dich schlecht. Das ist ein Zeichen: Hilfe holen!"
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Ein fremder Spieler fragt nach deinem Namen/Adresse. Was machst du?",
            answers: [
              "Ich erzähle es, damit wir Freunde werden",
              "Ich sage nein, blockiere ihn und melde es",
              "Ich schicke ihm ein Foto von mir"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content:
              "Sag es einer erwachsenen Person (Eltern/Lehrkraft). Blockieren & melden hilft immer."
          },
          REWARD("Stark! Hilfe holen ist richtig mutig 💪🌸")
        ]
      }
    ]
  },

  // =========================
  // 2) PRIVATSPHÄRE (4)
  // =========================
  {
    key: "privacy",
    title: "Privatsphäre",
    total: 4,
    icon: "/hase.svg",
    lessons: [
      {
        id: "1",
        title: "Was sind Daten?",
        subtitle: "Deine Infos gehören dir.",
        status: "active",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Persönliche Daten sind Infos über dich: Name, Adresse, Schule, Telefonnummer, Fotos."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Ein Fremder fragt: „Wie heißt deine Schule?“ — das ist eine persönliche Info."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Welche Info solltest du NICHT öffentlich posten?",
            answers: ["Deine Wohnadresse", "Dein Lieblingsspiel", "Dein Hobby"],
            correctIndex: 0
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Regel: Adresse/Telefon/Schule bleiben privat."
          },
          REWARD("Wow! Du weißt jetzt, was persönliche Daten sind 🔒🌸")
        ]
      },
      {
        id: "2",
        title: "Privat bleibt privat",
        subtitle: "Grenzen setzen ist okay.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Du musst niemandem alles erzählen. Dein Bauchgefühl ist wichtig."
          },
          {
            title: "Beispiel",
            type: "example",
            content:
              "Ein Online-Freund sagt: „Schick mir deine Nummer, sonst sind wir keine Freunde.“"
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Ein Online-Freund will deine Telefonnummer. Was machst du?",
            answers: [
              "Ich gebe sie sofort",
              "Ich sage nein und frage eine erwachsene Person",
              "Ich poste sie im Chat"
            ],
            correctIndex: 1
          },
          {
            title: "Check",
            type: "check",
            content: "Check: Wenn jemand dich unter Druck setzt, ist das ein Warnzeichen. Sag Nein."
          },
          REWARD("Super! Dein „Nein“ ist wie ein Schutzschild 🛡️🌸")
        ]
      },
      {
        id: "3",
        title: "Standort & Fotos",
        subtitle: "Nicht verraten, wo du bist.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Standort teilen kann gefährlich sein. Andere könnten wissen, wo du gerade bist."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Ein Foto zeigt ein Straßenschild oder deine Schule im Hintergrund."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Wann ist Standort teilen okay?",
            answers: [
              "Mit allen im Internet",
              "Nur mit Familie/engen Freunden",
              "Immer automatisch"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Vor dem Posten checken: Sieht man Schulschild, Straße oder Hausnummer?"
          },
          REWARD("Nice! Standort & Fotos: du bist jetzt extra schlau 📍📷🌸")
        ]
      },
      {
        id: "4",
        title: "Einstellungen checken",
        subtitle: "Mach dein Profil sicher.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Mit Privatsphäre-Einstellungen bestimmst du, wer deine Sachen sehen darf."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Wenn dein Profil öffentlich ist, kann fast jeder deine Bilder sehen."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Welche Einstellung ist am besten?",
            answers: ["Öffentlich für alle", "Privat nur für Freunde", "Ohne Passwort (egal)"],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Nimm nur Leute an, die du wirklich kennst. Unbekannte: ablehnen."
          },
          REWARD("Mega! Deine Einstellungen sind jetzt auf sicher ✅🌸")
        ]
      }
    ]
  },

  // =========================
  // 3) CHATS & VERHALTEN (3)
  // =========================
  {
    key: "chats",
    title: "Chats & Verhalten",
    total: 3,
    icon: "/animal.svg",
    lessons: [
      {
        id: "1",
        title: "Freundlich schreiben",
        subtitle: "So macht Chat Spaß für alle.",
        status: "active",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Respekt im Chat bedeutet: freundlich bleiben und niemanden verletzen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Du könntest schreiben: „Bitte hör auf“ statt „Du bist doof“."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Jemand ärgert dich im Chat. Was ist am besten?",
            answers: [
              "Zurück beleidigen",
              "Kurz Pause machen und ruhig bleiben",
              "Alle anschreien"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Wenn du wütend bist: erst durchatmen, dann schreiben."
          },
          REWARD("Cool! Freundlich schreiben = echter Pro-Move 💬✨🌸")
        ]
      },
      {
        id: "2",
        title: "Nein sagen lernen",
        subtitle: "Du darfst Grenzen setzen.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Du darfst jederzeit Nein sagen. Du musst nichts tun, was sich falsch anfühlt."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "„Komm in den privaten Chat!“ — Wenn du nicht willst, sag: „Nein, danke.“"
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Ein Spieler drängt dich zu etwas. Was machst du?",
            answers: [
              "Ich mache es, damit er nicht traurig ist",
              "Ich sage klar Nein",
              "Ich gebe nach"
            ],
            correctIndex: 1
          },
          {
            title: "Check",
            type: "check",
            content: "Check: Dein Nein ist okay. Ein guter Freund akzeptiert das."
          },
          REWARD("Stark! Grenzen setzen kann nicht jeder – du schon 💪🌸")
        ]
      },
      {
        id: "3",
        title: "Blockieren & Melden",
        subtitle: "So schützt du dich.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content:
              "Blockieren stoppt Nachrichten von einer Person. Melden sorgt dafür, dass Plattformen helfen können."
          },
          {
            title: "Beispiel",
            type: "example",
            content:
              "Jemand spammt dich oder ist gemein → Blockieren, Screenshot, melden, Hilfe holen."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Jemand ist fies und schreibt immer weiter. Was ist richtig?",
            answers: [
              "Ignorieren und nichts sagen",
              "Blockieren und melden",
              "Passwort schicken, damit Ruhe ist"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Du bist nicht schuld. Hol Hilfe und nutze Blockieren/Melden."
          },
          REWARD("Yes! Blockieren & Melden – du weißt, wie’s geht 🚨🌸")
        ]
      }
    ]
  },

  // =========================
  // 4) FAKE ERKENNEN (5)
  // =========================
  {
    key: "fake",
    title: "Fake erkennen",
    total: 5,
    icon: "/duck.svg",
    lessons: [
      {
        id: "1",
        title: "Echt oder Fake?",
        subtitle: "Erst denken, dann glauben.",
        status: "active",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Im Internet kann jeder etwas posten. Nicht alles ist wahr."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Eine Nachricht schreit: „SOFORT klicken!!!“ — das ist oft Clickbait."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Eine Nachricht sagt: „Du hast 1.000€ gewonnen!“ Was tust du?",
            answers: [
              "Sofort Daten eingeben",
              "Erst prüfen und Hilfe fragen",
              "An alle weiterleiten"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Stop & Think: Wer sagt das? Gibt’s Beweise? Klingt es logisch?"
          },
          REWARD("Nice! Erst denken, dann klicken – sehr smart 🧠🌸")
        ]
      },
      {
        id: "2",
        title: "Bilder prüfen",
        subtitle: "Kann das Bild manipuliert sein?",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Bilder können bearbeitet sein oder aus einem anderen Zusammenhang stammen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Ein Bild sieht echt aus, aber Schatten/Details passen nicht."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Du siehst ein komisches Bild. Was ist am besten?",
            answers: [
              "Sofort glauben",
              "Mit anderen Quellen vergleichen",
              "Alle auslachen, die zweifeln"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Check Details: Schatten, Kanten, Textfehler. Wenn komisch: prüfen."
          },
          REWARD("Super! Du kannst Bilder jetzt besser einschätzen 🖼️🔍🌸")
        ]
      },
      {
        id: "3",
        title: "Schock-Nachrichten",
        subtitle: "Nicht stressen lassen.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Schock-Nachrichten machen Angst, damit Leute schnell teilen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "„Das passiert heute überall!!!“ — oft übertrieben oder falsch."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Eine Nachricht macht dir Angst. Was machst du?",
            answers: ["Sofort teilen", "Erst ruhig bleiben und prüfen", "Direkt alles glauben"],
            correctIndex: 1
          },
          {
            title: "Check",
            type: "check",
            content: "Check: Wenn du Angst bekommst → Pause, atmen, prüfen, Hilfe fragen."
          },
          REWARD("Mega! Schock-Nachrichten stressen dich nicht mehr 😌🌸")
        ]
      },
      {
        id: "4",
        title: "Quellen checken",
        subtitle: "Wer sagt das?",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Eine Quelle ist, wer die Info schreibt. Seriös = vertrauenswürdig."
          },
          {
            title: "Beispiel",
            type: "example",
            content:
              "Ein anonymer Account behauptet etwas. Eine offizielle Seite sagt etwas anderes."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Wie prüfst du am besten, ob etwas stimmt?",
            answers: [
              "Nur einer random Seite glauben",
              "Mehrere seriöse Quellen vergleichen",
              "Nur dem lautesten Kommentar glauben"
            ],
            correctIndex: 1
          },
          {
            title: "Tipp",
            type: "tip",
            content: "Wenn nur 1 komische Seite es sagt: vorsichtig sein."
          },
          REWARD("Nice! Du checkst Quellen wie ein Profi 🧾✅🌸")
        ]
      },
      {
        id: "5",
        title: "Kurz nachdenken!",
        subtitle: "Stop & Think.",
        status: "locked",
        stepsDone: 0,
        steps: [
          {
            title: "Lesen",
            type: "read",
            content: "Manchmal reicht 1 Minute Denken, um einen Fake zu stoppen."
          },
          {
            title: "Beispiel",
            type: "example",
            content: "Jemand sagt: „Alle machen das!“ — du prüfst trotzdem, statt blind zu folgen."
          },
          {
            title: "Mini-Aufgabe",
            type: "task",
            content: "Du bist unsicher, ob etwas echt ist. Was ist richtig?",
            answers: ["Trotzdem posten", "Erst nachfragen/prüfen", "Alle beleidigen, die zweifeln"],
            correctIndex: 1
          },
          {
            title: "Check",
            type: "check",
            content: "Check-Liste: 1) Quelle? 2) Beweise? 3) Sinn? Wenn unsicher: nicht teilen."
          },
          REWARD("WOW! Du bist jetzt ein Fake-Detektiv 🕵️‍♂️🌸")
        ]
      }
    ]
  }
];
