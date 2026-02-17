import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../components/Btn";

type Tab = "profile" | "security" | "avatar";

export default function ProfileDashboard() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [tab, setTab] = useState<Tab>("profile");

  // beispieldaten
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const [pickedFile, setPickedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // mini message banner
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    window.setTimeout(() => setMsg(null), 2200);
  }

  useEffect(() => {
    if (!pickedFile) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setTimeout(() => setPreviewUrl(""), 0);
      return;
    }
    const url = URL.createObjectURL(pickedFile);
    setTimeout(() => setPreviewUrl(url), 0);
    return () => URL.revokeObjectURL(url);
  }, [pickedFile, previewUrl]);

  function initials() {
    const n = name.trim();
    if (!n) return "🌸";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase()).join("");
  }

  // saves ohne api
  function saveProfile() {
    const n = name.trim();
    const e = email.trim();
    if (!n) return flash("err", "Bitte gib einen Namen ein.");
    if (!e || !e.includes("@")) return flash("err", "Bitte gib eine gültige E-Mail ein.");
    flash("ok", "Profil gespeichert ✅");
  }

  function savePassword() {
    if (!currentPw || !newPw || !newPw2) return flash("err", "Bitte alle Felder ausfüllen.");
    if (newPw.length < 8) return flash("err", "Mindestens 8 Zeichen.");
    if (newPw !== newPw2) return flash("err", "Passwörter stimmen nicht überein.");
    setCurrentPw("");
    setNewPw("");
    setNewPw2("");
    flash("ok", "Passwort geändert ");
  }

  function saveAvatar() {
    if (!pickedFile) return flash("err", "Bitte wähle ein Bild aus.");
    if (!pickedFile.type.startsWith("image/")) return flash("err", "Bitte eine Bilddatei wählen.");

    const maxMB = 5;
    if (pickedFile.size > maxMB * 1024 * 1024) return flash("err", "Bild ist zu groß (max 5MB).");

    setPickedFile(null);
    flash("ok", "Profilbild gespeichert ");
  }

  return (
    <section className="pt-6 pb-12">
      <div className="mx-auto max-w-5xl px-4">
        {/* mini banner */}
        {msg && (
          <div
            className={[
              "mb-4 rounded-3xl border bg-white p-4 shadow-md",
              msg.type === "ok" ? "border-(--color-primary)/50" : "border-(--color-peach)/50"
            ].join(" ")}
          >
            <div className="text-sm font-bold">{msg.text}</div>
          </div>
        )}

        {/* HERO */}
        <div className="relative overflow-hidden rounded-4xl bg-white shadow-md p-6">
          <div className="relative flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-(--color-primary)/10 border border-(--color-primary)/20">
              <span className="text-xl font-extrabold">{initials()}</span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">Dein Profil</h1>
              <p className="mt-1 text-sm font-semibold text-(--color-dark-gray)">
                Verwalte deine Daten
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setTab("profile")}
            className={[
              "flex items-center gap-3 rounded-3xl border shadow-sm px-4 py-3 text-left transition",
              tab === "profile"
                ? "bg-(--color-light-yellow) border-(--color-primary)"
                : "bg-white/50 border-(--color-dark-gray)/10 hover:bg-(--color-light-yellow)"
            ].join(" ")}
          >
            <div
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl border",
                tab === "profile"
                  ? "bg-(--color-primary)/10 border-(--color-primary)/25"
                  : "bg-white/50 border-(--color-dark-gray)/10"
              ].join(" ")}
            >
              <img src="/icons/user.svg" alt="" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold">Daten</div>
              <div className="text-[11px] font-semibold text-(--color-dark-gray)/80">
                Name & E-Mail
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTab("security")}
            className={[
              "flex items-center gap-3 rounded-3xl border shadow-sm px-4 py-3 text-left transition",
              tab === "security"
                ? "bg-(--color-light-yellow) border-(--color-primary)"
                : "bg-white/50 border-(--color-dark-gray)/10 hover:bg-(--color-light-yellow)"
            ].join(" ")}
          >
            <div
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl border",
                tab === "security"
                  ? "bg-(--color-primary)/10 border-(--color-primary)/25"
                  : "bg-white/50 border-(--color-dark-gray)/10"
              ].join(" ")}
            >
              <img src="/icons/lock.svg" alt="" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold">Passwort</div>
              <div className="text-[11px] font-semibold text-(--color-dark-gray)/80">
                Sicherheit
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTab("avatar")}
            className={[
              "flex items-center gap-3 rounded-3xl border shadow-sm px-4 py-3 text-left transition",
              tab === "avatar"
                ? "bg-(--color-light-yellow) border-(--color-primary)"
                : "bg-white/50 border-(--color-dark-gray)/10 hover:bg-(--color-light-yellow)"
            ].join(" ")}
          >
            <div
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl border",
                tab === "avatar"
                  ? "bg-(--color-primary)/10 border-(--color-primary)/25"
                  : "bg-white/50 border-(--color-dark-gray)/10"
              ].join(" ")}
            >
              <img src="/icons/camera.svg" alt="" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold">Profilbild</div>
              <div className="text-[11px] font-semibold text-(--color-dark-gray)/80">Upload</div>
            </div>
          </button>
        </div>

        {/* CONTENT */}
        <div className="mt-4 rounded-4xl bg-white border border-(--color-dark-gray)/10 shadow-md p-6">
          {tab === "profile" && (
            <div className="space-y-4">
              <div>
                <div className="text-xs font-extrabold text-(--color-dark-gray)">Name</div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 w-full rounded-3xl border border-(--color-dark-gray)/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-(--color-primary)/40"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <div className="text-xs font-extrabold text-(--color-dark-gray)">E-Mail</div>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-3xl border border-(--color-dark-gray)/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-(--color-primary)/40"
                  placeholder="name@mail.de"
                />
              </div>

              <PrimaryButton label="Profil speichern" onClick={saveProfile} />
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="text-xs font-extrabold text-(--color-dark-gray)">Aktuell</div>
                  <input
                    type="password"
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                    className="mt-1 w-full rounded-3xl border border-(--color-dark-gray)/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-(--color-primary)/40"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <div className="text-xs font-extrabold text-(--color-dark-gray)">Neu</div>
                  <input
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    className="mt-1 w-full rounded-3xl border border-(--color-dark-gray)/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-(--color-primary)/40"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <div className="text-xs font-extrabold text-(--color-dark-gray)">Wiederholen</div>
                  <input
                    type="password"
                    value={newPw2}
                    onChange={e => setNewPw2(e.target.value)}
                    className="mt-1 w-full rounded-3xl border border-(--color-dark-gray)/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-(--color-primary)/40"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <PrimaryButton label="Passwort ändern" onClick={savePassword} />
            </div>
          )}

          {tab === "avatar" && (
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative">
                <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-4xl border border-(--color-dark-gray)/10 bg-(--color-primary)/10 shadow-sm">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-2xl font-extrabold">{initials()}</div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-2xl bg-white border border-(--color-dark-gray)/10 shadow-md"
                  aria-label="Bild auswählen"
                >
                  <img src="/icons/camera.svg" alt="" className="h-6 w-6" />
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setPickedFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <div className="flex-1">
                <div className="text-sm font-extrabold">
                  {pickedFile ? pickedFile.name : "Noch kein Bild gewählt"}
                </div>
                <div className="mt-1 text-xs font-semibold text-(--color-dark-gray)/80">
                  JPG/PNG · max 5MB
                </div>

                <div className="mt-3 flex gap-2">
                  <PrimaryButton
                    label="Bild speichern"
                    onClick={saveAvatar}
                    disabled={!pickedFile}
                  />
                  <PrimaryButton
                    label="Verwerfen"
                    onClick={() => setPickedFile(null)}
                    className="btn-remove"
                    disabled={!pickedFile}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
