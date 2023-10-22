import Price from "@/components/Price";
import type { Pokemon } from "pokenode-ts";
import cx from 'classnames';

interface Props {
  pokemon: Pokemon;
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
