import { HashInterface } from 'xxhashjs';

export interface Card {
  cardName: string;
  expansion: string;
  cardNumber: number;
}

export interface DeckList {
  id: number;
  pokemons: Card[];
  trainers: Card[];
  energies: Card[];
}

console.log(2);
