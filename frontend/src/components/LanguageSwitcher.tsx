import { useParams, useNavigate } from "react-router-dom";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const navigate = useNavigate();

  // Aktuelle und nächste Sprache bestimmen
  const currentLang = lang === "en" ? "en" : "de";
  const nextLang = currentLang === "de" ? "en" : "de";

  function switchLang() {
    // Sprache im localStorage speichern
    localStorage.setItem("lang", nextLang);

    // Aktuellen Pfad ermitteln und erstes Segment ersetzen
    const segments = window.location.pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      navigate(`/${nextLang}`);
      return;
    }

    segments[0] = nextLang;
    navigate(`/${segments.join("/")}`);
  }

  // Icon abhängig von der aktuellen Sprache
  const iconSrc =
    currentLang === "de"
      ? "/icons/language1.svg" // Deutsch-Icon
      : "/icons/language2.svg"; // Englisch-Icon

  return (
    <button
      onClick={switchLang}
      aria-label={currentLang === "de" ? "Switch to English" : "Zur deutschen Sprache wechseln"}
      title={currentLang === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
      className={[
        "grid h-14 w-14 place-items-center rounded-full shadow-sm",
        "hover:scale-105 active:scale-95 transition-all duration-300",
        currentLang === "de" ? "bg-white/40" : "bg-white/40"
      ].join(" ")}
    >
      <div className="flex flex-col items-center">
        <img
          key={currentLang} // sorgt für sanften Wechsel
          src={iconSrc}
          alt={currentLang === "de" ? "Deutsch" : "English"}
          className="h-8 w-8 transition-all duration-300"
        />
        <span className="text-[12px] font-bold mt-1">{currentLang.toUpperCase()}</span>
      </div>
    </button>
  );
}
