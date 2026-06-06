"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Card } from "@/data/meditations";
import styles from "./Deck.module.css";

type Props = {
  cards: Card[];
};

/**
 * Card-back artwork per category ("card type"). Each deck/category has its own
 * illustrated back; add more entries as new types arrive. Falls back to the
 * leaf emblem for any category without art yet.
 */
const BACK_ART: Record<string, string> = {
  "messages from the earth": "/back-messages-from-the-earth.png",
  "walking thoughts": "/back-walking-thoughts.png",
};

/** The back shown at rest, before anything is drawn. */
const DEFAULT_BACK = "messages from the earth";

/** Pure random pick across the full deck — every draw independent, repeats allowed. */
function pickRandom(cards: Card[]): Card {
  return cards[Math.floor(Math.random() * cards.length)];
}

export default function Deck({ cards }: Props) {
  // `card` is the drawn (or last-drawn) card; `flipped` true = its face is up.
  const [card, setCard] = useState<Card | null>(null);
  const [flipped, setFlipped] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBoxRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bodyBoxRef = useRef<HTMLDivElement>(null);

  const handleTap = useCallback(() => {
    if (flipped) {
      // Showing a meditation → put it back in the deck, ready for the next draw.
      // Keep `card` mounted so the face doesn't blank mid-flip.
      setFlipped(false);
    } else {
      // Face-down deck → draw a fresh random card and reveal it.
      setCard(pickRandom(cards));
      setFlipped(true);
    }
  }, [cards, flipped]);

  // Auto-size both header and body to their own fixed boxes so the card never
  // scrolls and a calm gap always sits between them. Each is bottom/top-anchored
  // with overflow upward, so we measure the element's own height (offsetHeight),
  // not the box's scrollHeight, which wouldn't see overflow past the anchor.
  useLayoutEffect(() => {
    const title = titleRef.current;
    const headerBox = headerBoxRef.current;
    const body = bodyRef.current;
    const bodyBox = bodyBoxRef.current;
    if (!title || !headerBox || !body || !bodyBox || !card) return;

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
      // Body: comfortable reading size, capped relative to its column width.
      const bodyFont = largestThatFits(body, bodyBox, Math.min(22, bodyBox.clientWidth * 0.09));
      // Header: up to ~2.7× the body, but shrinks to stay within its region so a
      // long, multi-line title never crowds the body.
      largestThatFits(title, headerBox, bodyFont * 2.7);
    };

    fit();
    // Re-fit once the bundled font is ready (metrics differ from the fallback).
    document.fonts?.ready.then(fit).catch(() => {});

    const ro = new ResizeObserver(fit);
    ro.observe(bodyBox);
    ro.observe(headerBox);
    return () => ro.disconnect();
  }, [card]);

  // Back artwork follows the drawn card's category (the default before a draw).
  const backArt = BACK_ART[card?.category ?? DEFAULT_BACK];

  return (
    <main className={styles.stage}>
      <div className={styles.deck}>
        {/* Cards resting underneath, so the top card reads as drawn from a deck. */}
        <div className={`${styles.rest} ${styles.rest3}`} aria-hidden="true" />
        <div className={`${styles.rest} ${styles.rest2}`} aria-hidden="true" />
        <div className={`${styles.rest} ${styles.rest1}`} aria-hidden="true" />

        <button
          type="button"
          className={`${styles.flip} ${flipped ? styles.isFront : ""}`}
          onClick={handleTap}
          aria-label={
            flipped && card
              ? `${card.title}, ${card.category}. Tap to return it to the deck.`
              : "Face-down deck. Tap to draw a card."
          }
        >
          <div className={styles.inner}>
            {/* BACK — the face-down deck (category artwork, leaf fallback). */}
            <div className={styles.back}>
              {backArt ? (
                <div
                  className={styles.backArt}
                  style={{ backgroundImage: `url("${backArt}")` }}
                  aria-hidden="true"
                />
              ) : (
                <>
                  <span className={styles.emblem} aria-hidden="true">
                    <Leaf />
                  </span>
                  <span className={styles.backLabel}>messages from the earth</span>
                </>
              )}
            </div>

            {/* FRONT — the meditation, laid out like the physical card. */}
            <div className={styles.front}>
              {card && (
                <div className={styles.face}>
                  <div className={styles.headerBox} ref={headerBoxRef}>
                    <h1 className={styles.title} ref={titleRef}>
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
      </div>
    </main>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      <path
        d="M60 14 C92 38, 92 82, 60 106 C28 82, 28 38, 60 14 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M60 22 L60 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M60 44 L80 30 M60 64 L86 50 M60 84 L80 72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M60 44 L40 30 M60 64 L34 50 M60 84 L40 72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
