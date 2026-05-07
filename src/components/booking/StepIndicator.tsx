import { motion } from 'framer-motion';

interface Step {
  number: number;
  label: string;
  icon: string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Service', icon: '🩺' },
  { number: 2, label: 'Branch', icon: '📍' },
  { number: 3, label: 'Date & Time', icon: '📅' },
  { number: 4, label: 'Your Info', icon: '👤' },
  { number: 5, label: 'Confirm', icon: '✓' },
];

interface StepIndicatorProps {
  current: number;
  onStepClick: (step: number) => void;
  maxReached: number;
}

export default function StepIndicator({ current, onStepClick, maxReached }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, i) => {
        const isComplete = step.number < current;
        const isActive = step.number === current;
        const isClickable = step.number <= maxReached;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(step.number)}
              disabled={!isClickable}
              className="flex flex-col items-center gap-1 group disabled:cursor-not-allowed"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isComplete
                    ? '#10b981'
                    : isActive
                    ? '#3b82f6'
                    : '#e2e8f0',
                }}
                transition={{ duration: 0.3 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-shadow duration-300 ${
                  isActive ? 'shadow-blue-200 shadow-md' : ''
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className={isActive || isComplete ? 'text-white' : 'text-slate-400'}>
                    {step.number}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] font-semibold hidden sm:block ${
                isActive ? 'text-blue-600' : isComplete ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </button>

            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-slate-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
