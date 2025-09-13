import React from 'react';
import { Mercenary } from '../types';
import { Page } from '../App';

interface MercenaryListPageProps {
  mercenaries: Mercenary[];
  onNavigate: (page: Page) => void;
}

const MercenaryListPage: React.FC<MercenaryListPageProps> = ({ mercenaries, onNavigate }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className="text-3xl font-bold font-cinzel text-center text-amber-300 mb-6">용병 리스트</h2>
      
      {mercenaries.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-grow pr-2">
          {mercenaries.map(merc => (
            <div key={merc.id} className="bg-neutral-900/70 p-2 rounded-lg shadow-lg border-2 border-neutral-700 text-center">
              <div className="aspect-square bg-black/50 rounded-md mb-2">
                <img src={merc.characterImage} alt={merc.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm font-semibold text-gray-200 truncate">{merc.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-neutral-500">
          <p>저장된 용병이 없습니다. 제작소에서 새로운 용병을 생성하고 저장하세요.</p>
        </div>
      )}

      <div className="mt-6 text-center">
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

export default MercenaryListPage;
