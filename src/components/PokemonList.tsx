import { SinglePokemonResponse } from "@/types";
import HomePageItem from "@/components/HomePageItem";

interface Props {
  pokemonList: SinglePokemonResponse[];
}

export default function PokemonList({pokemonList}: Props) {
  const remainder = 4 - (pokemonList.length % 4);

  console.log({remainder});

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black p-px">
        {pokemonList?.map(({ pokemon, species, evolution }, index) => (
          <li
            key={pokemon?.name ?? "missing-" + index}
            className={"flex bg-white hover:bg-hover"}
          >
            <HomePageItem
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
        {remainder === 4 ? (
          <li className="flex bg-white h-auto sm:hidden lg:flex lg:col-start-2 lg:col-end-4 xl:hidden" />
        ) : null}
      </ul>
      {/* <pre>{JSON.stringify(pokemonList, null, "\t")}</pre> */}
    </div>
  );
}
