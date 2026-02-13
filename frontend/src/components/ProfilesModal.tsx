import { createPortal } from "react-dom";

type ProfilesModalProps = {
  user: User | null;
  //   isOpen: boolean;
  //   title?: string;
  //   message?: string;
  //   confirmLabel?: string;
  //   cancelLabel?: string;
  //   onConfirm: () => void;
  setShowProfilesModal: (value: boolean) => void;
  //   wrapperClassName?: string;
  //   overlayClassName?: string;
  //   panelClassName?: string;
  //   confirmButtonClassName?: string;
  //   cancelButtonClassName?: string;
};

// const backdropStyle =
//   "background:rgba(0, 0, 0, 0.3) position:fixed top:0 left:0 width: 100% height: 100%";

// const dialogStyle = "position: fixed left:50% top: 50% transform: translate(-50%, -50%)";

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
  //   return (
  //     <>
  //       <h1>Profile</h1>
  //       <div
  //         // className={backdropStyle}
  //         onClick={() => {
  //           setShowProfilesModal(false);
  //         }}
  //       ></div>
  //       <div
  //       //   className={dialogStyle}
  //       >
  //         <button className="close-button" onClick={() => setShowProfilesModal(false)}>
  //           Close
  //         </button>
  //       </div>
  //     </>
  //   );
  const wrapperClass = `flex items-center justify-center ${""}`.trim();
  const overlayClass = "absolute inset-0 bg-black/50";
  const panelClass = "z-10 w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg";
  // const cancelClass = "rounded px-4 py-2 text-sm";
  // const confirmClass = "rounded bg-(--color-primary) px-4 py-2 text-sm text-white";

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
        {/* <p className="mb-6">{message}</p> */}
        <div className="flex justify-items-start flex-col gap-5">
          {user && <Profiles user={user}></Profiles>}
          {/* <button className={cancelClass} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={confirmClass} onClick={onConfirm}>
            {confirmLabel} */}
          {/* </button> */}
        </div>
      </div>
    </div>,
    document.body
  );
}
