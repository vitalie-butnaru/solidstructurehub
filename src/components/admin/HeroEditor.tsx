
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import { Plus, Trash, Image } from "lucide-react";
import MultilingualInput from "./MultilingualInput";

interface HeroEditorProps {
  data: SiteData["hero"];
  onSave: (data: SiteData["hero"]) => void;
}

const HeroEditor = ({ data, onSave }: HeroEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [previewIndex, setPreviewIndex] = useState(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddAdditionalImage = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ""]
    }));
  };

  const handleAdditionalImageChange = (index: number, value: string) => {
    setFormData(prev => {
      const newImages = [...prev.additionalImages];
      newImages[index] = value;
      return {
        ...prev,
        additionalImages: newImages
      };
    });
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.additionalImages];
      newImages.splice(index, 1);
      return {
        ...prev,
        additionalImages: newImages
      };
    });
  };

  // All preview images
  const allPreviewImages = [formData.backgroundImage, ...formData.additionalImages].filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Hero</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <MultilingualInput
            id="subtitle"
            label="Subtitlu"
            value={formData.subtitle}
            onChange={(value) => handleMultilingualChange("subtitle", value)}
            required={true}
            className="animate-fade-in"
          />

          <MultilingualInput
            id="title"
            label="Titlu principal"
            value={formData.title}
            onChange={(value) => handleMultilingualChange("title", value)}
            required={true}
            className="animate-fade-in animate-delay-100"
          />

          <MultilingualInput
            id="description"
            label="Descriere"
            value={formData.description}
            onChange={(value) => handleMultilingualChange("description", value)}
            multiline={true}
            required={true}
            className="animate-fade-in animate-delay-200"
          />

          <MultilingualInput
            id="ctaText"
            label="Text buton"
            value={formData.ctaText}
            onChange={(value) => handleMultilingualChange("ctaText", value)}
            required={true}
            className="animate-fade-in animate-delay-300"
          />

          <div className="border p-4 rounded-lg space-y-4 bg-gray-50 animate-fade-in animate-delay-400">
            <h3 className="font-medium">Imagini Hero Slider</h3>
            
            {allPreviewImages.length > 0 && (
              <div className="relative h-40 rounded-md overflow-hidden mb-4 shadow-md">
                <img 
                  src={allPreviewImages[previewIndex]} 
                  alt="Imagine actuală" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {allPreviewImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPreviewIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === previewIndex ? "w-6 bg-construction-accent" : "bg-white/60"
                      }`}
                      aria-label={`Previzualizare imaginea ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="backgroundImage">URL imagine fundal principală</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundImage"
                  name="backgroundImage"
                  value={formData.backgroundImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => setPreviewIndex(0)}
                  disabled={!formData.backgroundImage}
                  className="shrink-0"
                >
                  <Image className="h-4 w-4" />
                </Button>
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
                Introduceți URL-ul unei imagini (de preferință de pe Unsplash sau alt serviciu)
              </p>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label>Imagini suplimentare pentru slider</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAdditionalImage}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Adaugă imagine
                </Button>
              </div>

              {formData.additionalImages.map((image, index) => (
                <div key={index} className="flex gap-2 items-start border-l-2 border-construction-accent/20 pl-3 py-2 hover:border-construction-accent transition-colors">
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                        placeholder="URL imagine"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => setPreviewIndex(index + 1)}
                        disabled={!image}
                        className="shrink-0"
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    {image && (
                      <div className="mt-2 h-16 rounded-md overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Slide ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAdditionalImage(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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

export default HeroEditor;
