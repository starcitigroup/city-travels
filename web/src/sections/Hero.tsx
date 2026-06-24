import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '../assets/hero-1.jpg';
import hero2 from '../assets/hero-2.jpg';
import hero3 from '../assets/hero-3.jpg';
import hero4 from '../assets/hero-4.jpg';
import hero5 from '../assets/hero-5.jpg';
import hero6 from '../assets/hero-6.jpg';
import CustomizeTripModal from '../components/CustomizeTripModal';

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={heroImages[currentImage]}
            alt="Travel Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/30 text-secondary text-sm font-bold tracking-widest uppercase mb-6"
          >
            Your Journey Begins Here
          </motion.span>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-[1.1] font-sans tracking-tight">
            Discover India's <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">
              Hidden Treasures
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-body font-medium leading-relaxed opacity-90">
            Specializing in customized Day Trips, City Tours, and Corporate Getaways. 
            Experience luxury travel at prices that make sense.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-3 shadow-xl group"
            >
              Start Planning
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            </motion.button>
            
            <Link
              to="packages"
              smooth={true}
              duration={500}
              offset={-80}
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/90 backdrop-blur-sm text-dark px-10 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer shadow-xl flex items-center gap-2"
              >
                Browse Deals
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent"></div>
        </div>
      </motion.div>

      <CustomizeTripModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;