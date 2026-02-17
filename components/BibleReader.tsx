
import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_BOOKS } from '../constants';
import { geminiService } from '../services/geminiService';
import { Verse } from '../types';
import { ChevronDown, Search, ArrowLeft, ArrowRight, BookOpen, MessageSquare, Sparkles } from 'lucide-react';

const BibleReader: React.FC = () => {
  const [book, setBook] = useState('Salmos');
  const [chapter, setChapter] = useState(23);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await geminiService.getChapterText(book, chapter);
        setVerses(data.verses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [book, chapter]);

  const handleAiStudy = async (verse: Verse) => {
    setSelectedVerse(verse.number);
    setAnalyzing(true);
    setAiAnalysis(null);
    try {
      const response = await geminiService.studyAssistant(
        `Explique o significado teológico e o contexto deste versículo para um estudo devocional.`,
        `${book} ${chapter}:${verse.number} - ${verse.text}`
      );
      setAiAnalysis(response);
    } catch (err) {
      setAiAnalysis("Desculpe, não consegui analisar este versículo agora.");
    } finally {
      setAnalyzing(false);
    }
  };

  const nextChapter = () => {
    const currentBook = BIBLE_BOOKS.find(b => b.name === book);
    if (currentBook && chapter < currentBook.chapters) {
      setChapter(prev => prev + 1);
    } else {
      const bookIndex = BIBLE_BOOKS.findIndex(b => b.name === book);
      if (bookIndex < BIBLE_BOOKS.length - 1) {
        setBook(BIBLE_BOOKS[bookIndex + 1].name);
        setChapter(1);
      }
    }
  };

  const prevChapter = () => {
    if (chapter > 1) {
      setChapter(prev => prev - 1);
    } else {
      const bookIndex = BIBLE_BOOKS.findIndex(b => b.name === book);
      if (bookIndex > 0) {
        setBook(BIBLE_BOOKS[bookIndex - 1].name);
        setChapter(BIBLE_BOOKS[bookIndex - 1].chapters);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 relative">
      {/* Chapter Navigation Bar */}
      <div className="px-6 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between sticky top-0 z-40">
        <button 
          onClick={() => setIsSelectorOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-stone-800 rounded-lg text-sm font-bold text-stone-100"
        >
          {book} {chapter} <ChevronDown className="w-4 h-4 text-orange-500" />
        </button>
        <div className="flex items-center gap-4">
          <button onClick={prevChapter} className="p-2 text-stone-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={nextChapter} className="p-2 text-stone-400 hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bible Text View */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-6 bible-text">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-stone-800 rounded w-full"></div>
                <div className="h-4 bg-stone-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6 pb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 text-orange-500">{book}</h2>
              <p className="text-stone-500 uppercase tracking-widest text-xs font-bold">Capítulo {chapter}</p>
            </div>
            {verses.map((v) => (
              <div 
                key={v.number} 
                onClick={() => handleAiStudy(v)}
                className={`group relative leading-relaxed text-xl cursor-pointer transition-all duration-300 rounded-xl p-2 -mx-2 ${
                  selectedVerse === v.number ? 'bg-orange-600/10' : 'hover:bg-stone-900'
                }`}
              >
                <span className="inline-block w-8 text-sm font-bold text-orange-700 select-none mr-2">
                  {v.number}
                </span>
                <span className="text-stone-200">{v.text}</span>
                <div className={`absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${selectedVerse === v.number ? 'opacity-100' : ''}`}>
                  <div className="p-1 bg-orange-600 rounded-md shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Assistant Overlay */}
      {selectedVerse && (
        <div className="fixed inset-x-0 bottom-20 md:bottom-6 mx-auto max-w-lg p-4 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-stone-900 border border-orange-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[60vh]">
            <div className="px-5 py-3 bg-stone-800 flex items-center justify-between border-b border-stone-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-stone-100 uppercase tracking-tight">Estudo Bíblico • {book} {chapter}:{selectedVerse}</span>
              </div>
              <button onClick={() => setSelectedVerse(null)} className="text-stone-400 hover:text-white">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto text-sm leading-relaxed text-stone-300 scrollbar-hide">
              {analyzing ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                  <p className="text-xs font-medium text-orange-500 italic">Sondando as escrituras...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-orange max-w-none">
                  {aiAnalysis}
                </div>
              )}
            </div>
            <div className="p-3 bg-stone-950/50 flex gap-2 border-t border-stone-800">
              <button className="flex-1 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors">
                Ver Comentário Completo
              </button>
              <button className="px-4 py-2 bg-stone-800 rounded-xl text-xs font-bold hover:bg-stone-700">
                Salvar Nota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book/Chapter Selector Modal */}
      {isSelectorOpen && (
        <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
          <div className="bg-stone-900 w-full max-w-md h-[80vh] rounded-3xl border border-stone-800 flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-500" />
                Selecionar Livro
              </h3>
              <button onClick={() => setIsSelectorOpen(false)} className="p-2 bg-stone-800 rounded-full">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-2">
              {BIBLE_BOOKS.map(b => (
                <button
                  key={b.name}
                  onClick={() => {
                    setBook(b.name);
                    setChapter(1);
                    setIsSelectorOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    book === b.name ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
