import { ShieldCheck, Clock, Award, Headphones } from 'lucide-react';

const features = [
  {
    title: 'Verified Hotels & Drivers',
    description: 'We personally vet every hotel and driver to ensure your safety and comfort.',
    icon: <ShieldCheck size={40} className="text-secondary" />,
  },
  {
    title: '24/7 On-Trip Support',
    description: 'Our team is always just a phone call away, anytime during your journey.',
    icon: <Headphones size={40} className="text-secondary" />,
  },
  {
    title: 'Best Price Guarantee',
    description: 'We negotiate directly with vendors to give you the best rates without hidden costs.',
    icon: <Award size={40} className="text-secondary" />,
  },
  {
    title: 'Personalized Itineraries',
    description: 'No cookie-cutter plans. We craft every trip based on your preferences.',
    icon: <Clock size={40} className="text-secondary" />,
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="relative py-20 text-white overflow-hidden">
       {/* CSS Gradient Background */}
       <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, #006994, #004d6e)', // Ocean Blue Gradient
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose City Travels?</h2>
          <p className="text-blue-50 max-w-2xl mx-auto text-lg opacity-90">
            We don't just book tickets; we design experiences. Here is why thousands of travelers trust us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center group hover:bg-white/20 transition-all duration-300 shadow-lg">
              <div className="mb-6 inline-block p-4 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-blue-50 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;