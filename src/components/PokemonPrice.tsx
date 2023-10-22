import Price from "@/components/Price";
import type { Pokemon } from "pokenode-ts";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonPrice({ pokemon }: Props) {
  return (
    <div className="text-red text-4xl">
      <Price amount={20} />
    </div>
  );
}
