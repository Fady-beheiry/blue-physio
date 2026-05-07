import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, isSameMonth, isSameDay, addMonths, subMonths, isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isDateDisabled } from '../../utils/timeSlots';

interface BookingCalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BookingCalendar({ selected, onSelect }: BookingCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let cur = calStart;
  while (cur <= calEnd) {
    days.push(cur);
    cur = addDays(cur, 1);
  }

  const prevMonth = () => setViewMonth((m) => subMonths(m, 1));
  const nextMonth = () => setViewMonth((m) => addMonths(m, 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const canGoPrev = viewMonth > today || isSameMonth(viewMonth, today) ? false : true;

  return (
    <div className="select-none">
      {/* Month header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          disabled={isSameMonth(viewMonth, today)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <AnimatePresence mode="wait">
          <motion.h3
            key={format(viewMonth, 'yyyy-MM')}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="font-serif font-bold text-lg text-slate-800"
          >
            {format(viewMonth, 'MMMM yyyy')}
          </motion.h3>
        </AnimatePresence>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format(viewMonth, 'yyyy-MM')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((day, idx) => {
            const disabled = isDateDisabled(day) || !isSameMonth(day, viewMonth);
            const isSelected = selected && isSameDay(day, selected);
            const isCurrentDay = isToday(day);
            const inMonth = isSameMonth(day, viewMonth);

            return (
              <motion.button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && onSelect(day)}
                whileTap={!disabled ? { scale: 0.92 } : undefined}
                className={`
                  relative h-10 w-full rounded-xl text-sm font-medium transition-all duration-200
                  ${!inMonth ? 'invisible' : ''}
                  ${disabled
                    ? 'text-slate-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-200 scale-105'
                    : isCurrentDay
                    ? 'bg-blue-50 text-blue-600 font-bold ring-2 ring-blue-300 ring-offset-1 hover:bg-blue-100'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
              >
                {format(day, 'd')}
                {isCurrentDay && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
