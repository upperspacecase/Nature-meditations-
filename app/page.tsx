import Deck from "@/components/Deck";
import { cards } from "@/data/meditations";

export default function Home() {
  return (
    <main className="page">
      <Deck cards={cards} />
    </main>
  );
}
