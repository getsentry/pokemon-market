import type { PokemonSpecies } from "pokenode-ts";

export default function serializeSpecies(species: PokemonSpecies | undefined) {
  if (!species) {
    return undefined;
  }

  const {flavor_text_entries, evolves_from_species, id, name} = species;
  return {
    flavor_text_entry: flavor_text_entries.at(0),
    evolves_from_species,
    id,
    name,
  };
}
