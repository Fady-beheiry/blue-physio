import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WaveDivider from '../WaveDivider';

export default function HeroSection() {
  const scrollToMission = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero">
      {/* Animated floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.9) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(99,210,255,0.7) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.25, 1], y: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(186,230,253,1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Animated wave lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute bottom-0 left-0 w-[200%]" viewBox="0 0 2880 200" preserveAspectRatio="none">
          <motion.path
            d="M0,100 C360,160 720,40 1080,100 C1440,160 1800,40 2160,100 C2520,160 2700,60 2880,100 L2880,200 L0,200 Z"
            fill="rgba(255,255,255,0.4)"
            animate={{ x: [0, -1440] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
        <svg className="absolute bottom-8 left-0 w-[200%]" viewBox="0 0 2880 200" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C360,140 720,20 1080,80 C1440,140 1800,20 2160,80 C2520,140 2700,40 2880,80 L2880,200 L0,200 Z"
            fill="rgba(255,255,255,0.2)"
            animate={{ x: [-1440, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-200 text-sm font-medium mb-8 border border-cyan-400/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Aquatic Rehabilitation Excellence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Blue Physio
          <br />
          <span className="text-cyan-300">Clinic</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 drop-shadow"
        >
          Experience the healing power of aquatic rehabilitation with specialized therapy
          programs designed for pain-free recovery and movement restoration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            to="/booking"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base"
          >
            Book an Appointment
          </Link>
          <button
            onClick={scrollToMission}
            className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/70 transition-all duration-300 text-base backdrop-blur-sm"
          >
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToMission}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/50 hover:text-white/80 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider fillColor="#f0f7ff" />
      </div>
    </section>
  );
}
