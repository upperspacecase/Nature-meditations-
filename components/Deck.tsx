"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Card } from "@/data/meditations";
import styles from "./Deck.module.css";

type Props = {
  cards: Card[];
};

/** Back artwork per category ("card type"); leaf fallback for any without art. */
const BACK_ART: Record<string, string> = {
  "messages from the earth": "/back-messages-from-the-earth.webp",
  "walking thoughts": "/back-walking-thoughts.webp",
  "nature meditations": "/back-nature-meditations.webp",
  "strengthening affirmations": "/back-strengthening-affirmations.webp",
};

/** Title accent per category, drawn from its back artwork. */
const ACCENT: Record<string, string> = {
  "messages from the earth": "#c0301a",
  "walking thoughts": "#2f7d4f",
  "nature meditations": "#9f4777",
  "strengthening affirmations": "#965740",
};
const DEFAULT_ACCENT = "#b3782f";

type Phase = "deck" | "fanned" | "focused";
type Pos = { x: number; y: number; rot: number };
type Layout = { pos: Pos[]; scale: number };

/** Deterministic pseudo-random in [0,1) from an integer seed. */
function rand(seed: number): number {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/** Scatter the cards across the page in a centered, lightly jittered grid. */
function computeLayout(n: number, vw: number, vh: number, cardW: number, cardH: number): Layout {
  const cols = Math.max(4, Math.min(7, Math.round(vw / 86)));
  const rows = Math.ceil(n / cols);
  const areaW = vw * 0.92;
  const areaH = vh * 0.9;
  const cellW = areaW / cols;
  const cellH = areaH / rows;
  const scale = Math.min(cellW / cardW, cellH / cardH) * 0.94;

  const pos: Pos[] = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const rowCount = row === rows - 1 ? n - row * cols : cols;
    const colOffset = (cols - rowCount) / 2; // center a partial last row
    const cx = (col + colOffset - (cols - 1) / 2) * cellW;
    const cy = (row - (rows - 1) / 2) * cellH;
    const jx = (rand(i + 1) - 0.5) * cellW * 0.28;
    const jy = (rand(i + 7.3) - 0.5) * cellH * 0.22;
    const rot = (rand(i + 13.7) - 0.5) * 16;
    pos.push({ x: cx + jx, y: cy + jy, rot });
  }
  return { pos, scale };
}

function Leaf() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      <path d="M60 14 C92 38, 92 82, 60 106 C28 82, 28 38, 60 14 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 22 L60 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 44 L80 30 M60 64 L86 50 M60 84 L80 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 44 L40 30 M60 64 L34 50 M60 84 L40 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Deck({ cards }: Props) {
  const n = cards.length;
  const [phase, setPhase] = useState<Phase>("deck");
  const [selected, setSelected] = useState<number | null>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  const measureRef = useRef<HTMLButtonElement>(null);

  // Refs for auto-sizing the focused card's text.
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBoxRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bodyBoxRef = useRef<HTMLDivElement>(null);

  // Measure a card and lay out the fan; recompute on resize.
  useLayoutEffect(() => {
    const compute = () => {
      const el = measureRef.current;
      if (!el) return;
      const cardW = el.offsetWidth;
      const cardH = el.offsetHeight;
      if (!cardW || !cardH) return;
      setLayout(computeLayout(n, window.innerWidth, window.innerHeight, cardW, cardH));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [n]);

  // Fit the focused card's header + body within their boxes (never scroll).
  useLayoutEffect(() => {
    if (selected === null) return;
    const title = titleRef.current;
    const headerBox = headerBoxRef.current;
    const body = bodyRef.current;
    const bodyBox = bodyBoxRef.current;
    if (!title || !headerBox || !body || !bodyBox) return;

    const largestThatFits = (el: HTMLElement, box: HTMLElement, hi: number) => {
      let lo = 8;
      let best = lo;
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.offsetHeight <= box.clientHeight && el.scrollWidth <= box.clientWidth) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      el.style.fontSize = `${best}px`;
      return best;
    };

    const fit = () => {
      const bodyFont = largestThatFits(body, bodyBox, Math.min(22, bodyBox.clientWidth * 0.09));
      largestThatFits(title, headerBox, bodyFont * 2.7);
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(bodyBox);
    ro.observe(headerBox);
    return () => ro.disconnect();
  }, [selected]);

  const handleCardTap = useCallback(
    (i: number) => {
      if (phase === "deck") {
        setPhase("fanned");
      } else if (phase === "fanned") {
        setSelected(i);
        setPhase("focused");
      } else if (phase === "focused" && i === selected) {
        // Flip back and collapse the whole spread to the deck.
        setPhase("deck");
      }
    },
    [phase, selected]
  );

  // Tapping the empty background while fanned returns to the deck.
  const handleBackgroundTap = useCallback(() => {
    if (phase === "fanned") setPhase("deck");
  }, [phase]);

  // Once the deck has fully restacked, release the drawn card so the deck
  // returns to its original resting face.
  useEffect(() => {
    if (phase !== "deck" || selected === null) return;
    const t = setTimeout(() => setSelected(null), 700);
    return () => clearTimeout(t);
  }, [phase, selected]);

  const slotStyle = useMemo(() => {
    return (i: number): React.CSSProperties => {
      const isSel = i === selected;
      let x = 0;
      let y = 0;
      let rot = 0;
      let scale = 1;

      if (phase === "deck") {
        const k = Math.min(i, 8); // subtle stacked depth, card 0 on top
        x = k * 1.5;
        y = k * 1.8;
        rot = k * 0.5;
        scale = 1;
      } else if (phase === "fanned" || (phase === "focused" && !isSel)) {
        const p = layout?.pos[i] ?? { x: 0, y: 0, rot: 0 };
        x = p.x;
        y = p.y;
        rot = p.rot;
        scale = layout?.scale ?? 0.2;
      } else {
        // focused + selected → centered, full size
        x = 0;
        y = 0;
        rot = 0;
        scale = 1;
      }

      // Stagger the spread/collapse for a cascading feel.
      let delay = 0;
      if (phase === "fanned") delay = Math.min(i, 28) * 7;
      else if (phase === "deck") delay = Math.min(n - i, 28) * 4;
      if (phase === "deck" && isSel) delay = 170; // let it flip before shrinking

      return {
        transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
        opacity: phase === "focused" && !isSel ? 0 : 1,
        zIndex: isSel ? 9999 : n - i,
        transitionDelay: `${delay}ms`,
      };
    };
  }, [phase, selected, layout, n]);

  // Which card accepts taps/focus in the current phase: the top of the deck,
  // any fanned card, or the focused card.
  const isInteractive = useCallback(
    (i: number) =>
      phase === "deck" ? i === 0 : phase === "fanned" ? true : i === selected,
    [phase, selected]
  );

  return (
    <main
      className={styles.tableau}
      data-phase={phase}
      onClick={handleBackgroundTap}
    >
      {cards.map((card, i) => {
        const accent = ACCENT[card.category] ?? DEFAULT_ACCENT;
        const art = BACK_ART[card.category];
        const showFront = phase === "focused" && i === selected;
        const isSel = i === selected;
        const flipDelay = phase === "focused" && isSel ? 150 : 0;
        const interactive = isInteractive(i);

        return (
          <button
            key={card.id}
            type="button"
            ref={i === 0 ? measureRef : undefined}
            className={styles.slot}
            style={{ ...slotStyle(i), pointerEvents: interactive ? "auto" : "none" }}
            aria-label={
              phase === "deck"
                ? "Card deck. Tap to fan the cards out."
                : phase === "focused" && isSel
                  ? `${card.title}. Tap to return to the deck.`
                  : `${card.category} card. Tap to draw it.`
            }
            aria-hidden={interactive ? undefined : true}
            tabIndex={interactive ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              handleCardTap(i);
            }}
          >
            <div
              className={styles.flipper}
              style={{
                transform: showFront ? "rotateY(180deg)" : "rotateY(0deg)",
                transitionDelay: `${flipDelay}ms`,
              }}
            >
              {/* BACK — artwork (or leaf fallback), framed by a 5px border. */}
              <div className={styles.backFace}>
                {art ? (
                  <div
                    className={styles.backArt}
                    style={{ backgroundImage: `url("${art}")` }}
                  />
                ) : (
                  <div className={styles.backFallback} style={{ color: accent }}>
                    <span className={styles.emblem}>
                      <Leaf />
                    </span>
                    <span className={styles.backLabel}>{card.category}</span>
                  </div>
                )}
              </div>

              {/* FRONT — the meditation (only mounted for the selected card). */}
              <div className={styles.front}>
                {isSel && (
                  <div className={styles.face}>
                    <div className={styles.headerBox} ref={headerBoxRef}>
                      <h1 className={styles.title} ref={titleRef} style={{ color: accent }}>
                        {card.title}
                      </h1>
                    </div>
                    <div className={styles.bodyBox} ref={bodyBoxRef}>
                      <p className={styles.body} ref={bodyRef}>
                        {card.body}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </main>
  );
}
