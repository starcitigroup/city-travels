import { useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Packages', to: 'packages' },
    { name: 'Why Us', to: 'why-us' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
        <nav className="fixed w-full bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-18">
                                                      {/* Logo */}
                                                      <div className="flex-shrink-0 flex items-center cursor-pointer overflow-hidden h-16 w-44 relative">
                                                        <Link to="home" smooth={true} duration={500} className="w-full h-full flex items-center justify-center">
                                                          <img 
                                                            className="w-full h-auto object-contain transform scale-[1.5] origin-center" 
                                                            src={logo} 
                                                            alt="City Travels" 
                                                          />
                                                        </Link>
                                                      </div>              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-dark hover:text-primary font-medium cursor-pointer transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone size={18} />
                  Plan My Trip
                </Link>
              </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-dark hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-primary text-white px-6 py-3 rounded-md font-semibold"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
