
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSite } from "@/contexts/SiteContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { getLocalizedContent } from "@/utils/languageUtils";
import ProjectLightbox from "@/components/ProjectLightbox";

const Projects = () => {
  const { siteData } = useSite();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(siteData.projects.items);
  const lang = searchParams.get("lang") || "ro";

  // Extract unique categories
  const categories = [...new Set(siteData.projects.items.map(p => {
    const category = getLocalizedContent(p.category, lang);
    return category;
  }).filter(Boolean))];

  useEffect(() => {
    if (activeCategory) {
      setFilteredProjects(siteData.projects.items.filter(p => 
        getLocalizedContent(p.category, lang) === activeCategory
      ));
    } else {
      setFilteredProjects(siteData.projects.items);
    }
  }, [activeCategory, siteData.projects.items, lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-16 bg-construction-50">
          <div className="container">
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center text-construction-600 hover:text-construction-accent transition-colors mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {lang === "ro" ? "Înapoi la pagina principală" : 
                 lang === "en" ? "Back to home page" : 
                 "Назад на главную страницу"}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-construction-900 mb-4">
              {lang === "ro" ? "Proiectele Noastre" : 
               lang === "en" ? "Our Projects" : 
               "Наши проекты"}
            </h1>
            
            <p className="text-construction-600 mb-12 max-w-3xl">
              {lang === "ro" ? "Descoperă o selecție din proiectele noastre reprezentative, realizate cu profesionalism și atenție la detalii." : 
               lang === "en" ? "Discover a selection of our representative projects, completed with professionalism and attention to detail." : 
               "Откройте для себя подборку наших знаковых проектов, выполненных с профессионализмом и вниманием к деталям."}
            </p>
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge 
                variant={activeCategory === null ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-2"
                onClick={() => setActiveCategory(null)}
              >
                {lang === "ro" ? "Toate" : 
                 lang === "en" ? "All" : 
                 "Все"}
              </Badge>
              
              {categories.map((category, index) => (
                <Badge 
                  key={`category-${index}`}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="cursor-pointer text-sm px-4 py-2"
                  onClick={() => setActiveCategory(category as string)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredProjects.map(project => (
                <ProjectLightbox key={String(project.id)} project={{...project, id: String(project.id)}}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={project.imageSrc} 
                        alt={getLocalizedContent(project.title, lang)} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {project.category && (
                        <div className="absolute top-3 right-3 bg-construction-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {getLocalizedContent(project.category, lang)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-construction-900 mb-2">
                        {getLocalizedContent(project.title, lang)}
                      </h3>
                      <p className="text-construction-600 mb-4 line-clamp-3">
                        {getLocalizedContent(project.description, lang)}
                      </p>
                      {project.date && (
                        <div className="text-sm text-construction-500 mt-auto">
                          {project.date}
                        </div>
                      )}
                    </div>
                  </div>
                </ProjectLightbox>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <p className="text-construction-600">
                  {lang === "ro" ? "Nu există proiecte în această categorie." : 
                   lang === "en" ? "No projects in this category." : 
                   "В этой категории нет проектов."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer data={siteData.footer} />
      <ScrollToTopButton />
    </div>
  );
};

export default Projects;
