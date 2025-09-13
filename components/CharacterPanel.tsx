import React, { useState } from 'react';
import { Part, PartType, Mercenary } from '../types';
import Loader from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import CharacterStatsPanel from './CharacterStatsPanel';

interface CharacterPanelProps {
  characterImage: string | null;
  isLoading: boolean;
  error: string | null;
  onCreateCharacter: () => void;
  totalStats: string[];
  assembledParts: Partial<Record<PartType, Part>>;
  onSave: (mercenaryData: Omit<Mercenary, 'id'>) => void;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({ 
  characterImage, 
  isLoading, 
  error, 
  onCreateCharacter, 
  totalStats,
  assembledParts,
  onSave
}) => {
  const [showStats, setShowStats] = useState(false);
  const [name, setName] = useState('');
  
  const canCreateCharacter = !isLoading;
  const canSave = name.trim() !== '' && characterImage !== null && !isLoading;

  const handlePanelClick = () => {
    if (characterImage && !isLoading && !error) {
      setShowStats(prev => !prev);
    }
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!canSave) return;
    onSave({
      name: name.trim(),
      parts: assembledParts,
      characterImage: characterImage!,
      totalStats: totalStats
    });
    setName(''); // Reset name after saving
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400 p-4">
          <p className="font-bold">캐릭터 생성 실패</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }
    if (showStats) {
        return <CharacterStatsPanel stats={totalStats} onBack={() => setShowStats(false)} />;
    }
    if (characterImage) {
      return <img src={characterImage} alt="Generated Character" className="w-full h-full object-contain animate-fade-in" />;
    }
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 p-4">
        <svg viewBox="0 0 100 150" className="w-1/2 h-1/2" aria-hidden="true">
          <path
            d="M50 25 C40 25 35 30 35 40 L35 60 C35 60 25 65 25 80 L25 120 L35 140 L45 140 L45 90 L55 90 L55 140 L65 140 L75 120 L75 80 C75 65 65 60 65 60 L65 40 C65 30 60 25 50 25 Z"
            fill="currentColor"
          />
        </svg>
        <p className="mt-2 text-sm text-center">아이템을 장착하고 캐릭터를 생성하세요.</p>
      </div>
    );
  };

  return (
    <div className="bg-neutral-900/70 p-4 rounded-lg shadow-lg border-2 border-neutral-700 h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-4 font-cinzel text-center text-amber-300 border-b-2 border-neutral-700 pb-2">캐릭터</h3>
      <div 
        className="relative aspect-square w-full max-w-md mx-auto bg-black/30 rounded-md flex-grow flex items-center justify-center cursor-pointer"
        onClick={handlePanelClick}
        aria-label="캐릭터 이미지 또는 능력치 보기"
      >
        {renderContent()}
      </div>
      <div className="mt-4 space-y-3">
        <button
          onClick={(e) => { e.stopPropagation(); onCreateCharacter(); }}
          disabled={!canCreateCharacter}
          className="w-full flex items-center justify-center gap-3 bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg text-lg hover:bg-cyan-600 transition-transform duration-200 transform hover:scale-105 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:scale-100"
        >
          <SparklesIcon className="w-5 h-5" />
          {isLoading ? '생성 중...' : '캐릭터 생성'}
        </button>
        <div className="flex gap-2">
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="용병 이름 입력"
                className="flex-grow bg-neutral-800/80 border-2 border-neutral-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
                disabled={!characterImage || isLoading}
            />
            <button
                onClick={handleSaveClick}
                disabled={!canSave}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
                용병 저장
            </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterPanel;