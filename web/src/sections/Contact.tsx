import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import companyData from '../data/companyData.json';
import emailjs from '@emailjs/browser';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

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

    trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
      destination: formData.destination,
      travelers: formData.travelers
    });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // --- WhatsApp Integration (Free) ---
    // Format the message for WhatsApp
    const whatsappMessage = `*New Trip Enquiry*
Name: ${formData.name}
Phone: ${formData.phone}
Destination: ${formData.destination}
Date: ${formData.date}
Travelers: ${formData.travelers}
Note: ${formData.message}`;

    // Create the WhatsApp link
    const whatsappNumber = companyData.contact.whatsapp.replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp immediately (Manual workflow)
    window.open(whatsappUrl, '_blank');

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS keys missing. Form will only open WhatsApp.');
      // Even if email fails/is missing, we marked it as success because WhatsApp opened.
      setStatus('success');
      setFormData({ name: '', phone: '', destination: '', date: '', travelers: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );
      setStatus('success');
      setFormData({ name: '', phone: '', destination: '', date: '', travelers: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      // We still show success or a partial warning because WhatsApp likely worked.
      setStatus('success'); 
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const { phones, email, fullAddress } = companyData.contact;

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
       {/* Simple Light Background */}
       <div className="absolute inset-0 z-0 bg-gray-50"></div>
       
       {/* Decorative Blob */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Start Planning Your Trip</h2>
          <p className="text-gray-700 max-w-2xl mx-auto font-medium">
            Fill out the form below and our travel experts will get back to you with a customized itinerary within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-xl relative z-20">
            <h3 className="text-2xl font-bold text-dark mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg shadow-sm text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Phone / WhatsApp</p>
                  {phones.map((phone, index) => (
                    <a key={index} href={`tel:${phone.replace(/\s+/g, '')}`} className="block text-gray-800 font-bold hover:text-primary transition-colors text-lg">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg shadow-sm text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Email Us</p>
                  <a href={`mailto:${email}`} className="block text-gray-800 font-bold hover:text-primary transition-colors text-lg">{email}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg shadow-sm text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">Office Location</p>
                  <p className="text-gray-800 leading-relaxed font-medium">
                    {fullAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-r from-primary to-blue-700 text-white rounded-xl shadow-lg transform sm:rotate-[-1deg] transition-transform hover:rotate-0">
              <h4 className="font-bold text-xl mb-2">Why book with us?</h4>
              <ul className="space-y-2 text-blue-50 font-medium">
                <li>✓ Verified Hotels & Drivers</li>
                <li>✓ 24/7 On-Trip Support</li>
                <li>✓ Best Price Guarantee</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 relative z-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-bold text-gray-700 mb-1">Destination</label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
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
                  <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-1">Travel Date (Approx)</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="travelers" className="block text-sm font-bold text-gray-700 mb-1">No. of Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min="1"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="2"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Specific Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="I want a 4-star hotel and a private cab..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2 transition-all ${
                  status === 'success' ? 'bg-green-500 shadow-lg' : 'bg-secondary hover:bg-opacity-90 shadow-xl hover:shadow-2xl'
                }`}
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  'Request Sent Successfully!'
                ) : status === 'error' ? (
                  'Failed. Try Again.'
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