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
  },
  species: {
    flavor_text_entries: [{
      flavor_text: ''
    }],
    evolves_from_species: null,
    id: null,
    name: 'MissingNo.'
  },
  evolution: {
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      evolves_to: [],
    },
    id: null,
  }
}
