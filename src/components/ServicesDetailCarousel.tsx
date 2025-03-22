
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

// Sample additional images for each service
const serviceImages: Record<string, ServiceImage[]> = {
  industrial: [
    { id: "ind-1", src: "https://images.unsplash.com/photo-1598257006626-48b0c252070d", alt: "Hală industrială 1" },
    { id: "ind-2", src: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2", alt: "Hală industrială 2" },
    { id: "ind-3", src: "https://images.unsplash.com/photo-1565636285505-a392bb733490", alt: "Hală industrială 3" },
  ],
  commercial: [
    { id: "com-1", src: "https://images.unsplash.com/photo-1556156653-e5a7c69cc4c5", alt: "Clădire comercială 1" },
    { id: "com-2", src: "https://images.unsplash.com/photo-1561133036-61a7ed56b424", alt: "Clădire comercială 2" },
    { id: "com-3", src: "https://images.unsplash.com/photo-1555636222-cae831e670b3", alt: "Clădire comercială 3" },
  ],
  residential: [
    { id: "res-1", src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811", alt: "Construcție rezidențială 1" },
    { id: "res-2", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", alt: "Construcție rezidențială 2" },
    { id: "res-3", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", alt: "Construcție rezidențială 3" },
  ],
};

const ServicesDetailCarousel = ({ service }: ServicesDetailCarouselProps) => {
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Get images for the current service or use a default empty array
    const serviceSpecificImages = serviceImages[service.id] || [];
    // Add the main image from the service to the carousel
    const allImages = [
      { id: "main", src: service.imageSrc, alt: service.title },
      ...serviceSpecificImages,
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
