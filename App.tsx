import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import CreationWorkshop from './components/CreationWorkshop';
import MercenaryListPage from './components/MercenaryListPage';
import BattlePage from './components/BattlePage';
import { Mercenary } from './types';
import Header from './components/Header';
import Landing from './components/Landing';
import { subscribeAuth } from './services/authService';
import { User } from 'firebase/auth';

export type Page = 'creation' | 'list' | 'battle';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('creation');
  const [mercenaries, setMercenaries] = useState<Mercenary[]>([]);
  const [activeMercenary, setActiveMercenary] = useState<Mercenary | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSaveMercenary = (mercenaryData: Omit<Mercenary, 'id'>) => {
    const newMercenary: Mercenary = { ...mercenaryData, id: Date.now().toString() };
    setMercenaries(prev => [...prev, newMercenary]);
    setActiveMercenary(newMercenary);
    alert('용병이 저장되었습니다!');
  };
  
  const handleNavigate = (targetPage: Page) => {
    if (targetPage === 'battle' && !activeMercenary) {
      alert('전투에 참여할 용병이 없습니다. 먼저 용병을 생성하고 저장해주세요.');
      return;
    }
    setPage(targetPage);
  };
  
  const renderPage = () => {
    switch (page) {
      case 'list':
        return <MercenaryListPage mercenaries={mercenaries} onNavigate={handleNavigate} />;
      case 'battle':
        return <BattlePage activeMercenary={activeMercenary} onNavigate={handleNavigate} />;
      case 'creation':
      default:
        return <CreationWorkshop onSave={handleSaveMercenary} />;
    }
  };

  useEffect(() => {
    const unsub = subscribeAuth((u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black/30 text-gray-100 flex flex-col p-4">
        <div className="flex-grow container mx-auto bg-black/50 border-2 border-neutral-700 shadow-2xl shadow-black/50 rounded-lg flex flex-col">
          <Landing onSignedIn={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/30 text-gray-100 flex flex-col p-4">
      <div className="flex-grow container mx-auto bg-black/50 border-2 border-neutral-700 shadow-2xl shadow-black/50 rounded-lg flex flex-col">
        <Header user={user} onSignOut={() => import('./services/authService').then(m => m.signOutUser())} />
        <Navigation onNavigate={handleNavigate} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <footer className="text-center py-4 text-gray-500 text-sm border-t-2 border-neutral-800">
          <p>&copy; 2024 용병 키우기: AI 연대기. 모든 권리 보유.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
