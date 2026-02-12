import { useMemo, useState } from "react";
// import { addProfile } from "../data/profiles.ts";
// import { useAuth } from "../contexts/useAuth.tsx";

type AvatarOption = {
  id: string;
  label: string;
  avatarUrl?: string;
  className?: string;
};

const avatarOptions2: AvatarOption[] = [
  {
    id: "bear",
    label: "Bär",
    avatarUrl: "/avatars/bear.svg",
    className: "bg-(--color-primary)"
  },
  { id: "cat", label: "Katze", avatarUrl: "/avatars/cat.svg", className: "bg-(--color-green)" },
  { id: "chick", label: "Küken", avatarUrl: "/avatars/chick.svg", className: "bg-(--color-peach)" },
  { id: "dog", label: "Hund", avatarUrl: "/avatars/dog.svg", className: "bg-(--color-blue)" },
  { id: "frog", label: "Frosch", avatarUrl: "/avatars/frog.svg", className: "bg-(--color-yellow)" },
  {
    id: "hamster",
    label: "Hamster",
    avatarUrl: "/avatars/hamster.svg",
    className: "bg-(--color-primary-50)"
  },
  {
    id: "lion",
    label: "Löwe",
    avatarUrl: "/avatars/lion.svg",
    className: "bg-(--color-primary)"
  },
  {
    id: "rabbit",
    label: "Hase",
    avatarUrl: "/avatars/rabbit.svg",
    className: "bg-(--color-green)"
  },
  {
    id: "turtle",
    label: "Schildkröte",
    avatarUrl: "/avatars/turtle.svg",
    className: "bg-(--color-peach)"
  },
  {
    id: "girl2",
    label: "Mädchen",
    avatarUrl: "/avatars/girl-2.svg",
    className: "bg-(--color-peach)"
  },
  {
    id: "girl3",
    label: "Mädchen",
    avatarUrl: "/avatars/girl-3.svg",
    className: "bg-(--color-green)"
  },
  {
    id: "girl",
    label: "Mädchen",
    avatarUrl: "/avatars/girl.svg",
    className: "bg-(--color-blue)"
  },
  { id: "boy2", label: "Junge", avatarUrl: "/avatars/boy-2.svg", className: "bg-(--color-peach)" },
  {
    id: "boyglasses",
    label: "Junge",
    avatarUrl: "/avatars/boy-glasses.svg",
    className: "bg-(--color-yellow)"
  },
  {
    id: "boy3",
    label: "Junge",
    avatarUrl: "/avatars/boy-3.svg",
    className: "bg-(--color-primary-50)"
  }
];

export function CreateProfiles() {
  const [profileName, setProfileName] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(avatarOptions2[0].id);
  const [note, setNote] = useState<string | null>(null);
  // const { user } = useAuth();

  const selectedAvatar = useMemo(
    () => avatarOptions2.find(avatar => avatar.id === selectedAvatarId),
    [selectedAvatarId]
  );

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = profileName.trim();

    if (!trimmedName) {
      setNote("Bitte Profilname eingeben.");
      return;
    }

    try {
      // const resData = await addProfile(trimmedName, selectedAvatarId);
    } catch (error: unknown) {
      console.log(error);
      const message = (error as { message: string }).message;
      setNote(message);
      return;
    }
    setNote(`Profil erstellt: ${trimmedName}`);
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
          Für wen ist das neue Profil?
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
          <legend className="mb-3 font-semibold">Wähle einen Avatar</legend>
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
            {avatarOptions2.map(avatar => {
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
                    className={`flex h-18 w-18 items-center justify-center rounded-full text-sm font-bold text-white ${avatar.className}`}
                  >
                    {/* {avatar.label.slice(0, 2).toUpperCase()} */}
                    <img src={avatar.avatarUrl} alt={avatar.label} className="h-17 w-17" />
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-10 flex items-center justify-center mt-10 gap-3">
          <div
            className={`flex h-18 w-18 items-center justify-center rounded-full text-sm font-bold text-white ${
              selectedAvatar?.className ?? "bg-(--color-light-gray)"
            }`}
          >
            <img
              src={selectedAvatar?.avatarUrl}
              alt={selectedAvatar?.label}
              className="h-17 w-17"
            />
          </div>
          <div>
            <h2>{profileName}</h2>
          </div>
        </div>
        <h3 className="text-center">Alles klar?</h3>
        <button type="submit" className="btn-primary w-full">
          Profil anlegen
        </button>

        {note && <p className="mt-4 text-center text-sm font-semibold">{note}</p>}
      </form>
    </div>
  );
}
