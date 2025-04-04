
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteData } from "@/contexts/SiteContext";
import { useSearchParams } from "react-router-dom";
import { getLocalizedContent, getStringValue } from "@/utils/languageUtils";
import { useToast } from "@/components/ui/use-toast";

interface ContactSectionProps {
  data: SiteData["contact"];
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

  // Get string values for contact information
  const phoneString = getStringValue(data.info.phone);
  const emailString = getStringValue(data.info.email);

  return (
    <section id="contact" className="py-24 bg-construction-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">
            {getLocalizedContent(data.title, lang)}
          </h2>
          <p className="text-construction-600">
            {getLocalizedContent(data.description, lang)}
          </p>
        </div>

        <div className="bg-construction-900 p-8 rounded-xl shadow-lg text-white max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            {lang === "ro" ? "Informații de contact" : 
             lang === "en" ? "Contact information" : 
             "Контактная информация"}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-construction-accent h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Adresă" : 
                     lang === "en" ? "Address" : 
                     "Адрес"}
                  </h4>
                  <p className="text-construction-200">{getLocalizedContent(data.info.location, lang)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-construction-accent h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Telefon" : 
                     lang === "en" ? "Phone" : 
                     "Телефон"}
                  </h4>
                  <p className="text-construction-200">{getLocalizedContent(data.info.phone, lang)}</p>
                  <a 
                    href={`tel:${phoneString.replace(/\s+/g, '')}`}
                    className="inline-block mt-2 text-sm px-4 py-2 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    {lang === "ro" ? "Sună acum" : 
                     lang === "en" ? "Call now" : 
                     "Позвонить сейчас"}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="text-construction-accent h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Email" : 
                     lang === "en" ? "Email" : 
                     "Эл. почта"}
                  </h4>
                  <p className="text-construction-200">{getLocalizedContent(data.info.email, lang)}</p>
                  <a 
                    href={`mailto:${emailString}`}
                    className="inline-block mt-2 text-sm px-4 py-2 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    {lang === "ro" ? "Trimite email" : 
                     lang === "en" ? "Send email" : 
                     "Отправить эл. письмо"}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-construction-accent h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Program de lucru" : 
                     lang === "en" ? "Working hours" : 
                     "Часы работы"}
                  </h4>
                  <p className="text-construction-200">{lang === "ro" ? "Luni - Vineri:" : lang === "en" ? "Monday - Friday:" : "Понедельник - Пятница:"} {getLocalizedContent(data.schedule.weekdays, lang)}</p>
                  <p className="text-construction-200">{lang === "ro" ? "Sâmbătă:" : lang === "en" ? "Saturday:" : "Суббота:"} {getLocalizedContent(data.schedule.saturday, lang)}</p>
                  <p className="text-construction-200">{lang === "ro" ? "Duminică:" : lang === "en" ? "Sunday:" : "Воскресенье:"} {getLocalizedContent(data.schedule.sunday, lang)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
