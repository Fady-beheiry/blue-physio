import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, MapPin, Stethoscope, CheckCircle } from 'lucide-react';

interface BookingSummaryCardProps {
  service: string;
  branch: string;
  date: string;
  time: string;
}

interface SummaryRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

function SummaryRow({ icon: Icon, label, value, color }: SummaryRowProps) {
  return (
    <AnimatePresence>
      {value ? (
        <motion.div
          key={value}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
          className="flex items-start gap-3"
        >
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-start gap-3 opacity-30">
          <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm text-slate-300 mt-0.5">Not selected</p>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function BookingSummaryCard({ service, branch, date, time }: BookingSummaryCardProps) {
  const formattedDate = date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : '';
  const completeness = [service, branch, date, time].filter(Boolean).length;
  const isComplete = completeness === 4;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg border border-white/70 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-serif font-bold text-slate-800 text-lg">Appointment Summary</h3>
          <p className="text-xs text-slate-400 mt-0.5">{completeness} of 4 steps completed</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
          isComplete ? 'bg-emerald-100' : 'bg-blue-50'
        }`}>
          <CheckCircle className={`w-5 h-5 transition-colors duration-500 ${
            isComplete ? 'text-emerald-500' : 'text-slate-300'
          }`} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${(completeness / 4) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Summary rows */}
      <div className="space-y-4">
        <SummaryRow icon={Stethoscope} label="Service" value={service} color="bg-blue-100 text-blue-600" />
        <SummaryRow icon={MapPin} label="Branch" value={branch} color="bg-purple-100 text-purple-600" />
        <SummaryRow icon={Calendar} label="Date" value={formattedDate} color="bg-teal-100 text-teal-600" />
        <SummaryRow icon={Clock} label="Time" value={time} color="bg-emerald-100 text-emerald-600" />
      </div>

      {/* Hours note */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Working Hours</p>
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex justify-between">
            <span>Sat – Thu</span>
            <span className="font-medium text-slate-700">9:00 AM – 9:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Friday</span>
            <span className="font-medium text-slate-700">10:00 AM – 6:00 PM</span>
          </div>
        </div>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-700 font-medium text-center"
        >
          ✓ Ready to confirm your appointment
        </motion.div>
      )}
    </div>
  );
}
