export interface CardsModel {
    cards: CardModel[];
  }
  export interface CardModel {
      toogleFlip: boolean; // Whether the card is flipped to show
      hiddenCard: boolean; // Whether the card is hidden
      id: string;
      name: string;
      nationalPokedexNumber?: number;
      imageUrl: string;
      imageUrlHiRes: string;
      types?: string[];
      supertype: string;
      subtype: string;
      evolvesFrom?: string;
      hp?: string;
      number: string;
      artist?: string;
      rarity: string;
      series: string;
      set: string;
      setCode: string;
      attacks?: Attack[];
      weaknesses?: Weakness[];
      retreatCost?: string[];
      convertedRetreatCost?: number;
      resistances?: Weakness[];
      text?: string[];
      ability?: Ability;
      ancientTrait?: AncientTrait;
    }
    
    interface AncientTrait {
      name: string;
      text: string;
    }
    
    interface Ability {
      name: string;
      text: string;
      type: string;
    }
    
    interface Weakness {
      type: string;
      value: string;
    }
    
    interface Attack {
      cost: string[];
      name: string;
      text: string;
      damage: string;
      convertedEnergyCost: number;
    }