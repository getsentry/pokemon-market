import type { Pokemon } from "pokenode-ts";
import PokemonCardView from "@/components/PokemonCardView";
import Link from "next/link";
import useShoppingCart from "@/components/useShoppingCart";

export default function HomePageItem({ pokemon }: { pokemon: Pokemon | null }) {
  const { addToCart } = useShoppingCart();

  return (
    <li className={"flex bg-white hover:bg-hover"}>
      {pokemon ? (
        <Link href={`/pokemon/${pokemon?.name}`} className="flex grow">
          <PokemonCardView pokemon={pokemon}>
            <button
              title="Add this pokemon to your cart"
              type="submit"
              onClick={(e) => {
                addToCart(pokemon.name, 1);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="justify-self-end bg-red text-sm text-white rounded-full hover:bg-darkRed py-1 px-2">
                Add to Cart
              </div>
            </button>
          </PokemonCardView>
        </Link>
      ) : null}
    </li>
  );
}
