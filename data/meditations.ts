/**
 * Nature Meditations — card content.
 *
 * Each card is ONE object in the array below. To add a card, copy an existing
 * object, give it a unique `id` (a stable slug), and paste your transcribed
 * text into `body`. No code changes needed anywhere else.
 *
 * When you later add photos, drop them in `public/cards/` and set the optional
 * `image` field (e.g. "/cards/wisdom-in-the-soil.jpg"). Until then, the front of
 * the card shows a calm gradient placeholder with the category label.
 */

export type Card = {
  /** stable slug, e.g. "colors-of-nature" */
  id: string;
  /** display title, e.g. "the colors of nature" */
  title: string;
  /** category label, e.g. "nature meditations" | "walking thoughts" */
  category: string;
  /** full meditation text */
  body: string;
  /** optional photo path, e.g. "/cards/colors-of-nature.jpg" */
  image?: string;
};

export const cards: Card[] = [
  {
    id: "you-are-your-true-nature",
    title: "you are your true nature",
    category: "messages from the earth",
    body: "A tree with no leaves is still a tree. A rosebush out of bloom is still a rosebush. And a bird that can't fly is still a bird. When you don't feel like yourself, when you're going through times of change and loss, remember there is nothing incomplete or inadequate about your being. Nothing can separate you from your true nature.",
  },
  {
    id: "wisdom-in-the-soil",
    title: "wisdom in the soil",
    category: "messages from the earth",
    body: "There is wisdom in the soil. Having held humanity for the entirety of our existence on Earth, the ground beneath our feet has been present for every major human victory and failure throughout history. Today, find a spot to stand outside. Imagine the soil beneath your feet as a wise elder, eager to disclose all its secrets to you. Imagine all that's transpired in this spot over thousands of years. What wisdom is the soil sharing with you?",
  },
  {
    id: "tune-in-to-cooperative-purpose",
    title: "tune in to cooperative purpose",
    category: "messages from the earth",
    body: "Everything on Earth has a purpose. Bees pollinate our plants. Ants aerate our soil. Trees release oxygen. Each organism works independently for the good of the collective. As a part of our whole, you too have a unique and special contribution to make to our planet. Today, consider what your role is in your own ecosystem—be it homelife, school, or work—and how your purpose benefits the collective.",
  },
  {
    id: "you-are-worthy",
    title: "you are worthy",
    category: "messages from the earth",
    body: "Nature never questions our worthiness. It never asks that we provide our credentials or prove ourselves in order to receive the bounty of its offerings. Next time you find yourself questioning your worthiness or experiencing feelings of self-doubt, go outside to remind yourself that nature will always embrace you as you are. Choose to be gentler with yourself. Know that you deserve the good in your life. You are worthy of the joy, happiness, and peace you seek.",
  },
  {
    id: "embrace-abundance",
    title: "embrace abundance",
    category: "messages from the earth",
    body: "We live in a universe of abundance, yet many of us operate from a scarcity mindset. We worry that we don't have 'enough' and feel jealous of what other people seem to have. But the most valuable things on Earth—the air we breathe, the forests that clean our atmosphere, the oceans that sustain our planet—are free. Today, spend some time outside and take note of the abundance around you. Whether you're at the beach, walking through the woods, or sitting in a local park, celebrate nature's abundance and know there is more than enough for you here on Earth.",
  },
  {
    id: "as-fleeting-as-clouds-in-the-sky",
    title: "as fleeting as clouds in the sky",
    category: "messages from the earth",
    body: "When we face challenges and disappointments, it is common to let those feelings define us. But when we practice mindful nonattachment, we see that those difficult emotions do not have to be part of our stories. Like the clouds in the sky, these challenges are passing experiences—they do not make us who we are. Next time difficult emotions arise, imagine them as clouds floating across the sky. Observe them without judgment, and then let them go.",
  },
  {
    id: "support-diversity",
    title: "support diversity",
    category: "messages from the earth",
    body: "Nature is a lesson in the importance of diversity. The natural world is full of diverse ecosystems, plants, and animals—including us humans. Every living thing has a unique and special purpose in contributing to life on Earth, and when the health and viability of an ecosystem or species is in danger, it can have a ripple effect. When one being suffers, we all suffer. Today, pause to consider your own community's diversity. What can you do to foster, protect, and support diversity in your ecosystem?",
  },
  {
    id: "difference-is-distinctive",
    title: "difference is distinctive",
    category: "messages from the earth",
    body: "When anomalies arise in nature, they are labeled as rare—not weird. We celebrate the animals and organisms that have unusual qualities—birds with unique plumage, fish that glow in the ocean's depths, trees that appear to grow upside down. They show us that different is beautiful and that there is significance in standing out. We too should celebrate what makes us unique. Today, consider something about you that makes you different. Rather than trying to fit in, what might it feel like to celebrate your differences and share them with the world? Feel confident in knowing that the things that make you different are also what make you distinct.",
  },
  {
    id: "personal-forecast",
    title: "personal forecast",
    category: "messages from the earth",
    body: "A weather forecast predicts future events using nature's patterns, providing us with probabilities of rain, sun, wind, and snow based on past events and current circumstances. Today, create a forecast for yourself for the week ahead. Based on your personal patterns and current circumstances, what do you predict for yourself in the coming days? What can you do to make sure there's more sun than rain?",
  },
  {
    id: "meet-the-morning",
    title: "meet the morning",
    category: "messages from the earth",
    body: "The natural world greets each new morning with renewed energy—flower blooms open, roosters crow, lizards crawl out into the warm sunlight. How can you organize your mornings so that you greet the day with energy and positivity? Consider what rituals or routines you can establish to draw inspiration from nature—watch the sunrise, meditate to the sound of birds chirping, take an early morning walk—before jumping into the rest of the day. How do you plan to meet your morning?",
  },
  {
    id: "the-little-victories",
    title: "the little victories",
    category: "messages from the earth",
    body: "The natural world is full of little victories—we see it when the first bud sprouts from a seed or when a baby bird takes its first flight. As we observe each, Earth reminds us that all actions, however small, are part of something greater. Each day holds the possibility of a new personal victory—allow these moments of accomplishment to remind you of your strength and help fortify your confidence. Today, identify a small personal victory you've had recently. It could be something you learned, something new you tried, or something difficult you overcame. What achievement can you celebrate today? How could this tiny triumph lead to a larger one?",
  },
  {
    id: "pressure-and-preparation",
    title: "pressure and preparation",
    category: "messages from the earth",
    body: "It can take more than a million years for a diamond to form. Made from carbon deposits found deep within the earth, diamonds only materialize after millions of years of intense pressure. The process is long, but the result is precious. Today, know that in life each of us will have moments of pressure and preparation. Understand that sometimes those moments are necessary to give birth to something greater. Then contemplate a past or present experience where an unpleasant situation transformed you over time. What did this experience teach you?",
  },
  {
    id: "you-are-enough",
    title: "you are enough",
    category: "messages from the earth",
    body: "Animals don't spend any time wondering whether they are enough, comparing themselves to others in the animal kingdom. Hummingbirds don't envy the skills of a woodpecker; salmon don't wish for the tentacles of an octopus. Like our plant and animal friends, each of us also has unique gifts. Some of us can sing; others can dance. Some can write; others have a green thumb. Today, instead of wasting time comparing yourself to others, celebrate what you are. No matter what it is, we all have something special to offer the world. Remember, you are enough, just as you are.",
  },
  {
    id: "trust-yourself-to-soar",
    title: "trust yourself to soar",
    category: "messages from the earth",
    body: "When baby birds take their first flight, they are following their natural instincts. With wobbly legs and freshly formed wings, they leap from trees, cliffs, and ledges to experience their first taste of aerial freedom—not because they are fearless, but because their instincts tell them that they can, that it's time. When your gut tells you you're ready, don't hold back from taking a leap in your life. Let your intuition guide you and trust yourself to soar.",
  },
  {
    id: "thriving-not-surviving",
    title: "thriving, not surviving",
    category: "messages from the earth",
    body: "A cactus can thrive in the desert. The hot, dry climate is exactly what it needs to grow and flourish. A redwood tree, however, would perish in that ecosystem. Like plants, individuals need specific things to make them comfortable and happy. Today, identify 3 things you need to prosper in your environment, and commit to putting those things in place so that you can thrive.",
  },
];
