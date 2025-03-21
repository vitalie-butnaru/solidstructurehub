
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";

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
            <Label htmlFor="backgroundImage">URL imagine fundal</Label>
            <Input
              id="backgroundImage"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Introduceți URL-ul unei imagini (de preferință de pe Unsplash sau alt serviciu)
            </p>
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
