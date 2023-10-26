import { BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import cx from "classnames";
import Link from "next/link";
import PokemonCardView from "@/components/PokemonCardView";
import PokemonPrice from "@/components/PokemonPrice";
import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";
import useShoppingCart from "@/components/useShoppingCart";

interface Props {
  pokemon: ApiPokemon | undefined;
  species: ApiSpecies | undefined;
  evolution: ApiEvolution | undefined;
}

export default function HomePageItem({ pokemon, species, evolution }: Props) {
  const { addToCart } = useShoppingCart();
  const [showAddToCartPopover, setShowAddToCartPopover] = useState(false);

  if (!pokemon || !species || !evolution) {
    return null;
  }

  return (
    <Link
      href={`/pokemon/${pokemon?.name}`}
      className="flex grow relative store-item"
    >
      <PokemonCardView pokemon={pokemon}>
        <PokemonPrice
          pokemon={pokemon}
          species={species}
          evolution={evolution}
          size="sm"
        />
        <form
          className="flex-grow flex items-end"
          onSubmit={(e) => {
            addToCart(pokemon.name, 1);
            e.preventDefault();
            setTimeout(() => {
              setShowAddToCartPopover(false);
            }, 2000);
            setShowAddToCartPopover(true);
          }}
        >
          <AddToCartButton
            className="justify-self-end text-sm py-1 px-2"
            pokemon={pokemon}
            species={species}
            evolution={evolution}
          />
        </form>
        <div
          className={cx(
            { block: showAddToCartPopover, hidden: !showAddToCartPopover },
            "absolute top-1 flex justify-center left-0 right-0"
          )}
        >
          <div className="border border-green bg-white text-green shadow-md p-4 rounded flex gap-2 items-center">
            <BsCheckLg /> Added to cart!
          </div>
        </div>
      </PokemonCardView>
    </Link>
  );
}
