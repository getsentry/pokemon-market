import { BsCheckLg } from "react-icons/bs";
import { SinglePokemonResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import apiFetch from "@/components/apiFetch";
import cx from "classnames";
import first from "@/utils/array/first";
import Head from "next/head";
import ImageViewer from "@/components/ImageViewer";
import Media from "@/components/Media.module.css";
import PokemonCardView from "@/components/PokemonCardView.module.css";
import PokemonPrice from "@/components/PokemonPrice";
import type { ApiItemResult } from "@/api/jsonItem";
import useShoppingCart from "@/components/useShoppingCart";

export default function PokemonName() {
  const router = useRouter();
  const { addToCart } = useShoppingCart();
  const [amount, setAmount] = useState(1);
  const [showAddToCartPopover, setShowAddToCartPopover] = useState(false);

  const { pokemonName } = router.query;

  const { data } = useQuery<ApiItemResult<SinglePokemonResponse>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: ({ queryKey }) => apiFetch(queryKey.join("/"), {}),
    enabled: Boolean(pokemonName),
    cacheTime: ["slowpoke", "slowbro"].includes(first(pokemonName ?? ""))
      ? 0
      : undefined,
  });

  const { pokemon, species, evolution } = data?.result ?? {};
  if (!pokemon || !species || !evolution) {
    return <div className="m-auto max-w-screen-lg">Loading...</div>;
  }

  return (
    <div className="m-auto max-w-screen-lg">
      <Head>
        <title>Pokemart - {pokemon.name}</title>
      </Head>
      <div className={cx(Media.layout, "gap-x-10 gap-y-6 rounded-xl relative")}>
        <ImageViewer className={Media.img} pokemon={pokemon} />
        <div className={Media.title}>
          <h2 className={cx(PokemonCardView.title, "store-item")}>
            <span className={PokemonCardView.id}>#{pokemon.id}</span>
            <span className={PokemonCardView.name}>{pokemon.name}</span>
          </h2>
        </div>
        <form
          className={cx(Media.desc, "flex flex-col gap-4")}
          onSubmit={(e) => {
            addToCart(pokemon.name, amount);
            e.preventDefault();
            setTimeout(() => {
              setShowAddToCartPopover(false);
            }, 2000);
            setShowAddToCartPopover(true);
          }}
        >
          <div className="grid grid-cols-2">
            <div>
              <h3>Type:</h3>
              <ol className="flex flex-col raw mt-0">
                {pokemon.types.map(({ type }) => (
                  <li key={type.name}>{type.name}</li>
                ))}
              </ol>
            </div>
            <p className="text-lg">{species.flavor_text_entry.flavor_text}</p>
          </div>

          <PokemonPrice
            className="store-item"
            pokemon={pokemon}
            species={species}
            evolution={evolution}
            size="lg"
          />

          <div>
            <label htmlFor="quantity" className="block">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={amount}
              className="border p-2 sentry-mask"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <AddToCartButton
            className="p-4"
            pokemon={pokemon}
            species={species}
            evolution={evolution}
          />
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
        </form>
      </div>
      {/* <pre>{JSON.stringify(pokemon, null, "\t")}</pre> */}
    </div>
  );
}
