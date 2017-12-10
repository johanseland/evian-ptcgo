export namespace pokemontcgapi {
  export const url = 'https://api.pokemontcg.io/v1/';

  export interface ISet {
    code: string;
    expandedLegal: boolean;
    logoUrl: string;
    ptcgoCode: string;
    releaseDate: string; // Date?
    series: string;
    standardLegal: boolean;
    symbolUrl: string;
    totalCards: number;
  }

  export interface IAttack {
    cost: string[];
    name: string;
    text: string;
    damage: string; // Since it might be 20+ etc
    convertedEnergyCost: number;
  }

  export interface IWeakness {
    type: string;
    value: string;
  }

  export interface IResistance {
    type: string;
    value: string;
  }

  export interface ICard {
    id: string;
    name: string;
    nationalPokedexNumber: number;
    imageUrl: string;
    imageUrlHiRes: string;
    types: string[];
    supertype: string;
    subtype: string;
    evolvesFrom: string;
    hp: string; // why not number?
    retreatCost: string[];
    number: number;
    artist: string;
    rarity: string;
    series: string;
    set: string;
    setCode: string;
    attacks: IAttack[];
    weaknesses?: IWeakness[];
    resitances?: IResistance[];
  }

  export interface ISets {
    sets: ISet[];
  }

  export interface ICards {
    cards: ICard[];
  }

}
