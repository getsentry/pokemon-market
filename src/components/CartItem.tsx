import { BsFillTrash3Fill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/components/apiFetch";
import type { Pokemon } from "pokenode-ts";
import { ApiItemResult } from "@/api/jsonItem";
import PokemonCardView from "@/components/PokemonCardView";

export default function CartItem({
  pokemonName,
  amount,
  onSubmit,
}: {
  pokemonName: string;
  amount: number;
  onSubmit: () => void;
}) {
  const { data } = useQuery<ApiItemResult<Pokemon>>({
    queryKey: ["/api/pokemon", pokemonName],
    queryFn: () => apiFetch(`/api/pokemon/${pokemonName}`, {}),
    enabled: Boolean(pokemonName),
  });
  const pokemon = data?.result;

  if (!pokemon) {
    return null;
  }

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
