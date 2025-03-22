
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSite } from "@/contexts/SiteContext";

const PrivacyPolicy = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-construction-900 mb-10">Politica de Confidențialitate</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              La ConstructPro, respectăm confidențialitatea dumneavoastră și ne angajăm să protejăm datele 
              cu caracter personal pe care ni le furnizați. Această politică de confidențialitate explică 
              cum colectăm, utilizăm și protejăm informațiile dumneavoastră.
            </p>
            
            <h2>1. Informațiile pe care le colectăm</h2>
            <p>
              Putem colecta următoarele informații personale atunci când utilizați site-ul nostru sau 
              solicitați serviciile noastre:
            </p>
            <ul>
              <li>Nume și prenume</li>
              <li>Adresă de email</li>
              <li>Număr de telefon</li>
              <li>Adresă poștală</li>
              <li>Informații despre proiectul dumneavoastră</li>
            </ul>
            
            <h2>2. Cum utilizăm informațiile dumneavoastră</h2>
            <p>Utilizăm informațiile colectate pentru:</p>
            <ul>
              <li>A vă furniza serviciile solicitate</li>
              <li>A răspunde la întrebările și solicitările dumneavoastră</li>
              <li>A vă trimite informații despre serviciile noastre (dacă v-ați dat acordul)</li>
              <li>A îmbunătăți site-ul și serviciile noastre</li>
              <li>A respecta obligațiile legale</li>
            </ul>
            
            <h2>3. Securitatea datelor</h2>
            <p>
              Ne angajăm să asigurăm securitatea datelor dumneavoastră personale. Am implementat măsuri 
              tehnice și organizatorice adecvate pentru a proteja informațiile împotriva accesului 
              neautorizat, pierderii, modificării sau distrugerii accidentale.
            </p>
            
            <h2>4. Perioada de păstrare a datelor</h2>
            <p>
              Vom păstra datele dumneavoastră personale doar atât timp cât este necesar pentru scopurile 
              pentru care au fost colectate sau conform cerințelor legale.
            </p>
            
            <h2>5. Drepturile dumneavoastră</h2>
            <p>În conformitate cu legislația privind protecția datelor, aveți următoarele drepturi:</p>
            <ul>
              <li>Dreptul de acces la datele dumneavoastră personale</li>
              <li>Dreptul la rectificarea datelor inexacte</li>
              <li>Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
              <li>Dreptul la restricționarea prelucrării</li>
              <li>Dreptul la portabilitatea datelor</li>
              <li>Dreptul de a vă opune prelucrării datelor</li>
              <li>Dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrarea automată</li>
            </ul>
            
            <h2>6. Cookie-uri</h2>
            <p>
              Site-ul nostru poate utiliza cookie-uri pentru a îmbunătăți experiența utilizatorului. 
              Puteți seta browserul să refuze toate sau unele cookie-uri, sau să vă alerteze când site-urile 
              web setează sau accesează cookie-uri.
            </p>
            
            <h2>7. Modificări ale politicii de confidențialitate</h2>
            <p>
              Ne rezervăm dreptul de a actualiza această politică de confidențialitate în orice moment. 
              Vă încurajăm să verificați periodic această pagină pentru a vă asigura că sunteți mulțumit 
              de eventualele modificări.
            </p>
            
            <h2>8. Contact</h2>
            <p>
              Pentru orice întrebări sau preocupări legate de această politică de confidențialitate sau 
              de modul în care tratăm datele dumneavoastră, vă rugăm să ne contactați folosind informațiile 
              din secțiunea de contact.
            </p>
          </div>
        </div>
      </main>
      
      <Footer data={siteData.footer} />
    </div>
  );
};

export default PrivacyPolicy;
