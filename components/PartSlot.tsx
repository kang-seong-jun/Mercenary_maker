import React, { useRef } from 'react';
import { Part, PartType } from '../types';
import { RARITY_STYLES } from '../constants';
import { HeadIcon, ArmorIcon, LegsIcon, WeaponIcon, ShieldIcon } from './icons/PartIcons';
import { ForgeIcon } from './icons/ForgeIcon';

interface PartSlotProps {
  partType: PartType;
  part: Part | null;
  isLoading: boolean;
  error: string | null;
  onMouseEnter: (part: Part, ref: React.RefObject<HTMLElement>) => void;
  onMouseLeave: () => void;
}

const partIcons: Record<PartType, React.ReactNode> = {
    [PartType.Head]: <HeadIcon className="w-full h-full p-2" />,
    [PartType.Armor]: <ArmorIcon className="w-full h-full p-2" />,
    [PartType.Legs]: <LegsIcon className="w-full h-full p-2" />,
    [PartType.Weapon]: <WeaponIcon className="w-full h-full p-2" />,
    [PartType.Shield]: <ShieldIcon className="w-full h-full p-2" />,
};

const PartSlot: React.FC<PartSlotProps> = ({ partType, part, isLoading, error, onMouseEnter, onMouseLeave }) => {
    const slotRef = useRef<HTMLDivElement>(null);
    const rarityStyles = part ? RARITY_STYLES[part.rarity] : null;
    const baseClasses = "aspect-square w-full rounded-md flex flex-col items-center justify-center text-center p-1 transition-all duration-300";

    const handleMouseEnter = () => {
        if (part && slotRef.current) {
            onMouseEnter(part, slotRef);
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={`${baseClasses} bg-neutral-700/50 border-2 border-amber-500 border-dashed`}>
                    <ForgeIcon className="w-1/2 h-1/2 text-amber-400 animate-spin-slow" />
                    <span className="text-xs text-amber-300 mt-1">제작 중...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className={`${baseClasses} bg-red-900/50 border-2 border-red-500`}>
                    <span className="text-lg text-red-300 font-semibold">!</span>
                    <span className="text-xs text-red-400 mt-1 truncate" title={error}>실패</span>
                </div>
            );
        }

        if (part && rarityStyles) {
            return (
                <div className={`${baseClasses} bg-black/50 border-2 ${rarityStyles.borderColor} shadow-md ${rarityStyles.shadowColor}`}>
                    <img src={part.imageUrl} alt={part.name} className="w-full h-full object-contain rounded-sm" />
                </div>
            );
        }

        return (
            <div className={`${baseClasses} bg-black/30 border-2 border-neutral-700 border-dashed`}>
                <div className="w-1/2 h-1/2 text-neutral-600">{partIcons[partType]}</div>
                <span className="text-xs text-neutral-600 mt-1">{partType}</span>
            </div>
        );
    };

    return (
        <div 
            ref={slotRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onMouseLeave}
            className="w-full h-full"
            aria-label={part ? `${part.name} 상세 정보 보기` : `${partType} 슬롯`}
        >
            {renderContent()}
        </div>
    );
};

export default PartSlot;