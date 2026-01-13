import { MapPin, Briefcase, Compass } from 'lucide-react';
import { Link } from 'react-scroll';
import companyData from '../data/companyData.json';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import worldMap from '../assets/world-map.png';

const packages = [
  {
    title: 'Day Trips',
    description: 'Quick and refreshing getaways to scenic spots perfect for a single-day adventure.',
    icon: <Compass size={40} className="text-secondary" />,
    image: service1,
  },
  {
    title: 'City Tours',
    description: 'Explore the local heritage, culture, and landmarks with our guided city experiences.',
    icon: <MapPin size={40} className="text-secondary" />,
    image: service2,
  },
  {
    title: 'Corporate Tours',
    description: 'Professional arrangements for team building, offsites, and business travel.',
    icon: <Briefcase size={40} className="text-secondary" />,
    image: service3,
  },
];

const Services = () => {
  return (
    <section 
      id="packages" 
      className="py-20 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 249, 250, 0.95), rgba(248, 249, 250, 0.95)), url(${worldMap})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Premium Packages</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Whether you're looking for relaxation, adventure, or romance, we have the perfect itinerary for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  loading="lazy"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {pkg.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark">{pkg.title}</h3>
                </div>
                <p className="text-gray-700 mb-6 flex-grow leading-relaxed">{pkg.description}</p>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors cursor-pointer shadow-md"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4 font-semibold uppercase tracking-wider text-sm">Popular Destinations</p>
          <div className="flex flex-wrap justify-center gap-3">
            {companyData.destinations.map((city) => (
              <span key={city} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-700 flex items-center gap-2 shadow-sm font-medium">
                <MapPin size={16} className="text-secondary" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;