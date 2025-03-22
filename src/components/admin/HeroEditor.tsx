
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import { Plus, Trash } from "lucide-react";

interface HeroEditorProps {
  data: SiteData["hero"];
  onSave: (data: SiteData["hero"]) => void;
}

const HeroEditor = ({ data, onSave }: HeroEditorProps) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Hero</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="subtitle">Subtitlu</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Titlu principal</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descriere</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="ctaText">Text buton</Label>
            <Input
              id="ctaText"
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="backgroundImage">URL imagine fundal principală</Label>
            <Input
              id="backgroundImage"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
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

          <div className="space-y-4">
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
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    value={image}
                    onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                    placeholder="URL imagine"
                  />
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
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-construction-accent">
          Salvează modificările
        </Button>
      </div>
    </form>
  );
};

export default HeroEditor;
