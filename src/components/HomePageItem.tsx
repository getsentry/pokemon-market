import AddToCartButton from "@/components/AddToCartButton";
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
    <Link href={`/pokemon/${pokemon?.name}`} className="flex grow relative">
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
          }}
        >
          <AddToCartButton
            className="justify-self-end text-sm py-1 px-2"
            pokemon={pokemon}
            species={species}
            evolution={evolution}
          />
        </form>
      </PokemonCardView>
    </Link>
  );
}
