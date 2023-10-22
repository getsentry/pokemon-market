import type { PokemonSpecies } from "pokenode-ts";

export default function serializeSpecies(species: PokemonSpecies | undefined) {
  if (!species) {
    return undefined;
  }

  const {flavor_text_entries, evolves_from_species, id, name} = species;
  return {
    flavor_text_entries: flavor_text_entries.slice(0, 1),
    evolves_from_species,
    id,
    name,
  };
}
