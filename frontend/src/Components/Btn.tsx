import { useEffect, useRef } from "react";

/* 🔹 SVG Filter wird nur EINMAL ins DOM eingefügt */
function GooeyFilterOnce() {
  useEffect(() => {
    if (document.getElementById("gooey-filter")) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("id", "gooey-filter");
    svg.style.position = "absolute";

    svg.innerHTML = `
      <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 1"></feFuncA>
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="5"></feGaussianBlur>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="-5 11"></feFuncA>
        </feComponentTransfer>
      </filter>
    `;

    document.body.appendChild(svg);
  }, []);

  return null;
}

/* 🔹 Dein Start Button */
export default function StartButton() {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <GooeyFilterOnce />

      <button
        ref={ref}
        className="btn-primary-goo"
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty(
            "--x",
            String(((e.clientX - r.left) / r.width) * 100)
          );
          el.style.setProperty(
            "--y",
            String(((e.clientY - r.top) / r.height) * 100)
          );
        }}
        onPointerLeave={() => {
          const el = ref.current;
          if (!el) return;
          el.style.setProperty("--x", "50");
          el.style.setProperty("--y", "50");
        }}
      >
        Starten
      </button>
    </>
  );
}
