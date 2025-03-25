
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import MultilingualInput from "./MultilingualInput";

interface FooterEditorProps {
  data: SiteData["footer"];
  onSave: (data: SiteData["footer"]) => void;
}

const FooterEditor = ({ data, onSave }: FooterEditorProps) => {
  const [formData, setFormData] = useState({ ...data });

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Footer</h2>

      <div className="space-y-4">
        <MultilingualInput
          id="companyName"
          label="Numele companiei"
          value={formData.companyName}
          onChange={(value) => handleMultilingualChange("companyName", value)}
          required={true}
        />

        <MultilingualInput
          id="description"
          label="Descriere companiei"
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
