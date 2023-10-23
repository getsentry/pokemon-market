import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import PokemonList from "@/components/PokemonList";
import type { ApiListResult } from "@/api/jsonList";
import type { ListPokemonResponse } from "@/types";

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
