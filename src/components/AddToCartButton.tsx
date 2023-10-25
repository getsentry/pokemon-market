import { useState } from 'react';
import {BsCheckLg}  from 'react-icons/bs';
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

  const [showPopover, setShowPopover] = useState(false);

  const { hasStock } = getPrice(locale, pokemon, species, evolution);

  return (
    <button
      className="flex-grow"
      title="Add this pokemon to your cart"
      type={"submit"}
      onClick={(e) => {
        if (!hasStock) {
          e.preventDefault();
        }
        e.stopPropagation();
        const timeout = setTimeout(() => {
          setShowPopover(false);
        }, 2000);
        setShowPopover(true);
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

      <div
        className={cx(
          { block: showPopover, hidden: !showPopover, },
          "absolute top-1 flex justify-center left-0 right-0"
        )}
      >
        <div className="border border-green bg-white text-green shadow-md p-4 rounded flex gap-2 items-center">
          <BsCheckLg /> Added to cart!
        </div>
      </div>
    </button>
  );
}
