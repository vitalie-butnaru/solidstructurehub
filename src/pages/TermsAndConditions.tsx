
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSite } from "@/contexts/SiteContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const { siteData } = useSite();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-construction-accent hover:text-construction-accent-dark transition-colors mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la pagina principală
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">Termeni și condiții</h1>
            <div className="h-1 w-20 bg-construction-accent"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">1. Introducere</h2>
              <p className="text-gray-700">
                Acești Termeni și Condiții reglementează utilizarea site-ului web al companiei ConstructPro, precum și serviciile oferite de compania noastră. Prin accesarea site-ului nostru web și/sau prin solicitarea serviciilor noastre, sunteți de acord să respectați acești termeni și condiții. Vă rugăm să citiți cu atenție acest document.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">2. Serviciile oferite</h2>
              <p className="text-gray-700">
                ConstructPro oferă servicii complete de construcții industriale și rezidențiale, inclusiv dar fără a se limita la:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Construcții de hale industriale</li>
                <li>Clădiri comerciale</li>
                <li>Construcții rezidențiale</li>
                <li>Servicii de consultanță în construcții</li>
                <li>Proiectare și design</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">3. Drepturile și obligațiile clientului</h2>
              <p className="text-gray-700">
                Clienții noștri au dreptul la servicii de înaltă calitate, executate la standarde profesionale. În schimb, clienții au obligația de a furniza informații corecte și complete, de a respecta termenii contractuali și de a efectua plățile conform acordurilor încheiate.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">4. Confidențialitate</h2>
              <p className="text-gray-700">
                Respectăm confidențialitatea clienților noștri. Informațiile furnizate de dumneavoastră vor fi utilizate doar în scopul pentru care au fost colectate. Pentru mai multe detalii, vă rugăm să consultați Politica noastră de Confidențialitate.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">5. Limitarea răspunderii</h2>
              <p className="text-gray-700">
                ConstructPro nu poate fi tras la răspundere pentru daune indirecte, incidentale sau consecvente care decurg din utilizarea serviciilor noastre, în măsura permisă de lege. Responsabilitatea noastră se limitează la valoarea contractuală a serviciilor furnizate.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">6. Proprietate intelectuală</h2>
              <p className="text-gray-700">
                Toate drepturile de proprietate intelectuală asupra materialelor publicate pe acest site (texte, imagini, logo-uri, design) aparțin ConstructPro sau licențiatorilor săi. Reproducerea, distribuirea sau utilizarea acestora fără acordul nostru prealabil este interzisă.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">7. Modificarea termenilor</h2>
              <p className="text-gray-700">
                Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. Modificările vor intra în vigoare imediat după publicarea lor pe site. Este responsabilitatea dumneavoastră să verificați periodic acești termeni pentru a fi la curent cu eventualele modificări.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">8. Legislația aplicabilă</h2>
              <p className="text-gray-700">
                Acești Termeni și Condiții sunt guvernați și interpretați în conformitate cu legislația română. Orice dispută legată de acești termeni va fi supusă jurisdicției exclusive a instanțelor competente din România.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">9. Contact</h2>
              <p className="text-gray-700">
                Pentru orice întrebări legate de acești Termeni și Condiții, vă rugăm să ne contactați la adresa de email sau numărul de telefon afișate în secțiunea de contact a site-ului nostru.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer data={siteData.footer} />
    </div>
  );
};

export default TermsAndConditions;
