import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';
import Services from './sections/Services';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="font-body text-dark bg-white min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;