import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import companyData from '../data/companyData.json';

const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

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
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real stories from our happy customers who have explored with us.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[420px]">
            {currentItems.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed text-sm flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-auto">
                  <img 
                    src={testimonial.image || DEFAULT_AVATAR} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-dark text-sm leading-tight">{testimonial.name}</h4>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wide">{testimonial.role}</p>
                    <p className="text-[10px] text-gray-400">{testimonial.location}</p>
                  </div>
                  <Quote 
                    size={24} 
                    className="text-gray-200 ml-auto transform rotate-180" 
                  />
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
