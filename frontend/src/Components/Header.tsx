import Lottie from "lottie-react";
import { useRef } from "react";

export default function Header() {
  const lottieRef = useRef<any>(null);

  return (
    <header className="sticky top-4 z-20 ">
      <div className="flex h-20 items-center pl-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-black" />
          <p className="text-sm font-semibold">Hallo Kind</p>
        </div>
      </div>

      {/* Button rechts */}
      <div
        className=" 
          group
          absolute right-0 top-1/2 -translate-y-1/2
          h-20 w-20 hover:w-52
          bg-(--color-light-yellow) shadow-sm
          rounded-l-full rounded-r-none
          transition-all duration-200
          overflow-hidden
          cursor-pointer
        "
        onMouseEnter={() => {
          lottieRef.current?.stop?.();
          lottieRef.current?.play?.();
        }}
        onMouseLeave={() => {
          lottieRef.current?.stop?.();
          lottieRef.current?.goToAndStop?.(0, true);
        }}
        aria-label="Für Kleine"
      >
        {/* Kreis links */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full  grid place-items-center">
          <div className="h-14 w-14">
            <Lottie
              lottieRef={lottieRef}
              path="/animations/hatching-chick.json"
              autoplay={false}
              loop={false}
            />
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
          Für Kleine
        </p>

        {/* Pfeil rechts: immer sichtbar */}
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
