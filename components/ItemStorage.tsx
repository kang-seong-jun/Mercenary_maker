import React, { useRef } from 'react';
import { Part } from '../types';
import { RARITY_STYLES } from '../constants';

interface ItemStorageProps {
  items: Part[];
  onEquip: (part: Part) => void;
  onPartMouseEnter: (part: Part, ref: React.RefObject<HTMLElement>) => void;
  onPartMouseLeave: () => void;
}

const StoredItem: React.FC<{
  part: Part,
  onEquip: (part: Part) => void,
  onMouseEnter: (part: Part, ref: React.RefObject<HTMLElement>) => void,
  onMouseLeave: () => void
}> = ({ part, onEquip, onMouseEnter, onMouseLeave }) => {
  const itemRef = useRef<HTMLButtonElement>(null);
  const styles = RARITY_STYLES[part.rarity];

  const handleMouseEnter = () => {
    if (itemRef.current) {
      onMouseEnter(part, itemRef);
    }
  };

  return (
    <button
      ref={itemRef}
      onClick={() => onEquip(part)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative aspect-square w-full rounded-md flex items-center justify-center p-1 transition-all duration-300 bg-black/50 border-2 ${styles.borderColor} shadow-md ${styles.shadowColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-400`}
      aria-label={`${part.name} 장착`}
    >
      <img src={part.imageUrl} alt={part.name} className="w-full h-full object-contain rounded-sm" />
    </button>
  );
};

const ItemStorage: React.FC<ItemStorageProps> = ({ items, onEquip, onPartMouseEnter, onPartMouseLeave }) => {
  return (
    <div className="bg-neutral-900/70 p-4 rounded-lg shadow-lg border-2 border-neutral-700 h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-4 font-cinzel text-center text-amber-300 border-b-2 border-neutral-700 pb-2">아이템 보관함</h3>
      <div className="flex-grow overflow-y-auto pr-2">
        {items.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {items.map((item, index) => (
                    <StoredItem 
                        key={`${item.name}-${index}`} 
                        part={item} 
                        onEquip={onEquip}
                        onMouseEnter={onPartMouseEnter}
                        onMouseLeave={onPartMouseLeave}
                    />
                ))}
            </div>
        ) : (
            <div className="h-full flex items-center justify-center text-center text-neutral-600 p-4">
                <p>생성된 아이템이 여기에 보관됩니다.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ItemStorage;