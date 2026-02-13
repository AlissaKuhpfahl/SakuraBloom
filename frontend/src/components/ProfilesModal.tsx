import { createPortal } from "react-dom";

type ProfilesModalProps = {
  user: User | null;
  setShowProfilesModal: (value: boolean) => void;
};

function Profiles({ user }: { user: User | null }) {
  if (!user?.profiles || user.profiles.length === 0) {
    return <p>Bitte anmelden</p>;
  } else {
    return (
      <div>
        {user.profiles.map(profile => {
          return (
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full flex items-center justify-center h-20 w-20 bg-gradient-to-r from-pink-500 to-rose-500">
                {/* <p>{profile.profileName[0]}</p> */}
                <img
                  src={profile.avatarUrl ?? "/avatars/bear.svg"}
                  alt={profile.profileName[0]}
                  className="h-18 w-18"
                />
              </div>
              <h2>{profile.profileName}</h2>
              <input type="checkbox"></input>
            </div>
          );
        })}
      </div>
    );
  }
}
export function ProfilesModal({ setShowProfilesModal, user }: ProfilesModalProps) {
  const wrapperClass = `flex items-center justify-center ${""}`.trim();
  const overlayClass = "absolute inset-0 bg-black/50";
  const panelClass =
    "z-10 w-11/12 max-w-md max-h-[90vh] rounded-lg bg-white p-6 shadow-lg flex flex-col";
  const profilesContainerClass = "overflow-y-auto flex-1";

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483647 }} className={wrapperClass}>
      <div
        className={overlayClass}
        onClick={() => {
          setShowProfilesModal(false);
        }}
      />
      <div className={panelClass}>
        <h2 className="mb-4 text-lg text-center font-semibold">
          {"Profil auswählen oder anlegen"}
        </h2>
        <div className={`flex justify-items-start flex-col gap-5 ${profilesContainerClass}`}>
          {user && <Profiles user={user}></Profiles>}
        </div>
      </div>
    </div>,
    document.body
  );
}
