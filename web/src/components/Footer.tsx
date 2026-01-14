import { Link } from 'react-scroll';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import companyData from '../data/companyData.json';

const Footer = () => {
  const { contact, social } = companyData;

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-secondary">City</span> Travels
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {companyData.company.description}
            </p>
            <div className="flex space-x-4">
              <a href={social.facebook} aria-label="Facebook" className="p-2 bg-gray-800 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href={social.instagram} aria-label="Instagram" className="p-2 bg-gray-800 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href={social.google} aria-label="Google Maps" className="p-2 bg-gray-800 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Packages', 'Why Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase().replace(' ', '-')}
                    smooth={true}
                    duration={500}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                <span>{contact.address.line1}, {contact.address.city}, {contact.address.country}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone size={20} className="text-secondary flex-shrink-0" />
                <a href={`tel:${contact.phones[0].replace(/\s+/g, '')}`} className="hover:text-white">{contact.phones[0]}</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-secondary flex-shrink-0" />
                <a href={`mailto:${contact.supportEmail}`} className="hover:text-white">{contact.supportEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {companyData.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
