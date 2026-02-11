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
