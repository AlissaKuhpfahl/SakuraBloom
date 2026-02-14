// Fortschritte beim Lektionen speichern
const KEY = "sakura_progress_v1";

type ProgressData = {
  doneLessons: string[];
};

function read(): ProgressData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { doneLessons: [] };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { doneLessons: [] };
  }
}

function write(data: ProgressData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function isLessonDone(moduleKey: string, lessonId: string) {
  const data = read();
  return data.doneLessons.includes(`${moduleKey}-${lessonId}`);
}

export function markLessonDone(moduleKey: string, lessonId: string) {
  const data = read();
  const key = `${moduleKey}-${lessonId}`;
  if (!data.doneLessons.includes(key)) data.doneLessons.push(key);
  write(data);
}

export function clearProgress() {
  localStorage.removeItem(KEY);
}

///
const REWARD_KEY = "sakura_reward_v1";

export type RewardPayload = {
  moduleKey: string;
  lessonId: string;
  title?: string;
  message?: string;
};

export function setPendingReward(payload: RewardPayload) {
  localStorage.setItem(REWARD_KEY, JSON.stringify(payload));
}

export function readPendingReward(): RewardPayload | null {
  try {
    const raw = localStorage.getItem(REWARD_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RewardPayload;
  } catch {
    return null;
  }
}

export function clearPendingReward() {
  localStorage.removeItem(REWARD_KEY);
}

// -------- Pending overlays --------
const PENDING_LESSON_REWARD = "sakura_pending_lesson_reward_v1";
const PENDING_MODULE_COMPLETE = "sakura_pending_module_complete_v1";

export type PendingLessonReward = {
  moduleKey: string;
  lessonId: string;
  title?: string;
  message?: string;
};

export type PendingModuleComplete = {
  moduleKey: string;
  title?: string;
  message?: string;
};

export function setPendingLessonReward(data: PendingLessonReward) {
  localStorage.setItem(PENDING_LESSON_REWARD, JSON.stringify(data));
}

export function readPendingLessonReward(): PendingLessonReward | null {
  try {
    const raw = localStorage.getItem(PENDING_LESSON_REWARD);
    return raw ? (JSON.parse(raw) as PendingLessonReward) : null;
  } catch {
    return null;
  }
}

export function clearPendingLessonReward() {
  localStorage.removeItem(PENDING_LESSON_REWARD);
}

export function setPendingModuleComplete(data: PendingModuleComplete) {
  localStorage.setItem(PENDING_MODULE_COMPLETE, JSON.stringify(data));
}

export function readPendingModuleComplete(): PendingModuleComplete | null {
  try {
    const raw = localStorage.getItem(PENDING_MODULE_COMPLETE);
    return raw ? (JSON.parse(raw) as PendingModuleComplete) : null;
  } catch {
    return null;
  }
}

export function clearPendingModuleComplete() {
  localStorage.removeItem(PENDING_MODULE_COMPLETE);
}
