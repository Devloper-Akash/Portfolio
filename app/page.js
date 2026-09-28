import Navbar from './Components/Navbar';
import Header from './Components/Header';
import About from './Components/About';
import Services from './Components/Services';
import Experience from './Components/Experience';
import Work from './Components/Work';
import Certificates from './Components/Certificates';
import GlobeSection from './Components/GlobeSection';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PointerCursor from './Components/PointerCursor';

export default function Home() {
  return (
    <main className="portfolio-shell">
      <div className="portfolio-content">
        <PointerCursor />
        <Navbar />
        <Header />
        <About />
        <Services />
        <Experience />
        <Work />
        <Certificates />
        <GlobeSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
