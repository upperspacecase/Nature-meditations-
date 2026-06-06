/**
 * Nature Meditations — card content.
 *
 * Each card is ONE object in the array below. To add a card, copy an existing
 * object, give it a unique `id` (a stable slug), and paste your transcribed
 * text into `body`. No code changes needed anywhere else.
 *
 * Most cards are meditations (title + body on a white card, with the category's
 * back artwork). A few special cards use `variant`:
 *   - "poem": a full-bleed colour card with a white poem (use `panel` for the
 *      colour and `\n\n` between stanzas).
 *   - "legend": the deck's "about" card listing the colour-coded card types.
 */

export type Card = {
  /** stable slug, e.g. "colors-of-nature" */
  id: string;
  /** display title (also used for accessibility on special cards) */
  title: string;
  /** category label, e.g. "nature meditations" | "walking thoughts" */
  category: string;
  /** full meditation text, or the poem (with `\n\n` between stanzas) */
  body: string;
  /** special rendering; omit for a normal meditation card */
  variant?: "poem" | "legend";
  /** solid colour for a poem/legend card (front + back tile) */
  panel?: string;
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
  {
    id: "find-your-bearings",
    title: "find your bearings",
    category: "walking thoughts",
    body: "If you've ever been lost in the outdoors, you know how frustrating it can be—it's disorienting, sometimes scary. But just as dolphins and whales have access to echolocation to help track their positions, we have access to intelligence and intuition to track ours. Today, as you walk, contemplate the areas of your life where you feel lost and may need redirection. Rather than continuing to wander aimlessly, consult your internal guidance system. Then ask yourself what you need to get back on track.",
  },
  {
    id: "personal-perspective",
    title: "personal perspective",
    category: "walking thoughts",
    body: "Offering us perspective is one of nature's greatest gifts. Nature's splendor and enormity can help us bring our own small challenges and stressors into perspective. Today, as you walk, take stock of your surroundings—whether it's the limitless sky, boundless rolling hills, enormous crashing waves, or a field of blooming flowers. How can nature's grandeur help you zoom out on the little things that bother you and zoom in on something greater?",
  },
  {
    id: "nature-heals",
    title: "nature heals",
    category: "walking thoughts",
    body: "Nature is full of healing remedies—plants that soothe burns, herbs that treat diseases, roots that strengthen the immune system. In addition to nature's medicinal offerings, being in nature provides a host of emotional benefits—a sense of calm, stress relief, and opportunities to reconnect to our thoughts. When you are in need of healing, remember that the natural world is ready to care for you. Today, as you walk, pause to consider your personal experience with nature's healing properties. How can you make nature's remedies a part of your everyday well-being?",
  },
  {
    id: "be-easy-breezy",
    title: "be easy breezy",
    category: "walking thoughts",
    body: "Air is the breath of life. It effortlessly provides nourishment to the flora and fauna that comprise our natural world. Bringing our attention to air's qualities—its breeziness, lightness, and boundless movement—can inspire our own freedom, joy, and happiness. Today, as you walk, notice the quality of the air around you. Think back to a time when you felt as light as air and as free as the breeze. How can the memory of that experience inspire you today?",
  },
  {
    id: "embracing-imperfection",
    title: "embracing imperfection",
    category: "walking thoughts",
    body: "Nature provides us with such beautiful examples of the brilliance inherent in imperfection. There are albino animals, flowers that grow from concrete, and an entire crooked forest in Poland. Each of these occurrences reminds us that things do not need to be perfect in order to be beautiful, valuable, or appreciated. Today, as you walk, examine how you may have judged yourself as imperfect, flawed. Take stock of the toll that negative self-talk may have had on your self-esteem and self-image. How can you reframe your relationship with yourself and embrace your imperfections?",
  },
  {
    id: "natures-confidence",
    title: "nature's confidence",
    category: "walking thoughts",
    body: "Nature is brimming with displays that evoke confidence: An enormous tree stretching straight and tall toward the sky. A carefully constructed bird's nest. An intricately woven spiderweb. On your walk, find an example of nature's pride. Then consider what brings you confidence and pride in your own life. Speaking quietly to yourself, list at least 3 things you're proud of.",
  },
  {
    id: "feel-your-foundation",
    title: "feel your foundation",
    category: "walking thoughts",
    body: "Earth is our home, providing us with everything we need to live and thrive. It is the foundation for all we know—the food we eat, the people we love, the elements that nourish us. As you move through your walk today, feel the solid foundation of the earth beneath your feet and contemplate the other foundational elements of your life—the people, places, and experiences that ground you. Who and what makes you feel most grounded and supported?",
  },
  {
    id: "nurture-your-internal-ecosystem",
    title: "nurture your internal ecosystem",
    category: "walking thoughts",
    body: "An ecosystem is a network of interconnected beings working together. Within an ecosystem, every living thing—big or small—plays an important role in maintaining the balance of the environment. Today, as you walk, consider your spiritual ecosystem. What beliefs, practices, and relationships are supporting your personal growth and helping cultivate a happy, healthy mind? What can you do to make sure you have a healthy and sustainable balance?",
  },
  {
    id: "mindful-beauty",
    title: "mindful beauty",
    category: "walking thoughts",
    body: "Sometimes we walk on autopilot, arriving at our destination without much memory of the journey. When we stop paying attention to our surroundings, we miss moments of beauty and discovery. Today, on your walk, challenge yourself to find beauty in everything you see. It could be the color of the sky, the patterns in the bark of a tree, the sparkle in a rock. Even if you are looking at things you have seen before, make it a point to look closer in and observe something new. Now apply this mindful attention to other parts of your life. What did you observe?",
  },
  {
    id: "invite-the-evening",
    title: "invite the evening",
    category: "walking thoughts",
    body: "Each evening, nature prepares for a night of rest. As you walk this evening, take note of this preparation. Observe the flowers gently folding into themselves. Listen as the birdcalls begin to quiet. Notice how living things settle into the peace of the night. Then, from this place of quiet observation, contemplate what needs rest within you. Are there any issues or ideas that have been 'active' for too long? What has been robbing you of your rest? How can you find inspiration to quiet these issues in the slow evening rhythms of the natural world?",
  },
  {
    id: "return-to-joy",
    title: "return to joy",
    category: "walking thoughts",
    body: "As children, nature was often the background of our most cherished memories—hopscotch in the park with our friends, hide-and-go-seek in the woods, or maybe a camping trip with family. As adults, however, we tend to see nature as a vehicle for contemplation and personal transformation. It's important to remember, though, that it can also be a place to embrace play, fun, and creativity. As you walk today, consider your earliest experiences with the outdoors. What are your memories of enjoying yourself in the natural world? How can you bring youthful joy to your adult experiences in nature?",
  },
  {
    id: "seasons-of-growth",
    title: "seasons of growth",
    category: "walking thoughts",
    body: "Every season provides us with a unique set of sensory experiences—the quality of light, the thickness of the air, the shifting temperatures, the changing colors. Each season represents a cycle of change for our Earth—from the growth and rebirth of spring to the quiet hibernation of winter. Today, as you walk, contemplate this season of your life. What would you call it? How does it feel to be in this season?",
  },
  {
    id: "light-of-your-life",
    title: "light of your life",
    category: "walking thoughts",
    body: "Most living things are attracted to light. Light gives us comfort, warmth, and vision. It holds the power to illuminate the darkness. Today, as you walk, notice how the sun casts its light on the natural world, giving us life. Think about where you find yourself drawn to lately. Speaking softly to yourself, list 3 people, experiences, or places that light up your life.",
  },
  {
    id: "hike-to-heal",
    title: "hike to heal",
    category: "walking thoughts",
    body: "Hiking fosters unity with nature. As we move through the forest, traverse a trail, or summit a peak, our bodies become one with the Earth. There are moments when our hearts beat in sync with the crunch of gravel underfoot and we feel both vulnerable and strong at the same time. Today, as you walk, imagine you are connected to the healing power of Mother Earth. With each step, envision yourself leaving behind what burdens you and picking up the tools that will strengthen and fortify you. In what ways does being connected to Earth in this way heal you?",
  },
  {
    id: "find-sweet-release",
    title: "find sweet release",
    category: "walking thoughts",
    body: "The natural world is constantly releasing pressure. When our oceans swell, waves lap onto our shores. When clouds get full, they burst into rain and sprinkle our shoulders. When geysers overheat, they erupt into hot steam, radiating warmth. Today, as you walk, contemplate pressure and release in your own life. Is there anything building up inside of you on the verge of exploding? What conversations, activities, or decisions will help you ease the pressure in your life? How can you find moments of release?",
  },
  {
    id: "create-your-own-conditions",
    title: "create your own conditions",
    category: "strengthening affirmations",
    body: "Plants and animals don't wait for the perfect conditions to come to them. Salmon work hard to swim upstream to spawn. A sapling will bend and contort to find its way toward sunlight. Gray whales swim from the Arctic to Central America each year to find food. Consider parts of your life where you're waiting for opportunity to fall into your lap. What can you do to strive harder toward your goal and make your own perfect conditions? Close your eyes and gently repeat, I will create my own conditions.",
  },
  {
    id: "take-the-space-you-need",
    title: "take the space you need",
    category: "strengthening affirmations",
    body: "Trees are only as strong and healthy as their root systems. Roots provide stability and deliver the nourishment and water essential to the tree's survival. A tree's roots can extend hundreds of feet (dozens of metres) out into the surrounding soil, carving pathways through sidewalks, curbs, and over other trees and taking up whatever space they need to support themselves. Today, imagine yourself as a tree putting down roots. Gently say to yourself, I will take the space I need. Then, give yourself permission to be as wide and as deep as you need to be.",
  },
  {
    id: "you-are-expansive",
    title: "you are expansive",
    category: "strengthening affirmations",
    body: "The observable universe—what we can see through our telescopes and satellites—has a radius spanning approximately 46 billion light-years. That means, on Earth, we are only experiencing a tiny fraction of an enormous, expansive universe. But while our eyes may be limited, our hearts and minds are not. Today, take inspiration from the universe as you repeat the following phrase to yourself: I am expansive. Then spend some time dreaming of how you can expand yourself beyond any self-imposed limits.",
  },
  {
    id: "free-yourself-from-judgments",
    title: "free yourself from judgments",
    category: "strengthening affirmations",
    body: "Nature doesn't cast judgments. Instead, it allows all things to exist, both those we label as good and those we label as bad. The same sun that sustains a gorgeous flower also feeds the weed that may threaten its growth. The same body of water is home to fish and leeches alike. Nature displays a deeper wisdom, one that knows that in some way all things have a place and a purpose. Today, try practicing nonjudgment on a walk outside. Instead of judging things as good or bad while you walk, try to observe things without labels, taking them just as they are. When a judgmental feeling arises, gently repeat, I am free from judgment.",
  },
  {
    id: "its-ok-to-slow-down",
    title: "it's ok to slow down",
    category: "strengthening affirmations",
    body: "Nature moves at its own deliberate pace. Imagine water slowly wearing down rocks as it meanders down a stream. Think of tree trunks taking decades to make their way toward the sky. Imagine sand dunes shifting over generations. Just because you can't see instant progress doesn't mean that it's not occurring. Speak the words I can slow down as you take long, slow breaths and allow these images to remind you that moving slowly and intentionally can still have a lot of power.",
  },
  {
    id: "change-is-opportunity",
    title: "change is opportunity",
    category: "strengthening affirmations",
    body: "Change can cause suffering. We suffer when our plans don't come together as we expected, when a relationship ends, when we have to uproot our lives for one reason or another. But in the midst of the pain, there is also so much potential for joy and opportunity. When you feel your heart resisting inevitable change, visualize a tree moving through the seasons—turning red and gold in autumn, shedding its leaves in winter, growing new buds in spring, and showing its glorious greenery in summer. Consider how you can move through the ebbs and flows of the seasons in your own life with the grace of a tree, and repeat this affirmation: Change is full of opportunity.",
  },
  {
    id: "set-yourself-free",
    title: "set yourself free",
    category: "strengthening affirmations",
    body: "We all outgrow things in our lives: friendships that are no longer rewarding, activities that are no longer stimulating, spaces that no longer bring us happiness. Just as snakes shed their outgrown skin and crabs wriggle free of their too-small shells, you too can let go of the constraints holding you back. Consider the places, activities, or relationships that you have outgrown and pick something you're ready to let go of. Commit to moving on as you repeat the phrase I can set myself free.",
  },
  {
    id: "you-will-bloom",
    title: "you will bloom",
    category: "strengthening affirmations",
    body: "From bud to bloom, flowers remind us that the journey of becoming our fullest selves takes time. You cannot rush the blooming process; all you can do is provide water and light and nutrients, and wait for the magnificence to emerge. Today, consider the areas of your life where you're still budding. What can you do to support those buds? How can you trust the process of unfolding? When you feel stuck or unsure, remind yourself of the flower's journey and repeat, I will bloom.",
  },
  {
    id: "you-can-float-and-flow",
    title: "you can float and flow",
    category: "strengthening affirmations",
    body: "Have you ever watched leaves being blown around by the breeze? They never offer any protest; they simply float along in the wind's current, moving in whatever direction the wind carries them. When we choose to 'go with the flow,' we give up the pain that comes from resisting the winds of change and embrace the natural trajectory of our journey. Today, consider an area of resistance in your own life. Close your eyes and repeat, I will float and flow. Imagine what it would feel like to stop fighting and simply move like a leaf through that experience.",
  },
  {
    id: "everything-is-beautiful-in-its-own-way",
    title: "everything is beautiful in its own way",
    category: "strengthening affirmations",
    body: "For some of us, the word beauty elicits feelings of comparison, inadequacy, and insecurity. It's easy to focus on our flaws as we measure ourselves against other people. But nature teaches us that there is more than one way to be beautiful and that the presence of beauty in another does not detract from our own. From blooming flowers to vivid sunsets to spectacular waterfalls, there are countless ways to be beautiful. Today, repeat the phrase I am beautiful in my own way, and free yourself from comparisons as you focus on what makes you beautiful.",
  },
  {
    id: "love-your-shadow",
    title: "love your shadow",
    category: "strengthening affirmations",
    body: "Close your eyes and imagine standing with the sun at your back, your shadow cast in front of you on the ground. Now imagine that this shadow represents the parts of yourself you avoid—the challenging emotions, the difficult memories. Our shadows are part of us, reminding us that there's no separation between our darkness and our light. Play with your shadow—watch it move as you move. Your shadow is evidence of your solidity, your presence in our universe. It proves that you are whole. As you open your eyes, gently say to yourself, I love my shadow. Today, accept that you are a divine tapestry of dark and light.",
  },
  {
    id: "embrace-the-cycle-of-life",
    title: "embrace the cycle of life",
    category: "strengthening affirmations",
    body: "Death is an inevitable part of the cycle of life, a natural shift from one state of being to another. It's a process that every living being must go through. But death does not mean the absolute end of something. As living beings, we all carry on in different ways, even when we're no longer alive. Our ideas, our love, our shared memories, and our work here on Earth live on through future generations. As you grieve for those you've lost, repeat the phrase I will look for new meaning in the cycle of life. Hold space for the beautiful life that was, and open your heart to how that life lives on in new ways.",
  },
  {
    id: "persist-like-water",
    title: "persist like water",
    category: "strengthening affirmations",
    body: "As powerful as it is peaceful, water has the ability to transform landscapes. Continuous drops can hollow out rock surfaces, a winding river can carve out a deep canyon, and waves can reshape a beach. Water teaches us that almost anything is possible with time and tenacity. Today, repeat the phrase I will persist as you think of a goal you've been working toward. Like water, commit to moving through all obstacles in pursuit of your goal.",
  },
  {
    id: "nourish-the-seeds",
    title: "nourish the seeds",
    category: "strengthening affirmations",
    body: "Seeds hold potential for new life within their small structures. But without the proper nourishment—the right amount of light, water, and nutrients—a seed will not yield life. Today, focus on something you want to accomplish—a creative idea, a personal project, a long-term goal—and consider what kind of resources and support it needs to succeed. Then close your eyes and commit to seeking those things as you repeat the phrase I will nourish what I want to see grow.",
  },
  {
    id: "encourage-new-growth",
    title: "encourage new growth",
    category: "strengthening affirmations",
    body: "We prune plants to help them survive and thrive. By removing dead or damaged leaves and cutting back branches, we can prevent disease and encourage new growth. This process is a reminder that it's possible to reshape our lives so that we can become our healthiest selves. Today, know that you too are free to discard any thoughts, ideas, or relationships that don't contribute to your highest good. Don't be afraid to prune the things that no longer serve you. Repeat the phrase I can encourage new growth, and remember that a healthier, happier you is waiting to emerge beneath your 'dead leaves.'",
  },
  {
    id: "mind-and-body",
    title: "mind and body",
    category: "nature meditations",
    body: "We often move through the world without giving much thought to the connection between our brain and body—the amazing network that allows us to make complex movements without a perceived thought. Today, plan a short stroll around your backyard, through the neighborhood, or in a nearby park. As you walk, bring your attention to the weight of each step and the feeling of each toe making a connection with the ground, the stretch of the muscles in your legs, the way your arms move at your sides. Be present with your physical self, uniting your mind and body.",
  },
  {
    id: "mother-natures-messages",
    title: "mother nature's messages",
    category: "nature meditations",
    body: "Nature is always ready to teach us something. We just need to learn to listen. Whether it's a lesson in harmony, simplicity, strength, patience, or generosity, there's so much to be discovered if we're willing to tune in. Today, find a place to sit outside for at least 10 minutes. Keep your eyes open and see what nature offers up. Bring your attention to the earth, the sky, the animals, the plants, and the trees. If you find your mind drifting off to something else, just gently bring it back to the present moment. What are you experiencing? What do you think Earth is trying to tell you?",
  },
  {
    id: "connect-with-your-highest-self",
    title: "connect with your highest self",
    category: "nature meditations",
    body: "Find a place to sit or stand comfortably for a few minutes. Close your eyes and envision giant snowcapped mountains. Imagine the rocky, jagged peaks jutting into the clouds overhead. Now picture yourself scaling this mountain and reaching its highest point. Imagine the exhilarating feelings and the panoramic views from the top of the world. From this place of perspective, contemplate the highest vision you have for yourself. What obstacles do you need to 'scale' to achieve this vision?",
  },
  {
    id: "natures-spectrum",
    title: "nature's spectrum",
    category: "nature meditations",
    body: "Nature is full of examples of duality: Night and day. Birth and death. Hot and cold. Stillness and motion. But all of these realities exist on a continuum. Think about it: There are thousands of shades between bright light and total darkness, and millions of experiences between infancy and old age. It is within the polarities that we are able to observe the full spectrum of life's possibilities. Today, find a quiet place to sit and consider a duality in your own life. Slowly envision the spectrum of thoughts, ideas, opinions, and realities between these poles. In the stillness, imagine all the shades of truth that exist between these two seemingly opposite ideas.",
  },
  {
    id: "make-space-for-calm",
    title: "make space for calm",
    category: "nature meditations",
    body: "Sometimes life presents us with situations that challenge and anger us. If we are not careful, that anger can consume our hearts and govern our behavior. But just as nature can calm itself after a storm, we have the ability to soothe ourselves after painful experiences. Today, harness the power of your breath to self-soothe. Take 10 deep breaths, holding each for 5 seconds before exhaling. As you inhale, imagine a situation that has been upsetting you. Notice the negative ideas, thoughts, and feelings associated with this situation that accumulate in your mind. Now exhale. Let it all out. Allow yourself to experience the freedom of letting go. The power to calm yourself is within you.",
  },
  {
    id: "forest-bathing",
    title: "forest bathing",
    category: "nature meditations",
    body: "Shinrin-yoku is the Japanese practice of forest bathing, immersing yourself in nature for healing and restoration. Today, find your way to a quiet place in the outdoors. Sit or stand quietly with your eyes closed. Relax your shoulders, and let this sacred space surround you like a warm bath. From this place of surrender, consider what you would like the natural world to help you release—maybe it's a worry or something that has made you angry or sad. Think of 3 things you can let go of as you bathe in the healing powers of nature.",
  },
  {
    id: "give-and-take",
    title: "give and take",
    category: "nature meditations",
    body: "Plan a visit to a nearby park today, and spend 10 minutes in walking meditation, taking slow, deep breaths and focusing on the present moment. As you walk, look for examples of cooperation and interdependence in nature: A tree providing shade to the plants beneath it. Insects pollinating flowers. A decomposing log giving life to new vegetation. In what ways do you observe nature nurturing itself? When your walk is complete, reflect on the relationships in your life. How do those closest to you nurture and support you? What do you give to those relationships in return?",
  },
  {
    id: "wide-open-spaces",
    title: "wide open spaces",
    category: "nature meditations",
    body: "Find a quiet place to sit with your eyes closed for several minutes. Visualize yourself walking through rolling green hills, stretching as far as the eye can see. See the grass and wildflowers underfoot, and feel the clean fresh breeze on your face. You are the only person as far as the eye can see. Notice what it feels like to move through the wide open landscape, with no limits, no boundaries, and no restrictions. Take 5 deep breaths and then open your eyes. Return to this meditation when you feel stressed or constrained.",
  },
  {
    id: "cleansing-rain",
    title: "cleansing rain",
    category: "nature meditations",
    body: "Find a place to sit quietly for a few minutes. Close your eyes and imagine a rainstorm rolling in. Feel the experience of the storm surrounding you. Hear the loud claps of thunder. See the bright flashes of lightning. Listen for the pitter-patter of raindrops on the trees, the ground, the rocks. Now imagine that this rain has come to cleanse you. Think of something that's causing you stress, and allow the raindrops to wash over you, taking your troubles along with them as they run into the ground.",
  },
  {
    id: "waterfall-of-worthiness",
    title: "waterfall of worthiness",
    category: "nature meditations",
    body: "Find a quiet place to sit or stand comfortably for several minutes. Close your eyes and picture a beautiful waterfall nestled deep within a canyon. Hear the rushing water, watch the steady flow of droplets. Now imagine this waterfall is overflowing with your accomplishments and successes—all the things that make you proud to be who you are. Visualize yourself moving to stand directly beneath the waterfall, and feel the flow of all your achievements wash over you. How does it feel to bask in your own worthiness?",
  },
  {
    id: "the-colors-of-nature",
    title: "the colors of nature",
    category: "nature meditations",
    body: "Nature's colors are not random; they serve a greater purpose. Some colors absorb light more efficiently. Some colors invite pollinators. Some colors help a species blend into their environment for safety. Other colors act as warnings. Today, plan a stroll through your neighborhood. During your walk, keep your awareness on the present moment, tuning in to your surroundings in as much detail as possible. What colors can you find in nature? Consider how each color's vibrations affect you. What colors make you feel calm? What colors make you feel energized?",
  },
  {
    id: "a-day-in-the-life",
    title: "a day in the life",
    category: "nature meditations",
    body: "Find a place to sit or stand comfortably. Close your eyes and imagine that you could become any living thing in nature. What would you be? Maybe you're a giant tree in the rainforest, a dolphin in the sea, or a mountain goat scaling rocky cliffs. Whatever you choose, spend your meditation embodying that living thing and going through its day. As you come out of your meditation, journal about your experience. How did it feel to embody this thing? How did you greet the morning? What did you eat? What sounds did you hear? How can you carry that being's unique energy into your day?",
  },
  {
    id: "home-sweet-home",
    title: "home sweet home",
    category: "nature meditations",
    body: "Birds build their nests with careful intention—selecting the right tree, the right branches, and the right materials to make a safe home. Today, find a quiet place to sit and close your eyes. Picture a bird building a nest high in a tree. Watch as it skillfully gathers all the components it needs to create its home suspended in the sky. Observe this slow, diligent, and purposeful process. Open your eyes and spend some time thinking about your own home. What physical and emotional components do you need to put into place to create a supportive, nurturing space?",
  },
  {
    id: "gratitude-for-natures-gifts",
    title: "gratitude for nature's gifts",
    category: "nature meditations",
    body: "The River Nile is the longest river on Earth. Spanning over 4,000 miles (6,400 km), it runs through eleven countries, supporting millions of people along its banks. In this walking meditation, you'll practice gratitude for the natural resources that support your life. Visit a local resource—a reservoir, a river, a tree-filled park—and spend at least 10 minutes walking in silence. Bring your awareness to all the details that make up the place, big and small. Think of the people it supports, the animal and plant lives it sustains. At the end of your walking meditation, express your gratitude for nature's gifts.",
  },
  {
    id: "earth-as-anchor",
    title: "earth as anchor",
    category: "nature meditations",
    body: "Plan a walk outside today. As you move through this walking meditation, feel your connection with the ground beneath your feet. Feel the unconditional support of the earth, providing for you, holding you, making each step forward possible. Whenever you feel adrift, remember you can always return to the feeling of the earth beneath your feet to ground and anchor you.",
  },

  // --- The deck's "about" card ---
  {
    id: "deck-guide",
    title: "about this deck",
    category: "",
    variant: "legend",
    panel: "#ead9b9",
    body: "The color-coded cards in this deck are designed to help you engage with nature in the following ways:",
  },
];
