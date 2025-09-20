import React from 'react';
import { User } from 'firebase/auth';

interface HeaderProps {
  user: User | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  return (
    <div className="flex items-center justify-end gap-3 px-4 py-2 border-b-2 border-neutral-800 bg-black/30">
      {user ? (
        <>
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName || 'user'} className="w-8 h-8 rounded-full" />
          )}
          <span className="text-sm text-gray-300">{user.displayName || user.email}</span>
          <button
            onClick={onSignOut}
            className="text-sm px-3 py-1 rounded-md bg-neutral-700 hover:bg-neutral-600 text-gray-100 border border-neutral-600"
          >
            로그아웃
          </button>
        </>
      ) : (
        <span className="text-sm text-gray-400">로그인이 필요합니다</span>
      )}
    </div>
  );
};

export default Header;


