import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#002d41]">
      {/* Generated SVG Background */}
      <img 
        src="/hero-bg.svg"
        alt="Background Pattern"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

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
            offset={-70}
            className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Planning
            <ArrowRight size={20} />
          </Link>
          <Link
            to="packages"
            smooth={true}
            duration={500}
            offset={-70}
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