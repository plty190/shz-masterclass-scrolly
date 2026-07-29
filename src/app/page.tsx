import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { KeyNav } from "@/components/KeyNav";
import { Opener } from "@/components/Opener";
import { BeatSequence } from "@/components/BeatSequence";
import { ProcessJourney } from "@/components/ProcessJourney";
import { Emotions } from "@/components/Emotions";
import { EcomGrid } from "@/components/EcomGrid";
import { MarkerScreen } from "@/components/MarkerScreen";
import { Closing } from "@/components/Closing";
import { TextScrub } from "@/components/TextScrub";
import { WelcomeVideo } from "@/components/WelcomeVideo";

/* Interaktiver Keynote-Onepager, ersetzt die Präsentation der Masterclass.
   Reihenfolge = Ablauf; Pfeiltasten/Space navigieren beat-genau (KeyNav). */
export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Nav />
      <KeyNav />
      <main>
        {/* 0 · Einlass, mood.mp4 im Loop während Teilnehmer joinen */}
        <WelcomeVideo />

        {/* 1 · Titel + Hosts + Agenda */}
        <Opener />

        {/* 1 · Status Quo (Mirja), "What happens after the hype?" */}
        <BeatSequence
          id="problem"
          tint="sand"
          eyebrow="Status Quo"
          beats={[
            <TextScrub key="1" className="display-h1 text-[6.5vw] leading-[1.08] md:text-[56px]">
              {`What happens after the hype?`}
            </TextScrub>,
            <div key="2" className="flex flex-col items-center">
              <p className="eyebrow mb-10">What happens after the hype?</p>
              <ol className="w-fit space-y-4 text-left">
                {[
                  "Implementierung & Real Value Creation",
                  "Größte Herausforderung: interne Strukturen & Workflows",
                  "Quality Gate",
                  "Brand Focus",
                  "AI & Legal",
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-6 border-b border-line/60 py-3.5 last:border-b-0">
                    <span className="num-anchor w-6 text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-body font-medium text-[3.6vw] text-ink md:text-[24px]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>,
            <TextScrub key="3" className="display-h2 text-[5.5vw] leading-[1.28] md:text-[44px]">
              <>
                <span className="whitespace-nowrap">Starting point:</span>
                <br />
                <span className="marker">Automatisierung und Kreativität.</span>
              </>
            </TextScrub>,
          ]}
        />

        {/* 2 · Der Ansatz (Philip) */}
        <BeatSequence
          id="ansatz"
          stream
          eyebrow="AI Content Creation heute"
          beats={[
            <TextScrub key="1" className="display-h1 text-[7vw] leading-[1.08] md:text-[56px]">
              Kein Prompting. Kein Shooting.
            </TextScrub>,
            <TextScrub key="2" className="display-h2 text-[5vw] leading-[1.42] md:text-[42px]">
              <>Kuratierte Markenkonsistenz und qualitatives Fitting <span className="marker">auf Knopfdruck.</span></>
            </TextScrub>,
            <TextScrub key="3" className="display-h2 text-[5vw] leading-[1.22] md:text-[42px]">
              <>Fünf fotografische Stile. <span className="text-quiet">Einen davon zeigen wir euch jetzt im Detail.</span></>
            </TextScrub>,
          ]}
        />

        {/* 3 · Der Prozess: Zeichnung → Produkt → E-Com */}
        <ProcessJourney />

        {/* 4 · Emotion */}
        <Emotions />

        {/* 5 · E-Commerce-Produktion + EN 13402 */}
        <EcomGrid />

        {/* 6 · Tool-Preview (Übergabe in die Plattform, direkt vor AI Act) */}
        <MarkerScreen
          id="demo"
          eyebrow="Jetzt live"
          title="Tool-Preview"
          note="Ein echtes Produktbild, in Echtzeit: E-Commerce, Lookbook, Social. Wir wechseln in die Plattform."
        />

        {/* 7 · EU AI Act, Grenzen & Möglichkeiten (Mirja, Part 5) */}
        <BeatSequence
          id="aiact"
          tint="sky"
          eyebrow="EU AI Act · Grenzen & Möglichkeiten"
          beats={[
            <TextScrub key="1" className="display-h1 text-[6.5vw] leading-[1.08] md:text-[56px]">
              <>Ab 2.8.2026 gilt<span className="text-green">:</span></>
            </TextScrub>,
            <div key="2" className="flex flex-col items-center">
              <p className="eyebrow mb-10">Ab 2.8.2026 gilt</p>
              <ol className="grid max-w-3xl grid-cols-1 gap-x-14 text-left md:grid-cols-2">
                {[
                  "Generelle Kennzeichnungspflicht für KI-Content",
                  "Kennzeichnungspflicht für fotorealistische KI-Avatare",
                  "Werbe-/E-Commerce-Content gilt nicht als Kunst",
                  "KI-Label schützt nicht vor UWG",
                  "Referenzen nur mit Lizenz",
                  "Face-Similarity-Check",
                  "Stil ist frei, Werke nicht",
                  "Provenance-Log wird Betriebsstandard",
                  "Digital Twins nur mit Einwilligung",
                  "Klassische Model-Releases reichen nicht",
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-5 border-b border-line/60 py-3">
                    <span className="num-anchor w-6 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-body font-medium text-[3vw] text-ink md:text-[18px]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>,
          ]}
        />

        {/* 9 · Euer nächster Schritt (Mirja, Part 6), Sinnvolle Integration von AI */}
        <BeatSequence
          id="next"
          tint="mint"
          eyebrow="Euer nächster Schritt"
          beats={[
            <TextScrub key="1" className="display-h1 text-[6vw] leading-[1.08] md:text-[52px]">
              <>Sinnvolle Integration <span className="whitespace-nowrap">von AI<span className="text-green">.</span></span></>
            </TextScrub>,
            <div key="2" className="flex flex-col items-center">
              <p className="eyebrow mb-10">Sinnvolle Integration von AI</p>
              <ol className="w-fit space-y-4 text-left">
                {[
                  "E-Commerce",
                  "Visualisierung von Skizzen",
                  "Lookbooks",
                  "Imaginary Worlds",
                  "Erweiterung von Shootings",
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-6 border-b border-line/60 py-4 last:border-b-0">
                    <span className="num-anchor w-6 text-[14px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-body font-medium text-[4vw] text-ink md:text-[26px]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>,
          ]}
        />

        {/* 10 · Q&A + Verabschiedung */}
        <MarkerScreen id="qa" eyebrow="Eure Fragen" title="Q&A" dark={false} />
        <Closing />
      </main>
    </SmoothScroll>
  );
}
