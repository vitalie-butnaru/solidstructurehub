
import { useState } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { useSite } from "@/contexts/SiteContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Home, PanelRight } from "lucide-react";
import HeroEditor from "@/components/admin/HeroEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import WhyChooseUsEditor from "@/components/admin/WhyChooseUsEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import FooterEditor from "@/components/admin/FooterEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";

const AdminDashboard = () => {
  const { logout, siteData, updateSiteData } = useSite();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");

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
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/", "_blank")}
              className="flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Vezi site-ul
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Deconectare
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full flex border-b">
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
