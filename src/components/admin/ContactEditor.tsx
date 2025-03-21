
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";

interface ContactEditorProps {
  data: SiteData["contact"];
  onSave: (data: SiteData["contact"]) => void;
}

const ContactEditor = ({ data, onSave }: ContactEditorProps) => {
  // Create a proper copy of the data object to avoid type issues
  const [formData, setFormData] = useState<SiteData["contact"]>({
    title: data.title,
    description: data.description,
    info: {
      location: data.info.location,
      phone: data.info.phone,
      email: data.info.email,
    },
    schedule: {
      weekdays: data.schedule.weekdays,
      saturday: data.schedule.saturday,
      sunday: data.schedule.sunday,
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Contact</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informații generale</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Titlu secțiune</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descriere secțiune</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informații de contact</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="info.location">Locație</Label>
              <Input
                id="info.location"
                name="info.location"
                value={formData.info.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="info.phone">Telefon</Label>
              <Input
                id="info.phone"
                name="info.phone"
                value={formData.info.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="info.email">Email</Label>
              <Input
                id="info.email"
                name="info.email"
                value={formData.info.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Program de lucru</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="schedule.weekdays">Luni - Vineri</Label>
              <Input
                id="schedule.weekdays"
                name="schedule.weekdays"
                value={formData.schedule.weekdays}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="schedule.saturday">Sâmbătă</Label>
              <Input
                id="schedule.saturday"
                name="schedule.saturday"
                value={formData.schedule.saturday}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="schedule.sunday">Duminică</Label>
              <Input
                id="schedule.sunday"
                name="schedule.sunday"
                value={formData.schedule.sunday}
                onChange={handleChange}
                required
              />
            </div>
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

export default ContactEditor;
