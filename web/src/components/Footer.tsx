import { Link } from 'react-scroll';
import { Facebook, Instagram, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import companyData from '../data/companyData.json';

const Footer = () => {
  const { contact, social } = companyData;

  return (
    <footer className="bg-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 tracking-tight">
                <span className="text-secondary">Star</span>Citi
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg font-medium opacity-80 max-w-md">
                {companyData.company.description}
              </p>
              <div className="flex space-x-5">
                {[
                  { icon: Facebook, href: social.facebook, label: 'Facebook' },
                  { icon: Instagram, href: social.instagram, label: 'Instagram' },
                  { icon: Globe, href: social.google, label: 'Website' }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "#FF7F50" }}
                    whileTap={{ scale: 0.9 }}
                    href={item.href} 
                    aria-label={item.label} 
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center transition-colors border border-white/10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <item.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-8 tracking-tight">Quick Navigation</h3>
              <ul className="space-y-5">
                {['Home', 'Services', 'Packages', 'Why Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item.toLowerCase().replace(' ', '-')}
                      smooth={true}
                      duration={500}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer font-bold text-sm uppercase tracking-widest"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-8 tracking-tight">Get in Touch</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-gray-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <MapPin size={18} />
                  </div>
                  <span className="font-medium leading-relaxed">{contact.address.line1}, {contact.address.city}, {contact.address.country}</span>
                </li>
                <li className="flex items-center gap-4 text-gray-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <a href={`tel:${contact.phones[0].replace(/\s+/g, '')}`} className="font-bold hover:text-white transition-colors">{contact.phones[0]}</a>
                </li>
                <li className="flex items-center gap-4 text-gray-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <a href={`mailto:${contact.supportEmail}`} className="font-bold hover:text-white transition-colors">{contact.supportEmail}</a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase italic">
            &copy; {new Date().getFullYear()} {companyData.company.name}. Handcrafted with ❤️ for travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
