
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const language = searchParams.get("lang") || "ro";
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're on the home page, scroll to the section
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're not on the home page, navigate back to home and then to the section
      window.location.href = `/#${id}`;
    }
  };

  const switchLanguage = (lang: string) => {
    setSearchParams(prev => {
      prev.set("lang", lang);
      return prev;
    });
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
          <Link to="/" className="text-2xl font-bold text-construction-900">
            LA<span className="text-construction-accent">TID</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['servicii', 'proiecte', 'de-ce-noi', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'proiecte' && location.pathname !== "/") {
                  window.location.href = "/proiecte";
                } else {
                  scrollToSection(item);
                }
              }}
              className="text-construction-700 hover:text-construction-accent transition-colors relative group uppercase"
            >
              {item === 'servicii' ? (language === 'ro' ? 'Servicii' : language === 'en' ? 'Services' : 'Услуги') : 
               item === 'proiecte' ? (language === 'ro' ? 'Proiecte' : language === 'en' ? 'Projects' : 'Проекты') :
               item === 'de-ce-noi' ? (language === 'ro' ? 'De Ce Noi' : language === 'en' ? 'Why Us' : 'Почему Мы') : 
               (language === 'ro' ? 'Contact' : language === 'en' ? 'Contact' : 'Контакты')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-construction-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          
          {/* Language Switcher - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-construction-700 hover:text-construction-accent transition-colors">
              <Globe className="h-4 w-4 mr-1" />
              <span>{language.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => switchLanguage('ro')}>
                Română
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('ru')}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-construction-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Using Sheet component from shadcn/ui */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="top" className="pt-16 pb-8 px-6 bg-construction-900/95 backdrop-blur-md border-none text-white h-[100dvh]">
          <div className="h-full flex flex-col justify-center">
            {/* Navigation items */}
            <div className="space-y-8 w-full">
              {['servicii', 'proiecte', 'de-ce-noi', 'contact'].map((item, index) => (
                <div key={item} className="overflow-hidden">
                  <SheetClose asChild>
                    <button
                      onClick={() => {
                        if (item === 'proiecte' && location.pathname !== "/") {
                          window.location.href = "/proiecte";
                        } else {
                          scrollToSection(item);
                        }
                      }}
                      className="text-2xl text-white hover:text-construction-accent flex items-center justify-center w-full py-4 transition-colors uppercase"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span>
                        {item === 'servicii' ? (language === 'ro' ? 'Servicii' : language === 'en' ? 'Services' : 'Услуги') : 
                         item === 'proiecte' ? (language === 'ro' ? 'Proiecte' : language === 'en' ? 'Projects' : 'Проекты') :
                         item === 'de-ce-noi' ? (language === 'ro' ? 'De Ce Noi' : language === 'en' ? 'Why Us' : 'Почему Мы') : 
                         (language === 'ro' ? 'Contact' : language === 'en' ? 'Contact' : 'Контакты')}
                      </span>
                      <ChevronRight className="ml-2 animate-fade-in-right" />
                    </button>
                  </SheetClose>
                </div>
              ))}
              
              {/* Language options in mobile menu */}
              <div className="flex justify-center space-x-4 mt-6">
                <SheetClose asChild>
                  <button 
                    onClick={() => switchLanguage('ro')}
                    className={`px-4 py-2 rounded-md ${language === 'ro' ? 'bg-construction-accent text-white' : 'text-white'}`}
                  >
                    RO
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => switchLanguage('en')}
                    className={`px-4 py-2 rounded-md ${language === 'en' ? 'bg-construction-accent text-white' : 'text-white'}`}
                  >
                    EN
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => switchLanguage('ru')}
                    className={`px-4 py-2 rounded-md ${language === 'ru' ? 'bg-construction-accent text-white' : 'text-white'}`}
                  >
                    RU
                  </button>
                </SheetClose>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
