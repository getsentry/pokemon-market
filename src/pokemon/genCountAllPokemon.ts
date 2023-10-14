import pokemonClient from "@/pokemon/pokemonClient";

export default async function genCountAllPokemon(): Promise<number> {
  const result = await pokemonClient().listPokemons(0, 1);
  return result.count;
}
