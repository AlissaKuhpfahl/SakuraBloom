// Module Keys
export type ModuleKey = "online" | "privacy" | "chats" | "fake";

// Router State
export type LocationState = {
  moduleKey: ModuleKey;
  lessonId: string;
};

// Steps
export type StepBase = {
  title: string;
  type: "read" | "example" | "tip" | "check";
  content: string;
};

export type StepTask = {
  title: string;
  type: "task";
  content: string;
  answers: string[];
  correctIndex: number;
};

export type Step = StepBase | StepTask;

// Lesson
export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  steps: Step[];
};

// Module
export type Module = {
  key: ModuleKey;
  title: string;
  lessons: Lesson[];
};
