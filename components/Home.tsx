
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Calendar, ChevronRight, PlayCircle, Heart, Share2, BookMarked } from 'lucide-react';

const Home: React.FC = () => {
  const [dailyVerse, setDailyVerse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const verse = await geminiService.getDailyVerse();
        setDailyVerse(verse);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const banners = [
    {
      id: '1',
      title: 'Culto de Adoração',
      subtitle: 'Hoje às 19h30 - Presencial e Online',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '2',
      title: 'Escola de Profetas',
      subtitle: 'Inscrições abertas para o novo módulo',
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=800',
    }
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      {/* Banners */}
      <section className="relative overflow-hidden rounded-3xl group">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-4">
          {banners.map(banner => (
            <div key={banner.id} className="min-w-full relative h-48 rounded-3xl overflow-hidden snap-center">
              <img src={banner.image} className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" alt={banner.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-2 py-1 bg-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Destaque</span>
                <h2 className="text-xl font-bold mt-1">{banner.title}</h2>
                <p className="text-sm text-stone-300">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Bread Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
            Pão Diário
          </h3>
          <button className="text-xs font-semibold text-orange-500 flex items-center gap-1">
            Anteriores <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Flame className="w-32 h-32" />
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-stone-800 rounded w-1/4"></div>
              <div className="h-8 bg-stone-800 rounded w-3/4"></div>
              <div className="h-20 bg-stone-800 rounded w-full"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-orange-500 font-bold text-sm">{dailyVerse?.reference}</span>
              <p className="text-2xl bible-text italic leading-relaxed text-stone-100">
                "{dailyVerse?.text}"
              </p>
              <div className="pt-4 border-t border-stone-800">
                <p className="text-sm text-stone-400 leading-relaxed italic">
                  {dailyVerse?.reflection}
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-stone-800 rounded-full text-xs font-medium hover:bg-stone-700 transition-colors">
                  <Heart className="w-4 h-4 text-red-500" /> 124
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-stone-800 rounded-full text-xs font-medium hover:bg-stone-700 transition-colors">
                  <Share2 className="w-4 h-4" /> Compartilhar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-gradient-to-br from-amber-900/40 to-orange-950/20 border border-amber-800/30 rounded-3xl flex flex-col justify-between h-32">
          <div className="bg-amber-600/20 w-10 h-10 rounded-2xl flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-amber-500/80 font-bold uppercase tracking-widest">Planos</p>
            <h4 className="font-bold">Leitura Anual</h4>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-red-900/40 to-stone-900/20 border border-red-800/30 rounded-3xl flex flex-col justify-between h-32">
          <div className="bg-red-600/20 w-10 h-10 rounded-2xl flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-red-500/80 font-bold uppercase tracking-widest">Mídia</p>
            <h4 className="font-bold">Último Sermão</h4>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold">Próximos Eventos</h3>
        {[
          { title: 'Conferência de Mulheres', date: '25 Out', time: '18:00' },
          { title: 'Vigília Sarça Ardente', date: '02 Nov', time: '22:00' },
        ].map((event, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-stone-900 rounded-2xl border border-stone-800">
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-orange-600/10 border border-orange-600/30 rounded-xl">
              <span className="text-xs font-bold text-orange-500 uppercase">{event.date.split(' ')[1]}</span>
              <span className="text-lg font-black text-white leading-none">{event.date.split(' ')[0]}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-stone-100">{event.title}</h4>
              <p className="text-xs text-stone-500">{event.time} • Templo Sede</p>
            </div>
            <button className="p-2 bg-stone-800 rounded-lg">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
import { Flame } from 'lucide-react';
