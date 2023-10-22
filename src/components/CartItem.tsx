import { BsFillTrash3Fill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import PokemonCardView from "@/components/PokemonCardView";
import type { ApiItemResult } from "@/api/jsonItem";
import type { SinglePokemonResponse } from "@/types";

export default function CartItem({
  pokemonName,
  amount,
  onSubmit,
}: {
  pokemonName: string;
  amount: number;
  onSubmit: () => void;
}) {
  const { data } = useQuery<ApiItemResult<SinglePokemonResponse>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: () => apiFetch(`/api/pokemon/${pokemonName}`, {}),
    enabled: Boolean(pokemonName),
  });

  if (
    !data?.result ||
    !data.result.pokemon ||
    !data.result.species ||
    !data.result.evolution
  ) {
    return null;
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
      <div className="flex gap-4 flex-col bg-white p-4">
        <div>
          <label htmlFor="quantity" className="block">
            Quantity
          </label>
          <input
            disabled
            type="text"
            id="quantity"
            value={amount}
            className="border p-2 text-border"
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
