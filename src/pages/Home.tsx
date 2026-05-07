import HeroSection from '../components/sections/HeroSection';
import MissionSection from '../components/sections/MissionSection';
import ServicesSection from '../components/sections/ServicesSection';
import TeamSection from '../components/sections/TeamSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
