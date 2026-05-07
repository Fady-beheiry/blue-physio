import { motion } from 'framer-motion';

const SERVICES = [
  { label: 'Orthopedics', icon: '🦴', desc: 'Joint & musculoskeletal rehab' },
  { label: 'Neurology', icon: '🧠', desc: 'Stroke, Parkinson\'s & MS therapy' },
  { label: 'Geriatric Care', icon: '👵', desc: 'Mobility & independence programs' },
  { label: 'Sports Injuries', icon: '🏃', desc: 'Accelerated athlete recovery' },
  { label: 'Pediatric Therapy', icon: '👶', desc: 'Child developmental therapy' },
  { label: 'Aquatic Therapy', icon: '💧', desc: 'IATF Switzerland certified' },
];

interface ServiceSelectorProps {
  selected: string;
  onSelect: (s: string) => void;
}

export default function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {SERVICES.map((svc, i) => {
        const isSelected = selected === svc.label;
        return (
          <motion.button
            key={svc.label}
            type="button"
            onClick={() => onSelect(svc.label)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200
              ${isSelected
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent text-white shadow-lg shadow-blue-200'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            <span className="text-2xl flex-shrink-0">{svc.icon}</span>
            <div>
              <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-800'}`}>{svc.label}</p>
              <p className={`text-xs mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{svc.desc}</p>
            </div>
            {isSelected && (
              <motion.div
                layoutId="service-check"
                className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
