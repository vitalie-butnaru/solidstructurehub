
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSite } from '@/contexts/SiteContext';

const ProjectsCarousel = () => {
  const { siteData } = useSite();
  const projects = siteData.projects.items;

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="proiecte" className="py-16 bg-construction-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-construction-900 mb-4">PROIECTELE NOASTRE</h2>
          <p className="text-construction-600 max-w-2xl mx-auto">
            Descoperă o selecție din proiectele noastre reprezentative, realizate cu profesionalism și atenție la detalii.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-2 h-full">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-construction-900 mb-2">{project.title}</h3>
                      <p className="text-construction-600 flex-grow">{project.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
