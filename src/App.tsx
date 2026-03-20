import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import ScrollytellingAbout from './components/sections/ScrollytellingAbout';
import Approach from './components/sections/Approach';
import LivingDashboardCarousel from './components/sections/LivingDashboardCarousel';
import Services from './components/sections/Services';
import WhyUs from './components/sections/WhyUs';
import Partnership from './components/sections/Partnership';
import SuccessStories from './components/sections/SuccessStories';
import TrustedBy from './components/sections/TrustedBy.tsx';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Footer from './components/sections/Footer';
import FloatingContactCTA from './components/ui/FloatingContactCTA';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f172a]">
      <Navbar />
      <Hero />
      <Stats />
      <ScrollytellingAbout />
      <Approach />
      <LivingDashboardCarousel />
      <WhyUs />
      <Partnership />
      <SuccessStories />
      <TrustedBy />
      <Contact />
      <FAQ />
      <Footer />
      <FloatingContactCTA />
    </div>
  );
}
