import { createPortal } from "react-dom";
import { useState } from "react";
// import { Link } from "react-router";
import PrimaryButton from "../components/Btn.tsx";
import { updateActiveProfile } from "../data/profiles.ts";

type ProfilesModalProps = {
  user: User | null;
  setShowProfilesModal: (value: boolean) => void;
};

function Profiles({ user, setShowModal }: { user: User; setShowModal: (value: boolean) => void }) {
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
            console.log(
              "Rendering profile:",
              profile._id,
              ": ",
              profile.profileName,
              "isSelected:",
              isSelected
            );
            {
              /* * Lessons learned 😅: React uses property key on the outermost element returned by
               * the map to track list items between renders. In your map, the outermost
               * element is the wrapping <div>, not the <label>. Putting the key on the
               * label doesn’t help React identify the list item correctly, which can
               * lead to stale state or unexpected UI updates. Moving it to the outer
               *  <div> matches React’s requirement and keeps list reconciliation stable.*/
            }
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
                {/* <label
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 transition ${
                    isSelected ? "border-(--color-primary)" : "border-transparent"
                  }`}
                > */}
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
            console.log(await updateActiveProfile(selectedProfileId as string));
            setShowModal(false);
          }}
        />
      </form>
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
        <h2 className="mb-4 text-lg text-center font-semibold">{"Profil auswählen"}</h2>
        <div className={`flex justify-items-start flex-col gap-5 ${profilesContainerClass}`}>
          {user && <Profiles user={user} setShowModal={setShowProfilesModal}></Profiles>}
        </div>
      </div>
    </div>,
    document.body
  );
}
