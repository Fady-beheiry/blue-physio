import AnimatedSection from '../AnimatedSection';
import WaveDivider from '../WaveDivider';
import { WaveDividerTop } from '../WaveDivider';

export default function MissionSection() {
  return (
    <section id="mission" className="relative bg-[#f0f7ff] overflow-hidden">
      <WaveDividerTop fillColor="#f0f7ff" className="-mt-1" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 bg-gradient-to-br from-blue-300 to-cyan-200 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-15 bg-gradient-to-br from-teal-300 to-blue-200 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 bg-blue-300 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <AnimatedSection delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Our Philosophy
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="relative mb-8">
            <span className="absolute -left-4 md:-left-12 top-0 font-serif text-8xl md:text-9xl text-blue-200 leading-none select-none">"</span>
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight relative z-10 italic">
              Treatment without pain
              <span className="block text-gradient-blue not-italic"> in the pool.</span>
            </blockquote>
            <span className="absolute -right-4 md:-right-12 bottom-0 font-serif text-8xl md:text-9xl text-blue-200 leading-none select-none">"</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            We believe in harnessing the therapeutic properties of water to provide effective,
            gentle rehabilitation for all our patients. Certified by international standards,
            our aquatic therapy approach lets patients recover faster, with less pain and
            greater confidence.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '500+', label: 'Patients Treated', icon: '🩺' },
              { value: 'IATF', label: 'Switzerland Certified', icon: '🏆' },
              { value: '3', label: 'Clinic Locations', icon: '📍' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-serif text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <WaveDivider fillColor="#ffffff" />
    </section>
  );
}
