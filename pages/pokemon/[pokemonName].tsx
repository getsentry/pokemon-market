import { SinglePokemonResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import apiFetch from "@/components/apiFetch";
import cx from "classnames";
import ImageViewer from "@/components/ImageViewer";
import Media from "@/components/Media.module.css";
import PokemonCardView from "@/components/PokemonCardView.module.css";
import PokemonPrice from "@/components/PokemonPrice";
import type { ApiItemResult } from "@/api/jsonItem";
import useShoppingCart from "@/components/useShoppingCart";

export default function PokemonName() {
  const router = useRouter();
  const {addToCart} = useShoppingCart();
  const [amount, setAmount] = useState(1);

  const { pokemonName } = router.query;

  const { data } = useQuery<ApiItemResult<SinglePokemonResponse>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: () => apiFetch(`/api/pokemon/${pokemonName}`, {}),
    enabled: Boolean(pokemonName),
  });

  if (!data?.result || !data.result.pokemon || !data.result.species || !data.result.evolution) {
    return null;
  }
  const {pokemon, species, evolution} = data.result;

  return (
    <div className="m-auto max-w-screen-lg">
      <div className={cx(Media.layout, "gap-x-10 gap-y-6 rounded-xl")}>
        <ImageViewer className={Media.img} pokemon={pokemon} />
        <div className={Media.title}>
          <h2 className={PokemonCardView.title}>
            <span className={PokemonCardView.id}>#{pokemon.id}</span>
            <span className={PokemonCardView.name}>{pokemon.name}</span>
          </h2>
        </div>
        <form
          className={cx(Media.desc, "flex flex-col gap-4")}
          onSubmit={(e) => {
            addToCart(pokemon.name, amount);
            e.preventDefault();
          }}
        >
          <div>
            <h3>Type:</h3>
            <ol className="flex flex-col raw mt-0">
              {pokemon.types.map(({ type }) => (
                <li key={type.name}>{type.name}</li>
              ))}
            </ol>
          </div>

          <PokemonPrice pokemon={pokemon} size="lg" />

          <div>
            <label htmlFor="quantity" className="block">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              value={amount}
              className="border p-2"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          
          <button type="submit" title="Add this pokemon to your cart">
            <div className="bg-red text-white rounded-full hover:bg-darkRed p-4">
              Add to Cart
            </div>
          </button>
        </form>
      </div>
      {/* <pre>{JSON.stringify(pokemon, null, "\t")}</pre> */}
    </div>
  );
}
