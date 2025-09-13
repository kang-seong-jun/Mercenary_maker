import React from 'react';
import { Page } from '../App';

interface NavigationProps {
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b-4 border-neutral-800 bg-black/30 rounded-t-lg">
      <button
        onClick={() => onNavigate('list')}
        className="text-gray-300 hover:text-amber-400 font-semibold transition-colors font-cinzel"
      >
        용병 리스트로 이동
      </button>
      <button
        onClick={() => onNavigate('battle')}
        className="text-gray-300 hover:text-amber-400 font-semibold transition-colors font-cinzel"
      >
        전투하기
      </button>
    </header>
  );
};

export default Navigation;
