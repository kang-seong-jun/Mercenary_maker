import React from 'react';
import { Mercenary } from '../types';
import { Page } from '../App';
import CharacterStatsPanel from './CharacterStatsPanel';

interface BattlePageProps {
  activeMercenary: Mercenary | null;
  onNavigate: (page: Page) => void;
}

const BattlePage: React.FC<BattlePageProps> = ({ activeMercenary, onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <h2 className="text-3xl font-bold font-cinzel text-center text-amber-300 mb-6">전투 준비</h2>

      {activeMercenary ? (
        <div className="w-full max-w-md bg-neutral-900/70 p-4 rounded-lg shadow-lg border-2 border-neutral-700">
          <h3 className="text-2xl font-bold text-center text-amber-400 font-cinzel mb-4">{activeMercenary.name}</h3>
          <div className="aspect-square bg-black/50 rounded-md mb-4">
            <img src={activeMercenary.characterImage} alt={activeMercenary.name} className="w-full h-full object-contain" />
          </div>
          <div className="bg-neutral-800/50 p-2 rounded-md">
            <CharacterStatsPanel stats={activeMercenary.totalStats} onBack={() => {}} />
          </div>
        </div>
      ) : (
        <div className="text-center text-neutral-500">
          <p>전투에 참여할 용병이 선택되지 않았습니다.</p>
          <p className="mt-2">제작소에서 용병을 생성하거나, 용병 리스트에서 선택해주세요.</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate('creation')}
          className="bg-amber-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-500 transition-colors"
        >
          제작소로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default BattlePage;
