
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import MultilingualInput from "./MultilingualInput";
import { Image } from "lucide-react";

interface FooterEditorProps {
  data: SiteData["footer"];
  onSave: (data: SiteData["footer"]) => void;
}

const FooterEditor = ({ data, onSave }: FooterEditorProps) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultilingualChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      logos: {
        ...prev.logos,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Footer</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="companyName">Nume companie</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <MultilingualInput
            id="description"
            label="Descriere"
            value={formData.description}
            onChange={(value) => handleMultilingualChange("description", value)}
            multiline={true}
            required={true}
          />

          <MultilingualInput
            id="copyright"
            label="Text copyright"
            value={formData.copyright}
            onChange={(value) => handleMultilingualChange("copyright", value)}
            required={true}
          />
          
          <div className="border p-4 rounded-lg space-y-4 bg-gray-50">
            <h3 className="font-medium">Logo & Imagini</h3>
            
            <div>
              <Label htmlFor="main">Logo principal</Label>
              <div className="flex gap-2">
                <Input
                  id="main"
                  name="main"
                  value={formData.logos?.main || ''}
                  onChange={handleLogoChange}
                  placeholder="URL logo principal"
                  className="flex-1"
                />
              </div>
              {formData.logos?.main && (
                <div className="mt-2 h-16 w-40 bg-gray-200 rounded-md overflow-hidden p-2">
                  <img 
                    src={formData.logos.main} 
                    alt="Logo principal" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="secondary">Logo secundar (opțional)</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary"
                  name="secondary"
                  value={formData.logos?.secondary || ''}
                  onChange={handleLogoChange}
                  placeholder="URL logo secundar"
                  className="flex-1"
                />
              </div>
              {formData.logos?.secondary && (
                <div className="mt-2 h-16 w-40 bg-gray-200 rounded-md overflow-hidden p-2">
                  <img 
                    src={formData.logos.secondary} 
                    alt="Logo secundar" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="backgroundImage">Imagine fundal (opțional)</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundImage"
                  name="backgroundImage"
                  value={formData.backgroundImage || ''}
                  onChange={handleChange}
                  placeholder="URL imagine fundal"
                  className="flex-1"
                />
              </div>
              {formData.backgroundImage && (
                <div className="mt-2 h-24 rounded-md overflow-hidden">
                  <img 
                    src={formData.backgroundImage} 
                    alt="Background Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Această imagine se va afișa în fundalul footer-ului
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-construction-accent hover:bg-construction-accent/90 transition-colors">
          Salvează modificările
        </Button>
      </div>
    </form>
  );
};

export default FooterEditor;
