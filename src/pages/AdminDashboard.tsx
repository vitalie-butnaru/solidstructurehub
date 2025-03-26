
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "@/contexts/SiteContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Home, PanelRight, Globe, Settings } from "lucide-react";
import HeroEditor from "@/components/admin/HeroEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import WhyChooseUsEditor from "@/components/admin/WhyChooseUsEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import FooterEditor from "@/components/admin/FooterEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import GlobalSettingsEditor from "@/components/admin/GlobalSettingsEditor";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { RO, GB, RU } from 'country-flag-icons/react/3x2';

const AdminDashboard = () => {
  const { logout, siteData, updateSiteData } = useSite();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");
  const [previewLang, setPreviewLang] = useState("ro");
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    toast.success("Deconectare reușită");
    navigate("/");
  };

  const handleSave = (section: string, data: any) => {
    const newSiteData = {
      ...siteData,
      [section]: data
    };
    updateSiteData(newSiteData);
    toast.success(`Secțiunea ${section} a fost actualizată cu succes!`);
  };

  const openPreview = (lang: string) => {
    window.open(`/?lang=${lang}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <PanelRight className="h-6 w-6 text-construction-accent mr-2" />
            <h1 className="text-xl font-bold text-construction-900">Panel Administrare</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Globe className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle>Previzualizare în:</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant={previewLang === "ro" ? "default" : "outline"}
                        onClick={() => setPreviewLang("ro")}
                        className="justify-start"
                      >
                        <RO className="w-4 h-4 mr-2" /> Română
                      </Button>
                      <Button 
                        variant={previewLang === "en" ? "default" : "outline"}
                        onClick={() => setPreviewLang("en")}
                        className="justify-start"
                      >
                        <GB className="w-4 h-4 mr-2" /> English
                      </Button>
                      <Button 
                        variant={previewLang === "ru" ? "default" : "outline"}
                        onClick={() => setPreviewLang("ru")}
                        className="justify-start"
                      >
                        <RU className="w-4 h-4 mr-2" /> Русский
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={() => openPreview(previewLang)}
                      className="w-full flex items-center justify-center mt-4"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Vezi site-ul
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <Select 
                  value={previewLang} 
                  onValueChange={setPreviewLang}
                >
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Selectează limba" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Previzualizare în:</SelectLabel>
                      <SelectItem value="ro" className="flex items-center gap-2">
                        <span className="flex items-center gap-2">
                          <RO className="w-4 h-4" /> Română
                        </span>
                      </SelectItem>
                      <SelectItem value="en" className="flex items-center gap-2">
                        <span className="flex items-center gap-2">
                          <GB className="w-4 h-4" /> English
                        </span>
                      </SelectItem>
                      <SelectItem value="ru" className="flex items-center gap-2">
                        <span className="flex items-center gap-2">
                          <RU className="w-4 h-4" /> Русский
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {!isMobile && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPreview(previewLang)}
                className="flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Vezi site-ul
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {!isMobile && "Deconectare"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full flex border-b overflow-x-auto">
            <TabsTrigger value="hero" className="flex-1">
              Hero
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-1">
              Servicii
            </TabsTrigger>
            <TabsTrigger value="whyChooseUs" className="flex-1">
              De ce să ne alegi
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">
              Proiecte
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">
              Contact
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex-1">
              Footer
            </TabsTrigger>
            <TabsTrigger value="global" className="flex-1">
              <Settings className="h-4 w-4 mr-1" />
              Global
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="p-4 bg-white rounded-lg border">
            <HeroEditor data={siteData.hero} onSave={(data) => handleSave("hero", data)} />
          </TabsContent>

          <TabsContent value="services" className="p-4 bg-white rounded-lg border">
            <ServicesEditor data={siteData.services} onSave={(data) => handleSave("services", data)} />
          </TabsContent>

          <TabsContent value="whyChooseUs" className="p-4 bg-white rounded-lg border">
            <WhyChooseUsEditor data={siteData.whyChooseUs} onSave={(data) => handleSave("whyChooseUs", data)} />
          </TabsContent>

          <TabsContent value="projects" className="p-4 bg-white rounded-lg border">
            <ProjectsEditor data={siteData.projects} onSave={(data) => handleSave("projects", data)} />
          </TabsContent>

          <TabsContent value="contact" className="p-4 bg-white rounded-lg border">
            <ContactEditor data={siteData.contact} onSave={(data) => handleSave("contact", data)} />
          </TabsContent>

          <TabsContent value="footer" className="p-4 bg-white rounded-lg border">
            <FooterEditor data={siteData.footer} onSave={(data) => handleSave("footer", data)} />
          </TabsContent>
          
          <TabsContent value="global" className="p-4 bg-white rounded-lg border">
            <GlobalSettingsEditor data={siteData.global || {}} onSave={(data) => handleSave("global", data)} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Panel de administrare ConstructPro © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
