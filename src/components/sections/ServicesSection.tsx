import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import WaveDivider from '../WaveDivider';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const services = [
  {
    icon: '🦴',
    title: 'Orthopedics',
    description:
      'Rehabilitation for joint replacements, fractures, and musculoskeletal conditions using water\'s buoyancy to reduce stress on joints.',
    gradient: 'from-blue-50 to-indigo-50',
    border: 'hover:border-blue-300',
    glow: 'hover:shadow-blue-100',
  },
  {
    icon: '🧠',
    title: 'Neurology',
    description:
      'Therapy for stroke, Parkinson\'s, MS, and other neurological conditions to improve balance, coordination, and mobility.',
    gradient: 'from-purple-50 to-blue-50',
    border: 'hover:border-purple-300',
    glow: 'hover:shadow-purple-100',
  },
  {
    icon: '👵',
    title: 'Geriatric Care',
    description:
      'Specialized programs for older adults to maintain mobility, strength, and independence while minimizing fall risk.',
    gradient: 'from-teal-50 to-cyan-50',
    border: 'hover:border-teal-300',
    glow: 'hover:shadow-teal-100',
  },
  {
    icon: '🏃',
    title: 'Sports Injuries',
    description:
      'Accelerated recovery for athletes with water-based exercises that allow early mobilization without impact.',
    gradient: 'from-emerald-50 to-teal-50',
    border: 'hover:border-emerald-300',
    glow: 'hover:shadow-emerald-100',
  },
  {
    icon: '👶',
    title: 'Pediatric Therapy',
    description:
      'Fun and engaging aquatic therapy for children with developmental delays, cerebral palsy, and other conditions.',
    gradient: 'from-sky-50 to-blue-50',
    border: 'hover:border-sky-300',
    glow: 'hover:shadow-sky-100',
  },
  {
    icon: '💧',
    title: 'Aquatic Therapy',
    description:
      'Certified aquatic therapy programs following IATF Switzerland standards for optimal rehabilitation outcomes.',
    gradient: 'from-cyan-50 to-sky-50',
    border: 'hover:border-cyan-300',
    glow: 'hover:shadow-cyan-100',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative bg-gradient-to-br ${service.gradient} rounded-2xl p-8 border border-slate-100 ${service.border} ${service.glow} hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-default`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/60 to-transparent" />

      <div className="relative z-10">
        <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400 to-cyan-400" />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-blue-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 bg-teal-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            What We Offer
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our <span className="text-gradient-blue">Services</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Comprehensive aquatic rehabilitation programs tailored to your unique recovery needs.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>

      <WaveDivider fillColor="#eff6ff" />
    </section>
  );
}
