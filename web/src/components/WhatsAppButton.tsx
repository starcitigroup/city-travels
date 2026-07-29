import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import companyData from '../data/companyData.json';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

const WhatsAppButton = () => {
  const whatsappNumber = companyData.contact.whatsapp.replace('+', '');

  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
      location: 'floating_button'
    });
  };
  
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in booking a trip with StarCiti.`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-5 rounded-[2rem] shadow-2xl hover:shadow-[#25D366]/40 transition-all flex items-center justify-center border-4 border-white/20 backdrop-blur-sm"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="opacity-20 absolute" />
      <MessageCircle size={32} className="relative z-10" />
      <motion.span 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 rounded-[2rem] bg-[#25D366]"
      />
    </motion.a>
  );
};

export default WhatsAppButton;
