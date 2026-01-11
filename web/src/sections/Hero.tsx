import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import hero1 from '../assets/hero-1.jpg';
import hero2 from '../assets/hero-2.jpg';
import hero3 from '../assets/hero-3.jpg';
import hero4 from '../assets/hero-4.jpg';

const heroImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#002d41]">
      {/* Background Carousel */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={img}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-sans drop-shadow-xl">
          Experience the Best of India with <span className="text-secondary">City Travels</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mb-10 max-w-3xl mx-auto font-body drop-shadow-lg">
          Customized travel packages designed for families, couples, and groups. 
          Let us craft your perfect getaway with 24/7 support and unbeatable prices.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-80}
            className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Planning
            <ArrowRight size={20} />
          </Link>
          <Link
            to="packages"
            smooth={true}
            duration={500}
            offset={-80}
            className="bg-white text-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;