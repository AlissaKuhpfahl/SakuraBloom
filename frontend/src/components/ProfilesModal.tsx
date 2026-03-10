import { createPortal } from "react-dom";
import { useState } from "react";
import PrimaryButton from "../components/Btn.tsx";
import { setActiveProfile } from "../data/profiles.ts";
import { useAuth } from "../contexts/useAuth.tsx";
import type { Dispatch, SetStateAction } from "react";

type ProfilesModalProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  setShowProfilesModal: (value: boolean) => void;
};

type ProfilesType = {
  user: User;
  selectedProfileId: string | undefined;
  setSelectedProfileId: Dispatch<SetStateAction<string | undefined>>;
};

function Profiles({ user, selectedProfileId, setSelectedProfileId }: ProfilesType) {
  console.log("Selected profile ID in Profiles component:", selectedProfileId);

  if (!user?.profiles || user.profiles.length === 0) {
    return <p>Bitte anmelden</p>;
  } else {
    return (
      <form className="flex flex-col">
        <fieldset className="pl-10 pr-10">
          {/* * Map */}
          {user.profiles.map(profile => {
            const isSelected = profile._id === selectedProfileId;

            return (
              <div key={profile._id} className="flex items-center  justify-between gap-3 mb-2">
                <div className="rounded-full flex items-center justify-center h-20 w-20 bg-(--color-primary)">
                  <img
                    src={profile.avatarUrl ?? "/avatars/bear.svg"}
                    alt={profile.profileName[0]}
                    className="h-19 w-19"
                  />
                </div>
                <h2>{profile.profileName}</h2>

                <input
                  type="radio"
                  name="avatar"
                  value={profile._id}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedProfileId(profile._id);
                    console.log("Selected profile ID:", profile._id);
                  }}
                />
              </div>
            );
          })}
        </fieldset>
      </form>
    );
  }
}
export function ProfilesModal({ setShowProfilesModal, user }: ProfilesModalProps) {
  const wrapperClass = `flex items-center justify-center ${""}`.trim();
  const overlayClass = "absolute inset-0 bg-black/50";
  const panelClass =
    "z-10 w-11/12 max-w-md max-h-[65vh] rounded-lg bg-white p-6 shadow-lg flex flex-col";
  const profilesContainerClass = "overflow-y-auto flex-1";
  const { setRefreshUser } = useAuth();
  const [selectedProfileId, setSelectedProfileId] = useState(user?.activeProfile?._id);

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483647 }} className={wrapperClass}>
      <div
        className={overlayClass}
        onClick={() => {
          setShowProfilesModal(false);
        }}
      />
      <div className={panelClass}>
        <h2 className="mb-4 text-lg text-center font-semibold">{"Profil auswählen"}</h2>
        <div className={`flex justify-items-start flex-col gap-5 ${profilesContainerClass}`}>
          {user && (
            <Profiles
              user={user}
              selectedProfileId={selectedProfileId}
              setSelectedProfileId={setSelectedProfileId}
            />
          )}
        </div>
        <PrimaryButton
          className="w-42 mt-2 self-center sticky "
          label="OK"
          onClick={async () => {
            console.log(await setActiveProfile(selectedProfileId as string));
            // const { upUser } = await getMe();
            // setUser(upUser);
            setRefreshUser(true);
            setShowProfilesModal(false);
          }}
        />
      </div>
    </div>,
    document.body
  );
}
