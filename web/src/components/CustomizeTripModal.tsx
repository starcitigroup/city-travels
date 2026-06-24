import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Users, Car, Home, Phone, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companyData from '../data/companyData.json';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import emailjs from '@emailjs/browser';

interface CustomizeTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeTripModal: React.FC<CustomizeTripModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    stayType: 'Standard Hotel (3 Star)',
    vehicleType: 'Sedan (4 Seater)',
    adults: 2,
    children: 0,
    name: '',
    phone: '',
    notes: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [suggestions, setSuggestions] = useState<{name: string, city?: string, state?: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (formData.destination.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(formData.destination)}&limit=5`);
        const data = await response.json();
        const results = data.features.map((f: any) => ({
          name: f.properties.name,
          city: f.properties.city,
          state: f.properties.state
        }));
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.destination]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, destination: value }));
    setShowSuggestions(true);
  };

  const selectSuggestion = (suggestion: {name: string, city?: string, state?: string}) => {
    const fullName = [suggestion.name, suggestion.city, suggestion.state]
      .filter(Boolean)
      .join(', ');
    setFormData(prev => ({ ...prev, destination: fullName }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    trackEvent(ANALYTICS_EVENTS.CUSTOMIZE_TRIP_SUBMIT, {
      destination: formData.destination,
      stayType: formData.stayType,
      vehicleType: formData.vehicleType,
      pax: formData.adults + formData.children
    });

    const whatsappMessage = `*New Trip Customization Request*
--------------------------------
*Destination:* ${formData.destination}
*Dates:* ${formData.startDate} to ${formData.endDate}
*Stay:* ${formData.stayType}
*Vehicle:* ${formData.vehicleType}
*Pax:* ${formData.adults} Adults, ${formData.children} Kids
--------------------------------
*Contact Details:*
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Notes:* ${formData.notes}
--------------------------------`;

    const whatsappNumber = companyData.contact.whatsapp.replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CUSTOMIZE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS keys missing.');
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        stay_type: formData.stayType,
        vehicle_type: formData.vehicleType,
        adults: formData.adults,
        children: formData.children,
        notes: formData.notes,
        subject: `Custom Trip Inquiry: ${formData.destination} by ${formData.name}`
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/60 backdrop-blur-md" 
            onClick={onClose}
          ></motion.div>

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden my-auto"
          >
            
            {/* Header */}
            <div className="bg-white px-8 py-8 border-b border-gray-50 flex justify-between items-center relative z-10">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-dark tracking-tight"
                >
                  Customize Your <span className="text-primary">Journey</span>
                </motion.h2>
                <p className="text-gray-500 font-medium mt-1">Tell us your vision, and we'll handle the rest.</p>
              </div>
              <motion.button 
                whileHover={{ rotate: 90, backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 rounded-2xl transition-colors text-gray-400"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* Section: Trip Details */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                  <MapPin size={16} /> Trip Essentials
                </h3>
                
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Destination</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleDestinationChange}
                      placeholder="Where to? (e.g., Munnar, Manali)"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-dark"
                      required
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    
                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && (formData.destination.length >= 3) && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-20 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl mt-2 overflow-hidden"
                        >
                          {isLoadingSuggestions ? (
                            <div className="px-6 py-4 text-sm text-gray-500 flex items-center gap-3">
                              <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                              Searching destinations...
                            </div>
                          ) : suggestions.length > 0 ? (
                            suggestions.map((s, i) => (
                              <div
                                key={i}
                                className="px-6 py-4 hover:bg-primary/5 cursor-pointer border-b last:border-0 border-gray-50 transition-colors group"
                                onClick={() => selectSuggestion(s)}
                              >
                                <div className="flex items-center gap-3">
                                  <MapPin size={16} className="text-secondary group-hover:scale-110 transition-transform"/>
                                  <span className="font-bold text-dark">{s.name}</span>
                                </div>
                                {(s.city || s.state) && (
                                  <div className="text-xs text-gray-400 ml-7 font-medium">
                                    {[s.city, s.state].filter(Boolean).join(', ')}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-4 text-sm text-gray-500 font-medium">
                              No matches found. Feel free to type yours.
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Start Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                        required
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">End Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                        required
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Preferences */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                  <Home size={16} /> Preferences
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Stay Type</label>
                    <div className="relative">
                      <select
                        name="stayType"
                        value={formData.stayType}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark appearance-none"
                      >
                        <option>Budget Hotel</option>
                        <option>Standard Hotel (3 Star)</option>
                        <option>Luxury Hotel (4/5 Star)</option>
                        <option>Resort</option>
                        <option>Homestay</option>
                        <option>Houseboat</option>
                        <option>No Stay Needed</option>
                      </select>
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Vehicle Type</label>
                    <div className="relative">
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark appearance-none"
                      >
                        <option>Sedan (4 Seater)</option>
                        <option>SUV (Innova/Crysta)</option>
                        <option>Tempo Traveller (12+)</option>
                        <option>Mini Bus</option>
                        <option>Luxury Coach</option>
                        <option>No Vehicle Needed</option>
                      </select>
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Adults</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="adults"
                        min="1"
                        value={formData.adults}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                      />
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Children</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="children"
                        min="0"
                        value={formData.children}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                      />
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Contact */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                  <User size={16} /> Your Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                        required
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765..."
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark"
                        required
                      />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
                
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Notes</label>
                   <textarea
                     name="notes"
                     value={formData.notes}
                     onChange={handleInputChange}
                     rows={3}
                     placeholder="Special requests, celebration themes, etc."
                     className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-dark resize-none"
                   />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending' || status === 'success'}
                className={`w-full text-white font-bold py-5 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 ${
                  status === 'success' 
                    ? 'bg-green-500' 
                    : status === 'error'
                    ? 'bg-red-500'
                    : 'bg-secondary hover:bg-secondary-dark shadow-secondary/30'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={24} />
                    Sent Successfully!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={24} />
                    Failed to send.
                  </>
                ) : (
                  <>
                    Send My Request <Send size={20} />
                  </>
                )}
              </motion.button>
              
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomizeTripModal;
