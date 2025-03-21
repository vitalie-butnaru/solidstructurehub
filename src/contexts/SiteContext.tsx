
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipuri pentru datele site-ului
export interface SiteData {
  hero: {
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    backgroundImage: string;
  };
  services: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      imageSrc: string;
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
  };
  footer: {
    companyName: string;
    description: string;
    copyright: string;
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
      },
      {
        id: 'commercial',
        title: 'Clădiri comerciale',
        description: 'Spații de producție, centre logistice, showroom-uri.',
        imageSrc: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc4c5',
      },
      {
        id: 'residential',
        title: 'Construcții rezidențiale',
        description: 'Case de vacanță, locuințe unifamiliale și ansambluri rezidențiale.',
        imageSrc: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
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
  },
  footer: {
    companyName: 'CONSTRUCTPRO',
    description: 'Construim viitorul, cu structuri solide și durabile. Oferim servicii complete de construcții industriale și rezidențiale.',
    copyright: `© ${new Date().getFullYear()} ConstructPro. Toate drepturile rezervate.`,
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
      setSiteData(JSON.parse(storedData));
    }
  }, []);

  // Salvăm datele în localStorage când se modifică
  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(siteData));
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
