
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'py-2 glass-effect shadow-sm border-b border-construction-200'
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-construction-900">CONSTRUCT<span className="text-construction-accent">PRO</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['servicii', 'de-ce-noi', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-construction-700 hover:text-construction-accent transition-colors relative group"
            >
              {item === 'servicii' ? 'Servicii' : item === 'de-ce-noi' ? 'De Ce Noi' : 'Contact'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-construction-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-construction-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-construction-900/95 backdrop-blur-md z-40 transition-transform duration-300 transform md:hidden',
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="container h-full flex flex-col items-center justify-center">
          <div className="space-y-8 w-full">
            {['servicii', 'de-ce-noi', 'contact'].map((item, index) => (
              <div key={item} className="overflow-hidden">
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-2xl text-white hover:text-construction-accent flex items-center justify-center w-full py-4 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{item === 'servicii' ? 'Servicii' : item === 'de-ce-noi' ? 'De Ce Noi' : 'Contact'}</span>
                  <ChevronRight className="ml-2 animate-fade-in-right" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
