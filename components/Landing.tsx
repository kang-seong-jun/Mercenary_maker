import React, { useState } from 'react';
import { signInWithGoogle } from '../services/authService';

interface LandingProps {
  onSignedIn: () => void;
}

const Landing: React.FC<LandingProps> = ({ onSignedIn }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onSignedIn();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : '로그인 중 문제가 발생했습니다.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
      <h1 className="text-4xl md:text-5xl font-extrabold font-cinzel text-amber-300">용병 키우기: AI 연대기</h1>
      <p className="text-gray-300 max-w-xl">구글 계정으로 로그인하고 당신만의 전설적인 용병을 만들어 보세요.</p>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-amber-600 hover:bg-amber-500 disabled:bg-neutral-600 text-white font-bold px-5 py-3 rounded-lg shadow-lg border border-amber-400"
      >
        {loading ? '로그인 중...' : 'Google로 시작하기'}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default Landing;


