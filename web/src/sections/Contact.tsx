import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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

    const whatsappMessage = `*New Trip Enquiry*
Name: ${formData.name}
Phone: ${formData.phone}
Destination: ${formData.destination}
Date: ${formData.date}
Travelers: ${formData.travelers}
Note: ${formData.message}`;

    const whatsappNumber = companyData.contact.whatsapp.replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS keys missing. Form will only open WhatsApp.');
      setStatus('success');
      setFormData({ name: '', phone: '', destination: '', date: '', travelers: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setStatus('success');
      setFormData({ name: '', phone: '', destination: '', date: '', travelers: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('success'); 
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const { phones, email, fullAddress } = companyData.contact;

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-white">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
          >
            Start Your <span className="text-primary">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Fill out the form below and our travel experts will craft a personalized itinerary for you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-dark tracking-tight">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Phone / WhatsApp</p>
                    {phones.map((phone, index) => (
                      <a key={index} href={`tel:${phone.replace(/\s+/g, '')}`} className="block text-xl font-bold text-dark hover:text-primary transition-colors">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Email Us</p>
                    <a href={`mailto:${email}`} className="block text-xl font-bold text-dark hover:text-primary transition-colors">{email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Office Location</p>
                    <p className="text-lg font-bold text-dark leading-snug">
                      {fullAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-10 bg-gradient-to-br from-primary to-blue-800 text-white rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <h4 className="font-bold text-2xl mb-4 relative z-10">Premium Benefits</h4>
              <ul className="space-y-4 text-blue-100 font-bold relative z-10">
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs">✓</span> Verified Hotels & Drivers</li>
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs">✓</span> 24/7 On-Trip Support</li>
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs">✓</span> Best Price Guarantee</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-primary/5 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark"
                    placeholder="+91 98765..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Destination</label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark appearance-none"
                  >
                    <option value="">Select Location</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Himachal">Himachal Pradesh</option>
                    <option value="Goa">Goa</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Number of Travelers</label>
                <input
                  type="number"
                  name="travelers"
                  min="1"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Special Requirements</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark resize-none"
                  placeholder="Any specific preferences or requests?"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all ${
                  status === 'success' ? 'bg-green-500 shadow-xl shadow-green-200' : 'bg-secondary hover:bg-secondary-dark shadow-2xl shadow-secondary/30'
                }`}
              >
                {status === 'sending' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Send size={24} /></motion.div>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={24} />
                    Request Sent!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={24} />
                    Try Again
                  </>
                ) : (
                  <>
                    Plan My Trip <Send size={20} className="transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;