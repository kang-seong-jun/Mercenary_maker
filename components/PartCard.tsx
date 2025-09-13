import React from 'react';
import { Part } from '../types';
import { RARITY_STYLES } from '../constants';
import { StatsIcon } from './icons/StatsIcon';
import { SkillIcon } from './icons/SkillIcon';

interface PartCardProps {
  part: Part;
}

const PartCard: React.FC<PartCardProps> = ({ part }) => {
  const styles = RARITY_STYLES[part.rarity];

  return (
    <div className={`w-full max-w-sm mx-auto bg-neutral-900/70 rounded-lg border-2 ${styles.borderColor} shadow-xl ${styles.shadowColor} p-6 transform transition-all duration-300 animate-fade-in z-50`}>
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className={`text-2xl font-bold font-cinzel ${styles.textColor}`}>{part.name}</h3>
        <p className={`font-semibold font-cinzel ${styles.textColor}`}>{part.rarity}</p>
      </div>

      {/* Image */}
      <div className={`bg-black/50 p-2 rounded-md mb-4 border ${styles.borderColor}/50`}>
         <img 
            src={part.imageUrl} 
            alt={part.name} 
            className="w-full h-56 object-contain rounded-md" 
         />
      </div>

      {/* Description */}
      <p className="text-gray-300 italic mb-4 text-center">"{part.description}"</p>
      
      <div className="space-y-4">
        {/* Stats */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-2 font-cinzel">
            <StatsIcon className="w-5 h-5" />
            능력치
          </h4>
          <ul className="space-y-1 pl-4">
            {part.stats.map((stat, index) => (
              <li key={index} className="text-green-300 list-disc list-inside bg-neutral-800/50 px-2 py-1 rounded-md">{stat}</li>
            ))}
          </ul>
        </div>

        {/* Skill */}
        {part.skill && part.skill.toLowerCase() !== 'none' && part.skill.toLowerCase() !== '없음' &&(
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-2 font-cinzel">
                <SkillIcon className="w-5 h-5" />
                고유 스킬
            </h4>
            <p className="text-cyan-300 bg-neutral-800/50 px-3 py-2 rounded-md font-semibold">{part.skill}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartCard;