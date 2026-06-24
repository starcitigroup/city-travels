import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Briefcase, Compass, Globe, Ship, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import service4 from '../assets/service-4.jpg';
import service5 from '../assets/service-5.jpg';
import service6 from '../assets/service-6.jpg';

const packages = [
  {
    title: 'Tour Packages',
    description: 'Tailor-made domestic tour packages for families and groups across India.',
    icon: <Globe size={28} />,
    image: service1,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'City Tour',
    description: 'Explore the heart of Thiruvananthapuram and Kochi with our guided heritage city tours.',
    icon: <MapPin size={28} />,
    image: service2,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Day Trips',
    description: 'Quick one-day escapes to scenic hill stations and nearby attractions.',
    icon: <Compass size={28} />,
    image: service3,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Corporate Travel',
    description: 'Bespoke travel solutions for business meetings, conferences, and employee offsites.',
    icon: <Briefcase size={28} />,
    image: service4,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Houseboat Cruise',
    description: 'Experience the tranquil beauty of Kerala backwaters in our luxury houseboats.',
    icon: <Ship size={28} />,
    image: service5,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Luxury Cars & Buses',
    description: 'Premium fleet of cars and buses for comfortable local and outstation travel.',
    icon: <Car size={28} />,
    image: service6,
    color: 'bg-rose-50 text-rose-600',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section 
      id="services" 
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
          >
            Premium Travel <span className="text-primary">Experiences</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            From luxury cruises to corporate travel, we provide end-to-end travel solutions tailored to your unique requirements.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute top-4 left-4 p-3 rounded-2xl ${pkg.color} backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                  {pkg.icon}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors tracking-tight">{pkg.title}</h3>
                <p className="text-gray-500 mb-8 flex-grow leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">{pkg.description}</p>
                
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="w-full"
                >
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 text-dark group-hover:bg-primary group-hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 border border-gray-100 group-hover:border-primary shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20"
                  >
                    Request Quote
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;