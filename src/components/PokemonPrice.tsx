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
  const {regularPrice, salePrice, isSale} = getPrice(locale, pokemon, species, evolution)

  if (isSale) {
    return (
      <div
        className={cx(className, "text-red", {
          "text-4xl": size === "lg",
          "text-xl": size === "sm",
        })}
      >
        <div
          className={cx(className, "text-black", {
            "text-2xl": size === "lg",
            "text-lg": size === "sm",
          })}
        >
          <Price
            amount={regularPrice}
            locale={locale}
            className="line-through	"
          />
        </div>
        <Price amount={salePrice} locale={locale} />
        <div className="italic">Great Savings!!!</div>
      </div>
    );
  }
  return (
    <div className={cx(className, "text-red", {
      "text-4xl": size === "lg",
      "text-xl": size === "sm",
    })}>
      {isSale
        ? <div>
            <Price amount={salePrice} locale={locale} className="line-through	" />
            <Price amount={salePrice} locale={locale} />
          </div>
        : <Price amount={regularPrice} locale={locale} />}
    </div>
  );
}
