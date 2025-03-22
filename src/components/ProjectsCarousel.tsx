
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

// Example projects - in a real app, these would come from your SiteContext
const projects: Project[] = [
  {
    id: 1,
    title: 'Complex Rezidențial Modern',
    description: 'Ansamblu de locuințe cu design contemporan și facilități premium.',
    imageSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  },
  {
    id: 2,
    title: 'Centru Comercial',
    description: 'Spațiu comercial amplu cu zone de retail și divertisment.',
    imageSrc: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  },
  {
    id: 3,
    title: 'Hală Industrială',
    description: 'Construcție industrială modernă cu spații optimizate pentru producție.',
    imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  },
  {
    id: 4,
    title: 'Parc Logistic',
    description: 'Centru logistic cu depozite și platformă de distribuție.',
    imageSrc: 'https://images.unsplash.com/photo-1553678324-a6e43e20882a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  },
];

const ProjectsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
