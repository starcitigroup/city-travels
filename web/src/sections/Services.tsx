import { MapPin, Users, Heart, Briefcase } from 'lucide-react';
import { Link } from 'react-scroll';

const packages = [
  {
    title: 'Family Vacations',
    description: 'Create unforgettable memories with our kid-friendly itineraries and comfortable stays.',
    icon: <Users size={40} className="text-secondary" />,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Honeymoon Specials',
    description: 'Romantic getaways in Kashmir, Kerala, and Himachal with candlelight dinners and private tours.',
    icon: <Heart size={40} className="text-secondary" />,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Group & Corporate',
    description: 'Seamless planning for large groups, educational tours, and corporate offsites.',
    icon: <Briefcase size={40} className="text-secondary" />,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600',
  },
];

const Services = () => {
  return (
    <section id="packages" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Premium Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you're looking for relaxation, adventure, or romance, we have the perfect itinerary for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
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
                <p className="text-gray-700 mb-6 flex-grow">{pkg.description}</p>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Destinations Pill List (Visual Flair) */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4 font-semibold uppercase tracking-wider text-sm">Popular Destinations</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Kashmir', 'Kerala', 'Himachal', 'Goa', 'Rajasthan', 'Uttarakhand'].map((city) => (
              <span key={city} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-700 flex items-center gap-2 shadow-sm">
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
