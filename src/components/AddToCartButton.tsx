import cx from "classnames";
import getPrice from "@/pokemon/getPrice";
import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";
import useLocalstorage from "@/components/useLocalstorage";

interface Props {
  className?: string,
  pokemon: ApiPokemon;
  species: ApiSpecies;
  evolution: ApiEvolution;
}

export default function AddToCartButton({ className, pokemon, species, evolution }: Props) {
  const { get } = useLocalstorage();
  const locale = (get("locale") ?? "us") as string;

  const { hasStock } = getPrice(locale, pokemon, species, evolution);

  return (
    <button
      className="flex-grow"
      title="Add this pokemon to your cart"
      type={"submit"}
      onClick={(e) => {
        e.stopPropagation();
        if (!hasStock) {
          e.preventDefault();
        }
      }}
    >
      <div
        className={cx(
          className,
          "bg-red",
          "text-white",
          "hover:bg-darkRed",
          "rounded-full"
        )}
      >
        Add to Cart
      </div>
    </button>
  );
}
