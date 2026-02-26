import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import ScrollytellingAbout from './components/sections/ScrollytellingAbout';
import Approach from './components/sections/Approach';
import RobotCarousel from './components/sections/RobotCarousel';
import Services from './components/sections/Services';
import WhyUs from './components/sections/WhyUs';
import Partnership from './components/sections/Partnership';
import SuccessStories from './components/sections/SuccessStories';
import TrustedBy from './components/sections/TrustedBy';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <ScrollytellingAbout />
      <Approach />
      <RobotCarousel />
      <Services />
      <WhyUs />
      <Partnership />
      <SuccessStories />
      <TrustedBy />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}
