
import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isWeekend,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SelectedDates } from '../types';

interface CalendarProps {
  selectedDates: SelectedDates;
  onToggleDate: (dateStr: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDates, onToggleDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isSelected = selectedDates.has(formattedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSatSun = isWeekend(day);

        const currentDay = day; // local ref for closure
        
        days.push(
          <button
            key={formattedDate}
            onClick={() => onToggleDate(formattedDate)}
            className={`
              relative h-12 flex items-center justify-center rounded-xl text-sm font-medium transition-all group
              ${!isCurrentMonth ? 'text-slate-300 pointer-events-none opacity-20' : ''}
              ${isSelected 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105 z-10' 
                : isCurrentMonth ? 'hover:bg-slate-100 text-slate-700' : ''}
              ${isToday && !isSelected ? 'text-indigo-600 font-bold border border-indigo-200' : ''}
            `}
          >
            <span>{format(day, 'd')}</span>
            {isSatSun && isCurrentMonth && !isSelected && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-slate-200"></span>
            )}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500 border-t border-slate-100 pt-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-indigo-600"></div>
          <span>Selecionado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-indigo-200"></div>
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-slate-200"></div>
          <span>Fim de Semana</span>
        </div>
      </div>
    </div>
  );
};
