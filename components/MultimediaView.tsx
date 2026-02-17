
import React from 'react';
import { Play, Headset, Clock, Calendar, Search, Music, Video } from 'lucide-react';
import { MediaItem } from '../types';

const MultimediaView: React.FC = () => {
  const items: MediaItem[] = [
    { id: '1', title: 'O Fogo que não se apaga', type: 'video', author: 'Pr. Antônio Carlos', duration: '45:20', thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'Adoração e Entrega', type: 'audio', author: 'Ministério Sarça', duration: '08:15', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: 'Crescendo na Graça', type: 'video', author: 'Missionária Sarah', duration: '32:10', thumbnail: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-right duration-500">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Multimídia</h2>
        <button className="p-2.5 bg-stone-900 rounded-xl">
          <Search className="w-5 h-5 text-stone-500" />
        </button>
      </header>

      <section className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {['Todos', 'Sermões', 'Músicas', 'Podcasts', 'Ao Vivo'].map((tag, i) => (
          <button 
            key={tag} 
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap border ${i === 0 ? 'bg-orange-600 border-orange-500 text-white' : 'bg-stone-900 border-stone-800 text-stone-500'}`}
          >
            {tag}
          </button>
        ))}
      </section>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-stone-500 uppercase tracking-[0.2em]">Recentes</h3>
        {items.map((item) => (
          <div key={item.id} className="group flex gap-4 bg-stone-900/40 p-3 rounded-2xl border border-stone-800/50 hover:bg-stone-800/60 transition-all cursor-pointer">
            <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 shadow-xl">
              <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                {item.type === 'video' ? <Video className="w-6 h-6 text-white" /> : <Headset className="w-6 h-6 text-white" />}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-stone-100 group-hover:text-orange-400 transition-colors leading-tight">{item.title}</h4>
                <p className="text-xs text-stone-500 font-medium mt-1">{item.author}</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-stone-600 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Ontem</span>
              </div>
            </div>
            <button className="self-center p-3 bg-stone-800 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-all">
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-br from-red-950/40 to-stone-900 rounded-[2rem] border border-red-900/20 text-center space-y-4">
        <div className="w-16 h-16 bg-red-600 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-red-900/50">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold">Harpa Cristã Online</h3>
        <p className="text-sm text-stone-400 px-4">Acesse todos os hinos e corinhos para adoração em qualquer lugar.</p>
        <button className="w-full py-4 bg-white text-stone-950 rounded-2xl text-sm font-black uppercase tracking-wider">Abrir Harpa</button>
      </div>
    </div>
  );
};

export default MultimediaView;
