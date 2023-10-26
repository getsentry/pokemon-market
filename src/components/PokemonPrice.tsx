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
  const {regularPrice, salePrice, isSale, hasStock} = getPrice(locale, pokemon, species, evolution)

  const stockNotice = (
    <div
      className={cx("italic", "flex-grow", {
        "text-green": hasStock,
        "text-lg": hasStock,
        "text-xl": !hasStock,
      })}
    >
      {hasStock ? "In Stock" : "Out of Stock"}
    </div>
  );

  if (isSale) {
    return (
      <div className={className}>
        <Price
          amount={regularPrice}
          className={cx("text-black", "line-through", {
            "text-2xl": size === "lg",
            "text-lg": size === "sm",
          })}
          locale={locale}
        />

        {size == "lg" ? (
          <div className={cx(" flex gap-6 text-red", "italic", "text-4xl")}>
            <Price amount={salePrice} locale={locale} />
            Great Savings!!!
          </div>
        ) : (
          <Price amount={salePrice} className={cx("text-red", "text-xl")} locale={locale} />
        )}

        {stockNotice}
      </div>
    );
  }

  return (
    <div
      className={cx(className, "text-red", "flex-grow", {
        "text-4xl": size === "lg",
        "text-xl": size === "sm",
      })}
    >
      <Price amount={regularPrice} locale={locale} />
      {stockNotice}
    </div>
  );
}
