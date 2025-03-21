
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSite } from "@/contexts/SiteContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">Politica de confidențialitate</h1>
            <div className="h-1 w-20 bg-construction-accent"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">1. Introducere</h2>
              <p className="text-gray-700">
                Protecția datelor dumneavoastră cu caracter personal este importantă pentru noi. Această Politică de Confidențialitate descrie tipurile de informații pe care le colectăm, modul în care le utilizăm, cum le protejăm și drepturile dumneavoastră în legătură cu aceste date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">2. Informațiile pe care le colectăm</h2>
              <p className="text-gray-700">
                Putem colecta următoarele tipuri de informații:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Informații de identificare (nume, prenume)</li>
                <li>Informații de contact (adresă email, număr de telefon, adresă)</li>
                <li>Informații despre proiectul dumneavoastră de construcție</li>
                <li>Informații colectate automat prin cookie-uri și tehnologii similare</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">3. Cum utilizăm informațiile</h2>
              <p className="text-gray-700">
                Utilizăm informațiile colectate pentru:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>A vă oferi serviciile solicitate</li>
                <li>A comunica cu dumneavoastră despre proiectele în desfășurare</li>
                <li>A vă informa despre serviciile noastre care v-ar putea interesa</li>
                <li>A îmbunătăți site-ul nostru web și serviciile oferite</li>
                <li>A respecta obligațiile legale</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">4. Partajarea informațiilor</h2>
              <p className="text-gray-700">
                Nu vom vinde, închiria sau divulga informațiile dumneavoastră personale către terți, cu excepția următoarelor situații:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Cu furnizorii de servicii care ne ajută să operăm afacerea</li>
                <li>Când este necesar pentru a respecta legea</li>
                <li>Pentru a proteja drepturile, proprietatea sau siguranța noastră, a utilizatorilor noștri sau a publicului</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">5. Securitatea datelor</h2>
              <p className="text-gray-700">
                Implementăm măsuri tehnice și organizaționale adecvate pentru a proteja datele dumneavoastră personale împotriva pierderii, utilizării neautorizate sau modificării. Cu toate acestea, niciun sistem de securitate online nu este complet sigur.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">6. Drepturile dumneavoastră</h2>
              <p className="text-gray-700">
                În conformitate cu legislația aplicabilă, aveți următoarele drepturi:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Dreptul de acces la datele dumneavoastră personale</li>
                <li>Dreptul de a solicita rectificarea datelor incorecte</li>
                <li>Dreptul de a solicita ștergerea datelor</li>
                <li>Dreptul de a restricționa prelucrarea</li>
                <li>Dreptul la portabilitatea datelor</li>
                <li>Dreptul de a vă opune prelucrării</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">7. Cookie-uri</h2>
              <p className="text-gray-700">
                Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența dumneavoastră online. Puteți gestiona preferințele privind cookie-urile prin setările browserului dumneavoastră.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">8. Modificări ale Politicii de Confidențialitate</h2>
              <p className="text-gray-700">
                Ne rezervăm dreptul de a modifica această Politică de Confidențialitate în orice moment. Modificările vor fi publicate pe acest site, iar continuarea utilizării site-ului după publicarea modificărilor constituie acceptarea acestora.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-construction-900 mb-4">9. Contact</h2>
              <p className="text-gray-700">
                Pentru orice întrebări sau solicitări legate de această Politică de Confidențialitate sau de datele dumneavoastră personale, vă rugăm să ne contactați utilizând informațiile din secțiunea de contact a site-ului nostru.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer data={siteData.footer} />
    </div>
  );
};

export default PrivacyPolicy;
