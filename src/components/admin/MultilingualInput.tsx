
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RO, GB, RU } from 'country-flag-icons/react/3x2';
import { LanguageContent, ensureMultilingual } from "@/utils/languageUtils";

interface MultilingualInputProps {
  id: string;
  label: string;
  value: string | LanguageContent;
  onChange: (value: LanguageContent) => void;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const MultilingualInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  multiline = false, 
  placeholder = "", 
  required = false,
  className = "" 
}: MultilingualInputProps) => {
  // Convert string values to multilingual object if needed
  const [content, setContent] = useState<LanguageContent>(ensureMultilingual(value));

  // Update content if value changes externally
  useEffect(() => {
    setContent(ensureMultilingual(value));
  }, [value]);

  // Current active language tab
  const [activeTab, setActiveTab] = useState<"ro" | "en" | "ru">("ro");

  const handleChange = (lang: keyof LanguageContent, newValue: string) => {
    const updatedContent = { ...content, [lang]: newValue };
    setContent(updatedContent);
    onChange(updatedContent);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      
      <Tabs defaultValue="ro" value={activeTab} onValueChange={(v) => setActiveTab(v as "ro" | "en" | "ru")}>
        <TabsList className="w-full flex mb-2 bg-gray-100 p-1 rounded">
          <TabsTrigger 
            value="ro" 
            className="flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-white rounded"
          >
            <RO className="w-4 h-4" /> 
            <span>Română</span>
          </TabsTrigger>
          <TabsTrigger 
            value="en" 
            className="flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-white rounded"
          >
            <GB className="w-4 h-4" /> 
            <span>English</span>
          </TabsTrigger>
          <TabsTrigger 
            value="ru" 
            className="flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-white rounded"
          >
            <RU className="w-4 h-4" /> 
            <span>Русский</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ro" className="mt-0">
          {multiline ? (
            <Textarea
              id={`${id}-ro`}
              value={content.ro}
              onChange={(e) => handleChange("ro", e.target.value)}
              placeholder={placeholder || "Conținut în română"}
              required={required && activeTab === "ro"}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              id={`${id}-ro`}
              value={content.ro}
              onChange={(e) => handleChange("ro", e.target.value)}
              placeholder={placeholder || "Conținut în română"}
              required={required && activeTab === "ro"}
            />
          )}
        </TabsContent>
        
        <TabsContent value="en" className="mt-0">
          {multiline ? (
            <Textarea
              id={`${id}-en`}
              value={content.en}
              onChange={(e) => handleChange("en", e.target.value)}
              placeholder={placeholder || "Content in English"}
              required={required && activeTab === "en"}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              id={`${id}-en`}
              value={content.en}
              onChange={(e) => handleChange("en", e.target.value)}
              placeholder={placeholder || "Content in English"}
              required={required && activeTab === "en"}
            />
          )}
        </TabsContent>
        
        <TabsContent value="ru" className="mt-0">
          {multiline ? (
            <Textarea
              id={`${id}-ru`}
              value={content.ru}
              onChange={(e) => handleChange("ru", e.target.value)}
              placeholder={placeholder || "Содержание на русском"}
              required={required && activeTab === "ru"}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              id={`${id}-ru`}
              value={content.ru}
              onChange={(e) => handleChange("ru", e.target.value)}
              placeholder={placeholder || "Содержание на русском"}
              required={required && activeTab === "ru"}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultilingualInput;
