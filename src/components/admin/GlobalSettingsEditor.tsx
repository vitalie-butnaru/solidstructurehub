
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import { Image } from "lucide-react";

interface GlobalSettingsEditorProps {
  data: SiteData["global"];
  onSave: (data: SiteData["global"]) => void;
}

const GlobalSettingsEditor = ({ data, onSave }: GlobalSettingsEditorProps) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Setări Globale Site</h2>
      <p className="text-sm text-gray-500 mb-6">
        Aceste setări se aplică la nivelul întregului site și includ imagini și 
        resurse utilizate în mai multe secțiuni.
      </p>

      <div className="space-y-6">
        <div className="border p-4 rounded-lg space-y-4 bg-gray-50">
          <h3 className="font-medium">Logo & Brand</h3>
          
          <div>
            <Label htmlFor="siteLogo">Logo Site</Label>
            <div className="flex gap-2">
              <Input
                id="siteLogo"
                name="siteLogo"
                value={formData?.siteLogo || ''}
                onChange={handleChange}
                placeholder="URL logo site"
                className="flex-1"
              />
            </div>
            {formData?.siteLogo && (
              <div className="mt-2 h-16 w-40 bg-gray-200 rounded-md overflow-hidden p-2">
                <img 
                  src={formData.siteLogo} 
                  alt="Logo site" 
                  className="h-full w-auto object-contain"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Logo-ul principal al site-ului
            </p>
          </div>
          
          <div>
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex gap-2">
              <Input
                id="favicon"
                name="favicon"
                value={formData?.favicon || ''}
                onChange={handleChange}
                placeholder="URL favicon"
                className="flex-1"
              />
            </div>
            {formData?.favicon && (
              <div className="mt-2 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                <img 
                  src={formData.favicon} 
                  alt="Favicon" 
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Iconiță afișată în tab-ul browserului (recomandat dimensiune pătrată)
            </p>
          </div>
        </div>

        <div className="border p-4 rounded-lg space-y-4 bg-gray-50">
          <h3 className="font-medium">Imagini Default</h3>
          
          <div>
            <Label htmlFor="defaultBackgroundImage">Imagine fundal default</Label>
            <div className="flex gap-2">
              <Input
                id="defaultBackgroundImage"
                name="defaultBackgroundImage"
                value={formData?.defaultBackgroundImage || ''}
                onChange={handleChange}
                placeholder="URL imagine fundal default"
                className="flex-1"
              />
            </div>
            {formData?.defaultBackgroundImage && (
              <div className="mt-2 h-24 rounded-md overflow-hidden">
                <img 
                  src={formData.defaultBackgroundImage} 
                  alt="Default background" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Imagine utilizată ca fundal în absența altor imagini specifice
            </p>
          </div>
          
          <div>
            <Label htmlFor="socialShareImage">Imagine pentru share social media</Label>
            <div className="flex gap-2">
              <Input
                id="socialShareImage"
                name="socialShareImage"
                value={formData?.socialShareImage || ''}
                onChange={handleChange}
                placeholder="URL imagine share social media"
                className="flex-1"
              />
            </div>
            {formData?.socialShareImage && (
              <div className="mt-2 h-24 rounded-md overflow-hidden">
                <img 
                  src={formData.socialShareImage} 
                  alt="Social share preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Imagine afișată când site-ul este distribuit pe rețele sociale
            </p>
          </div>
          
          <div>
            <Label htmlFor="errorPageImage">Imagine pagină eroare</Label>
            <div className="flex gap-2">
              <Input
                id="errorPageImage"
                name="errorPageImage"
                value={formData?.errorPageImage || ''}
                onChange={handleChange}
                placeholder="URL imagine pagină eroare"
                className="flex-1"
              />
            </div>
            {formData?.errorPageImage && (
              <div className="mt-2 h-24 rounded-md overflow-hidden">
                <img 
                  src={formData.errorPageImage} 
                  alt="Error page preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Imagine afișată pe paginile de eroare (404, 500, etc.)
            </p>
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

export default GlobalSettingsEditor;
