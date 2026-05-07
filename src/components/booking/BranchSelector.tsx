import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const BRANCHES = [
  {
    label: 'Madinaty Sports Club',
    desc: 'Inside the Indoor Pool (Members Only)',
    icon: '🏊',
    map: 'https://maps.app.goo.gl/rgKTKCm6Loq5FGcd8',
    phone: '+20 151 528 6215',
  },
  {
    label: 'Madinaty British School',
    desc: 'Professional therapy in educational setting',
    icon: '🏫',
    map: 'https://maps.app.goo.gl/DU1WWAagFYZyHMQp8',
    phone: '+20 151 528 6215',
  },
  {
    label: 'Gardenia Branch',
    desc: 'Tolip Gardens Hotel, Nasr City',
    icon: '🌸',
    map: 'https://maps.app.goo.gl/ah64DqiXPQS2mGHD9',
    phone: '+20 114 476 4712',
  },
];

interface BranchSelectorProps {
  selected: string;
  onSelect: (b: string) => void;
}

export default function BranchSelector({ selected, onSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-3">
      {BRANCHES.map((branch, i) => {
        const isSelected = selected === branch.label;
        return (
          <motion.button
            key={branch.label}
            type="button"
            onClick={() => onSelect(branch.label)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.99 }}
            className={`
              relative w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200
              ${isSelected
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent shadow-lg shadow-blue-200'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
              isSelected ? 'bg-white/20' : 'bg-slate-50'
            }`}>
              {branch.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-800'}`}>{branch.label}</p>
              <p className={`text-xs mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{branch.desc}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                <MapPin className="w-3 h-3" />
                <span>{branch.phone}</span>
              </div>
            </div>
            {isSelected && (
              <motion.div
                layoutId="branch-check"
                className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
