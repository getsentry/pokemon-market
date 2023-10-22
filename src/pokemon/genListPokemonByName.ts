import genPokemonByName from "@/pokemon/genPokemonByName";

export default function genListPokemonByName(
  names: string[]
) {
  return Promise.allSettled(names.map(name => genPokemonByName(name)));
}
