
import { Warehouse, Store, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'industrial',
    title: 'Hale industriale',
    description: 'De la boxe auto și depozite, până la supermarketuri și fabrici.',
    icon: Warehouse,
    imageSrc: 'https://images.unsplash.com/photo-1598257006626-48b0c252070d',
  },
  {
    id: 'commercial',
    title: 'Clădiri comerciale',
    description: 'Spații de producție, centre logistice, showroom-uri.',
    icon: Store,
    imageSrc: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc4c5',
  },
  {
    id: 'residential',
    title: 'Construcții rezidențiale',
    description: 'Case de vacanță, locuințe unifamiliale și ansambluri rezidențiale.',
    icon: Home,
    imageSrc: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(services[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="servicii" ref={sectionRef} className="py-24 relative bg-construction-50 overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={cn(
            "section-title text-construction-900 opacity-0",
            isVisible && "animate-fade-in"
          )}>
            SERVICIILE NOASTRE
          </h2>
          <p className={cn(
            "text-construction-600 mt-6 opacity-0",
            isVisible && "animate-fade-in animate-delay-200"
          )}>
            Folosim materiale de calitate și tehnologie modernă pentru a livra construcții sigure și eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "service-card group cursor-pointer p-8 opacity-0",
                isVisible && "animate-fade-in",
                activeService === service.id && "ring-2 ring-construction-accent/50"
              )}
              style={{ animationDelay: `${300 + index * 100}ms` }}
              onClick={() => setActiveService(service.id)}
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.imageSrc})` }}
                ></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-construction-100 text-construction-accent mb-6 group-hover:bg-construction-accent/10 transition-colors">
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-xl font-semibold text-construction-900 mb-3 group-hover:text-construction-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-construction-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "mt-16 p-8 rounded-lg bg-white/50 backdrop-blur-sm border border-construction-200 opacity-0",
          isVisible && "animate-fade-in animate-delay-600"
        )}>
          <div className="flex items-center justify-center">
            <div 
              className="w-full h-64 md:h-96 rounded-lg bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${services.find(s => s.id === activeService)?.imageSrc})` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-construction-900/60 to-construction-800/60 flex items-center justify-center p-8">
                <div className="text-center text-white max-w-xl">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                    {services.find(s => s.id === activeService)?.title}
                  </h3>
                  <p className="text-construction-100">
                    Oferim soluții complete de proiectare și construcție, de la concept până la finalizare. 
                    Fiecare proiect este tratat cu atenție la detalii și cu focus pe calitate și durabilitate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
