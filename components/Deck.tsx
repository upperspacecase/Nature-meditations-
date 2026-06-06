"use client";

import { useCallback, useRef, useState } from "react";
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
  const [card, setCard] = useState<Card | null>(null);
  // `showBack` true = meditation text face up; false = art/front face up.
  const [showBack, setShowBack] = useState(false);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const drawn = card !== null;

  const draw = useCallback(() => {
    const next = pickRandom(cards);
    if (flipTimer.current) clearTimeout(flipTimer.current);

    if (showBack) {
      // Already reading a card: flip down to the art, swap, then reveal the text.
      setShowBack(false);
      flipTimer.current = setTimeout(() => {
        setCard(next);
        setShowBack(true);
      }, 180);
    } else {
      setCard(next);
      setShowBack(true);
    }
  }, [cards, showBack]);

  const toggleFace = useCallback(() => {
    if (!drawn) return;
    setShowBack((v) => !v);
  }, [drawn]);

  return (
    <section className={styles.deck} aria-label="Nature meditations deck">
      <header className={styles.masthead}>
        <h1 className={styles.wordmark}>nature meditations</h1>
        <p className={styles.subtitle}>draw a card · read · breathe</p>
      </header>

      <div className={styles.stage}>
        <div
          className={`${styles.card} ${showBack ? styles.isBack : ""}`}
          // The card itself is a flip control once a card has been drawn.
          role={drawn ? "button" : undefined}
          tabIndex={drawn ? 0 : -1}
          aria-label={
            drawn
              ? showBack
                ? "Meditation text. Activate to see the card front."
                : "Card front. Activate to read the meditation."
              : undefined
          }
          aria-hidden={!drawn}
          onClick={toggleFace}
          onKeyDown={(e) => {
            if (drawn && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              toggleFace();
            }
          }}
        >
          <div className={styles.inner}>
            {/* FRONT — art region (gradient placeholder, or a photo when present). */}
            <div
              className={styles.front}
              style={
                card?.image
                  ? { backgroundImage: `url(${card.image})` }
                  : undefined
              }
            >
              {!card?.image && (
                <div className={styles.frontPlaceholder}>
                  <span className={styles.frontGlyph} aria-hidden="true">
                    ❧
                  </span>
                  <span className={styles.frontCategory}>
                    {drawn ? card!.category : "tap draw to begin"}
                  </span>
                </div>
              )}
            </div>

            {/* BACK — the meditation text. */}
            <div className={styles.back}>
              {drawn && (
                <article className={styles.reading}>
                  <span className={styles.category}>{card!.category}</span>
                  <h2 className={styles.title}>{card!.title}</h2>
                  <p className={styles.body}>{card!.body}</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.draw} onClick={draw}>
          {drawn ? "draw another" : "draw a card"}
        </button>
        {drawn && (
          <p className={styles.hint} aria-live="polite">
            tap the card to {showBack ? "see the front" : "read it"}
          </p>
        )}
      </div>
    </section>
  );
}
