import { InMemoryDbService } from 'angular-in-memory-web-api';
import {  DeckListParser, metaGrossDeckString, zoroarkGolisopodDeckString } from './parseDeck';
import { evian } from './evian';

export class InMemoryMatchService implements InMemoryDbService {
  createDb() {
    const matches = [
      evian.CreateMatch('OnkelMorten', 'CmdrEvian', 'OnkelMorten', evian.VictoryCondition.Conceded, evian.GameFormat.Theme, new Date()),
      evian.CreateMatch('Ash', 'CmdrEvian', 'CmdrEvian', evian.VictoryCondition.OutOfCards, evian.GameFormat.Standard, new Date()),
      evian.CreateMatch('OnkelMorten', 'Ash', 'Ash', evian.VictoryCondition.PriceCards, evian.GameFormat.Legacy, new Date()),
      evian.CreateMatch('Ash', 'BrittneySerena', 'BrittneySerena', evian.VictoryCondition.Conceded, evian.GameFormat.Expanded, new Date()),
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
