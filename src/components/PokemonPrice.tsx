import cx from 'classnames';
import Price from "@/components/Price";
import type { ApiPokemon } from "@/types";

interface Props {
  pokemon: ApiPokemon;
  size: 'sm' | 'lg';
}

export default function PokemonPrice({ pokemon, size }: Props) {
  return (
    <div className={cx("text-red", {
      "text-4xl": size === "lg",
      "text-xl": size === "sm",
    })}>
      <Price amount={20} />
    </div>
  );
}
