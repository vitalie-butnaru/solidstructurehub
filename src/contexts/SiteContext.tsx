
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipuri pentru datele site-ului
export interface SiteData {
  hero: {
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    backgroundImage: string;
    additionalImages: string[]; // Imagini adiționale pentru slider
  };
  services: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      imageSrc: string;
      galleryImages: string[]; // Galerie de imagini pentru fiecare serviciu
    }[];
  };
  whyChooseUs: {
    title: string;
    description: string;
    benefits: {
      id: string;
      title: string;
      description: string;
    }[];
    backgroundImage: string; // Imagine de fundal pentru secțiunea "De ce să ne alegi"
  };
  contact: {
    title: string;
    description: string;
    info: {
      location: string;
      phone: string;
      email: string;
    };
    schedule: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    styles?: {
      titleFont?: string;
      titleSize?: string;
      titleColor?: string;
      sectionBg?: string;
      contentFont?: string;
      contentSize?: string;
      contentColor?: string;
    };
  };
  footer: {
    companyName: string;
    description: string;
    copyright: string;
  };
  projects: {
    items: {
      id: number;
      title: string;
      description: string;
      imageSrc: string;
    }[];
  };
}

// Date inițiale
const initialSiteData: SiteData = {
  hero: {
    subtitle: 'CONSTRUCȚII INDUSTRIALE ȘI REZIDENȚIALE',
    title: 'Construim viitorul, cu structuri solide și durabile.',
    description: 'Oferim servicii complete de construcții industriale și rezidențiale, adaptate nevoilor tale.',
    ctaText: 'Descoperă serviciile',
    backgroundImage: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77',
    additionalImages: [
      'https://images.unsplash.com/photo-1541992808222-3bbeb087cfa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
    ]
  },
  services: {
    title: 'SERVICIILE NOASTRE',
    description: 'Folosim materiale de calitate și tehnologie modernă pentru a livra construcții sigure și eficiente.',
    items: [
      {
        id: 'industrial',
        title: 'Hale industriale',
        description: 'De la boxe auto și depozite, până la supermarketuri și fabrici.',
        imageSrc: 'https://images.unsplash.com/photo-1598257006626-48b0c252070d',
        galleryImages: [
          'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2',
          'https://images.unsplash.com/photo-1565636285505-a392bb733490',
        ]
      },
      {
        id: 'commercial',
        title: 'Clădiri comerciale',
        description: 'Spații de producție, centre logistice, showroom-uri.',
        imageSrc: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc4c5',
        galleryImages: [
          'https://images.unsplash.com/photo-1561133036-61a7ed56b424',
          'https://images.unsplash.com/photo-1555636222-cae831e670b3',
        ]
      },
      {
        id: 'residential',
        title: 'Construcții rezidențiale',
        description: 'Case de vacanță, locuințe unifamiliale și ansambluri rezidențiale.',
        imageSrc: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
        galleryImages: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        ]
      },
    ],
  },
  whyChooseUs: {
    title: 'DE CE SĂ NE ALEGI?',
    description: 'Suntem dedicați excelenței în fiecare aspect al activității noastre',
    benefits: [
      {
        id: 'experience',
        title: 'Experiență în proiecte industriale și rezidențiale',
        description: 'Echipa noastră de experți are ani de experiență în domeniul construcțiilor.',
      },
      {
        id: 'deadlines',
        title: 'Respectăm termenele de execuție',
        description: 'Ne angajăm să livrăm proiectele la timp, respectând termenele stabilite.',
      },
      {
        id: 'quality',
        title: 'Calitate și profesionalism garantate',
        description: 'Lucrăm doar cu materiale premium și tehnici moderne de construcție.',
      },
      {
        id: 'solutions',
        title: 'Soluții personalizate pentru fiecare client',
        description: 'Adaptăm serviciile noastre pentru a răspunde nevoilor specifice ale fiecărui client.',
      },
    ],
    backgroundImage: 'https://images.unsplash.com/photo-1553545985-1e0d8781d5db',
  },
  contact: {
    title: 'CONTACT',
    description: 'Suntem aici pentru a răspunde întrebărilor tale și pentru a-ți oferi soluții personalizate',
    info: {
      location: '[Adresa ta aici]',
      phone: '[Numărul tău de contact]',
      email: '[Adresa ta de email]',
    },
    schedule: {
      weekdays: '08:00 - 18:00',
      saturday: '09:00 - 14:00',
      sunday: 'Închis',
    },
    styles: {
      titleFont: "font-sans",
      titleSize: "text-xl",
      titleColor: "text-gray-800",
      sectionBg: "bg-white",
      contentFont: "font-sans",
      contentSize: "text-base",
      contentColor: "text-gray-800",
    }
  },
  footer: {
    companyName: 'CONSTRUCTPRO',
    description: 'Construim viitorul, cu structuri solide și durabile. Oferim servicii complete de construcții industriale și rezidențiale.',
    copyright: `© ${new Date().getFullYear()} ConstructPro. Toate drepturile rezervate.`,
  },
  projects: {
    items: [
      {
        id: 1,
        title: 'Complex Rezidențial Modern',
        description: 'Ansamblu de locuințe cu design contemporan și facilități premium.',
        imageSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      },
      {
        id: 2,
        title: 'Centru Comercial',
        description: 'Spațiu comercial amplu cu zone de retail și divertisment.',
        imageSrc: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      },
      {
        id: 3,
        title: 'Hală Industrială',
        description: 'Construcție industrială modernă cu spații optimizate pentru producție.',
        imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      },
      {
        id: 4,
        title: 'Parc Logistic',
        description: 'Centru logistic cu depozite și platformă de distribuție.',
        imageSrc: 'https://images.unsplash.com/photo-1553678324-a6e43e20882a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      },
    ],
  },
};

// Context pentru autentificare și date
interface SiteContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  siteData: SiteData;
  updateSiteData: (newData: SiteData) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [siteData, setSiteData] = useState<SiteData>(initialSiteData);

  // Încărcăm datele din localStorage la inițializare
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const storedData = localStorage.getItem('siteData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Ensure styles are properly copied from stored data or initialized
        if (parsedData.contact && !parsedData.contact.styles) {
          parsedData.contact.styles = initialSiteData.contact.styles;
        }
        
        // Asigurăm compatibilitatea cu versiunea anterioară a datelor
        // Adăugăm proprietățile noi dacă nu există
        if (!parsedData.hero.additionalImages) {
          parsedData.hero.additionalImages = initialSiteData.hero.additionalImages;
        }
        
        if (!parsedData.whyChooseUs.backgroundImage) {
          parsedData.whyChooseUs.backgroundImage = initialSiteData.whyChooseUs.backgroundImage;
        }
        
        // Adăugăm imagini pentru fiecare serviciu dacă nu există
        if (parsedData.services && parsedData.services.items) {
          parsedData.services.items = parsedData.services.items.map((item: any) => {
            if (!item.galleryImages) {
              const initialItem = initialSiteData.services.items.find(i => i.id === item.id);
              item.galleryImages = initialItem ? initialItem.galleryImages : [];
            }
            return item;
          });
        }
        
        // Adăugăm proiecte dacă nu există
        if (!parsedData.projects) {
          parsedData.projects = initialSiteData.projects;
        }
        
        setSiteData(parsedData);
      } catch (error) {
        console.error("Error parsing stored site data:", error);
        // Fallback to initial data if parsing fails
        localStorage.setItem('siteData', JSON.stringify(initialSiteData));
      }
    } else {
      // If no data in localStorage, initialize it
      localStorage.setItem('siteData', JSON.stringify(initialSiteData));
    }
  }, []);

  // Salvăm datele în localStorage când se modifică
  useEffect(() => {
    try {
      localStorage.setItem('siteData', JSON.stringify(siteData));
      console.log("Data saved to localStorage:", siteData);
    } catch (error) {
      console.error("Error saving site data:", error);
    }
  }, [siteData]);

  // Funcție pentru autentificare
  const login = (username: string, password: string): boolean => {
    // Simplificat pentru demo, în producție ar trebui folosit un sistem securizat
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  // Funcție pentru deconectare
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Funcție pentru actualizarea datelor
  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  return (
    <SiteContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        siteData,
        updateSiteData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

// Hook pentru utilizarea contextului
export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
