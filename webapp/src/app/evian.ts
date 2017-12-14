// import { ArgumentType } from '@angular/core/src/view'; // WHY?
import XXH from 'xxhashjs';

export namespace evian {
  export interface IPlayer {
    id: number;
    playerName: string;
  }

  export interface IMetaData {
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    lastUpdate: Date;
  }

  export interface ICard {
    numCards: number;
    cardName: string;
    expansion: string;
    collectionNumber: string; // Not a number, e.g. can be SM84
  }

  export interface IDeckList {
    id: number;
    pokemons: ICard[];
    trainers: ICard[];
    energies: ICard[];

    metaData: IMetaData;
  }

  export enum VictoryCondition {
    Unknown = 'Unknown',
    PriceCards = 'Price cards',
    Conceded = 'Conceded',
    OutOfCards = 'Out of cards',
    OutOfTime = 'Out of time',
    Disconnet = 'Disconnected'
  }

  export enum GameFormat {
    Theme = 'Theme',
    Standard = 'Standard',
    Legacy = 'Legacy',
    Expanded = 'Expanded'
  }

  export interface IMatch {
    id: number;
    metaData: IMetaData;

    winnerName: string;
    loserName: string;
    victoryCondition: VictoryCondition;
    gameFormat?: GameFormat;

    player1Name: string;
    player1TimeLeft?: number;
    player1DeckName?: string;
    player1DeckList?: number;

    player2Name: string;
    player2TimeLeft?: number;
    player2DeckName?: string;
    player2DeckList?: number;

    notes?: string;
  }

  export function CreateCard(): ICard {
    const card: ICard = {
      numCards: 0,
      cardName: '',
      expansion: '',
      collectionNumber: ''
    };

    return card;
  }

  export function CreateMetaData(creator?: string): IMetaData {
    const metaData: IMetaData  = {
      createdBy: creator ? creator : '',
      createdDate: new Date(),
      updatedBy: '',
      lastUpdate: new Date()
    };
    return metaData;
  }

  export function CreateDeckList(): IDeckList {
    const deckList: IDeckList = {
      id: 0,
      pokemons: new Array<ICard>(),
      trainers: new Array<ICard>(),
      energies: new Array<ICard>(),
      metaData: CreateMetaData()
    };

    return deckList;
  }

  export function CreatePlayer(playerName: string): IPlayer {
    const player: IPlayer = {
      id:  +XXH.h32(playerName, 0xABCD).toString(10),
      playerName: playerName
    };

    return player;
  }

  export function CreateMatch(player1Name: string, player2Name: string, winnerName: string,
    victoryCondition: VictoryCondition, gameFormat: GameFormat, date: Date): IMatch {

    const hash = player1Name + player2Name + winnerName + date.toISOString();

    const match: IMatch = {
      id:  +XXH.h32(hash, 0xABCD).toString(10),
      player1Name: player1Name,
      player2Name: player2Name,
      winnerName: winnerName,
      loserName: (winnerName === player1Name) ? player1Name : player2Name,
      victoryCondition: victoryCondition,
      gameFormat: gameFormat,
      metaData: CreateMetaData(player1Name),
    };

    return match;
  }
}
