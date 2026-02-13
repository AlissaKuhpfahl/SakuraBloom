import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/useAuth.tsx";
import { ProfilesModal } from "./ProfilesModal.tsx";
import type { LottieRefCurrentProps } from "lottie-react";

export default function Header() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { user } = useAuth();
  const [showProfilesModal, setShowProfilesModal] = useState<boolean>(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAnimation = async () => {
      try {
        const res = await fetch("/animations/hatching-chick.json");
        if (!res.ok) throw new Error("Failed to load animation");
        const data = (await res.json()) as object;
        if (isMounted) setAnimationData(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadAnimation();

    return () => {
      isMounted = false;
    };
  }, []);

  const getActiveProfileName = (): string => {
    if (!user) {
      return "Bitte anmelden";
    }
    if (!user.activeProfile) return "Bitte Profil auswählen";
    if (!user.profiles) return "Bitte Profil anlegen";
    else {
      return `Hallo ${user.activeProfile.profileName}`;
    }
  };

  const handleProfileClick = () => {
    setShowProfilesModal(true);
  };

  return (
    <header className=" relative mt-8 z-20 ">
      <div className="flex h-20 items-center pl-8">
        {!user ? (
          //  Gast: Girl + Speechbubble + Text
          <div className="relative flex items-center gap-1">
            {/* Girl bild */}
            <img src="/girl.svg" alt="Sakura Girl" className="h-15 w-15 shrink-0" />

            {/* Bubble + Text Overlay */}
            <div className="relative">
              <img src="/bubble.svg" alt="Nachricht" className="h-20 w-40" />

              {/* Text in Bubble */}
              <p className="absolute left-10 top-1/2 -translate-y-1/2  w-24 text-xs font-bold text-(--color-dark-gray) leading-tight ">
                Komm rein und lerne mit mir!
              </p>
            </div>
          </div>
        ) : (
          // Eingeloggt
          <div className="flex items-center gap-3">
            <button
              onClick={handleProfileClick}
              className="h-17 w-17 rounded-full flex items-center justify-center bg-black text-white font-extrabold"
            >
              <img
                src={user?.activeProfile?.avatarUrl ?? "/avatars/bear.svg"}
                alt={user?.activeProfile?.profileName.slice(0, 1)}
                className="h-16 w-16"
              />
            </button>
            <p className="text-sm font-semibold">{getActiveProfileName()}</p>
          </div>
        )}
      </div>

      {showProfilesModal && (
        <ProfilesModal setShowProfilesModal={setShowProfilesModal} user={user}></ProfilesModal>
      )}

      {/* Button rechts */}
      <div
        className="  group absolute right-0 top-2
    h-20 w-20 hover:w-52
    bg-(--color-light-yellow) shadow-sm
    rounded-l-full rounded-r-none
    transition-all duration-200
    overflow-hidden
          
        "
        onMouseEnter={() => {
          lottieRef.current?.stop?.();
          lottieRef.current?.play?.();
        }}
        onMouseLeave={() => {
          lottieRef.current?.stop?.();
          lottieRef.current?.goToAndStop?.(0, true);
        }}
        aria-label="Hallo!"
      >
        {/* Kreis links */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full  grid place-items-center">
          <div className="h-14 w-14">
            {animationData && (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                autoplay={false}
                loop={false}
              />
            )}
          </div>
        </div>

        {/* Text: erscheint bei Hover */}
        <p
          className="
            absolute  left-18 top-1/2 -translate-y-1/2
            text-m font-bold whitespace-nowrap
            opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-150
          "
        >
          Hallo
        </p>

        {/* Pfeil rechts*/}
        <div
          className="
            absolute right-1 top-1/2 -translate-y-1/2
            text-4xl leading-none text-(--color-dark-gray)
            transition-transform duration-200
            group-hover:rotate-180
          "
        >
          ›
        </div>
      </div>
    </header>
  );
}
