
import { ArrowDown } from 'lucide-react';
import { SiteData } from '@/contexts/SiteContext';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLocalizedContent } from '@/utils/languageUtils';

interface HeroSectionProps {
  data: SiteData['hero'];
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";
  const [currentBackground, setCurrentBackground] = useState<string | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  
  // Update backgrounds when data changes with validation
  useEffect(() => {
    console.log("Hero data updated:", data);
    
    const validImages = [
      data.backgroundImage,
      ...(data.additionalImages || [])
    ].filter(img => img && typeof img === 'string' && img.trim() !== '') as string[];
    
    console.log("Valid images:", validImages);
    
    if (validImages.length > 0) {
      setBackgrounds(validImages);
      
      // Only set background if it's not already set or needs to be updated
      if (!currentBackground || !validImages.includes(currentBackground)) {
        setCurrentBackground(validImages[0]);
      }
    } else {
      // Fallback to a default image if no valid images are available
      const defaultImage = "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77";
      setBackgrounds([defaultImage]);
      setCurrentBackground(defaultImage);
    }
  }, [data, data.backgroundImage, data.additionalImages]);

  // Background image rotation
  useEffect(() => {
    if (!backgrounds || backgrounds.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBackground(prevBackground => {
          if (!prevBackground || backgrounds.length === 0) {
            return backgrounds[0];
          }
          
          const currentIndex = backgrounds.indexOf(prevBackground);
          if (currentIndex === -1) return backgrounds[0]; // Image not found, reset to first
          
          const nextIndex = (currentIndex + 1) % backgrounds.length;
          return backgrounds[nextIndex];
        });
        
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [backgrounds]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicii');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Preload images to ensure smoother transitions
  useEffect(() => {
    if (backgrounds.length > 0) {
      backgrounds.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
      });
    }
  }, [backgrounds]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-16">
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-800/90 z-0">
        {currentBackground && (
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-40'} mix-blend-overlay`}
            style={{ 
              backgroundImage: `url('${currentBackground}')`,
              backgroundPosition: '50% 30%' 
            }}
          ></div>
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="opacity-0 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm md:text-base rounded-full bg-construction-accent/10 text-construction-accent border border-construction-accent/20 mb-4">
              {getLocalizedContent(data.subtitle, lang)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance opacity-0 animate-fade-in animate-delay-200">
            {getLocalizedContent(data.title, lang)}
          </h1>

          <p className="text-xl text-construction-100 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-300">
            {getLocalizedContent(data.description, lang)}
          </p>

          <div className="flex justify-center mt-8 opacity-0 animate-fade-in animate-delay-500">
            <button 
              onClick={scrollToServices}
              className="px-8 py-3 rounded-lg bg-construction-accent text-white font-medium hover:bg-construction-accent/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-construction-accent/20 flex items-center gap-2"
            >
              {getLocalizedContent(data.ctaText, lang)}
              <ArrowDown className="animate-float h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
