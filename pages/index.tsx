import { range } from "@/utils/array/range";
import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import apiFetch from "@/components/apiFetch";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import type { ApiListResult } from "@/api/jsonList";
import type { ListPokemonResponse } from "@/types";
import PokemonList from "@/components/PokemonList";

const totalCardCount = 151;
const maxPageSize = 10;
const queries = range(0, 16).map((i) => ({
  offset: maxPageSize * i,
  limit: Math.min(maxPageSize * (i + 1), totalCardCount) - maxPageSize * i,
}));

export default function Home() {
  const router = useRouter();
  const { data } = useQuery<Array<ApiListResult<ListPokemonResponse>>>({
    queryKey: ["/api/pokemon"],
    queryFn: ({ queryKey }) =>
      Promise.all(queries.map((query) => apiFetch(queryKey.join("/"), query))),
    enabled: true,
  });

  const pokemonList = data?.flatMap(apiResult => apiResult.results);

  if (!pokemonList) {
    return (
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-px bg-black p-px">
          <li className="flex grow bg-white h-32 col-span-full place-content-center place-items-center">
            Loading...
          </li>
        </ul>
      </div>
    );
  }

  const searchTerm = String(router.query.q ?? '');
  const filteredPokemonList = searchTerm
    ? pokemonList.filter(({pokemon}) => 
      pokemon?.name.includes(searchTerm) || searchTerm?.includes(pokemon?.name ?? '')
    ) 
    : pokemonList;

  return <PokemonList pokemonList={filteredPokemonList} />;
}

function Layout({page}: {page: ReactElement}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pokemart</title>
      </Head>
      <Header />
      <Nav>
        <div className="place-self-center flex flex-grow justify-center absolute left-0 right-0 pointer-events-none">
          <input
            type="text"
            placeholder="Search..."
            className="pointer-events-auto px-4 py-1 rounded-md border w-1/3"
            value={router.query.q ?? ''}
            onChange={(e) => {
              const q = e.target.value;
              const query: typeof router.query = { ...router.query, q };
              if (!q) {
                delete query.q;
              }
              router.push({ query });
            }}
          />
        </div>
      </Nav>
      <main className="px-10 pb-10">{page}</main>
    </>
  );
}
Home.Layout = Layout;
