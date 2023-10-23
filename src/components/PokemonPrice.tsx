import cx from 'classnames';
import Price from "@/components/Price";
import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";
import useLocalstorage from '@/components/useLocalstorage';
import getPrice from '@/pokemon/getPrice';

interface Props {
  className?: string;
  pokemon: ApiPokemon;
  species: ApiSpecies;
  evolution: ApiEvolution;
  size: "sm" | "lg";
}

export default function PokemonPrice({ className, size, pokemon, species, evolution }: Props) {
  const { get } = useLocalstorage();
  const locale = (get("locale") ?? 'us') as string;
  const price = getPrice(locale, pokemon, species, evolution)
  return (
    <div className={cx(className, "text-red", {
      "text-4xl": size === "lg",
      "text-xl": size === "sm",
    })}>
      <Price amount={price} locale={locale} />
    </div>
  );
}
