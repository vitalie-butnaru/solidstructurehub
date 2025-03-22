
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { useSite } from "@/contexts/SiteContext";

const Index = () => {
  const { siteData } = useSite();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection data={siteData.hero} />
      <ServicesSection data={siteData.services} />
      <ProjectsCarousel />
      <WhyChooseUs data={siteData.whyChooseUs} />
      <ContactSection data={siteData.contact} />
      <Footer data={siteData.footer} />
    </div>
  );
};

export default Index;
