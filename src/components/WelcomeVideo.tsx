"use client";

/* Einlass-Screen: mood.mp4 in Endlosschleife, während Teilnehmer joinen.
   Kommt VOR dem Opener — erster Scroll/→-Klick führt in die Präsentation. */
export function WelcomeVideo() {
  return (
    <section
      id="welcome"
      data-stop
      className="relative flex h-svh items-center justify-center overflow-hidden bg-dark"
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <p className="eyebrow mb-8 !text-white/60">SHOWZ.AI Masterclass · AI Content Creation</p>
        <h1 className="display-h1 text-[9vw] leading-[1.02] md:text-[80px]">
          Willkommen<span className="text-green">.</span>
        </h1>
        <p className="display-body mt-8 max-w-lg text-[16px] leading-relaxed text-white/70 md:text-[18px]">
          Wir starten gleich. In der Zwischenzeit — kurz durchatmen, Kaffee holen.
        </p>
        <div className="mt-14 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Scrollen zum Start
        </div>
      </div>
    </section>
  );
}
