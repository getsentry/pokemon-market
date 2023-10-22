import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import type { ApiListResult } from "@/api/jsonList";
import type { Pokemon } from "pokenode-ts";
import { range } from "@/utils/array/range";
import HomePageItem from "@/components/HomePageItem";

const totalCardCount = 151;
const maxPageSize = 10;
const queries = range(0, 16).map((i) => ({
  offset: maxPageSize * i,
  limit: Math.min(maxPageSize * (i + 1), totalCardCount) - maxPageSize * i,
}));

export default function Home() {
  const { data } = useQuery<ApiListResult<null | Pokemon>[]>({
    queryKey: ["/api/pokemon"],
    queryFn: () => Promise.all(queries.map((query) => apiFetch("/api/pokemon", query))),
    enabled: true,
  });

  const pokemonList = data?.flatMap(apiResult => apiResult.results);

  if (!pokemonList) {
    return (
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-px bg-black p-px">
          <li className="flex grow bg-white h-32 col-span-full" />
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black p-px">
        {pokemonList?.map((pokemon, index) => (
          <HomePageItem
            key={pokemon?.name ?? "missing-" + index}
            pokemon={pokemon}
          />
        ))}
        <li
          key={`extra`}
          className="flex bg-white h-auto lg:col-start-2 lg:col-end-4 xl:col-start-4 xl:col-end-4"
        />
      </ul>
      {/* <pre>{JSON.stringify(pokemonList, null, "\t")}</pre> */}
    </div>
  );
}
