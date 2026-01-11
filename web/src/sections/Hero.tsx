import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center bg-primary">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-sans">
          Experience the Best of India with <span className="text-secondary">City Travels</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-body">
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
