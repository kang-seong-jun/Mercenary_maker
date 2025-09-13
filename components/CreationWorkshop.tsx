import React, { useState, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { EssenceTier, Part, Rarity, RarityProbabilities, PartType, Mercenary } from '../types';
import { ESSENCE_TIERS } from '../constants';
import { generatePartData, generatePartImage, generateCharacterImage } from '../services/geminiService';
import PartCard from './PartCard';
import InventoryPanel from './InventoryPanel';
import CharacterPanel from './CharacterPanel';
import { SparklesIcon } from './icons/SparklesIcon';
import ItemStorage from './ItemStorage';

const determineRarity = (probabilities: RarityProbabilities): Rarity => {
  const rand = Math.random();
  let cumulative = 0;
  for (const rarity in probabilities) {
    cumulative += probabilities[rarity as Rarity];
    if (rand < cumulative) {
      return rarity as Rarity;
    }
  }
  return Rarity.Common;
};

interface CreationWorkshopProps {
  onSave: (mercenaryData: Omit<Mercenary, 'id'>) => void;
}

const CreationWorkshop: React.FC<CreationWorkshopProps> = ({ onSave }) => {
  const [selectedEssence, setSelectedEssence] = useState<EssenceTier>(ESSENCE_TIERS[0]);
  const [selectedPartType, setSelectedPartType] = useState<PartType>(PartType.Head);
  const [prompt, setPrompt] = useState<string>('');
  
  const [assembledParts, setAssembledParts] = useState<Partial<Record<PartType, Part>>>({});
  const [itemStorage, setItemStorage] = useState<Part[]>([]);
  
  const [loadingPart, setLoadingPart] = useState<PartType | null>(null);
  const [partError, setPartError] = useState<{ partType: PartType; message: string } | null>(null);

  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [isCharacterLoading, setIsCharacterLoading] = useState<boolean>(false);
  const [characterError, setCharacterError] = useState<string | null>(null);

  const [hoveredPart, setHoveredPart] = useState<{ part: Part; ref: React.RefObject<HTMLElement> } | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const partTypeOptions = Object.values(PartType);

  const handleCreatePart = useCallback(async () => {
    if (!prompt.trim()) {
      setPartError({ partType: selectedPartType, message: '생성할 파츠에 대한 설명을 입력해주세요.' });
      return;
    }
    setLoadingPart(selectedPartType);
    setPartError(null);

    try {
      const rarity = determineRarity(selectedEssence.probabilities);
      const partData = await generatePartData(prompt, rarity, selectedPartType);
      const imageUrl = await generatePartImage(partData.name, partData.description, selectedPartType);

      const newPart: Part = { ...partData, rarity, imageUrl, partType: selectedPartType };

      setAssembledParts(prev => {
        const oldPart = prev[selectedPartType];
        if (oldPart) {
          setItemStorage(currentStorage => [...currentStorage, oldPart]);
        }
        return { ...prev, [selectedPartType]: newPart };
      });

    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setPartError({ partType: selectedPartType, message });
    } finally {
      setLoadingPart(null);
    }
  }, [prompt, selectedEssence, selectedPartType]);

  const handleCreateCharacter = useCallback(async () => {
    setIsCharacterLoading(true);
    setCharacterError(null);
    try {
      const imageUrl = await generateCharacterImage(assembledParts);
      setCharacterImage(imageUrl);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setCharacterError(message);
    } finally {
      setIsCharacterLoading(false);
    }
  }, [assembledParts]);

  const handleEquipPart = useCallback((partToEquip: Part) => {
    const partType = partToEquip.partType;
    const currentlyEquipped = assembledParts[partType];

    setAssembledParts(prev => ({ ...prev, [partType]: partToEquip }));
    setItemStorage(prev => {
      const newStorage = prev.filter(p => p !== partToEquip);
      if (currentlyEquipped) {
        newStorage.push(currentlyEquipped);
      }
      return newStorage;
    });
  }, [assembledParts]);
  
  const handlePartMouseEnter = (part: Part, ref: React.RefObject<HTMLElement>) => {
    setHoveredPart({ part, ref });
  };

  const handlePartMouseLeave = () => {
    setHoveredPart(null);
  };
  
  useLayoutEffect(() => {
    if (hoveredPart && hoveredPart.ref.current) {
        const rect = hoveredPart.ref.current.getBoundingClientRect();
        const popupWidth = 384; // max-w-sm
        let left = rect.right + 10;
        if (left + popupWidth > window.innerWidth) {
            left = rect.left - popupWidth - 10;
        }
        setPopupPosition({ top: rect.top, left });
    }
  }, [hoveredPart]);

  const characterStats = useMemo(() => {
    // FIX: Add a type guard to ensure `p` is correctly typed as `Part` after filtering.
    return Object.values(assembledParts).filter((p): p is Part => !!p).flatMap(p => p.stats);
  }, [assembledParts]);


  return (
    <div className="relative flex flex-col h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        <InventoryPanel 
          parts={assembledParts} 
          loadingPart={loadingPart} 
          error={partError} 
          onPartMouseEnter={handlePartMouseEnter}
          onPartMouseLeave={handlePartMouseLeave}
        />
        <CharacterPanel 
          characterImage={characterImage}
          isLoading={isCharacterLoading}
          error={characterError}
          onCreateCharacter={handleCreateCharacter}
          totalStats={characterStats}
          assembledParts={assembledParts}
          onSave={onSave}
        />
        <div className="bg-neutral-900/70 p-6 rounded-lg shadow-lg border-2 border-neutral-700 space-y-4">
          <h3 className="text-2xl font-bold font-cinzel text-amber-300 border-b border-neutral-600 pb-3">창조의 대장간</h3>
          <div>
            <label className="block text-md font-semibold mb-2 text-gray-300">1. 정수 선택</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ESSENCE_TIERS.map((essence) => (
                <button
                  key={essence.name}
                  onClick={() => setSelectedEssence(essence)}
                  className={`p-2 text-sm text-center rounded-md transition-all duration-200 border-2 ${
                    selectedEssence.name === essence.name
                      ? 'bg-amber-500 border-amber-300 text-gray-900 font-bold shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-700 border-neutral-600 hover:bg-neutral-600 hover:border-neutral-500'
                  }`}
                >
                  {essence.name}
                </button>
              ))}
            </div>
          </div>
          <div>
              <label className="block text-md font-semibold mb-2 text-gray-300">2. 파츠 종류 선택</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {partTypeOptions.map(partType => (
                      <button
                          key={partType}
                          onClick={() => setSelectedPartType(partType)}
                          className={`py-2 px-1 text-sm rounded-md transition-all duration-200 border-2 ${
                              selectedPartType === partType
                              ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/30'
                              : 'bg-neutral-700 border-neutral-600 hover:bg-neutral-600 hover:border-neutral-500'
                          }`}
                      >
                          {partType}
                      </button>
                  ))}
              </div>
          </div>
          <div>
            <label htmlFor="prompt-input" className="block text-md font-semibold mb-2 text-gray-300">3. 당신의 비전 묘사</label>
            <textarea
              id="prompt-input"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: '수정으로 만들어진 용의 날개'"
              className="w-full bg-neutral-800/80 border-2 border-neutral-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              disabled={!!loadingPart}
            />
          </div>
          <button
            onClick={handleCreatePart}
            disabled={!!loadingPart || !prompt.trim()}
            className="w-full flex items-center justify-center gap-3 bg-amber-600 text-white font-bold py-2 px-4 rounded-lg text-lg hover:bg-amber-500 transition-transform duration-200 transform hover:scale-105 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            <SparklesIcon className="w-6 h-6" />
            {loadingPart ? `${loadingPart} 제작 중...` : '파츠 생성'}
          </button>
        </div>
        <ItemStorage
          items={itemStorage}
          onEquip={handleEquipPart}
          onPartMouseEnter={handlePartMouseEnter}
          onPartMouseLeave={handlePartMouseLeave}
        />
      </div>
      
      {hoveredPart && (
        <div 
            className="absolute"
            style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
            <PartCard part={hoveredPart.part} />
        </div>
      )}
    </div>
  );
};

export default CreationWorkshop;