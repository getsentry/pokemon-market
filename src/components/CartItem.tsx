import { BsFillTrash3Fill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import PokemonCardView from "@/components/PokemonCardView";
import type { ApiItemResult } from "@/api/jsonItem";
import type { SinglePokemonResponse } from "@/types";
import PokemonPrice from "./PokemonPrice";
import { Fragment } from "react";

interface Props {
  pokemonName: string;
  amount: number;
  onSubmit: () => void;
}

export default function CartItem({
  pokemonName,
  amount,
  onSubmit,
}: Props) {
  const { data } = useQuery<ApiItemResult<SinglePokemonResponse>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: ({ queryKey }) => apiFetch(queryKey.join('/'), {}),
    enabled: Boolean(pokemonName),
  });

  if (
    !data?.result ||
    !data.result.pokemon ||
    !data.result.species ||
    !data.result.evolution
  ) {
    return (
      <Fragment>
        <div className="bg-white p-4">
          <div className="h-24">Loading...</div>
        </div>
        <div className="bg-white" />
        <div className="bg-white" />
      </Fragment>
    );
  }
  const { pokemon, species, evolution } = data.result;

  return (
    <form
      onSubmit={(e) => {
        onSubmit();
        e.preventDefault();
      }}
      className="contents"
    >
      <PokemonCardView className="bg-white" pokemon={pokemon} />
      <div className="flex flex-col items-start bg-white py-4 px-4 flex-grow">
        <div
          className="grid gap-4 items-center"
          style={{ gridTemplateColumns: "max-content 1fr" }}
        >
          <label htmlFor="quantity" className="text-right">
            Price
          </label>
          <PokemonPrice
            className="inline"
            pokemon={pokemon}
            species={species}
            evolution={evolution}
            size="lg"
          />
          <label htmlFor="quantity" className="text-right">
            Quantity
          </label>
          <input
            disabled
            type="text"
            id="quantity"
            value={amount}
            className="border p-2 text-border inline w-28"
          />
        </div>
      </div>
      <div className="flex place-items-center bg-white p-4">
        <button type="submit" title="Remove this pokemon from your cart">
          <div className="flex gap-1 items-center bg-hover text-black rounded-full hover:text-black hover:bg-border p-2">
            <BsFillTrash3Fill /> Remove
          </div>
        </button>
      </div>
    </form>
  );
}
