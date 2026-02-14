import type { ModuleKey } from "../types/lesson.ts";

export type QuizQuestion = {
  situation: string;
  answers: { id: "a" | "b" | "c"; text: string }[];
  correctId: "a" | "b" | "c";
};

export const quizzes: Record<ModuleKey, QuizQuestion[]> = {
  online: [
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
      situation: "Eine Nachricht droht: „Account wird gelöscht – logge dich sofort ein!“",
      answers: [
        { id: "a", text: "Ich mache das sofort" },
        { id: "b", text: "Ich prüfe die echte App/Website und frage Hilfe" },
        { id: "c", text: "Ich schicke es an Freunde" }
      ],
      correctId: "b"
    }
  ],

  privacy: [
    {
      situation: "Jemand fragt nach deiner Adresse im Chat.",
      answers: [
        { id: "a", text: "Ich schreibe sie" },
        { id: "b", text: "Ich sage nein und frage eine erwachsene Person" },
        { id: "c", text: "Ich poste sie in die Gruppe" }
      ],
      correctId: "b"
    },
    {
      situation: "Du willst ein Foto posten. Im Hintergrund sieht man ein Straßenschild.",
      answers: [
        { id: "a", text: "Egal, ich poste es" },
        { id: "b", text: "Ich checke/entferne Standort-Infos oder poste es nicht" },
        { id: "c", text: "Ich schreibe noch meine Schule dazu" }
      ],
      correctId: "b"
    },
    {
      situation: "Ein Online-Freund will deine Telefonnummer.",
      answers: [
        { id: "a", text: "Ich gebe sie, damit er nett bleibt" },
        { id: "b", text: "Ich sage nein und hole Hilfe" },
        { id: "c", text: "Ich schreibe sie öffentlich" }
      ],
      correctId: "b"
    }
  ],

  chats: [
    {
      situation: "Jemand beleidigt dich im Chat.",
      answers: [
        { id: "a", text: "Ich beleidige zurück" },
        { id: "b", text: "Ich bleibe ruhig oder mache eine Pause" },
        { id: "c", text: "Ich schreie in Capslock" }
      ],
      correctId: "b"
    },
    {
      situation: "Ein Spieler drängt dich: „Komm in den privaten Chat!“",
      answers: [
        { id: "a", text: "Ich mache es sofort" },
        { id: "b", text: "Ich sage nein – wenn’s komisch ist, blockiere ich" },
        { id: "c", text: "Ich gebe ihm mein Passwort" }
      ],
      correctId: "b"
    },
    {
      situation: "Jemand schreibt fies weiter, obwohl du stopp sagst.",
      answers: [
        { id: "a", text: "Ich ignoriere es immer" },
        { id: "b", text: "Ich blockiere und melde" },
        { id: "c", text: "Ich schicke ihm meine Daten" }
      ],
      correctId: "b"
    }
  ],

  fake: [
    {
      situation: "Du liest: „SOFORT teilen! Sonst passiert etwas Schlimmes!“",
      answers: [
        { id: "a", text: "Ich teile sofort" },
        { id: "b", text: "Ich bleibe ruhig und prüfe die Quelle" },
        { id: "c", text: "Ich glaube alles direkt" }
      ],
      correctId: "b"
    },
    {
      situation: "Ein Bild wirkt komisch (Schatten/Kanten passen nicht).",
      answers: [
        { id: "a", text: "Ich glaube es sofort" },
        { id: "b", text: "Ich vergleiche mit anderen seriösen Quellen" },
        { id: "c", text: "Ich teile es ohne nachzudenken" }
      ],
      correctId: "b"
    },
    {
      situation: "Ein anonymer Account behauptet etwas Krasses.",
      answers: [
        { id: "a", text: "Wenn es viele Likes hat, stimmt es" },
        { id: "b", text: "Ich checke, ob seriöse Quellen das auch sagen" },
        { id: "c", text: "Ich schreibe nur „OMG“" }
      ],
      correctId: "b"
    }
  ]
};
