import { Quote, Star } from 'lucide-react';
import companyData from '../data/companyData.json';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real stories from our happy customers who have explored with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyData.testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative border-t-4 border-secondary"
            >
              <Quote 
                size={40} 
                className="text-blue-100 absolute top-6 right-6" 
              />
              
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <h4 className="font-bold text-dark text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-secondary font-medium">{testimonial.role}</p>
                  <p className="text-xs text-gray-400 mt-1">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
