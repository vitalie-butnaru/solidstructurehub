
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";

interface FooterEditorProps {
  data: SiteData["footer"];
  onSave: (data: SiteData["footer"]) => void;
}

const FooterEditor = ({ data, onSave }: FooterEditorProps) => {
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
      <h2 className="text-xl font-semibold mb-4">Editare Footer</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Numele companiei</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descriere companiei</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="copyright">Text copyright</Label>
          <Input
            id="copyright"
            name="copyright"
            value={formData.copyright}
            onChange={handleChange}
            required
          />
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

export default FooterEditor;
