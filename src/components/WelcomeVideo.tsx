"use client";

/* Einlass-Screen: mood.mp4 in Endlosschleife, während Teilnehmer joinen.
   Kommt VOR dem Opener, erster Scroll/→-Klick führt in die Präsentation.
   Header links unten, damit er nicht mit In-Video-Copy überlappt. */
export function WelcomeVideo() {
  return (
    <section
      id="welcome"
      data-stop
      className="relative h-svh overflow-hidden bg-dark"
    >
      <video
        src="/videos/mood.mp4"
        poster="/images/case/mood_poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Sanfte Vignette links-unten für Lesbarkeit — dezent damit helle Frames nicht dunkel wirken */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0) 55%)",
        }}
        aria-hidden
      />

      <div className="absolute bottom-10 left-6 right-6 z-10 flex flex-col items-start text-left text-white md:bottom-16 md:left-16 md:right-auto md:max-w-2xl">
        <p className="eyebrow mb-6 !text-white/60">SHOWZ.AI Masterclass · AI Content Creation</p>
        <h1 className="display-h1 text-[13vw] leading-[0.98] md:text-[112px]">
          Willkommen<span className="text-green">.</span>
        </h1>
        <p className="display-body mt-6 max-w-md text-[15px] leading-relaxed text-white/75 md:text-[17px]">
          Wir starten gleich. Zeit für einen Kaffee.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 md:bottom-8 md:right-8">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        Scrollen zum Start
      </div>
    </section>
  );
}
