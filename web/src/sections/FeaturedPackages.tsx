import { useState, useEffect } from 'react';
import { FileDown, Clock, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const section = document.getElementById('brochures');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading amazing packages...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Popular Itineraries</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our most requested pre-planned packages. Download the brochure for the full itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPackages.map((item) => (
            <div key={item.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
              
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm flex items-center gap-1">
                  <Clock size={14} className="text-secondary" />
                  {item.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                
                {/* Highlights as Tags */}
                <div className="mb-6 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.slice(0, 4).map((highlight, idx) => (
                      <span key={idx} className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  {item.price && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Starting from</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">{item.price}</span>
                        <span className="text-sm text-gray-400">/person</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={`https://wa.me/${companyData.contact.whatsapp.replace('+', '')}?text=Hi, I am interested in the ${item.title} package. Please provide more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, { package_title: item.title, location: 'package_card' })}
                      className="flex items-center justify-center gap-2 bg-secondary text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm shadow-sm"
                    >
                      <MessageCircle size={18} />
                      Book Now
                    </a>
                    {item.file ? (
                      <a 
                        href={item.file}
                        download
                        onClick={() => trackEvent(ANALYTICS_EVENTS.BROCHURE_DOWNLOAD, { package_title: item.title })}
                        className="flex items-center justify-center gap-2 bg-white text-dark border border-gray-300 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm"
                      >
                        <FileDown size={18} />
                        Brochure
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 bg-gray-100 text-gray-400 border border-gray-200 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed">
                        <FileDown size={18} />
                        Brochure
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border ${
                currentPage === 1 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-600 hover:bg-white hover:shadow-md hover:text-primary'
              } transition-all`}
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-sm font-medium text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border ${
                currentPage === totalPages 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-600 hover:bg-white hover:shadow-md hover:text-primary'
              } transition-all`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPackages;
