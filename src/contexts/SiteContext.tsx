
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for multilingual content
type LanguageContent = {
  ro: string;
  en: string;
  ru: string;
};

// Tipuri pentru datele site-ului
export interface SiteData {
  hero: {
    subtitle: string | LanguageContent;
    title: string | LanguageContent;
    description: string | LanguageContent;
    ctaText: string | LanguageContent;
    backgroundImage: string;
    additionalImages: string[]; // Imagini adiționale pentru slider
  };
  services: {
    title: string | LanguageContent;
    description: string | LanguageContent;
    items: {
      id: string;
      title: string | LanguageContent;
      description: string | LanguageContent;
      imageSrc: string;
      galleryImages: string[]; // Galerie de imagini pentru fiecare serviciu
    }[];
  };
  whyChooseUs: {
    title: string | LanguageContent;
    description: string | LanguageContent;
    benefits: {
      id: string;
      title: string | LanguageContent;
      description: string | LanguageContent;
    }[];
    backgroundImage: string; // Imagine de fundal pentru secțiunea "De ce să ne alegi"
  };
  contact: {
    title: string | LanguageContent;
    description: string | LanguageContent;
    info: {
      location: string | LanguageContent;
      phone: string | LanguageContent;
      email: string | LanguageContent;
    };
    schedule: {
      weekdays: string | LanguageContent;
      saturday: string | LanguageContent;
      sunday: string | LanguageContent;
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
    description: string | LanguageContent;
    copyright: string | LanguageContent;
    logos?: {
      main: string;
      secondary?: string;
    };
    backgroundImage?: string;
  };
  projects: {
    items: {
      id: number;
      title: string | LanguageContent;
      description: string | LanguageContent;
      imageSrc: string;
      category?: string | LanguageContent;
      date?: string;
    }[];
    settings?: {
      backgroundImage?: string;
    };
  };
  // Global settings - general images used throughout the site
  global?: {
    siteLogo?: string;
    favicon?: string;
    defaultBackgroundImage?: string;
    socialShareImage?: string;
    errorPageImage?: string;
  };
}

// Helper function to convert string to multilingual object if needed
const ensureMultilingual = (content: string | LanguageContent): LanguageContent => {
  if (typeof content === 'string') {
    return { ro: content, en: content, ru: content };
  }
  return content;
};

// Date inițiale
const initialSiteData: SiteData = {
  hero: {
    subtitle: {
      ro: 'CONSTRUCȚII INDUSTRIALE ȘI REZIDENȚIALE',
      en: 'INDUSTRIAL AND RESIDENTIAL CONSTRUCTION',
      ru: 'ПРОМЫШЛЕННОЕ И ЖИЛИЩНОЕ СТРОИТЕЛЬСТВО'
    },
    title: {
      ro: 'Construim viitorul, cu structuri solide și durabile.',
      en: 'Building the future with solid and durable structures.',
      ru: 'Строим будущее с прочными и долговечными конструкциями.'
    },
    description: {
      ro: 'Oferim servicii complete de construcții industriale și rezidențiale, adaptate nevoilor tale.',
      en: 'We offer complete industrial and residential construction services, tailored to your needs.',
      ru: 'Мы предлагаем полный спектр услуг промышленного и жилищного строительства, адаптированных к вашим потребностям.'
    },
    ctaText: {
      ro: 'Descoperă serviciile',
      en: 'Discover services',
      ru: 'Ознакомьтесь с услугами'
    },
    backgroundImage: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77',
    additionalImages: [
      'https://images.unsplash.com/photo-1541992808222-3bbeb087cfa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
    ]
  },
  services: {
    title: {
      ro: 'SERVICIILE NOASTRE',
      en: 'OUR SERVICES',
      ru: 'НАШИ УСЛУГИ'
    },
    description: {
      ro: 'Folosim materiale de calitate și tehnologie modernă pentru a livra construcții sigure și eficiente.',
      en: 'We use quality materials and modern technology to deliver safe and efficient constructions.',
      ru: 'Мы используем качественные материалы и современные технологии для создания безопасных и эффективных конструкций.'
    },
    items: [
      {
        id: 'industrial',
        title: {
          ro: 'Hale industriale',
          en: 'Industrial halls',
          ru: 'Промышленные залы'
        },
        description: {
          ro: 'De la boxe auto și depozite, până la supermarketuri și fabrici.',
          en: 'From auto garages and warehouses to supermarkets and factories.',
          ru: 'От автогаражей и складов до супермаркетов и фабрик.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1598257006626-48b0c252070d',
        galleryImages: [
          'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2',
          'https://images.unsplash.com/photo-1565636285505-a392bb733490',
        ]
      },
      {
        id: 'commercial',
        title: {
          ro: 'Clădiri comerciale',
          en: 'Commercial buildings',
          ru: 'Коммерческие здания'
        },
        description: {
          ro: 'Spații de producție, centre logistice, showroom-uri.',
          en: 'Production spaces, logistics centers, showrooms.',
          ru: 'Производственные помещения, логистические центры, выставочные залы.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc4c5',
        galleryImages: [
          'https://images.unsplash.com/photo-1561133036-61a7ed56b424',
          'https://images.unsplash.com/photo-1555636222-cae831e670b3',
        ]
      },
      {
        id: 'residential',
        title: {
          ro: 'Construcții rezidențiale',
          en: 'Residential constructions',
          ru: 'Жилищное строительство'
        },
        description: {
          ro: 'Case de vacanță, locuințe unifamiliale și ansambluri rezidențiale.',
          en: 'Vacation homes, single-family homes, and residential complexes.',
          ru: 'Дома для отдыха, частные дома и жилые комплексы.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
        galleryImages: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        ]
      },
    ],
  },
  whyChooseUs: {
    title: {
      ro: 'DE CE SĂ NE ALEGI?',
      en: 'WHY CHOOSE US?',
      ru: 'ПОЧЕМУ ВЫБИРАЮТ НАС?'
    },
    description: {
      ro: 'Suntem dedicați excelenței în fiecare aspect al activității noastre',
      en: 'We are dedicated to excellence in every aspect of our activity',
      ru: 'Мы стремимся к совершенству во всех аспектах нашей деятельности'
    },
    benefits: [
      {
        id: 'experience',
        title: {
          ro: 'Experiență în proiecte industriale și rezidențiale',
          en: 'Experience in industrial and residential projects',
          ru: 'Опыт работы с промышленными и жилыми проектами'
        },
        description: {
          ro: 'Echipa noastră de experți are ani de experiență în domeniul construcțiilor.',
          en: 'Our team of experts has years of experience in the construction field.',
          ru: 'Наша команда экспертов имеет многолетний опыт в области строите��ьства.'
        },
      },
      {
        id: 'deadlines',
        title: {
          ro: 'Respectăm termenele de execuție',
          en: 'We respect execution deadlines',
          ru: 'Мы соблюдаем сроки выполнения'
        },
        description: {
          ro: 'Ne angajăm să livrăm proiectele la timp, respectând termenele stabilite.',
          en: 'We commit to delivering projects on time, respecting established deadlines.',
          ru: 'Мы обязуемся доставлять проекты вовремя, соблюдая установленные сроки.'
        },
      },
      {
        id: 'quality',
        title: {
          ro: 'Calitate și profesionalism garantate',
          en: 'Guaranteed quality and professionalism',
          ru: 'Гарантированное качество и профессионализм'
        },
        description: {
          ro: 'Lucrăm doar cu materiale premium și tehnici moderne de construcție.',
          en: 'We work only with premium materials and modern construction techniques.',
          ru: 'Мы работаем только с материалами премиум-класса и современными технологиями строительства.'
        },
      },
      {
        id: 'solutions',
        title: {
          ro: 'Soluții personalizate pentru fiecare client',
          en: 'Customized solutions for each client',
          ru: 'Индивидуальные решения для каждого клиента'
        },
        description: {
          ro: 'Adaptăm serviciile noastre pentru a răspunde nevoilor specifice ale fiecărui client.',
          en: 'We adapt our services to meet the specific needs of each client.',
          ru: 'Мы адаптируем наши услуги для удовлетворения конкретных потребностей каждого клиента.'
        },
      },
    ],
    backgroundImage: 'https://images.unsplash.com/photo-1553545985-1e0d8781d5db',
  },
  contact: {
    title: {
      ro: 'CONTACT',
      en: 'CONTACT',
      ru: 'КОНТАКТЫ'
    },
    description: {
      ro: 'Suntem aici pentru a răspunde întrebărilor tale și pentru a-ți oferi soluții personalizate',
      en: 'We are here to answer your questions and provide you with customized solutions',
      ru: 'Мы здесь, чтобы ответить на ваши вопросы и предложить вам индивидуальные решения'
    },
    info: {
      location: {
        ro: '[Adresa ta aici]',
        en: '[Your address here]',
        ru: '[Ваш адрес здесь]'
      },
      phone: {
        ro: '[Numărul tău de contact]',
        en: '[Your contact number]',
        ru: '[Ваш контактный номер]'
      },
      email: {
        ro: '[Adresa ta de email]',
        en: '[Your email address]',
        ru: '[Ваш адрес электронной почты]'
      }
    },
    schedule: {
      weekdays: {
        ro: '08:00 - 18:00',
        en: '08:00 - 18:00',
        ru: '08:00 - 18:00'
      },
      saturday: {
        ro: '09:00 - 14:00',
        en: '09:00 - 14:00',
        ru: '09:00 - 14:00'
      },
      sunday: {
        ro: 'Închis',
        en: 'Closed',
        ru: 'Закрыто'
      }
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
    description: {
      ro: 'Construim viitorul, cu structuri solide și durabile. Oferim servicii complete de construcții industriale și rezidențiale.',
      en: 'Building the future with solid and durable structures. We offer complete industrial and residential construction services.',
      ru: 'Строим будущее с прочными и долговечными конструкциями. Мы предлагаем полный спектр услуг промышленного и жилищного строительства.'
    },
    copyright: {
      ro: `© ${new Date().getFullYear()} ConstructPro. Toate drepturile rezervate.`,
      en: `© ${new Date().getFullYear()} ConstructPro. All rights reserved.`,
      ru: `© ${new Date().getFullYear()} ConstructPro. Все права защищены.`
    },
    logos: {
      main: 'https://placehold.co/200x80?text=CONSTRUCTPRO'
    },
    backgroundImage: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80'
  },
  projects: {
    items: [
      {
        id: 1,
        title: {
          ro: 'Complex Rezidențial Modern',
          en: 'Modern Residential Complex',
          ru: 'Современный жилой комплекс'
        },
        description: {
          ro: 'Ansamblu de locuințe cu design contemporan și facilități premium.',
          en: 'Housing complex with contemporary design and premium facilities.',
          ru: 'Жилой комплекс с современным дизайном и премиум-удобствами.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
        category: {
          ro: 'Rezidențial',
          en: 'Residential',
          ru: 'Жилой'
        },
        date: 'Decembrie 2023',
      },
      {
        id: 2,
        title: {
          ro: 'Centru Comercial',
          en: 'Shopping Center',
          ru: 'Торговый центр'
        },
        description: {
          ro: 'Spațiu comercial amplu cu zone de retail și divertisment.',
          en: 'Large commercial space with retail and entertainment areas.',
          ru: 'Большое коммерческое пространство с зонами розничной торговли и развлечений.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
        category: {
          ro: 'Comercial',
          en: 'Commercial',
          ru: 'Коммерческий'
        },
        date: 'Octombrie 2023',
      },
      {
        id: 3,
        title: {
          ro: 'Hală Industrială',
          en: 'Industrial Hall',
          ru: 'Промышленный зал'
        },
        description: {
          ro: 'Construcție industrială modernă cu spații optimizate pentru producție.',
          en: 'Modern industrial construction with spaces optimized for production.',
          ru: 'Современная промышленная конструкция с оптимизированными для производства пространствами.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
        category: {
          ro: 'Industrial',
          en: 'Industrial',
          ru: 'Промышленный'
        },
        date: 'August 2023',
      },
      {
        id: 4,
        title: {
          ro: 'Parc Logistic',
          en: 'Logistics Park',
          ru: 'Логистический парк'
        },
        description: {
          ro: 'Centru logistic cu depozite și platformă de distribuție.',
          en: 'Logistics center with warehouses and distribution platform.',
          ru: 'Логистический центр со складами и платформой распределения.'
        },
        imageSrc: 'https://images.unsplash.com/photo-1553678324-a6e43e20882a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
        category: {
          ro: 'Logistic',
          en: 'Logistics',
          ru: 'Логистический'
        },
        date: 'Martie 2023',
      },
    ],
    settings: {
      backgroundImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80'
    }
  },
  global: {
    siteLogo: 'https://placehold.co/200x80?text=CONSTRUCTPRO',
    favicon: 'https://placehold.co/64x64?text=CP',
    defaultBackgroundImage: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77',
    socialShareImage: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77',
    errorPageImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&h=800&q=80',
  }
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
        
        // Adăugăm settings pentru proiecte dacă nu există
        if (!parsedData.projects.settings) {
          parsedData.projects.settings = initialSiteData.projects.settings;
        }
        
        // Adăugăm logos pentru footer dacă nu există
        if (!parsedData.footer.logos) {
          parsedData.footer.logos = initialSiteData.footer.logos;
        }
        
        // Adăugăm backgroundImage pentru footer dacă nu există
        if (!parsedData.footer.backgroundImage) {
          parsedData.footer.backgroundImage = initialSiteData.footer.backgroundImage;
        }
        
        // Adăugăm global settings dacă nu există
        if (!parsedData.global) {
          parsedData.global = initialSiteData.global;
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
