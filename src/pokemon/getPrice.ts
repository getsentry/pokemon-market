import type { ApiEvolution, ApiPokemon, ApiSpecies } from "@/types";
import { ChainLink, PokemonType } from 'pokenode-ts';

const TYPE_MODIFIERS: Record<string, number> = {
  'dragon': 3,
  'flying': 3,
  'fire': 3,
  'psychic': 3,
  'poison': 2,
  'ghost': 2,
}
const BOOST: Record<string, number> = {
  'pikachu': 8,
  'mewtwo': 8,
  'mew': 8,
}

const SALE = [
  
]

export default function getPrice(locale: string, pokemon: ApiPokemon, species: ApiSpecies, evolution: ApiEvolution) {  
  const evolutionStep = getEvolutionStep(pokemon.name, evolution.chain, 1);
  const typeBonus = getTypeBonus(pokemon.types);
  const boost = getBoost(pokemon.name);
  const tier = (evolutionStep * typeBonus) + boost;

  switch (locale) {
    case 'gb':
      return Math.round(tier * 8);  
    case 'us':
    default:
      return tier * 10;
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

function getBoost(name: string) {
  return BOOST[name] ?? 0;
}
