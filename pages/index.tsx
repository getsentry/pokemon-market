import { range } from "@/utils/array/range";
import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import apiFetch from "@/components/apiFetch";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import PokemonListItem from "@/components/HomePageItem";
import type { ApiListResult } from "@/api/jsonList";
import type { ListPokemonResponse } from "@/types";

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
    queryFn: () =>
      Promise.all(queries.map((query) => apiFetch("/api/pokemon", query))),
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

  const searchTerm = String(router.query.q ?? '');
  const filteredPokemonList = searchTerm
    ? pokemonList.filter(({pokemon}) => 
      pokemon?.name.includes(searchTerm) || searchTerm?.includes(pokemon?.name ?? '')
    ) 
    : pokemonList;

  const remainder = 4 - (filteredPokemonList.length % 4);
  console.log({remainder});

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black p-px">
        {filteredPokemonList?.map(({ pokemon, species, evolution }, index) => (
          <li
            key={pokemon?.name ?? "missing-" + index}
            className={"flex bg-white hover:bg-hover"}
          >
            <PokemonListItem
              pokemon={pokemon}
              species={species}
              evolution={evolution}
            />
          </li>
        ))}
        {remainder === 1 ? (
          <li className="flex bg-white h-auto lg:col-start-2 lg:col-end-4 xl:col-start-4 xl:col-end-4" />
        ) : null}
        {remainder === 2 ? (
          <li className="flex bg-white h-auto sm:hidden lg:flex lg:col-start-3 lg:col-end-4 xl:col-start-3 xl:col-end-5" />
        ) : null}
        {remainder === 3 ? (
          <li className="flex bg-white h-auto lg:col-start-2 lg:col-end-4 xl:col-start-2 xl:col-end-5" />
        ) : null}
      </ul>
      {/* <pre>{JSON.stringify(pokemonList, null, "\t")}</pre> */}
    </div>
  );
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
