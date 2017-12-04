
export class Player {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Deck {
  id: number;
  name: string;
}

export enum VictoryCondition {
  PriceCards,
  Conceded,
  OutOfCards,
  OutOfTime,
  Disconnet
}

export class NewMatch {
  id: number;

  matchTime: Date;

  opponent: string;

  deckName: string;
  opponentDeckName: string;

  gameNotes: string;
  gameLog: string;
  deckList: string;

  timeLeft: number;
  opponentTimeLeft: number;

  // mm.ss
  cardsLeft: number;
  opponentCardsLeft: number;
}

export class Match {
  id: number;

  registrator: string; // Player registering the match
  players: string[];
  winner: number; // Index into the other arrays
  victoryCondition: VictoryCondition;

  deckNames: string[];
  deckLists: string[];
  gameLog: string;

  notes: string;
  constructor(id: number, players: string[], winner: number, deckNames: string[]) {
    this.id = id;
    this.players = players;
    this.winner = winner;
    this.deckNames = deckNames;
  }

  getWinner(): string {
    return this.players[this.winner];
  }

  getLoser(): string {
    return this.players[(this.winner + 1) % 2];
  }
}

export interface IMatch {
  id: number;
  opponent: string;
  result: string;
  deckName: string;
}

