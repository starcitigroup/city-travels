import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const DEFAULT_AVATAR = '/testimonials/profile/default-avatar.png';
const TRIP_PLACEHOLDER = '/testimonials/trips/placeholder-trip.jpg';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  location: string;
  image?: string;
  trip_image?: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching testimonials:', message);
        setError('Failed to load testimonials.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (totalSlides > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = activeIndex * itemsPerPage;
  const currentItems = testimonials.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"
          />
          <p className="text-gray-500 font-medium">Loading traveler stories...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
          >
            What Our <span className="text-primary">Travelers Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium opacity-80"
          >
            Real stories from our happy customers who have explored India with us.
          </motion.p>
        </div>

        {error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-3xl border border-red-100">{error}</div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[550px]">
              <AnimatePresence mode="wait">
                {currentItems.map((testimonial, idx) => (
                  <motion.div 
                    key={`${testimonial.id}-${activeIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 group"
                  >
                    {/* Trip Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={testimonial.trip_image || TRIP_PLACEHOLDER} 
                        alt="Trip Memory"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-5 left-8">
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute top-5 right-8 p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white"
                      >
                        <Quote size={24} fill="currentColor" />
                      </motion.div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow relative">
                      <p className="text-gray-600 mb-10 italic leading-relaxed text-lg flex-grow font-medium opacity-90">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-5 pt-8 border-t border-gray-50 mt-auto">
                        <div className="relative">
                          <img 
                            src={testimonial.image || DEFAULT_AVATAR} 
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-primary/5 shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-lg leading-tight tracking-tight">{testimonial.name}</h4>
                          <p className="text-[11px] text-primary font-bold uppercase tracking-widest mt-1.5 opacity-80">{testimonial.role}</p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-1 font-bold">
                            <MapPin size={12} className="text-secondary" />
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Controls */}
            {totalSlides > 1 && (
              <div className="flex justify-center items-center gap-8 mt-16">
                <motion.button 
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-5 rounded-2xl bg-white text-dark shadow-lg hover:bg-primary hover:text-white transition-all focus:outline-none border border-gray-100 group"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                
                <div className="flex gap-3">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        activeIndex === idx ? 'bg-primary w-10' : 'bg-gray-200 w-2.5 hover:bg-primary/30'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-5 rounded-2xl bg-white text-dark shadow-lg hover:bg-primary hover:text-white transition-all focus:outline-none border border-gray-100 group"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
