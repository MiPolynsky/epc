import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { services } from '../data/servicesData';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-black transition-colors font-medium py-2 border-b-2 border-transparent hover:border-[#ffcc00]">
              О нас
            </Link>

            <div
              className="relative"
              style={{ marginLeft: '150px' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/services"
                className="text-gray-700 hover:text-black transition-colors font-medium py-2 border-b-2 border-transparent hover:border-[#ffcc00] flex items-center"
              >
                Услуги
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#ffcc00] hover:text-black transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginLeft: '-30px' }}>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState({}, '', '/');
              }}
              className="border-2 border-black w-16 h-16 flex items-center justify-center transition-colors hover:bg-[#ffcc00]"
            >
              <div className="text-2xl text-black tracking-wide" style={{ fontFamily: "'Gothic A1', sans-serif", fontWeight: 200 }}>
                ЭПЦ
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/documents" className="text-gray-700 hover:text-black transition-colors font-medium py-2 border-b-2 border-transparent hover:border-[#ffcc00]" style={{ marginLeft: '15px', marginRight: '150px' }}>
              Документы
            </Link>

            <Link to="/contacts" className="text-gray-700 hover:text-black transition-colors font-medium py-2 border-b-2 border-transparent hover:border-[#ffcc00]">
              Контакты
            </Link>
          </nav>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="py-2 text-gray-700 hover:text-blue-600 transition-colors">
                О нас
              </Link>

              <Link to="/services" className="py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Услуги
              </Link>

              <Link to="/documents" className="py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Документы
              </Link>

              <Link to="/contacts" className="py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Контакты
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
