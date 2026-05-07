import { Link } from 'react-router-dom';
import { Waves, Facebook, Instagram, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0a1f4e 0%, #0c2d6b 50%, #0f3880 100%)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-md">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-xl tracking-wide">
                BLUE <span className="text-cyan-300">PHYSIO</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Aquatic rehabilitation excellence. Healing through water, guided by certified international specialists.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/1gRsufGfaD/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/blue_physio_hydrotherapy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@bluephysio.hydrot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {['Home', 'Our Mission', 'Services', 'Our Team', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-').replace("our-", "")}`}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/booking" className="text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-colors duration-200">
                  Book Appointment →
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Orthopedics', 'Neurology', 'Geriatric Care', 'Sports Injuries', 'Pediatric Therapy', 'Aquatic Therapy'].map((s) => (
                <li key={s}>
                  <span className="text-white/60 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <div>
                  <div>Madinaty: +20 151 528 6215</div>
                  <div className="mt-1">Gardenia: +20 114 476 4712</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>Madinaty & Nasr City, Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2025 Blue Physio Clinic. All rights reserved.</p>
          <p className="text-white/30 text-xs">Certified by IATF Switzerland</p>
        </div>
      </div>
    </footer>
  );
}
