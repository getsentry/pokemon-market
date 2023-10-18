/* eslint-disable @next/next/no-img-element */ 

import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import type { ApiListResult } from "@/api/jsonList";
import type { Pokemon } from "pokenode-ts";
import PokemonCardView from "@/components/PokemonCardView.module.css";
import Media from "@/components/Media.module.css";
import Link from "next/link";
import cx from "classnames";
import { range } from "@/utils/array/range";

export default function Home() {
  const cardCount = 151;

  const { data } = useQuery<ApiListResult<Pokemon>>({
    queryKey: ["/api/pokemon"],
    queryFn: () => apiFetch("/api/pokemon", { limit: cardCount, offset: 0 }),
    enabled: true,
  });

  const pokemonList = data?.results;

  const extraCardCount = pokemonList?.length
    ? 4 - (pokemonList.length % 4)
    : cardCount;

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black p-px">
        {pokemonList?.map((pokemon) => (
          <CardItem key={pokemon.name} pokemon={pokemon} />
        ))}
        {range(extraCardCount).map((i) => (
          <li key={`extra-${i}`} className="bg-white h-32" />
        ))}
      </ul>
      {/* <pre>{JSON.stringify(pokemonList, null, "\t")}</pre> */}
    </div>
  );
}

function CardItem({ pokemon }: { pokemon: Pokemon }) {
  return (
    <li key={pokemon.name} className={"bg-white hover:bg-hover"}>
      <Link
        href={`/pokemon/${pokemon.name}`}
        className={cx(Media.layout, "p-4")}
      >
        <div className={Media.img}>
          <img
            src={pokemon.sprites.front_default ?? undefined}
            alt={pokemon.name}
            className="h-24 w-24"
          />
        </div>
        <div className={Media.title}>
          <h3 className={PokemonCardView.title}>
            <span className={PokemonCardView.id}>#{pokemon.id}</span>
            <span className={PokemonCardView.name}>{pokemon.name}</span>
          </h3>
        </div>
        <div className={Media.desc}>
          <ol className="flex flex-col">
            {pokemon.types.map(({ type }) => (
              <li key={type.name}>{type.name}</li>
            ))}
          </ol>
        </div>
      </Link>
    </li>
  );
}
