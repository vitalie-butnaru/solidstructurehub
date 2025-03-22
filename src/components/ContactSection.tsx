
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteData } from "@/contexts/SiteContext";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to your backend
    console.log("Form data submitted:", formData);
    
    // Show success message
    toast({
      title: "Mesaj trimis",
      description: "Vă mulțumim! Vă vom contacta în curând.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-24 bg-construction-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">{data.title}</h2>
          <p className="text-construction-600">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-construction-900 mb-6">Trimite-ne un mesaj</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-construction-700 mb-1">
                  Nume complet *
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
                  Email *
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
                  Telefon
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
                  Mesaj *
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
                Trimite mesajul
              </button>
              
              <p className="text-sm text-construction-500 mt-2">
                * Câmpuri obligatorii
              </p>
            </form>
          </div>
          
          <div className="bg-construction-900 p-8 rounded-xl shadow-lg text-white">
            <h3 className="text-2xl font-semibold mb-8">Informații de contact</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">Adresă</h4>
                  <p>{data.info.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">Telefon</h4>
                  <p>{data.info.phone}</p>
                  <a 
                    href={`tel:${data.info.phone.replace(/\s+/g, '')}`}
                    className="inline-block mt-2 text-sm px-4 py-1 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    Sună acum
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">Email</h4>
                  <p>{data.info.email}</p>
                  <a 
                    href={`mailto:${data.info.email}`}
                    className="inline-block mt-2 text-sm px-4 py-1 bg-construction-800 hover:bg-construction-700 rounded-full transition-colors"
                  >
                    Trimite email
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-construction-accent h-6 w-6 mt-1" />
                <div>
                  <h4 className="font-medium text-construction-100 mb-1">Program de lucru</h4>
                  <p>Luni - Vineri: {data.schedule.weekdays}</p>
                  <p>Sâmbătă: {data.schedule.saturday}</p>
                  <p>Duminică: {data.schedule.sunday}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button 
                onClick={() => {
                  toast({
                    title: "Solicită o ofertă personalizată",
                    description: "Completați formularul din stânga sau contactați-ne telefonic pentru o ofertă personalizată.",
                  });
                }}
                className="w-full py-3 px-6 bg-construction-accent text-white rounded-lg hover:bg-construction-accent/90 transition-colors"
              >
                Contactează-ne pentru o ofertă personalizată
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
