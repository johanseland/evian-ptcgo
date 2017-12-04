import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryMatchService implements InMemoryDbService {
  createDb() {
    const matches = [
      { id: 11, players: ['OnkelMorten', 'CmdrEvian'], winner: 0},
      { id: 12, players: ['CmdrEvian', 'OnkelMorten'], winner: 0},
      { id: 13, players: ['BrittneySerena', 'Ash'], winner: 0, deckNames: ['Hidden moon', '']},
      { id: 16, players: ['OnkelMorten', 'BrittneySerena'], winner: 1},
      { id: 92, players: ['OnkelMorten', 'BrittneySerena'], winner: 0, deckNames: ['Zoroark/Metagross', 'Lumnious Frost']},
    ];

    const decks = [
      { id: 1000, name: 'Gardevoir' },
      { id: 1001, name: 'Metagross' },
      { id: 1002, name: 'Golisopod / Zoroark' }
    ];

    const players = [
      { id: 100, name: 'CmdrEvian' },
      { id: 101, name: 'OnkelMorten' },
      { id: 102, name: 'BrittneySerena' },
      { id: 103, name: 'Ash' },
    ];

    return {matches, decks, players};
  }
}
