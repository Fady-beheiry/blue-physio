import { Phone, Clock, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import WaveDivider from '../WaveDivider';

const locations = [
  {
    name: 'Madinaty Sports Club',
    description: 'Inside the Indoor Pool (Members Only)',
    mapUrl: 'https://maps.app.goo.gl/rgKTKCm6Loq5FGcd8',
    icon: '🏊',
  },
  {
    name: 'Madinaty British School',
    description: 'Professional therapy in educational setting',
    mapUrl: 'https://maps.app.goo.gl/DU1WWAagFYZyHMQp8',
    icon: '🏫',
  },
  {
    name: 'Gardenia Branch',
    description: 'Tolip Gardens Hotel, Nasr City',
    mapUrl: 'https://maps.app.goo.gl/ah64DqiXPQS2mGHD9',
    icon: '🌸',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #e0f7fa 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 bg-blue-300 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 bg-cyan-300 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-blue-700 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Get in Touch
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Visit <span className="text-gradient-blue">Us</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Three convenient locations across Cairo, ready to serve your recovery needs.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="glass-card rounded-3xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Madinaty Branches</p>
                    <a href="tel:+201515286215" className="text-blue-600 hover:text-blue-700 font-medium">+20 151 528 6215</a>
                    <div className="mt-2">
                      <a
                        href="https://wa.me/201515286215?text=Hello%20Blue%20Physio%20Madinaty%2C%20I%20would%20like%20to%20book%20an%20appointment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Gardenia Branch</p>
                    <a href="tel:+201144764712" className="text-blue-600 hover:text-blue-700 font-medium">+20 114 476 4712</a>
                    <div className="mt-2">
                      <a
                        href="https://wa.me/201144764712?text=Hello%20Blue%20Physio%20Gardenia%2C%20I%20would%20like%20to%20book%20an%20appointment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-2">Business Hours</p>
                    <div className="space-y-1 text-sm text-slate-600">
                      <div className="flex justify-between gap-8">
                        <span>Saturday – Thursday</span>
                        <span className="font-medium">9:00 AM – 9:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Friday</span>
                        <span className="font-medium">10:00 AM – 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="font-semibold text-slate-700 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/share/1gRsufGfaD/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors hover:scale-110 duration-200"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/blue_physio_hydrotherapy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors hover:scale-110 duration-200"
                      style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@bluephysio.hydrot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-slate-700 transition-colors hover:scale-110 duration-200"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Location Cards */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div
                  key={loc.name}
                  className="glass-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{loc.icon}</div>
                      <div>
                        <h4 className="font-serif font-semibold text-slate-800 text-lg mb-1">{loc.name}</h4>
                        <p className="text-slate-500 text-sm">{loc.description}</p>
                      </div>
                    </div>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 group-hover:shadow-md"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      View Map
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <WaveDivider fillColor="#0c2d6b" />
    </section>
  );
}
