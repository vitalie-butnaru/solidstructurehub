
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import MultilingualInput from "./MultilingualInput";
import { LanguageContent, getLocalizedContent } from "@/utils/languageUtils";

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
  title: string | LanguageContent;
  description: string | LanguageContent;
  info: {
    location: string | LanguageContent;
    phone: string | LanguageContent;
    email: string | LanguageContent;
  };
  schedule: {
    weekdays: string | LanguageContent;
    saturday: string | LanguageContent;
    sunday: string | LanguageContent;
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

  const handleInfoChange = (field: string, value: LanguageContent) => {
    setFormData(prev => ({
      ...prev,
      info: {
        ...prev.info,
        [field]: value
      }
    }));
  };

  const handleScheduleChange = (field: string, value: LanguageContent) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const handleMultilingualChange = (field: string, value: LanguageContent) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    
    const email = typeof formData.info.email === 'string' 
      ? formData.info.email 
      : formData.info.email.ro;
      
    const phone = typeof formData.info.phone === 'string'
      ? formData.info.phone
      : formData.info.phone.ro;
    
    // Email validation
    if (!emailRegex.test(email)) {
      toast.error("Formatul adresei de email este invalid!");
      return;
    }
    
    // Phone validation
    if (!phoneRegex.test(phone)) {
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
                  {getLocalizedContent(formData.title, 'ro') || 'Titlu secțiune'}
                </p>
                <p className={`${formData.styles?.contentFont || 'font-sans'} ${formData.styles?.contentSize || 'text-base'} ${formData.styles?.contentColor || 'text-gray-800'} mt-2`}>
                  {getLocalizedContent(formData.description, 'ro') || 'Descrierea secțiunii...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informații generale</h3>
          <div className="grid grid-cols-1 gap-4">
            <MultilingualInput
              id="title"
              label="Titlu secțiune"
              value={formData.title}
              onChange={(value) => handleMultilingualChange("title", value)}
              required={true}
            />

            <MultilingualInput
              id="description"
              label="Descriere secțiune"
              value={formData.description}
              onChange={(value) => handleMultilingualChange("description", value)}
              multiline={true}
              required={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informații de contact</h3>
          <div className="grid grid-cols-1 gap-4">
            <MultilingualInput
              id="info.location"
              label="Locație"
              value={formData.info.location}
              onChange={(value) => handleInfoChange("location", value)}
              required={true}
            />

            <MultilingualInput
              id="info.phone"
              label="Telefon"
              value={formData.info.phone}
              onChange={(value) => handleInfoChange("phone", value)}
              required={true}
            />

            <MultilingualInput
              id="info.email"
              label="Email"
              value={formData.info.email}
              onChange={(value) => handleInfoChange("email", value)}
              required={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Program de lucru</h3>
          <div className="grid grid-cols-1 gap-4">
            <MultilingualInput
              id="schedule.weekdays"
              label="Luni - Vineri"
              value={formData.schedule.weekdays}
              onChange={(value) => handleScheduleChange("weekdays", value)}
              required={true}
            />

            <MultilingualInput
              id="schedule.saturday"
              label="Sâmbătă"
              value={formData.schedule.saturday}
              onChange={(value) => handleScheduleChange("saturday", value)}
              required={true}
            />

            <MultilingualInput
              id="schedule.sunday"
              label="Duminică"
              value={formData.schedule.sunday}
              onChange={(value) => handleScheduleChange("sunday", value)}
              required={true}
            />
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
