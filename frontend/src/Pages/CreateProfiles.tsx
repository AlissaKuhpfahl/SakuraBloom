import { useMemo, useState, type FormEvent } from "react";

type AvatarOption = {
  id: string;
  label: string;
  className: string;
};

const avatarOptions: AvatarOption[] = [
  { id: "sakura", label: "Sakura", className: "bg-(--color-primary)" },
  { id: "matcha", label: "Matcha", className: "bg-(--color-green)" },
  { id: "koi", label: "Koi", className: "bg-(--color-peach)" },
  { id: "sky", label: "Sky", className: "bg-(--color-blue)" },
  { id: "sun", label: "Sun", className: "bg-(--color-yellow)" },
  { id: "petal", label: "Petal", className: "bg-(--color-primary-50)" }
];

export function CreateProfiles() {
  const [profileName, setProfileName] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(avatarOptions[0].id);
  const [note, setNote] = useState<string | null>(null);

  const selectedAvatar = useMemo(
    () => avatarOptions.find(avatar => avatar.id === selectedAvatarId),
    [selectedAvatarId]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = profileName.trim();

    if (!trimmedName) {
      setNote("Bitte Profilname eingeben.");
      return;
    }

    setNote(`Profil erstellt: ${trimmedName} (${selectedAvatar?.label ?? "Avatar"}).`);
    setProfileName("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2>Profil erstellen</h2>
      <form
        className="w-full max-w-lg rounded-2xl bg-white/70 p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <label className="mb-4 flex flex-col gap-2 font-semibold" htmlFor="profile-name">
          Profilname
          <input
            id="profile-name"
            name="profile-name"
            value={profileName}
            onChange={event => setProfileName(event.target.value)}
            placeholder="Name eingeben"
            className="rounded-full bg-(--color-secondary) px-4 py-2 text-center text-black"
          />
        </label>

        <fieldset className="mb-5">
          <legend className="mb-3 font-semibold">Avatar auswaehlen</legend>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {avatarOptions.map(avatar => {
              const isSelected = avatar.id === selectedAvatarId;

              return (
                <label
                  key={avatar.id}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 transition ${
                    isSelected ? "border-(--color-primary)" : "border-transparent"
                  }`}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="avatar"
                    value={avatar.id}
                    checked={isSelected}
                    onChange={() => setSelectedAvatarId(avatar.id)}
                  />
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${avatar.className}`}
                  >
                    {avatar.label.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-(--color-dark-gray)">
                    {avatar.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white ${
              selectedAvatar?.className ?? "bg-(--color-light-gray)"
            }`}
          >
            {selectedAvatar?.label.slice(0, 2).toUpperCase() ?? "AV"}
          </div>
          <div>
            <p className="text-sm font-semibold">Vorschau</p>
            <p className="text-xs text-(--color-dark-gray)">
              {selectedAvatar?.label ?? "Kein Avatar gewaehlt"}
            </p>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Profil anlegen
        </button>

        {note && <p className="mt-4 text-center text-sm font-semibold">{note}</p>}
      </form>
    </div>
  );
}
