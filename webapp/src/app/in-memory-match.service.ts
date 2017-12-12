import { InMemoryDbService } from 'angular-in-memory-web-api';
import {  DeckListParser, metaGrossDeckString, zoroarkGolisopodDeckString } from './parseDeck';
import { evian } from './evian';

export class InMemoryMatchService implements InMemoryDbService {
  createDb() {
    const matches = [
      { id: 11, players: ['OnkelMorten', 'CmdrEvian'], winner: 0},
      { id: 12, players: ['CmdrEvian', 'OnkelMorten'], winner: 0},
      { id: 13, players: ['BrittneySerena', 'Ash'], winner: 0, deckNames: ['Hidden moon', '']},
      { id: 16, players: ['OnkelMorten', 'BrittneySerena'], winner: 1},
      { id: 92, players: ['OnkelMorten', 'BrittneySerena'], winner: 0, deckNames: ['Zoroark/Metagross', 'Lumnious Frost']},
    ];

    const decklists = [
      DeckListParser.parseDeckList(metaGrossDeckString),
      DeckListParser.parseDeckList(zoroarkGolisopodDeckString)
    ];

    const players = [
      evian.CreatePlayer('CmdrEvian'),
      evian.CreatePlayer('OnkelMorten'),
      evian.CreatePlayer('BrittneySerena'),
      evian.CreatePlayer('Ash')
    ];

    console.log(players);
    console.log(decklists);
    return {matches, decklists, players};
  }
}
