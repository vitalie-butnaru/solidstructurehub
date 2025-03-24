
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSite } from '@/contexts/SiteContext';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const ProjectsCarousel = () => {
  const { siteData } = useSite();
  const projects = siteData.projects.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="proiecte" className="py-16 bg-construction-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-construction-900 mb-4">
            {lang === "ro" ? "PROIECTELE NOASTRE" : 
             lang === "en" ? "OUR PROJECTS" : 
             "НАШИ ПРОЕКТЫ"}
          </h2>
          <p className="text-construction-600 max-w-2xl mx-auto">
            {lang === "ro" ? "Descoperă o selecție din proiectele noastre reprezentative, realizate cu profesionalism și atenție la detalii." : 
             lang === "en" ? "Discover a selection of our representative projects, completed with professionalism and attention to detail." : 
             "Откройте для себя подборку наших знаковых проектов, выполненных с профессионализмом и вниманием к деталям."}
          </p>
        </div>

        <Carousel 
          className="w-full max-w-5xl mx-auto"
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        >
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
                      {project.category && (
                        <div className="absolute top-3 right-3 bg-construction-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-construction-900 mb-2">{project.title}</h3>
                      <p className="text-construction-600 flex-grow">{project.description}</p>
                      {project.date && (
                        <div className="mt-3 text-sm text-construction-500">
                          {project.date}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </Carousel>
        
        {/* Pagination indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                Math.floor(activeIndex) === index ? 'w-8 bg-construction-accent' : 'w-2.5 bg-construction-200'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* View All Projects button */}
        <div className="flex justify-center mt-8">
          <Link to="/proiecte">
            <Button
              className="bg-construction-accent hover:bg-construction-accent/90 text-white"
            >
              {lang === "ro" ? "Vezi Toate Proiectele" : 
               lang === "en" ? "View All Projects" : 
               "Посмотреть все проекты"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
