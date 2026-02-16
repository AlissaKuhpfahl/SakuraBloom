import { createPortal } from "react-dom";
import { useState } from "react";
// import { Link } from "react-router";
import PrimaryButton from "../components/Btn.tsx";
import { setActiveProfile } from "../data/profiles.ts";
// import { getMe } from "../data/auth.ts";

type ProfilesModalProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  setShowProfilesModal: (value: boolean) => void;
};

function Profiles({
  user,
  setShowModal
  // setUser
}: {
  user: User;
  setShowModal: (value: boolean) => void;
  setUser: (user: User | null) => void;
}) {
  const [selectedProfileId, setSelectedProfileId] = useState(user?.activeProfile?._id);
  console.log("Selected profile ID in Profiles component:", selectedProfileId);

  if (!user?.profiles || user.profiles.length === 0) {
    return <p>Bitte anmelden</p>;
  } else {
    return (
      <form className="flex flex-col">
        <fieldset>
          {/* * Map */}
          {user.profiles.map(profile => {
            const isSelected = profile._id === selectedProfileId;

            return (
              <div key={profile._id} className="flex items-center  justify-between gap-3 mb-2">
                <div className="rounded-full flex items-center justify-center h-20 w-20 bg-linear-to-r from-pink-500 to-rose-500">
                  {/* <p>{profile.profileName[0]}</p> */}
                  <img
                    src={profile.avatarUrl ?? "/avatars/bear.svg"}
                    alt={profile.profileName[0]}
                    className="h-18 w-18"
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
                {/* </label> */}
              </div>
            );
          })}
          {/* </div> */}
        </fieldset>
        <PrimaryButton
          className="w-42 mt-2 self-center"
          label="OK"
          onClick={async () => {
            console.log(await setActiveProfile(selectedProfileId as string));
            // const { upUser } = await getMe();
            // setUser(upUser);
            setShowModal(false);
          }}
        />
      </form>
    );
  }
}
export function ProfilesModal({ setShowProfilesModal, user, setUser }: ProfilesModalProps) {
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
        <h2 className="mb-4 text-lg text-center font-semibold">{"Profil auswählen"}</h2>
        <div className={`flex justify-items-start flex-col gap-5 ${profilesContainerClass}`}>
          {user && (
            <Profiles user={user} setShowModal={setShowProfilesModal} setUser={setUser}></Profiles>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
