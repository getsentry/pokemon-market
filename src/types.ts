import serializeEvolution from "@/api/serializers/evolution"
import serializePokemon from "@/api/serializers/pokemon"
import serializeSpecies from "@/api/serializers/species"

export type ApiPokemon = NonNullable<ReturnType<typeof serializePokemon>>;
export type ApiSpecies = NonNullable<ReturnType<typeof serializeSpecies>>;
export type ApiEvolution = NonNullable<ReturnType<typeof serializeEvolution>>;

export type SinglePokemonResponse = {
  pokemon: ApiPokemon | undefined,
  species: ApiSpecies | undefined,
  evolution: ApiEvolution | undefined,
}

export type ListPokemonResponse = SinglePokemonResponse[];
