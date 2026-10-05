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
import { getPublishedContent } from '@/lib/portfolio-data';

export default async function Home() {
  const published = await getPublishedContent();
  const byKind = (kind) => published.length ? published.filter((item) => item.kind === kind && item.visible).map((item) => ({ ...item.data, title: item.title, id: item.key, slug: item.key, order: item.order })) : null;
  const profile = (byKind('profile') || [])[0];
  const techStack = (byKind('techstack') || [])[0] || null;
  const competencies = byKind('competencies');
  const sectionSettings = published.filter((item) => item.kind === 'sections');
  const defaultSections = ['about', 'services', 'experience', 'work', 'certificates', 'contact'];
  const sections = (sectionSettings.length ? sectionSettings : defaultSections.map((key, order) => ({ key, visible: true, order }))).filter((section) => section.visible).sort((a, b) => a.order - b.order);
  const sectionsWithoutLocation = sections.filter((section) => section.key !== 'location');
  const contactIndex = sectionsWithoutLocation.findIndex((section) => section.key === 'contact');
  const availabilityIndex = contactIndex < 0 ? sectionsWithoutLocation.length : contactIndex;
  const pageSections = [
    ...sectionsWithoutLocation.slice(0, availabilityIndex),
    { key: 'location' },
    ...sectionsWithoutLocation.slice(availabilityIndex),
  ];
  const sectionComponents = {
    about: <About profile={profile} skills={byKind('skills')} techStack={techStack} competencies={competencies} />,
    services: <Services services={byKind('services')} />,
    experience: <Experience experiences={byKind('experience')} />,
    work: <Work projects={byKind('projects')} />,
    certificates: <Certificates certificates={byKind('certificates')} />,
    contact: <Contact />,
  };
  return (
    <>
      <Navbar />
      <PointerCursor />
      <main className="portfolio-shell">
        <div className="portfolio-content">
          <Header profile={profile} />
          {pageSections.map((section) => <div key={section.key}>{section.key === 'location' ? <GlobeSection /> : sectionComponents[section.key] || null}</div>)}
          <Footer />
        </div>
      </main>
    </>
  );
}
