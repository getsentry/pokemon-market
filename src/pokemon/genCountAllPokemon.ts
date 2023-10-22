import mainClient from "@/pokemon/apiClient";

export default async function genCountAllPokemon(): Promise<number> {
  const result = await mainClient().pokemon.listPokemons(0, 1);
  return result.count;
}
