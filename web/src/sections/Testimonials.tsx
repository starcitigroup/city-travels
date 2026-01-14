import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import companyData from '../data/companyData.json';

const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const TRIP_PLACEHOLDER = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

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

  const totalSlides = Math.ceil(companyData.testimonials.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = activeIndex * itemsPerPage;
  const currentItems = companyData.testimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="testimonials" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real stories from our happy customers who have explored with us.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[550px]">
            {currentItems.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 group"
              >
                {/* Trip Image - Always present for consistency */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={testimonial.tripImage || TRIP_PLACEHOLDER} 
                    alt="Trip Memory"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-6">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  {/* Subtle Quote Icon Overlay */}
                  <Quote size={40} className="absolute top-4 right-4 text-white/20" fill="currentColor" />
                </div>

                <div className="p-8 flex flex-col flex-grow relative">
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-base flex-grow">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                    <div className="relative">
                      <img 
                        src={testimonial.image || DEFAULT_AVATAR} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-50 shadow-sm"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm leading-tight">{testimonial.name}</h4>
                      <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">{testimonial.role}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white text-dark shadow-md hover:bg-primary hover:text-white transition-all focus:outline-none border border-gray-100"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'bg-secondary w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white text-dark shadow-md hover:bg-primary hover:text-white transition-all focus:outline-none border border-gray-100"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
