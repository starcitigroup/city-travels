import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Users, Car, Home, Phone, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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

  // Use Photon API for live suggestions
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

    // 1. WhatsApp Redirection
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
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 2. EmailJS Submission
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
      // Map form data to template parameters
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn scale-100 transition-transform">
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-dark">Customize Your Trip</h2>
            <p className="text-sm text-gray-500">Tell us what you need, and we'll plan it for you.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Section: Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <MapPin size={20} /> Trip Details
            </h3>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleDestinationChange}
                  placeholder="Where do you want to go? (e.g., Munnar)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && (formData.destination.length >= 3) && (
                  <div className="absolute z-20 w-full bg-white border border-gray-100 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {isLoadingSuggestions ? (
                      <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 border-gray-50 transition-colors"
                          onClick={() => selectSuggestion(s)}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-secondary"/>
                            <span className="font-medium text-gray-800">{s.name}</span>
                          </div>
                          {(s.city || s.state) && (
                            <div className="text-xs text-gray-500 ml-5">
                              {[s.city, s.state].filter(Boolean).join(', ')}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No locations found. You can still type yours.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Home size={20} /> Preferences
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stay Type</label>
                <div className="relative">
                  <select
                    name="stayType"
                    value={formData.stayType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
                  >
                    <option>Budget Hotel</option>
                    <option>Standard Hotel (3 Star)</option>
                    <option>Luxury Hotel (4/5 Star)</option>
                    <option>Resort</option>
                    <option>Homestay</option>
                    <option>Houseboat</option>
                    <option>No Stay Needed</option>
                  </select>
                  <Home className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <div className="relative">
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
                  >
                    <option>Sedan (4 Seater)</option>
                    <option>SUV (Innova/Crysta)</option>
                    <option>Tempo Traveller (12+)</option>
                    <option>Mini Bus</option>
                    <option>Luxury Coach</option>
                    <option>No Vehicle Needed</option>
                  </select>
                  <Car className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                <div className="relative">
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                <div className="relative">
                  <input
                    type="number"
                    name="children"
                    min="0"
                    value={formData.children}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <User size={20} /> Your Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests / Notes</label>
               <textarea
                 name="notes"
                 value={formData.notes}
                 onChange={handleInputChange}
                 rows={2}
                 placeholder="Any specific requirements?"
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
               />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
              status === 'success' 
                ? 'bg-green-500 hover:bg-green-600' 
                : status === 'error'
                ? 'bg-red-500'
                : 'bg-[#25D366] hover:bg-[#20bd5a]'
            }`}
          >
            {status === 'sending' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={20} />
                Request Sent Successfully!
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle size={20} />
                Failed to send. Try again.
              </>
            ) : (
              <>
                <Send size={20} />
                Send Inquiry
              </>
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CustomizeTripModal;
