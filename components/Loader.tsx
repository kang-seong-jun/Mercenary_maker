
import React, { useState, useEffect } from 'react';
import { ForgeIcon } from './icons/ForgeIcon';

const loadingMessages = [
  "우주의 에너지를 모으는 중...",
  "상상력을 데이터로 변환하는 중...",
  "AI 신탁에게 조언을 구하는 중...",
  "생각으로부터 현실을 벼려내는 중...",
  "기계 영혼을 깨우는 중...",
  "창조의 룬을 새기는 중...",
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-amber-300 flex flex-col items-center">
      <ForgeIcon className="w-24 h-24 animate-spin-slow mb-4" />
      <h3 className="text-2xl font-bold font-cinzel">생성 중...</h3>
      <p className="text-lg mt-2 transition-opacity duration-500">{message}</p>
    </div>
  );
};

// Add custom animation to tailwind config if possible, or define here
// Since we can't edit tailwind.config.js, let's inject a style tag for this animation.
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
@keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);

export default Loader;
