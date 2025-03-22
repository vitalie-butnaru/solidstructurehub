
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSite } from "@/contexts/SiteContext";

const TermsAndConditions = () => {
  const { siteData } = useSite();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-construction-500 hover:text-construction-accent mb-8 transition-colors">
            <ArrowLeft size={16} />
            <span>Înapoi la pagina principală</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-construction-900 mb-10">Termeni și Condiții</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Despre noi</h2>
            <p>
              ConstructPro este o companie specializată în construcții industriale și rezidențiale, 
              dedicată excelenței și profesionalismului în toate proiectele noastre.
            </p>
            
            <h2>2. Utilizarea site-ului</h2>
            <p>
              Utilizarea acestui site web este supusă următorilor termeni de utilizare. Prin accesarea 
              site-ului nostru, sunteți de acord cu acești termeni în totalitate. Dacă nu sunteți de acord 
              cu acești termeni, vă rugăm să nu utilizați acest site.
            </p>
            
            <h2>3. Servicii</h2>
            <p>
              Serviciile prezentate pe acest site sunt oferite de ConstructPro. Ne rezervăm dreptul de a 
              modifica specificațiile și prețurile oricărui serviciu fără notificare prealabilă.
            </p>
            
            <h2>4. Oferte și contracte</h2>
            <p>
              Toate ofertele și estimările prezentate pe site sunt orientative. Un contract va fi considerat 
              valid doar după confirmarea scrisă din partea companiei noastre. Contractele sunt supuse 
              termenilor și condițiilor specifice incluse în documentele contractuale.
            </p>
            
            <h2>5. Proprietate intelectuală</h2>
            <p>
              Conținutul acestui site web, inclusiv dar fără a se limita la text, grafică, logo-uri, 
              imagini, clipuri audio, descărcări digitale și compilații de date, este proprietatea 
              ConstructPro sau a furnizorilor săi de conținut și este protejat de legile românești și 
              internaționale privind drepturile de autor.
            </p>
            
            <h2>6. Limitarea răspunderii</h2>
            <p>
              Informațiile de pe acest site sunt furnizate "ca atare" și ConstructPro nu oferă nicio 
              garanție, expresă sau implicită, cu privire la acuratețea sau integritatea conținutului. 
              ConstructPro nu va fi răspunzător pentru niciun fel de daune directe, indirecte, incidentale, 
              speciale sau consecutive care rezultă din utilizarea sau imposibilitatea de utilizare a 
              serviciilor noastre.
            </p>
            
            <h2>7. Legea aplicabilă</h2>
            <p>
              Acești termeni și condiții sunt guvernate și interpretate în conformitate cu legile României, 
              iar orice dispută care decurge din sau în legătură cu acești termeni va fi supusă jurisdicției 
              exclusive a instanțelor din România.
            </p>
            
            <h2>8. Modificarea termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările 
              intră în vigoare imediat după publicarea lor pe site. Utilizarea continuă a site-ului după 
              astfel de modificări constituie acceptarea acestora.
            </p>
            
            <h2>9. Contact</h2>
            <p>
              Pentru orice întrebări sau clarificări referitoare la acești termeni și condiții, vă rugăm 
              să ne contactați folosind informațiile din secțiunea de contact.
            </p>
          </div>
        </div>
      </main>
      
      <Footer data={siteData.footer} />
    </div>
  );
};

export default TermsAndConditions;
