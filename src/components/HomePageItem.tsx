import Link from "next/link";
import PokemonCardView from "@/components/PokemonCardView";
import PokemonPrice from "@/components/PokemonPrice";
import type { ApiPokemon } from "@/types";
import useShoppingCart from "@/components/useShoppingCart";

interface Props {
  pokemon: ApiPokemon | null;
}

export default function HomePageItem({ pokemon }: Props) {
  const { addToCart } = useShoppingCart();

  if (!pokemon) {
    return null;
  }

  return (
    <Link href={`/pokemon/${pokemon?.name}`} className="flex grow">
      <PokemonCardView pokemon={pokemon}>
        <PokemonPrice pokemon={pokemon} size="sm" />
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
  );
}
