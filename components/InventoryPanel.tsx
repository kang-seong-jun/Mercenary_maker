import React from 'react';
import { Part, PartType } from '../types';
import PartSlot from './PartSlot';

interface InventoryPanelProps {
  parts: Partial<Record<PartType, Part>>;
  loadingPart: PartType | null;
  error: { partType: PartType; message: string } | null;
  onPartMouseEnter: (part: Part, ref: React.RefObject<HTMLElement>) => void;
  onPartMouseLeave: () => void;
}

const InventoryPanel: React.FC<InventoryPanelProps> = ({ parts, loadingPart, error, onPartMouseEnter, onPartMouseLeave }) => {
    
    const getSlotProps = (partType: PartType) => ({
        partType: partType,
        part: parts[partType] || null,
        isLoading: loadingPart === partType,
        error: error?.partType === partType ? error.message : null,
        onMouseEnter: onPartMouseEnter,
        onMouseLeave: onPartMouseLeave,
    });

    return (
        <div className="bg-neutral-900/70 p-4 rounded-lg shadow-lg border-2 border-neutral-700 h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4 font-cinzel text-center text-amber-300 border-b-2 border-neutral-700 pb-2">인벤토리</h3>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 flex-grow p-1 sm:p-4">
                <div className="col-start-1 row-start-2"><PartSlot {...getSlotProps(PartType.Weapon)} /></div>
                
                <div className="col-start-2 row-start-1"><PartSlot {...getSlotProps(PartType.Head)} /></div>
                <div className="col-start-2 row-start-2"><PartSlot {...getSlotProps(PartType.Armor)} /></div>
                <div className="col-start-2 row-start-3"><PartSlot {...getSlotProps(PartType.Legs)} /></div>

                <div className="col-start-3 row-start-2"><PartSlot {...getSlotProps(PartType.Shield)} /></div>
            </div>
        </div>
    );
};

export default InventoryPanel;