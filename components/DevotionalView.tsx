
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Devotional } from '../types';
import { Coffee, Flame, Quote, Sparkles, Heart, Bookmark } from 'lucide-react';

const DevotionalView: React.FC = () => {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await geminiService.getDailyDevotional();
        setDevotional(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="text-orange-500 font-bold animate-pulse">Preparando seu pão diário...</p>
    </div>
  );

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000">
      <header className="relative h-64 rounded-[2rem] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1000" 
          className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-[2s]" 
          alt="Devotional"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-black text-orange-400 uppercase tracking-[0.2em]">Devocional do Dia</span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight">{devotional?.title}</h2>
        </div>
      </header>

      <section className="bg-stone-900/50 border border-stone-800/50 rounded-[2rem] p-8 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none">
          <Quote className="w-32 h-32 text-orange-500" />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 bg-orange-600/5 border border-orange-600/20 rounded-2xl italic text-lg bible-text text-stone-200">
            <span className="text-4xl text-orange-500 leading-none">"</span>
            <p>{devotional?.verse}</p>
          </div>

          <div className="space-y-4 text-stone-300 leading-relaxed text-lg">
            {devotional?.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-800">
            <h4 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4" /> Momento de Oração
            </h4>
            <div className="p-6 bg-stone-950 rounded-2xl border border-stone-800 italic text-stone-400 leading-relaxed">
              {devotional?.prayer}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40">
            <Heart className="w-4 h-4" /> Amei
          </button>
          <button className="p-4 bg-stone-800 rounded-2xl text-stone-300">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default DevotionalView;
