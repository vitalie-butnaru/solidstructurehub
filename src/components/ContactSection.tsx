
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteData } from "@/contexts/SiteContext";
import { getLocalizedContent, getStringValue } from "@/utils/languageUtils";

interface ContactSectionProps {
  data: SiteData["contact"];
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: lang === "ro" ? "Eroare" : lang === "en" ? "Error" : "Ошибка",
        description: lang === "ro" ? "Vă rugăm să completați toate câmpurile obligatorii." : 
                     lang === "en" ? "Please fill in all required fields." : 
                     "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to your backend
    console.log("Form data submitted:", formData);
    
    // Show success message
    toast({
      title: lang === "ro" ? "Mesaj trimis" : lang === "en" ? "Message sent" : "Сообщение отправлено",
      description: lang === "ro" ? "Vă mulțumim! Vă vom contacta în curând." :
                   lang === "en" ? "Thank you! We will contact you soon." :
                   "Спасибо! Мы свяжемся с вами в ближайшее время.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      // Focus on the first input
      const firstInput = formRef.current.querySelector('input') as HTMLInputElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-construction-900 mb-6">
              {lang === "ro" ? "Trimite-ne un mesaj" : 
               lang === "en" ? "Send us a message" : 
               "Отправьте нам сообщение"}
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-construction-700 mb-1">
                  {lang === "ro" ? "Nume complet *" : 
                   lang === "en" ? "Full name *" : 
                   "Полное имя *"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-construction-200 rounded-lg focus:ring-2 focus:ring-construction-accent focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-construction-700 mb-1">
                  {lang === "ro" ? "Email *" : 
                   lang === "en" ? "Email *" : 
                   "Эл. почта *"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-construction-200 rounded-lg focus:ring-2 focus:ring-construction-accent focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-construction-700 mb-1">
                  {lang === "ro" ? "Telefon" : 
                   lang === "en" ? "Phone" : 
                   "Телефон"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-construction-200 rounded-lg focus:ring-2 focus:ring-construction-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-construction-700 mb-1">
                  {lang === "ro" ? "Mesaj *" : 
                   lang === "en" ? "Message *" : 
                   "Сообщение *"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-construction-200 rounded-lg focus:ring-2 focus:ring-construction-accent focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-construction-accent text-white rounded-lg hover:bg-construction-accent/90 transition-colors"
              >
                {lang === "ro" ? "Trimite mesajul" : 
                 lang === "en" ? "Send message" : 
                 "Отправить сообщение"}
              </button>
              
              <p className="text-sm text-construction-500 mt-2">
                {lang === "ro" ? "* Câmpuri obligatorii" : 
                 lang === "en" ? "* Required fields" : 
                 "* Обязательные поля"}
              </p>
            </form>
          </div>
          
          <div className="bg-construction-900 p-8 rounded-xl shadow-lg text-white">
            <h3 className="text-2xl font-semibold mb-8">
              {lang === "ro" ? "Informații de contact" : 
               lang === "en" ? "Contact information" : 
               "Контактная информация"}
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Adresă" : 
                     lang === "en" ? "Address" : 
                     "Адрес"}
                  </h4>
                  <p>{getLocalizedContent(data.info.location, lang)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Telefon" : 
                     lang === "en" ? "Phone" : 
                     "Телефон"}
                  </h4>
                  <p>{getLocalizedContent(data.info.phone, lang)}</p>
                  <a 
                    href={`tel:${phoneString.replace(/\s+/g, '')}`}
                    className="inline-block mt-2 text-sm px-4 py-1 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    {lang === "ro" ? "Sună acum" : 
                     lang === "en" ? "Call now" : 
                     "Позвонить сейчас"}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Email" : 
                     lang === "en" ? "Email" : 
                     "Эл. почта"}
                  </h4>
                  <p>{getLocalizedContent(data.info.email, lang)}</p>
                  <a 
                    href={`mailto:${emailString}`}
                    className="inline-block mt-2 text-sm px-4 py-1 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    {lang === "ro" ? "Trimite email" : 
                     lang === "en" ? "Send email" : 
                     "Отправить эл. письмо"}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">
                    {lang === "ro" ? "Program de lucru" : 
                     lang === "en" ? "Working hours" : 
                     "Часы работы"}
                  </h4>
                  <p>{lang === "ro" ? "Luni - Vineri:" : lang === "en" ? "Monday - Friday:" : "Понедельник - Пятница:"} {getLocalizedContent(data.schedule.weekdays, lang)}</p>
                  <p>{lang === "ro" ? "Sâmbătă:" : lang === "en" ? "Saturday:" : "Суббота:"} {getLocalizedContent(data.schedule.saturday, lang)}</p>
                  <p>{lang === "ro" ? "Duminică:" : lang === "en" ? "Sunday:" : "Воскресенье:"} {getLocalizedContent(data.schedule.sunday, lang)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button 
                onClick={scrollToForm}
                className="w-full py-3 px-6 bg-construction-accent text-white rounded-lg hover:bg-construction-accent/90 transition-colors"
              >
                {lang === "ro" ? "Contactează-ne pentru o ofertă personalizată" : 
                 lang === "en" ? "Contact us for a personalized quote" : 
                 "Свяжитесь с нами для получения индивидуального предложения"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
