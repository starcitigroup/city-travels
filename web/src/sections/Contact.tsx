import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
// import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    date: '',
    travelers: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call for MVP - User needs to add EmailJS credentials
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', destination: '', date: '', travelers: '', message: '' });
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Start Planning Your Trip</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and our travel experts will get back to you with a customized itinerary within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Side */}
          <div className="bg-blue-50 p-6 sm:p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-dark mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Phone / WhatsApp</p>
                  <a href="tel:+919876543210" className="block text-gray-800 font-medium hover:text-primary transition-colors">+91 98765 43210</a>
                  <a href="tel:+919876543211" className="block text-gray-800 font-medium hover:text-primary transition-colors">+91 98765 43211</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Email Us</p>
                  <a href="mailto:bookings@citytravels.com" className="block text-gray-800 font-medium hover:text-primary transition-colors">bookings@citytravels.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Office Location</p>
                  <p className="text-gray-700 leading-relaxed">
                    City Travels HQ<br />
                    123, Travel Lane, Near Main Market<br />
                    New Delhi, India 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-white rounded-xl border-l-4 border-secondary shadow-md">
              <h4 className="font-bold text-lg mb-2 text-dark">Why book with us?</h4>
              <ul className="space-y-2 text-gray-700 text-sm font-medium">
                <li>✓ Verified Hotels & Drivers</li>
                <li>✓ 24/7 On-Trip Support</li>
                <li>✓ Best Price Guarantee</li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Destination</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Himachal">Himachal Pradesh</option>
                    <option value="Goa">Goa</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Travel Date (Approx)</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">No. of Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min="1"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="2"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="I want a 4-star hotel and a private cab..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2 transition-all ${
                  status === 'success' ? 'bg-green-500' : 'bg-primary hover:bg-opacity-90 shadow-lg hover:shadow-xl'
                }`}
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  'Request Sent Successfully!'
                ) : (
                  <>
                    Send Enquiry <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
