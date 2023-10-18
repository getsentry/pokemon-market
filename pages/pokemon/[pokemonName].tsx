import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import type { Pokemon } from "pokenode-ts";
import { useRouter } from "next/router";
import type { ApiItemResult } from "@/api/jsonItem";
import Media from "@/components/Media.module.css";
import cx from "classnames";
import PokemonCardView from "@/components/PokemonCardView.module.css";
import ImageViewer from "@/components/ImageViewer";
import Price from "@/components/Price";

export default function PokemonName() {
  const router = useRouter();
  const { pokemonName } = router.query;

  const { data } = useQuery<ApiItemResult<Pokemon>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: () => apiFetch(`/api/pokemon/${pokemonName}`, {}),
    enabled: Boolean(pokemonName),
  });

  const pokemon = data?.result;
  if (!pokemon) {
    return null;
  }

  return (
    <div className="m-auto max-w-screen-lg">
      <div className={cx(Media.layout, "gap-10 rounded-xl")}>
        <ImageViewer className={Media.img} pokemon={pokemon} />
        <div className={Media.title}>
          <h2 className={PokemonCardView.title}>
            <span className={PokemonCardView.name}>{pokemon.name}</span>
          </h2>
        </div>
        <div className={cx(Media.desc, "flex flex-col gap-4")}>
          <span className={PokemonCardView.id}>#{pokemon.id}</span>
          <span className="text-red text-2xl"><Price amount={20}/></span>
          <div>
            <label htmlFor="quantity" className="block">
              Quantity
            </label>
            <input type="text" id="quantity" value="1" className="border p-2" />
          </div>
          <button className="bg-red text-white rounded-full hover:bg-darkRed p-4">
            Add to Cart
          </button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(pokemon, null, "\t")}</pre> */}
    </div>
  );
}
