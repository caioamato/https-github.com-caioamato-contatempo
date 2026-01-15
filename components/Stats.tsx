
import React from 'react';
import { DayStats } from '../types';
import { Calendar as CalendarIcon, Briefcase, Coffee, Trash2 } from 'lucide-react';

interface StatsProps {
  stats: DayStats;
  onClear: () => void;
}

export const Stats: React.FC<StatsProps> = ({ stats, onClear }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Resumo da Seleção</h2>
        <button 
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
          Limpar Tudo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500 rounded-lg text-white">
              <CalendarIcon size={20} />
            </div>
            <span className="text-sm font-medium text-indigo-700">Total de Dias</span>
          </div>
          <p className="text-3xl font-bold text-indigo-900">{stats.total}</p>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-700">Dias Úteis</span>
          </div>
          <p className="text-3xl font-bold text-emerald-900">{stats.weekdays}</p>
        </div>

        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <Coffee size={20} />
            </div>
            <span className="text-sm font-medium text-orange-700">Finais de Semana</span>
          </div>
          <p className="text-3xl font-bold text-orange-900">{stats.weekends}</p>
        </div>
      </div>

      {stats.total === 0 && (
        <div className="text-center py-4">
          <p className="text-slate-400 text-sm italic">Clique nos dias do calendário para começar a contar.</p>
        </div>
      )}
    </div>
  );
};
