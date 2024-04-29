import type { Pokemon, PokemonSpecies, EvolutionChain } from "pokenode-ts";

export const missingNo = {
  pokemon: {
    id: null,
    name: 'missingno',
    sprites: {
      back_default: undefined,
      front_default: undefined,
      other: undefined,
    },
    types: [{
      slot: 1,
      type: {
        name: 'null',
        url: 'https://pokeapi.co/api/v2/type/'
      },
    }],
  } as unknown as Pokemon,
  species: {
    flavor_text_entries: [{
      flavor_text: ''
    }],
    evolves_from_species: null,
    id: null,
    name: 'MissingNo.'
  } as unknown as PokemonSpecies,
  evolution: {
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      evolves_to: [],
      is_baby: false,
      species: {
        id: 0,
        name: 'MissingNo.',
        url: '',
      } ,
    },
    id: 0,
  } as EvolutionChain,
};
