
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar } from './components/Calendar';
import { Stats } from './components/Stats';
import { SelectedDates, DayStats } from './types';
import { isWeekend, parseISO } from 'date-fns';
import { CalendarRange, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>(new Set());

  const toggleDate = useCallback((dateStr: string) => {
    setSelectedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dateStr)) {
        newSet.delete(dateStr);
      } else {
        newSet.add(dateStr);
      }
      return newSet;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelectedDates(new Set());
  }, []);

  const stats = useMemo<DayStats>(() => {
    let weekdays = 0;
    let weekends = 0;

    selectedDates.forEach((dateStr) => {
      const date = parseISO(dateStr);
      if (isWeekend(date)) {
        weekends++;
      } else {
        weekdays++;
      }
    });

    return {
      total: selectedDates.size,
      weekdays,
      weekends
    };
  }, [selectedDates]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <CalendarRange className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase italic">
              CONTA <span className="text-indigo-600">TEMPO</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleClear}
              className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors"
            >
              Nova Contagem
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Section */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Selecione os dias no calendário
                  <Info size={16} className="text-slate-400 cursor-help" title="Clique em qualquer dia para adicionar ou remover da soma." />
                </h2>
                <span className="text-xs font-medium px-2 py-1 bg-slate-200 text-slate-600 rounded-md">
                  Padrão Brasil
                </span>
              </div>
              <Calendar 
                selectedDates={selectedDates} 
                onToggleDate={toggleDate} 
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-5 sticky top-24">
            <Stats stats={stats} onClear={handleClear} />
            
            <div className="mt-6 p-4 bg-white border border-slate-200 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Datas Selecionadas</h3>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                {Array.from(selectedDates).sort().map(date => {
                  const d = parseISO(date);
                  const isWknd = isWeekend(d);
                  return (
                    <div key={date} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm text-slate-600 font-medium">
                        {new Intl.DateTimeFormat('pt-BR').format(d)}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${isWknd ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {isWknd ? 'FDS' : 'Útil'}
                      </span>
                    </div>
                  );
                })}
                {selectedDates.size === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4 italic">Nenhum dia selecionado ainda.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Mobile Stats Bar (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Total de Dias</p>
            <p className="text-2xl font-black text-indigo-600">{stats.total}</p>
          </div>
          <button 
            onClick={handleClear}
            className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
