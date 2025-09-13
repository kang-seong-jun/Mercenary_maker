
import { EssenceTier, Rarity } from './types';

export const ESSENCE_TIERS: EssenceTier[] = [
  {
    name: '하급 정수',
    description: '창조적 잠재력의 희미한 빛.',
    probabilities: {
      [Rarity.Common]: 0.9,
      [Rarity.Uncommon]: 0.1,
      [Rarity.Rare]: 0,
      [Rarity.Epic]: 0,
      [Rarity.Legendary]: 0,
    },
  },
  {
    name: '중급 정수',
    description: '상상력의 단단한 핵.',
    probabilities: {
      [Rarity.Common]: 0.4,
      [Rarity.Uncommon]: 0.5,
      [Rarity.Rare]: 0.1,
      [Rarity.Epic]: 0,
      [Rarity.Legendary]: 0,
    },
  },
  {
    name: '상급 정수',
    description: '농축된 창조의 힘으로 맥동합니다.',
    probabilities: {
      [Rarity.Common]: 0.05,
      [Rarity.Uncommon]: 0.25,
      [Rarity.Rare]: 0.6,
      [Rarity.Epic]: 0.1,
      [Rarity.Legendary]: 0,
    },
  },
  {
    name: '최상급 정수',
    description: '현실을 왜곡하는 힘의 파편.',
    probabilities: {
      [Rarity.Common]: 0,
      [Rarity.Uncommon]: 0,
      [Rarity.Rare]: 0.5,
      [Rarity.Epic]: 0.4,
      [Rarity.Legendary]: 0.1,
    },
  },
];

export const RARITY_STYLES: { [key in Rarity]: { textColor: string; borderColor: string; shadowColor: string } } = {
  [Rarity.Common]: { textColor: 'text-gray-300', borderColor: 'border-gray-500', shadowColor: 'shadow-gray-500/30' },
  [Rarity.Uncommon]: { textColor: 'text-green-400', borderColor: 'border-green-500', shadowColor: 'shadow-green-500/40' },
  [Rarity.Rare]: { textColor: 'text-blue-400', borderColor: 'border-blue-500', shadowColor: 'shadow-blue-500/50' },
  [Rarity.Epic]: { textColor: 'text-purple-400', borderColor: 'border-purple-500', shadowColor: 'shadow-purple-500/60' },
  [Rarity.Legendary]: { textColor: 'text-amber-400', borderColor: 'border-amber-500', shadowColor: 'shadow-amber-500/70' },
};
