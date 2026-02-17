
import React, { useState } from 'react';
import Layout, { AppTab } from './components/Layout';
import Home from './components/Home';
import BibleReader from './components/BibleReader';
import DevotionalView from './components/DevotionalView';
import MultimediaView from './components/MultimediaView';
import { Search, Flame, Users, Sparkles } from 'lucide-react';

const StudyView = () => (
  <div className="p-6 flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-in fade-in">
    <div className="p-8 bg-orange-600/10 rounded-[2.5rem] relative">
      <Sparkles className="w-16 h-16 text-orange-500" />
      <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-10"></div>
    </div>
    <div>
      <h2 className="text-2xl font-black text-white">Assistente Teológico</h2>
      <p className="text-stone-400 max-w-xs leading-relaxed mt-2 mx-auto">
        Pesquise temas, significados originais e concórdia bíblica com ajuda da nossa IA pastoral.
      </p>
    </div>
    <div className="w-full max-w-md relative group">
      <input 
        type="text" 
        placeholder="O que deseja estudar hoje?" 
        className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all shadow-2xl group-hover:border-stone-700"
      />
      <button className="absolute right-3 top-3 p-2.5 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/40 hover:scale-105 transition-transform">
        <Flame className="w-5 h-5 text-white" />
      </button>
    </div>
    <div className="flex flex-wrap justify-center gap-2.5 pt-4">
      {['Santuário', 'Graça', 'Redenção', 'Pentecostes'].map(tag => (
        <span key={tag} className="px-4 py-1.5 bg-stone-900 border border-stone-800 rounded-full text-xs font-bold text-stone-500 hover:text-orange-500 transition-colors cursor-pointer">#{tag}</span>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && <Home />}
      {activeTab === 'bible' && <BibleReader />}
      {activeTab === 'devotional' && <DevotionalView />}
      {activeTab === 'multimedia' && <MultimediaView />}
      {activeTab === 'study' && <StudyView />}
    </Layout>
  );
};

export default App;
