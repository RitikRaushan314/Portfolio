import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import DataBackground from './components/DataBackground';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <>
      <DataBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Achievements />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
