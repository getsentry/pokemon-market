import cx from 'classnames';
import Price from "@/components/Price";
import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";

interface Props {
  className?: string;
  pokemon: ApiPokemon;
  species: ApiSpecies;
  evolution: ApiEvolution;
  size: "sm" | "lg";
}

export default function PokemonPrice({ className, pokemon, size }: Props) {
  return (
    <div className={cx(className, "text-red", {
      "text-4xl": size === "lg",
      "text-xl": size === "sm",
    })}>
      <Price amount={20} />
    </div>
  );
}
