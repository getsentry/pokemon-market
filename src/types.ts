import serializeEvolution from "@/api/serializers/evolution"
import serializePokemon from "@/api/serializers/pokemon"
import serializeSpecies from "@/api/serializers/species"

export type ApiPokemon = NonNullable<ReturnType<typeof serializePokemon>>;

export type SinglePokemonResponse = {
  pokemon: ReturnType<typeof serializePokemon>,
  species: ReturnType<typeof serializeSpecies>,
  evolution: ReturnType<typeof serializeEvolution>,
}

export type ListPokemonResponse = SinglePokemonResponse[];
