
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { getLocalizedContent } from "@/utils/languageUtils";
import { useState } from "react";

interface ProjectLightboxProps {
  project: {
    id: string;
    title: string | { ro: string; en: string; ru: string };
    description: string | { ro: string; en: string; ru: string };
    category?: string | { ro: string; en: string; ru: string };
    imageSrc: string;
    galleryImages?: string[]; // Array of additional images
    date?: string;
  };
  children: React.ReactNode;
}

const ProjectLightbox = ({ project, children }: ProjectLightboxProps) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Combine main image with gallery images
  const allImages = [project.imageSrc, ...(project.galleryImages || [])];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer h-full">{children}</div>
      </DialogTrigger>
      <DialogContent className="w-[85vw] max-w-[85vw] p-0 bg-white overflow-hidden rounded-lg">
        <div className="relative flex flex-col md:flex-row md:max-h-[85vh]">
          {/* Image carousel - adjusted height for better display on all screen sizes */}
          <div className="h-[40vh] md:h-[60vh] md:w-[60%] relative">
            <Carousel 
              className="w-full h-full" 
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            >
              <CarouselContent className="h-full">
                {allImages.map((img, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="h-full w-full">
                      <img
                        src={img}
                        alt={typeof project.title === 'string' ? project.title : project.title[lang as keyof typeof project.title]}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                  <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
                  
                  {/* Pagination indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeIndex ? "w-8 bg-construction-accent" : "w-2 bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {project.category && (
                <div className="absolute top-3 left-3 bg-construction-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {getLocalizedContent(project.category, lang)}
                </div>
              )}
            </Carousel>
          </div>
          
          {/* Text content - better spacing and scrollable for long content */}
          <div className="p-6 md:p-8 md:w-[40%] overflow-y-auto flex flex-col">
            <h3 className="text-2xl font-bold text-construction-900 mb-6">
              {getLocalizedContent(project.title, lang)}
            </h3>
            <p className="text-construction-600 mb-8 leading-relaxed">
              {getLocalizedContent(project.description, lang)}
            </p>
            {project.date && (
              <div className="text-sm text-construction-500 mt-auto pt-4 border-t border-gray-100">
                {project.date}
              </div>
            )}
          </div>
          
          <DialogClose className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors z-10">
            <X className="h-5 w-5 text-construction-900" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectLightbox;
