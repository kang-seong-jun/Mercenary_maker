import React from 'react';
import { StatsIcon } from './icons/StatsIcon';

interface CharacterStatsPanelProps {
  stats: string[];
  onBack: () => void;
}

const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({ stats, onBack }) => {
  return (
    <div className="w-full h-full bg-black/50 p-4 flex flex-col animate-fade-in">
      <h4 className="flex items-center justify-center gap-2 text-xl font-bold text-amber-300 mb-3 font-cinzel border-b-2 border-neutral-700 pb-2">
        <StatsIcon className="w-5 h-5" />
        종합 능력치
      </h4>
      <ul className="space-y-1 overflow-y-auto flex-grow pr-2">
        {stats.length > 0 ? (
            stats.map((stat, index) => (
                <li key={index} className="text-green-300 list-disc list-inside bg-neutral-800/50 px-2 py-1 rounded-md text-sm">
                    {stat}
                </li>
            ))
        ) : (
            <li className="text-neutral-500 text-center py-4">장착된 아이템이 없습니다.</li>
        )}
      </ul>
      <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="mt-4 text-sm bg-neutral-700 hover:bg-neutral-600 text-gray-300 py-1 px-3 rounded-md transition-colors w-full">
        뒤로가기
      </button>
    </div>
  );
};

export default CharacterStatsPanel;