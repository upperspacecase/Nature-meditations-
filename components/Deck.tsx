"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Card } from "@/data/meditations";
import styles from "./Deck.module.css";

type Props = {
  cards: Card[];
};

/** Pure random pick across the full deck — every draw independent, repeats allowed. */
function pickRandom(cards: Card[]): Card {
  return cards[Math.floor(Math.random() * cards.length)];
}

export default function Deck({ cards }: Props) {
  // `card` is the drawn (or last-drawn) card; `flipped` true = its face is up.
  const [card, setCard] = useState<Card | null>(null);
  const [flipped, setFlipped] = useState(false);
  const faceRef = useRef<HTMLDivElement>(null);

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

  // Shrink the meditation text so the whole card fits the viewport — never scroll.
  useLayoutEffect(() => {
    const el = faceRef.current;
    if (!el || !card) return;

    const fit = () => {
      let lo = 9;
      // Cap the size relative to card width so short meditations don't balloon —
      // body stays a consistent size across cards, anchored low like the deck.
      let hi = Math.min(40, el.clientWidth * 0.072);
      let best = lo;
      // Binary-search the largest font size at which nothing overflows the card.
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollHeight <= el.clientHeight && el.scrollWidth <= el.clientWidth) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      el.style.fontSize = `${best}px`;
    };

    fit();
    // Re-fit once the bundled font is ready (metrics differ from the fallback).
    document.fonts?.ready.then(fit).catch(() => {});

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [card]);

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
            {/* BACK — the face-down deck. */}
            <div className={styles.back}>
              <span className={styles.emblem} aria-hidden="true">
                <Leaf />
              </span>
              <span className={styles.backLabel}>messages from the earth</span>
            </div>

            {/* FRONT — the meditation, laid out like the physical card. */}
            <div className={styles.front}>
              {card && (
                <div className={styles.face} ref={faceRef}>
                  <h1 className={styles.title}>{card.title}</h1>
                  <div className={styles.bodyRow}>
                    <span className={styles.vlabel}>{card.category}</span>
                    <p className={styles.body}>{card.body}</p>
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
