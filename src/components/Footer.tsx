
import { ArrowUp } from 'lucide-react';
import { SiteData } from '@/contexts/SiteContext';

interface FooterProps {
  data: SiteData['footer'];
}

const Footer = ({ data }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-construction-900 text-construction-300 pt-12 pb-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <span className="text-3xl font-bold text-white">{data.companyName}</span>
            <p className="mt-2 max-w-md">
              {data.description}
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 py-2 px-4 rounded-full bg-construction-800 hover:bg-construction-700 transition-colors"
          >
            <span>Sus</span>
            <ArrowUp size={16} />
          </button>
        </div>
        
        <div className="border-t border-construction-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              {data.copyright}
            </p>
            
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="#" className="text-construction-400 hover:text-construction-accent transition-colors">
                Termeni și condiții
              </a>
              <a href="#" className="text-construction-400 hover:text-construction-accent transition-colors">
                Politica de confidențialitate
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
