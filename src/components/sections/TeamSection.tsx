import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import WaveDivider from '../WaveDivider';
import { Award } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const doctors = [
  {
    name: 'Dr. Dalia El Sherif',
    title: 'Physiotherapist',
    photo: 'https://i.ibb.co/7Mnr9x3/dalia.jpg',
    qualifications: [
      'Certified Aquatic Therapist from IATF Switzerland',
      'Certified Manual Therapist from Winston Salem, USA',
    ],
    delay: 0,
  },
  {
    name: 'Dr. Nouran El Sherif',
    title: 'Physiotherapist',
    photo: 'https://i.ibb.co/0Rz5dQh1/nouran.jpg',
    qualifications: [
      'Certified Aquatic Therapist from IATF Switzerland',
    ],
    delay: 0.15,
  },
];

function DoctorCard({ doctor }: { doctor: typeof doctors[0] }) {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: doctor.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className="glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/70">
        <div className="relative overflow-hidden h-80 md:h-96">
          <img
            src={doctor.photo}
            alt={doctor.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1a56b8&color=fff&size=400`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h3 className="font-serif text-2xl font-bold text-white">{doctor.name}</h3>
            <p className="text-cyan-300 font-medium text-sm mt-1">{doctor.title}</p>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Certifications</span>
          </div>
          <ul className="space-y-3">
            {doctor.qualifications.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="text-slate-600 text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 50%, #f0fdf4 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30 bg-blue-200 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-25 bg-teal-200 blur-3xl animate-float-delay" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-700 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Meet the Specialists
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our <span className="text-gradient-blue">Team</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            International-certified physiotherapists dedicated to your recovery and wellness.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>
      </div>

      <WaveDivider fillColor="#e0f2fe" />
    </section>
  );
}
