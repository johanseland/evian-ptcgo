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

  export class IDeckList {
    id: number;
    pokemons: ICard[];
    trainers: ICard[];
    energies: ICard[];

    metaData: IMetaData;
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

  export function CreateMetaData(): IMetaData {
    const metaData: IMetaData  = {
      createdBy: '',
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
}
