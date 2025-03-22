
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { useSite } from '@/contexts/SiteContext';

const ProjectsCarousel = () => {
  const { siteData } = useSite();
  const projects = siteData.projects.items;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-construction-900">
      <Carousel className="w-full h-full" setActiveIndex={setActiveIndex} activeIndex={activeIndex}>
        <CarouselContent className="h-full">
          {projects.map((project, index) => (
            <CarouselItem key={project.id} className="h-full">
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-105"
                  style={{ backgroundImage: `url(${project.imageSrc})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-construction-900/80 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-start">
                  <div className="container">
                    <div 
                      className={cn(
                        "max-w-lg transform transition-all duration-700 space-y-4",
                        activeIndex === index 
                          ? "translate-y-0 opacity-100" 
                          : "translate-y-10 opacity-0"
                      )}
                    >
                      <span className="inline-block px-3 py-1 text-sm rounded-full bg-construction-accent/10 text-construction-accent border border-construction-accent/20">
                        Proiect {index + 1}/{projects.length}
                      </span>
                      <h2 className="text-4xl font-bold text-white">{project.title}</h2>
                      <p className="text-construction-100 text-lg">{project.description}</p>
                      <button className="px-6 py-2 bg-construction-accent text-white rounded-lg hover:bg-construction-accent/90 transition-colors mt-4">
                        Detalii proiect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                activeIndex === index 
                  ? "bg-construction-accent w-8" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <CarouselPrevious 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-none text-white h-12 w-12"
        />
        <CarouselNext 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-none text-white h-12 w-12"
        />
      </Carousel>
    </section>
  );
};

export default ProjectsCarousel;
