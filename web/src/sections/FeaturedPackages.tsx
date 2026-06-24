import { useState, useEffect } from 'react';
import { FileDown, Clock, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companyData from '../data/companyData.json';
import { supabase } from '../lib/supabase';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

const ITEMS_PER_PAGE = 3;

interface Brochure {
  id: number;
  title: string;
  duration: string;
  highlights: string[];
  image: string;
  file?: string;
  price?: string;
}

const FeaturedPackages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('brochures')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setBrochures(data || []);
      } catch (err: any) {
        console.error('Error fetching brochures:', err.message);
        setError('Failed to load packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  const totalPages = Math.ceil(brochures.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPackages = brochures.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById('packages');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="packages" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"
          />
          <p className="text-gray-500 font-medium">Curating your next adventure...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-red-50 text-red-500 mb-4">
            <Clock size={32} />
          </div>
          <p className="text-red-500 font-bold text-xl mb-2">Oops!</p>
          <p className="text-gray-500 font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-24 bg-gray-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
          >
            Popular <span className="text-secondary">Itineraries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Explore our most requested pre-planned packages. Download the brochure for the full itinerary details.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          <AnimatePresence mode="wait">
            {currentPackages.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col overflow-hidden border border-gray-100"
              >
                {/* Card Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-xs font-bold text-dark shadow-lg flex items-center gap-2">
                    <Clock size={14} className="text-secondary" />
                    {item.duration}
                  </div>
                  
                  {item.price && (
                    <div className="absolute bottom-5 left-5 z-20 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Starting From</p>
                      <p className="text-2xl font-bold">{item.price}</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-dark mb-5 group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                  
                  {/* Highlights as Tags */}
                  <div className="mb-8 flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.slice(0, 4).map((highlight, idx) => (
                        <span key={idx} className="inline-flex items-center text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-50 mt-auto flex flex-col gap-3">
                    <motion.a 
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/${companyData.contact.whatsapp.replace('+', '')}?text=Hi, I am interested in the ${item.title} package. Please provide more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, { package_title: item.title, location: 'package_card' })}
                      className="flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-2xl font-bold hover:bg-secondary-dark transition-all text-sm shadow-lg shadow-secondary/20"
                    >
                      <MessageCircle size={18} />
                      Book Package
                    </motion.a>
                    
                    {item.file ? (
                      <motion.a 
                        whileTap={{ scale: 0.98 }}
                        href={item.file}
                        download
                        onClick={() => trackEvent(ANALYTICS_EVENTS.BROCHURE_DOWNLOAD, { package_title: item.title })}
                        className="flex items-center justify-center gap-2 bg-white text-dark border border-gray-200 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all text-sm"
                      >
                        <FileDown size={18} />
                        Download Brochure
                      </motion.a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 bg-gray-50 text-gray-300 border border-gray-100 py-4 rounded-2xl font-bold text-sm cursor-not-allowed">
                        <FileDown size={18} />
                        Brochure Unavailable
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-4 rounded-2xl border-2 transition-all ${
                currentPage === 1 
                  ? 'border-gray-100 text-gray-200 cursor-not-allowed' 
                  : 'border-white bg-white text-dark shadow-md hover:text-primary hover:border-primary'
              }`}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Page <span className="text-dark">{currentPage}</span> of {totalPages}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-4 rounded-2xl border-2 transition-all ${
                currentPage === totalPages 
                  ? 'border-gray-100 text-gray-200 cursor-not-allowed' 
                  : 'border-white bg-white text-dark shadow-md hover:text-primary hover:border-primary'
              }`}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPackages;
