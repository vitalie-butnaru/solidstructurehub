
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteData } from "@/contexts/SiteContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface ContactEditorProps {
  data: SiteData["contact"];
  onSave: (data: SiteData["contact"]) => void;
}

// Font options
const fontOptions = [
  { value: "font-sans", label: "Sans Serif (Default)" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
  { value: "font-roboto", label: "Roboto" },
  { value: "font-poppins", label: "Poppins" },
  { value: "font-oswald", label: "Oswald" },
  { value: "font-playfair", label: "Playfair Display" },
];

// Font size options
const fontSizeOptions = [
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Normal" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
  { value: "text-2xl", label: "2X Large" },
];

// Color options
const colorOptions = [
  { value: "text-gray-800", label: "Gray (Default)" },
  { value: "text-blue-600", label: "Blue" },
  { value: "text-green-600", label: "Green" },
  { value: "text-red-600", label: "Red" },
  { value: "text-purple-600", label: "Purple" },
  { value: "text-yellow-600", label: "Yellow" },
  { value: "text-pink-600", label: "Pink" },
  { value: "text-teal-600", label: "Teal" },
];

// Background color options
const bgColorOptions = [
  { value: "bg-white", label: "White (Default)" },
  { value: "bg-gray-50", label: "Light Gray" },
  { value: "bg-blue-50", label: "Light Blue" },
  { value: "bg-green-50", label: "Light Green" },
  { value: "bg-red-50", label: "Light Red" },
  { value: "bg-yellow-50", label: "Light Yellow" },
  { value: "bg-purple-50", label: "Light Purple" },
  { value: "bg-pink-50", label: "Light Pink" },
];

// We need to define styles interface separately
interface StyleOptions {
  titleFont?: string;
  titleSize?: string;
  titleColor?: string;
  sectionBg?: string;
  contentFont?: string;
  contentSize?: string;
  contentColor?: string;
}

// Then create the extended contact data type
interface ExtendedContactData {
  title: string;
  description: string;
  info: {
    location: string;
    phone: string;
    email: string;
  };
  schedule: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  styles?: StyleOptions;
}

const ContactEditor = ({ data, onSave }: ContactEditorProps) => {
  // Create a proper copy of the data object with styling defaults
  const [formData, setFormData] = useState<ExtendedContactData>({
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
    },
    styles: (data as any).styles || {
      titleFont: "font-sans",
      titleSize: "text-xl",
      titleColor: "text-gray-800",
      sectionBg: "bg-white",
      contentFont: "font-sans",
      contentSize: "text-base",
      contentColor: "text-gray-800",
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      
      // Type-safe way of updating nested objects
      if (section === 'info') {
        setFormData(prev => ({
          ...prev,
          info: {
            ...prev.info,
            [field]: value
          }
        }));
      } else if (section === 'schedule') {
        setFormData(prev => ({
          ...prev,
          schedule: {
            ...prev.schedule,
            [field]: value
          }
        }));
      } else if (section === 'styles' && formData.styles) {
        setFormData(prev => ({
          ...prev,
          styles: {
            ...prev.styles,
            [field]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleStyleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [field]: value
      }
    }));
  };

  const handleTestLinks = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]+$/;
    
    // Email validation
    if (!emailRegex.test(formData.info.email)) {
      toast.error("Formatul adresei de email este invalid!");
      return;
    }
    
    // Phone validation
    if (!phoneRegex.test(formData.info.phone)) {
      toast.warning("Formatul numărului de telefon poate fi invalid!");
    }
    
    toast.success("Toate linkurile sunt valide și pot fi folosite!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert back to SiteData["contact"] format to maintain compatibility
    const saveData: SiteData["contact"] = {
      title: formData.title,
      description: formData.description,
      info: formData.info,
      schedule: formData.schedule
    };
    // Add styles as any to maintain compatibility with existing code
    (saveData as any).styles = formData.styles;
    onSave(saveData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Contact</h2>

      <div className="space-y-6">
        <div className="space-y-4 p-4 border rounded-md">
          <h3 className="text-lg font-medium">Stilizare secțiune</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titleFont">Font titlu</Label>
              <Select 
                value={formData.styles?.titleFont || "font-sans"}
                onValueChange={(value) => handleStyleChange('titleFont', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege fontul" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="titleSize">Mărime titlu</Label>
              <Select 
                value={formData.styles?.titleSize || "text-xl"}
                onValueChange={(value) => handleStyleChange('titleSize', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege mărimea" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="titleColor">Culoare titlu</Label>
              <Select 
                value={formData.styles?.titleColor || "text-gray-800"}
                onValueChange={(value) => handleStyleChange('titleColor', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege culoarea" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sectionBg">Culoare fundal</Label>
              <Select 
                value={formData.styles?.sectionBg || "bg-white"}
                onValueChange={(value) => handleStyleChange('sectionBg', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege culoarea de fundal" />
                </SelectTrigger>
                <SelectContent>
                  {bgColorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contentFont">Font conținut</Label>
              <Select 
                value={formData.styles?.contentFont || "font-sans"}
                onValueChange={(value) => handleStyleChange('contentFont', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege fontul" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contentSize">Mărime conținut</Label>
              <Select 
                value={formData.styles?.contentSize || "text-base"}
                onValueChange={(value) => handleStyleChange('contentSize', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege mărimea" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contentColor">Culoare conținut</Label>
              <Select 
                value={formData.styles?.contentColor || "text-gray-800"}
                onValueChange={(value) => handleStyleChange('contentColor', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege culoarea" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <div className={`p-4 rounded-md ${formData.styles?.sectionBg || 'bg-white'} border`}>
                <p className={`${formData.styles?.titleFont || 'font-sans'} ${formData.styles?.titleSize || 'text-xl'} ${formData.styles?.titleColor || 'text-gray-800'} font-bold`}>
                  {formData.title || 'Titlu secțiune'}
                </p>
                <p className={`${formData.styles?.contentFont || 'font-sans'} ${formData.styles?.contentSize || 'text-base'} ${formData.styles?.contentColor || 'text-gray-800'} mt-2`}>
                  {formData.description || 'Descrierea secțiunii...'}
                </p>
              </div>
            </div>
          </div>
        </div>

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

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleTestLinks}
        >
          Testează linkurile
        </Button>
        <Button type="submit" className="bg-construction-accent">
          Salvează modificările
        </Button>
      </div>
    </form>
  );
};

export default ContactEditor;
