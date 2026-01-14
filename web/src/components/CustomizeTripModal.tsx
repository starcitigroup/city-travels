import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Users, Car, Home, Phone, User, Send } from 'lucide-react';
import companyData from '../data/companyData.json';

interface CustomizeTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeTripModal: React.FC<CustomizeTripModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    duration: '', // alternate to dates if user prefers
    stayType: 'Standard',
    vehicleType: 'Sedan',
    adults: 2,
    children: 0,
    name: '',
    phone: '',
    notes: ''
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Aggregate destinations for suggestions
  useEffect(() => {
    const dests = new Set<string>();
    companyData.destinations.forEach(d => dests.add(d));
    companyData.brochures.forEach(b => {
      // Extract main location from title or highlights if possible
      // For now, we'll manually add common ones derived from titles
      if (b.title.includes('Munnar')) dests.add('Munnar');
      if (b.title.includes('Wayanad')) dests.add('Wayanad');
      if (b.title.includes('Trivandrum')) dests.add('Trivandrum');
      if (b.title.includes('Kanyakumari')) dests.add('Kanyakumari');
      if (b.title.includes('Rameshwaram')) dests.add('Rameshwaram');
      if (b.title.includes('Madurai')) dests.add('Madurai');
      if (b.title.includes('Thekkady')) dests.add('Thekkady');
      if (b.title.includes('Alleppey')) dests.add('Alleppey');
      if (b.title.includes('Kumarakom')) dests.add('Kumarakom');
      if (b.title.includes('Varkala')) dests.add('Varkala');
    });
    setSuggestions(Array.from(dests).sort());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, destination: value }));
    setShowSuggestions(value.length > 0);
  };

  const selectSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, destination: suggestion }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const text = `*New Trip Customization Request*%0A
--------------------------------%0A
*Destination:* ${formData.destination}%0A
*Dates:* ${formData.startDate} to ${formData.endDate}%0A
*Stay:* ${formData.stayType}%0A
*Vehicle:* ${formData.vehicleType}%0A
*Pax:* ${formData.adults} Adults, ${formData.children} Kids%0A
--------------------------------%0A
*Contact Details:*%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Notes:* ${formData.notes}%0A
--------------------------------`;

    const whatsappNumber = companyData.contact.whatsapp.replace('+', '');
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    window.open(url, '_blank');
    onClose();
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
                {showSuggestions && formData.destination && (
                  <div className="absolute z-20 w-full bg-white border border-gray-100 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {suggestions
                      .filter(s => s.toLowerCase().includes(formData.destination.toLowerCase()))
                      .map((s, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 flex items-center gap-2"
                          onClick={() => selectSuggestion(s)}
                        >
                          <MapPin size={14} className="text-gray-400"/> {s}
                        </div>
                      ))}
                     {/* Allow custom input fallback visual */}
                     <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-50 bg-gray-50">
                        Type to search or enter custom location
                     </div>
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
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            <Send size={20} />
            Send Inquiry via WhatsApp
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CustomizeTripModal;
