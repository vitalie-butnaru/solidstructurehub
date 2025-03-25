
import { CheckCircle, Clock, Award, Users } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SiteData } from '@/contexts/SiteContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getLocalizedContent } from '@/utils/languageUtils';

// Map pentru iconițe în funcție de ID
const iconMap: Record<string, any> = {
  experience: Users,
  deadlines: Clock,
  quality: Award,
  solutions: CheckCircle,
  // implicit
  default: CheckCircle
};

interface WhyChooseUsProps {
  data: SiteData['whyChooseUs'];
}

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="de-ce-noi" ref={sectionRef} className="py-24 relative bg-construction-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-fixed" 
          style={{ backgroundImage: `url('${data.backgroundImage}')` }}
        ></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={cn(
            "section-title text-white opacity-0",
            isVisible && "animate-fade-in"
          )}>
            {getLocalizedContent(data.title, lang)}
          </h2>
          <p className={cn(
            "text-construction-300 mt-6 opacity-0",
            isVisible && "animate-fade-in animate-delay-200"
          )}>
            {getLocalizedContent(data.description, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.id] || iconMap.default;
            
            return (
              <div
                key={benefit.id}
                className={cn(
                  "p-6 rounded-lg bg-construction-800/50 backdrop-blur-sm border border-construction-700/50 opacity-0 hover:bg-construction-800/70 transition-all duration-300 hover:translate-y-[-5px]",
                  isVisible && "animate-fade-in"
                )}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-construction-accent/20 text-construction-accent">
                      <IconComponent size={24} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {getLocalizedContent(benefit.title, lang)}
                    </h3>
                    
                    <p className="text-construction-300">
                      {getLocalizedContent(benefit.description, lang)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={cn(
          "mt-16 text-center opacity-0",
          isVisible && "animate-fade-in animate-delay-700"
        )}>
          <button
            onClick={handleContactClick}
            className="inline-block px-6 py-3 rounded-lg bg-construction-accent text-white font-medium hover:bg-construction-accent/90 transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            {lang === "ro" ? "Contactează-ne pentru o ofertă personalizată" : 
             lang === "en" ? "Contact us for a personalized offer" : 
             "Свяжитесь с нами для индивидуального предложения"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
