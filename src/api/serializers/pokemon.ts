import type { Pokemon } from "pokenode-ts";

export default function serializePokemon(pokemon: Pokemon | undefined) {
  if (!pokemon) {
    return undefined;
  }

  const {id, name, sprites: {back_default, front_default}, types} = pokemon;
  return {id, name, sprites: {back_default, front_default}, types};
}
