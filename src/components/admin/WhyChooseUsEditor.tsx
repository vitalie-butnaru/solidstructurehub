import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Pencil, Trash, Plus } from 'lucide-react';
import { SiteData } from "@/contexts/SiteContext";
import { LanguageContent, getLocalizedContent } from "@/utils/languageUtils";
import MultilingualInput from "./MultilingualInput";

interface WhyChooseUsEditorProps {
  data: SiteData["whyChooseUs"];
  onSave: (data: SiteData["whyChooseUs"]) => void;
}

type BenefitItem = {
  id: string;
  title: string | LanguageContent;
  description: string | LanguageContent;
};

const WhyChooseUsEditor = ({ data, onSave }: WhyChooseUsEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [currentItem, setCurrentItem] = useState<BenefitItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultilingualChange = (field: string, value: LanguageContent) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemMultilingualChange = (field: string, value: LanguageContent) => {
    if (!currentItem) return;
    
    setCurrentItem((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleEditItem = (item: BenefitItem) => {
    setCurrentItem({ ...item });
    setDialogOpen(true);
  };

  const handleAddItem = () => {
    setCurrentItem({
      id: `benefit-${Date.now()}`,
      title: { ro: '', en: '', ru: '' },
      description: { ro: '', en: '', ru: '' },
    });
    setDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter(item => item.id !== id)
    }));
  };

  const handleSaveItem = () => {
    if (!currentItem) return;

    if (formData.benefits.some(item => item.id === currentItem.id)) {
      // Editare
      setFormData((prev) => ({
        ...prev,
        benefits: prev.benefits.map(item => 
          item.id === currentItem.id ? currentItem : item
        )
      }));
    } else {
      // Adăugare
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, currentItem]
      }));
    }

    setCurrentItem(null);
    setDialogOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune "De ce să ne alegi"</h2>

      <div className="space-y-4">
        <MultilingualInput
          id="whychooseus-title"
          label="Titlu secțiune"
          value={formData.title}
          onChange={(value) => handleMultilingualChange("title", value)}
          required={true}
        />

        <MultilingualInput
          id="whychooseus-description"
          label="Descriere secțiune"
          value={formData.description}
          onChange={(value) => handleMultilingualChange("description", value)}
          multiline={true}
          required={true}
        />

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
            Această imagine va fi afișată ca pattern în fundal (cu transparență)
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Beneficii</h3>
            <Button 
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adaugă beneficiu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.benefits.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border rounded-md bg-gray-50 relative"
              >
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <h4 className="font-medium text-lg mt-4">{getLocalizedContent(item.title, 'ro')}</h4>
                <p className="text-sm text-gray-600 mt-1">{getLocalizedContent(item.description, 'ro')}</p>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentItem && formData.benefits.some(item => item.id === currentItem.id) 
                ? 'Editare beneficiu' 
                : 'Adăugare beneficiu'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <MultilingualInput
              id="edit-title"
              label="Titlu"
              value={currentItem?.title || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleItemMultilingualChange("title", value)}
              required={true}
            />
            
            <MultilingualInput
              id="edit-description"
              label="Descriere"
              value={currentItem?.description || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleItemMultilingualChange("description", value)}
              multiline={true}
              required={true}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Anulează</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleSaveItem}
              className="bg-construction-accent"
            >
              Salvează
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  );
};

export default WhyChooseUsEditor;
