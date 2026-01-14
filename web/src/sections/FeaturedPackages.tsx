import { FileDown, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import companyData from '../data/companyData.json';

const FeaturedPackages = () => {
  return (
    <section id="brochures" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Popular Itineraries</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Explore our most requested pre-planned packages. Download the brochure to see the full day-wise itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {companyData.brochures.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden">
              
              {/* Image Section acting as "Brochure Cover" */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center text-white/90 text-sm gap-2">
                    <Clock size={16} className="text-secondary" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide text-xs">Trip Highlights</h4>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div className="pt-6 border-t border-gray-100">
                  {item.price && (
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-xs text-gray-500 font-medium uppercase">Starting from</span>
                        <p className="text-xl font-bold text-primary">{item.price}<span className="text-xs text-gray-400 font-normal">/person</span></p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3">
                    <a 
                      href={`https://wa.me/${companyData.contact.whatsapp.replace('+', '')}?text=Hi, I am interested in the ${item.title} package. Please provide more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <MessageCircle size={18} />
                      Book Now
                    </a>
                    <a 
                      href={item.file}
                      download
                      className="w-full bg-white text-dark border border-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FileDown size={18} />
                      Download Brochure
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
