import cx from "classnames";
import { range } from "@/utils/array/range";
import { ReactElement, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Fragment, useMemo, useState } from "react";
import apiFetch from "@/components/apiFetch";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import type { ApiListResult } from "@/api/jsonList";
import type { ListPokemonResponse } from "@/types";
import PokemonList from "@/components/PokemonList";

// a page size that works with 2, 3, and 4 column layouts
const defaultPageSize = 12;

export default function Home() {
  const router = useRouter();

  const [offset, setOffset] = useState(0);

  const { data } = useQuery<ApiListResult<ListPokemonResponse>>({
    queryKey: ["/api/pokemon", 'offset', offset],
    queryFn: ({ queryKey }) => apiFetch("/api/pokemon", {
      offset,
      limit: defaultPageSize,
    }),
    enabled: true,
    cacheTime: 0,
  });

  const pokemonCount = data?.count ?? 0;
  const pokemonList = useMemo(() => data?.results ?? [], [data?.results]);

  const filteredPokemonList = useMemo(() => {
    const searchTerm = String(router.query.q ?? '').toLowerCase();
    return searchTerm
      ? pokemonList.filter(({pokemon}) =>
        pokemon?.name.includes(searchTerm) || searchTerm?.includes(pokemon?.name.toLowerCase() ?? '')
      )
      : pokemonList;
  }, [router.query.q, pokemonList]);

  const hasPrev = offset > 0;
  const hasNext = offset + defaultPageSize < pokemonCount;

  if (!pokemonCount || !pokemonList) {
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

  return (
    <Fragment>
      <PokemonList pokemonList={filteredPokemonList} />
      <div className="py-5 flex justify-center gap-8">
        <PaginationButton
          enabled={hasPrev}
          onClick={() => setOffset(offset - defaultPageSize)}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          enabled={hasNext}
          onClick={() => setOffset(offset + defaultPageSize)}
        >
          Next
        </PaginationButton>
      </div>
    </Fragment>
  );
}

function PaginationButton({enabled, onClick, children}: {enabled: boolean; onClick: () => void; children: ReactNode}) {
  return (
    <button 
      disabled={!enabled}
      className="flex-grow"
      onClick={onClick}
    >
      <div className="text-sm py-1 px-2 bg-red text-white hover:bg-darkRed rounded-full">
        {children}
      </div>
    </button>
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
