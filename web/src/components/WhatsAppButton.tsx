import { MessageCircle } from 'lucide-react';
import companyData from '../data/companyData.json';

const WhatsAppButton = () => {
  const whatsappNumber = companyData.contact.whatsapp.replace('+', '');
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20booking%20a%20trip`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:bg-[#20bd5a] transition-all transform hover:scale-110 flex items-center justify-center animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppButton;
