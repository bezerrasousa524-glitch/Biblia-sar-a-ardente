
import React, { useState } from 'react';
import { Home, BookOpen, Search, Bell, Users, Menu, X, Flame, Coffee, Music } from 'lucide-react';

export type AppTab = 'home' | 'bible' | 'devotional' | 'multimedia' | 'study' | 'church';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'bible', label: 'Bíblia', icon: BookOpen },
    { id: 'devotional', label: 'Devocional', icon: Coffee },
    { id: 'multimedia', label: 'Mídia', icon: Music },
    { id: 'study', label: 'Estudo', icon: Search },
  ] as const;

  return (
    <div className="flex flex-col h-screen bg-[#080707] text-stone-100 overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 bg-stone-900/40 backdrop-blur-xl border-b border-stone-800/50 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-800 rounded-2xl shadow-lg shadow-orange-950/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white">SARÇA ARDENTE</h1>
            <p className="text-[9px] font-bold text-orange-500 tracking-[0.3em] uppercase opacity-80">Igreja Nova Vida</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 text-stone-400 hover:text-orange-400 transition-colors bg-stone-900/50 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 rounded-full ring-2 ring-stone-900 animate-pulse"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-28 md:pb-6 custom-scrollbar">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-stone-950/80 backdrop-blur-2xl border-t border-stone-800/50 px-4 py-3 flex justify-around items-center md:hidden z-50 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative px-3 py-1 ${
                isActive ? 'text-orange-500' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'scale-110' : 'scale-100'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
