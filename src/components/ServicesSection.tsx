
import { useState } from "react";
import { SiteData } from "@/contexts/SiteContext";
import ServicesDetailCarousel from "./ServicesDetailCarousel";
import { useSearchParams } from "react-router-dom";
import { getLocalizedContent } from "@/utils/languageUtils";

interface ServicesSectionProps {
  data: SiteData["services"];
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const [selectedService, setSelectedService] = useState(data.items[0]);
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

  return (
    <section id="servicii" className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">{getLocalizedContent(data.title, lang)}</h2>
          <p className="text-construction-600">{getLocalizedContent(data.description, lang)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.items.map((service) => (
            <div
              key={service.id}
              className={`service-card p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${
                selectedService.id === service.id
                  ? "border-construction-accent border-2 shadow-lg"
                  : ""
              }`}
              onClick={() => setSelectedService(service)}
            >
              <div
                className="h-48 mb-4 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${service.imageSrc})` }}
              ></div>
              <h3 className="text-xl font-semibold text-construction-900 mb-2">
                {getLocalizedContent(service.title, lang)}
              </h3>
              <p className="text-construction-600">{getLocalizedContent(service.description, lang)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-construction-900">
                {getLocalizedContent(selectedService.title, lang)}
              </h3>
              <p className="text-construction-600">{getLocalizedContent(selectedService.description, lang)}</p>
              
              <div className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-construction-accent"></span>
                    <span>Proiectare și execuție completă</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-construction-accent"></span>
                    <span>Consultanță tehnică și financiară</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-construction-accent"></span>
                    <span>Materiale de calitate premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-construction-accent"></span>
                    <span>Soluții personalizate pentru fiecare client</span>
                  </li>
                </ul>
                
                <button 
                  className="mt-6 px-6 py-2 bg-construction-accent text-white rounded-lg hover:bg-construction-accent/90 transition-colors"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Solicită o ofertă
                </button>
              </div>
            </div>
            
            <div>
              <ServicesDetailCarousel service={selectedService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
