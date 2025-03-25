
import { ArrowUp } from 'lucide-react';
import { SiteData } from '@/contexts/SiteContext';
import { useSearchParams } from "react-router-dom";
import { getLocalizedContent } from "@/utils/languageUtils";

interface FooterProps {
  data: SiteData['footer'];
}

const Footer = ({ data }: FooterProps) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

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
              {getLocalizedContent(data.description, lang)}
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
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <p className="text-sm">
                {getLocalizedContent(data.copyright, lang)}
              </p>
              <span className="text-sm hidden md:inline">|</span>
              <a 
                href="https://t.me/vibu01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-construction-400 hover:text-construction-accent transition-colors"
              >
                Powered by ViBu
              </a>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="/termeni-si-conditii" className="text-construction-400 hover:text-construction-accent transition-colors">
                {lang === "ro" ? "Termeni și condiții" : 
                 lang === "en" ? "Terms and Conditions" : 
                 "Условия использования"}
              </a>
              <a href="/politica-de-confidentialitate" className="text-construction-400 hover:text-construction-accent transition-colors">
                {lang === "ro" ? "Politica de confidențialitate" : 
                 lang === "en" ? "Privacy Policy" : 
                 "Политика конфиденциальности"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
