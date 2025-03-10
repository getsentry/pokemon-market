/* eslint-disable @next/next/no-img-element */

import PokemonCardViewCss from "@/components/PokemonCardView.module.css";
import Media from "@/components/Media.module.css";
import cx from "classnames";
import { ReactNode } from "react";
import { ApiPokemon } from "@/types";
import useIsDarkMode from "./useIsDarkMode";

interface Props {
  className?: string;
  children?: ReactNode;
  pokemon: ApiPokemon;
}

export default function PokemonCardView({ className, children, pokemon }: Props) {
  const {isDarkMode} = useIsDarkMode();
  
  return (
    <div className={cx(Media.layout, className, "grow", "gap-x-2", "p-4")}>
      <div className={Media.img}>
        <img
          data-cdn-image="true"
          src={pokemon.sprites.artwork ?? undefined}
          alt={pokemon.name}
          className="h-24 w-24"
        />
      </div>
      <div className={Media.title}>
        <h3 className={PokemonCardViewCss.title}>
          <span className={PokemonCardViewCss.id}>#{pokemon.id}</span>
          <span className={PokemonCardViewCss.name}>{pokemon.name}</span>
        </h3>
      </div>
      <div
        className={cx(
          Media.desc,
          "grow",
          "flex",
          "flex-col",
          "justify-between",
          "gap-y-4",
        )}
      >
        <ol className="flex flex-col">
          {pokemon.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ol>
        {children}
      </div>
    </div>
  );
}
