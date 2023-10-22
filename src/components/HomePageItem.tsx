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

  if (!pokemon || !species || !evolution) {
    return null;
  }

  return (
    <Link href={`/pokemon/${pokemon?.name}`} className="flex grow">
      <PokemonCardView pokemon={pokemon}>
        <PokemonPrice
          pokemon={pokemon}
          species={species}
          evolution={evolution}
          size="sm"
        />
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
