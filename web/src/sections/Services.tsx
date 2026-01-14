import { MapPin, Briefcase, Compass, Globe, Ship, Car } from 'lucide-react';
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
    icon: <Globe size={40} className="text-secondary" />,
    image: service1,
  },
  {
    title: 'City Tour',
    description: 'Explore the heart of Thiruvananthapuram and Kochi with our guided heritage city tours.',
    icon: <MapPin size={40} className="text-secondary" />,
    image: service2,
  },
  {
    title: 'Day Trips',
    description: 'Quick one-day escapes to scenic hill stations and nearby attractions.',
    icon: <Compass size={40} className="text-secondary" />,
    image: service3,
  },
  {
    title: 'Corporate Travel',
    description: 'Bespoke travel solutions for business meetings, conferences, and employee offsites.',
    icon: <Briefcase size={40} className="text-secondary" />,
    image: service4,
  },
  {
    title: 'Houseboat Cruise',
    description: 'Experience the tranquil beauty of Kerala backwaters in our luxury houseboats.',
    icon: <Ship size={40} className="text-secondary" />,
    image: service5,
  },
  {
    title: 'Luxury Cars & Buses',
    description: 'Premium fleet of cars and buses for comfortable local and outstation travel.',
    icon: <Car size={40} className="text-secondary" />,
    image: service6,
  },
];

const Services = () => {
  return (
    <section 
      id="packages" 
      className="py-20 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(248, 249, FA, 0.95), rgba(248, 249, FA, 0.95)), url("https://www.transparenttextures.com/patterns/world-map.png")',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Premium Services</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            From luxury cruises to corporate travel, we provide end-to-end travel solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      </div>
    </section>
  );
};

export default Services;