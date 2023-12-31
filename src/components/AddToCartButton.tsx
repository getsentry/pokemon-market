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

  if (hasStock) {
    return (
      <button
        className="flex-grow"
        title="Add this pokemon to your cart"
        type={"submit"}
        onClick={(e) => { e.stopPropagation() }}

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
  } else {
    return (
      <a className="btn btn-cart-add flex-grow" title="Add this pokemon to your cart">
        <div
          className={cx(
            className,
            "text-center",
            "cursor-pointer",
            "bg-red",
            "text-white",
            "hover:bg-darkRed",
            "rounded-full"
          )}
        >
          Add to Cart
        </div>
      </a>
    );
  }
}
