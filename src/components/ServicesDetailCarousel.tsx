
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { SiteData } from "@/contexts/SiteContext";

interface ServicesDetailCarouselProps {
  service: SiteData["services"]["items"][0];
}

interface ServiceImage {
  id: string;
  src: string;
  alt: string;
}

const ServicesDetailCarousel = ({ service }: ServicesDetailCarouselProps) => {
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Construim array-ul de imagini cu imaginea principală și imaginile din galerie
    const allImages = [
      { id: "main", src: service.imageSrc, alt: service.title },
      ...service.galleryImages.map((src, index) => ({
        id: `gallery-${index}`,
        src,
        alt: `${service.title} ${index + 1}`
      }))
    ];
    setImages(allImages);
    setCurrentIndex(0);
  }, [service]);

  useEffect(() => {
    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      <Carousel 
        className="w-full" 
        activeIndex={currentIndex}
        setActiveIndex={setCurrentIndex}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative aspect-video bg-construction-100 overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 bg-construction-900/60 hover:bg-construction-900/80 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 bg-construction-900/60 hover:bg-construction-900/80 text-white" />
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-construction-accent" : "bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ServicesDetailCarousel;
