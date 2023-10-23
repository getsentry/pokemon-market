import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import type { ApiListResult } from "@/api/jsonList";
import type { ListPokemonResponse } from "@/types";
import PokemonList from "@/components/PokemonList";

export default function Sale() {
  const { data } = useQuery<ApiListResult<ListPokemonResponse>>({
    queryKey: ["/api/store/sale"],
    queryFn: ({ queryKey }) => apiFetch(queryKey.join('/')),
    enabled: true,
  });

  const pokemonList = data?.results;

  if (!pokemonList) {
    return (
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-px bg-black p-px">
          <li className="flex grow bg-white h-32 col-span-full" />
        </ul>
      </div>
    );
  }

  return <PokemonList pokemonList={pokemonList} />;
}
