import React from 'react';
import { signInWithGoogle } from '../services/authService';

interface LandingProps {
  onSignedIn: () => void;
}

const Landing: React.FC<LandingProps> = ({ onSignedIn }) => {
  const handleSignIn = async () => {
    await signInWithGoogle();
    onSignedIn();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
      <h1 className="text-4xl md:text-5xl font-extrabold font-cinzel text-amber-300">용병 키우기: AI 연대기</h1>
      <p className="text-gray-300 max-w-xl">구글 계정으로 로그인하고 당신만의 전설적인 용병을 만들어 보세요.</p>
      <button
        onClick={handleSignIn}
        className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-3 rounded-lg shadow-lg border border-amber-400"
      >
        Google로 시작하기
      </button>
    </div>
  );
};

export default Landing;


