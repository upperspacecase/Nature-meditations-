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

/** Title accent per category — the deck's official colour coding. */
const ACCENT: Record<string, string> = {
  "nature meditations": "#9a6a88", // plum
  "walking thoughts": "#4e7d3f", // green
  "messages from the earth": "#cf7f2f", // orange
  "strengthening affirmations": "#465a7d", // slate
};

/** The "about" card's category list (in the order shown on the physical card). */
const LEGEND_ORDER = [
  "nature meditations",
  "walking thoughts",
  "messages from the earth",
  "strengthening affirmations",
] as const;
const LEGEND_DESC: Record<string, string> = {
  "nature meditations":
    "Short meditation exercises to help you connect with the healing powers of the natural world.",
  "walking thoughts":
    "Questions to encourage mindful reflection and introspection while you're in nature.",
  "messages from the earth":
    "Prompts to bring your awareness to nature's enduring beauty and wisdom.",
  "strengthening affirmations":
    "Nature-inspired affirmations to help you strengthen your body and empower your mind.",
};
const DEFAULT_ACCENT = "#b3782f";

/**
 * Order the deck the way the legend card reads: the "about" card on top, then
 * each section in LEGEND_ORDER. (Array sort is stable, so cards keep their
 * within-section order.)
 */
function orderCards(list: Card[]): Card[] {
  const order = LEGEND_ORDER as readonly string[];
  const rank = (c: Card) =>
    c.variant === "legend" ? -1 : order.indexOf(c.category) === -1 ? 999 : order.indexOf(c.category);
  return [...list].sort((a, b) => rank(a) - rank(b));
}

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

export default function Deck({ cards: rawCards }: Props) {
  // Lay the deck out in the legend's order (cover on top, then each section).
  const cards = useMemo(() => orderCards(rawCards), [rawCards]);
  const n = cards.length;
  const [phase, setPhase] = useState<Phase>("deck");
  // `selected` = the tapped tile (drives its zoom/flip); `drawn` = the card
  // whose meditation is shown (a random one from the tapped tile's section).
  const [selected, setSelected] = useState<number | null>(null);
  const [drawn, setDrawn] = useState<number | null>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  // Group card indices by category so tapping a section draws one at random.
  const sections = useMemo(() => {
    const map = new Map<string, number[]>();
    cards.forEach((c, i) => {
      if (c.variant || !c.category) return; // skip special cards
      const arr = map.get(c.category) ?? [];
      arr.push(i);
      map.set(c.category, arr);
    });
    return map;
  }, [cards]);

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

  // Fit the focused card's body (and header, if any) within their boxes so the
  // card never scrolls. Poem cards have a body but no header; the legend card
  // sizes itself with CSS and has neither.
  useLayoutEffect(() => {
    if (drawn === null) return;
    const body = bodyRef.current;
    const bodyBox = bodyBoxRef.current;
    if (!body || !bodyBox) return;
    const title = titleRef.current;
    const headerBox = headerBoxRef.current;

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
      if (title && headerBox) largestThatFits(title, headerBox, bodyFont * 2.7);
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(bodyBox);
    if (headerBox) ro.observe(headerBox);
    return () => ro.disconnect();
  }, [drawn]);

  const handleCardTap = useCallback(
    (i: number) => {
      if (phase === "deck") {
        setPhase("fanned");
      } else if (phase === "fanned") {
        // Tap a section → draw a random card from that section; tap a special
        // card (the legend) → show that card itself.
        const tapped = cards[i];
        const pool = tapped.variant ? null : sections.get(tapped.category);
        const d = pool && pool.length ? pool[Math.floor(Math.random() * pool.length)] : i;
        setSelected(i);
        setDrawn(d);
        setPhase("focused");
      } else if (phase === "focused" && i === selected) {
        // Flip back and collapse the whole spread to the deck.
        setPhase("deck");
      }
    },
    [phase, selected, cards, sections]
  );

  // Tapping the empty background while fanned returns to the deck.
  const handleBackgroundTap = useCallback(() => {
    if (phase === "fanned") setPhase("deck");
  }, [phase]);

  // Once the deck has fully restacked, release the drawn card so the deck
  // returns to its original resting face.
  useEffect(() => {
    if (phase !== "deck" || selected === null) return;
    const t = setTimeout(() => {
      setSelected(null);
      setDrawn(null);
    }, 700);
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
        // Only the top few cards are offset; the rest sit exactly behind them
        // so the deck reads as a clean little stack, not a messy fringe.
        const k = Math.min(i, 3);
        x = k * 3;
        y = k * 4;
        rot = 0;
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
        // The meditation shown on the selected tile is the randomly drawn card.
        const content = isSel && drawn !== null ? cards[drawn] : card;
        const contentAccent = ACCENT[content.category] ?? DEFAULT_ACCENT;

        return (
          <button
            key={card.id}
            type="button"
            ref={i === 0 ? measureRef : undefined}
            className={styles.slot}
            style={{
              ...slotStyle(i),
              pointerEvents: interactive ? "auto" : "none",
              perspective: isSel ? "1400px" : undefined,
            }}
            aria-label={
              phase === "deck"
                ? "Card deck. Tap to fan the cards out."
                : phase === "focused" && isSel
                  ? `${content.title}. Tap to return to the deck.`
                  : `${card.category || "about"} card. Tap to draw it.`
            }
            aria-hidden={interactive ? undefined : true}
            tabIndex={interactive ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              handleCardTap(i);
            }}
          >
            {(() => {
              // The back face: a custom back image, then artwork, then a solid
              // panel, then the leaf fallback.
              const back = card.back ? (
                <div
                  className={styles.backArt}
                  style={{ backgroundImage: `url("${card.back}")` }}
                />
              ) : card.panel ? (
                <div className={styles.backPanel} style={{ background: card.panel }} />
              ) : art ? (
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
              );

              // Only the selected card needs the 3D flip (two stacked faces +
              // preserve-3d). Every other card is a single flat tile — far
              // lighter on mobile GPUs/memory, which keeps iOS from killing the
              // tab when all the cards are on screen.
              if (!isSel) {
                return <div className={styles.backFace}>{back}</div>;
              }

              const front =
                content.variant === "legend" ? (
                  <div className={styles.legendFace}>
                    <p className={styles.legendIntro}>{content.body}</p>
                    <ul className={styles.legendList}>
                      {LEGEND_ORDER.map((cat) => (
                        <li key={cat} className={styles.legendItem}>
                          <span
                            className={styles.legendHeading}
                            style={{ color: ACCENT[cat] }}
                          >
                            {cat}
                          </span>
                          <span className={styles.legendDesc}>{LEGEND_DESC[cat]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : content.variant === "poem" ? (
                  <div className={styles.poemFace} style={{ background: content.panel }}>
                    <div className={styles.poemBox} ref={bodyBoxRef}>
                      <p className={styles.poem} ref={bodyRef}>
                        {content.body}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.face}>
                    <div className={styles.headerBox} ref={headerBoxRef}>
                      <h1
                        className={styles.title}
                        ref={titleRef}
                        style={{ color: contentAccent }}
                      >
                        {content.title}
                      </h1>
                    </div>
                    <div className={styles.bodyBox} ref={bodyBoxRef}>
                      <p className={styles.body} ref={bodyRef}>
                        {content.body}
                      </p>
                    </div>
                  </div>
                );

              return (
                <div
                  className={styles.flipper}
                  style={{
                    transform: showFront ? "rotateY(180deg)" : "rotateY(0deg)",
                    transitionDelay: `${flipDelay}ms`,
                  }}
                >
                  <div className={styles.backFace}>{back}</div>
                  <div className={styles.front}>{front}</div>
                </div>
              );
            })()}
          </button>
        );
      })}
    </main>
  );
}
