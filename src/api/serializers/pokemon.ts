import type { Pokemon } from "pokenode-ts";

export default function serializePokemon(pokemon: Pokemon | null) {
  if (!pokemon) {
    return null;
  }
  const {id, moves, name, sprites: {back_default, front_default}, types} = pokemon;
  return {id, name, sprites: {back_default, front_default}, types, moves};
}
