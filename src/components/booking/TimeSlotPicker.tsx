import { motion, AnimatePresence } from 'framer-motion';
import { groupSlots } from '../../utils/timeSlots';

interface TimeSlotPickerProps {
  slots: string[];
  bookedSlots: string[];
  selected: string;
  onSelect: (slot: string) => void;
  loading: boolean;
}

export default function TimeSlotPicker({ slots, bookedSlots, selected, onSelect, loading }: TimeSlotPickerProps) {
  const groups = groupSlots(slots);

  if (loading) {
    return (
      <div className="space-y-5">
        {[0, 1].map((g) => (
          <div key={g}>
            <div className="w-24 h-4 bg-slate-100 rounded-full mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-24 h-10 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="text-3xl mb-2">📅</div>
        <p className="text-sm font-medium">Select a date to see available slots</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group, gi) => (
        <AnimatePresence key={group.label}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: gi * 0.08 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{group.icon}</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.slots.map((slot, si) => {
                const booked = bookedSlots.includes(slot);
                const isSelected = selected === slot;
                return (
                  <motion.button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => !booked && onSelect(slot)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.06 + si * 0.04, duration: 0.2 }}
                    whileHover={!booked && !isSelected ? { scale: 1.05, y: -1 } : undefined}
                    whileTap={!booked ? { scale: 0.97 } : undefined}
                    className={`
                      relative px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                      ${booked
                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-200 scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:shadow-blue-50'
                      }
                    `}
                  >
                    {slot}
                    {isSelected && (
                      <motion.span
                        layoutId="slot-selected"
                        className="absolute inset-0 rounded-xl ring-2 ring-blue-400 ring-offset-2"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}
