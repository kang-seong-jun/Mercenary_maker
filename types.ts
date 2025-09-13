export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export enum PartType {
  Head = '투구',
  Armor = '갑옷',
  Legs = '다리',
  Weapon = '무기',
  Shield = '방패',
}

export type RarityProbabilities = {
  [key in Rarity]: number;
};

export interface EssenceTier {
  name: string;
  description: string;
  probabilities: RarityProbabilities;
}

export interface PartData {
  name: string;
  description: string;
  stats: string[];
  skill: string;
}

export interface Part extends PartData {
  rarity: Rarity;
  imageUrl: string;
  partType: PartType;
}

export interface Mercenary {
  id: string;
  name: string;
  parts: Partial<Record<PartType, Part>>;
  characterImage: string;
  totalStats: string[];
}
