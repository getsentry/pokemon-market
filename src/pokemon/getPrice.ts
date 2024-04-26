import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";
import { ChainLink, PokemonType } from 'pokenode-ts';

type Price = {
  regularPrice: number;
  salePrice: number;
  isSale: boolean;
  hasStock: boolean,
};

const TYPE_MODIFIERS: Record<string, number> = {
  'dragon': 3,
  'flying': 3,
  'fire': 3,
  'psychic': 3,
  'poison': 2,
  'ghost': 2,
};

const BOOST: Record<string, number> = {
  'pikachu': 8,
  'mewtwo': 8,
  'mew': 8,
};

export const SALE = [
  'charizard',
  'pikachu',
  'jigglypuff',
  'diglett',
  'slowpoke',
  'snorlax',
  'mewtwo',
  'missingno',
];

const OUT_OF_STOCK = [
  'charizard',
];

const MISSINGNO = {
  regularPrice: 0,
  salePrice: 0,
  isSale: true,
  hasStock: true,
};
const OVERRIDE: Record<string, Record<string, Price>> = {
  us: {
    missingno: MISSINGNO,
  },
  gb: {
    missingno: MISSINGNO,
    pikachu: {
      regularPrice: 100,
      salePrice: 5000,
      isSale: true,
      hasStock: true,
    },
  },
};


export default function getPrice(locale: string, pokemon: ApiPokemon, species: ApiSpecies, evolution: ApiEvolution): Price {  
  const override = OVERRIDE?.[locale]?.[pokemon.name];
  if (override) {
    return override;
  }

  const evolutionStep = getEvolutionStep(pokemon.name, evolution.chain, 1);
  const typeBonus = getTypeBonus(pokemon.types);
  const boost = BOOST[pokemon.name] ?? 0;
  const tier = (evolutionStep * typeBonus) + boost;
  const isSale = SALE.includes(pokemon.name);
  const hasStock = !OUT_OF_STOCK.includes(pokemon.name);

  switch (locale) {
    case 'gb':
      return {
        regularPrice: Math.round(tier * 8),
        salePrice: Math.round(tier * 8) * 0.5,
        isSale,
        hasStock,
      }
    case 'us':
    default:
      return {
        regularPrice: tier * 10,
        salePrice: tier * 10 * 0.5,
        isSale,
        hasStock,
      }; 
  }
}

function getEvolutionStep(name: string, chainLink: ChainLink, step: number = 0) {
  if (chainLink.species.name === name) {
    return step;
  }
  if (chainLink.evolves_to.length) {
    return getEvolutionStep(name, chainLink.evolves_to?.[0], step + 1);
  }
  return step;
}

function getTypeBonus(types: PokemonType[]) {
  return types.reduce((bonus, {type}) => {
    return bonus + (TYPE_MODIFIERS[type.name as string] ?? 1);
  }, 0);
}
