
import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { SiteData } from '@/contexts/SiteContext';

interface ContactSectionProps {
  data: SiteData['contact'];
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Mesajul a fost trimis cu succes!', {
        description: 'Te vom contacta în curând.',
      });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Locație',
      content: data.info.location,
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: data.info.phone,
    },
    {
      icon: Mail,
      title: 'Email',
      content: data.info.email,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={cn(
            "section-title text-construction-900 opacity-0",
            isVisible && "animate-fade-in"
          )}>
            {data.title}
          </h2>
          <p className={cn(
            "text-construction-600 mt-6 opacity-0",
            isVisible && "animate-fade-in animate-delay-200"
          )}>
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className={cn(
            "lg:col-span-1 opacity-0",
            isVisible && "animate-fade-in animate-delay-300"
          )}>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-construction-100 text-construction-accent">
                      <item.icon size={20} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-construction-900 mb-1">
                      {item.title}
                    </h3>
                    
                    <p className="text-construction-600">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-lg bg-construction-50 border border-construction-100">
              <h3 className="text-lg font-medium text-construction-900 mb-4">Program de lucru</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-construction-600">Luni - Vineri:</span>
                  <span className="text-construction-900 font-medium">{data.schedule.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-construction-600">Sâmbătă:</span>
                  <span className="text-construction-900 font-medium">{data.schedule.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-construction-600">Duminică:</span>
                  <span className="text-construction-900 font-medium">{data.schedule.sunday}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "lg:col-span-2 opacity-0",
            isVisible && "animate-fade-in animate-delay-400"
          )}>
            <div className="p-8 rounded-lg bg-white shadow-lg border border-construction-100">
              <h3 className="text-xl font-semibold text-construction-900 mb-6">Trimite-ne un mesaj</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-construction-700">
                      Nume complet
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Numele tău"
                      required
                      className="w-full border-construction-200 focus:border-construction-accent focus:ring-construction-accent/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-construction-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplu@email.com"
                      required
                      className="w-full border-construction-200 focus:border-construction-accent focus:ring-construction-accent/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-construction-700">
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cum te putem ajuta?"
                    required
                    className="w-full min-h-[150px] border-construction-200 focus:border-construction-accent focus:ring-construction-accent/10"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-construction-accent hover:bg-construction-accent/90 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Se trimite...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Trimite mesaj
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
