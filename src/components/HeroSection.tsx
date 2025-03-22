
import { ArrowDown } from 'lucide-react';
import { SiteData } from '@/contexts/SiteContext';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  data: SiteData['hero'];
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const [currentBackground, setCurrentBackground] = useState(data.backgroundImage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgrounds, setBackgrounds] = useState([
    data.backgroundImage,
    'https://images.unsplash.com/photo-1541992808222-3bbeb087cfa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  ]);
  
  // Update backgrounds when data changes
  useEffect(() => {
    setBackgrounds(prev => {
      const newBackgrounds = [...prev];
      newBackgrounds[0] = data.backgroundImage;
      return newBackgrounds;
    });
    
    // Reset current background to the new one from data
    setCurrentBackground(data.backgroundImage);
  }, [data.backgroundImage]);

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const currentIndex = backgrounds.indexOf(currentBackground);
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        setCurrentBackground(backgrounds[nextIndex]);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentBackground, backgrounds]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicii');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-16">
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-800/90 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-40'} mix-blend-overlay`}
          style={{ 
            backgroundImage: `url('${currentBackground}')`,
            backgroundPosition: '50% 30%' 
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="opacity-0 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm md:text-base rounded-full bg-construction-accent/10 text-construction-accent border border-construction-accent/20 mb-4">
              {data.subtitle}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance opacity-0 animate-fade-in animate-delay-200">
            {data.title}
          </h1>

          <p className="text-xl text-construction-100 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-300">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 opacity-0 animate-fade-in animate-delay-500">
            <button 
              onClick={scrollToServices}
              className="px-8 py-3 rounded-lg bg-construction-accent text-white font-medium hover:bg-construction-accent/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-construction-accent/20"
            >
              {data.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-fade-in animate-delay-700">
        <button 
          onClick={scrollToServices}
          className="flex flex-col items-center text-construction-100 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Descoperă mai mult</span>
          <ArrowDown className="animate-float" size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
