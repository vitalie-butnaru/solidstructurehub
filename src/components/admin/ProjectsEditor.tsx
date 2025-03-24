
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Pencil, Trash, Plus, Image, ExternalLink } from 'lucide-react';
import { SiteData } from "@/contexts/SiteContext";
import MultilingualInput from "./MultilingualInput";

interface ProjectsEditorProps {
  data: SiteData["projects"];
  onSave: (data: SiteData["projects"]) => void;
}

// Helper type for project item form
type ProjectItemForm = {
  id: number;
  title: string | { ro: string; en: string; ru: string };
  description: string | { ro: string; en: string; ru: string };
  imageSrc: string;
  category?: string | { ro: string; en: string; ru: string };
  date?: string;
};

// Helper to ensure we have a multilingual structure
const ensureMultilingual = (value: string | { ro: string; en: string; ru: string }) => {
  if (typeof value === 'string') {
    return { ro: value, en: value, ru: value };
  }
  return value;
};

const ProjectsEditor = ({ data, onSave }: ProjectsEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [currentItem, setCurrentItem] = useState<ProjectItemForm | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSimpleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentItem) return;
    
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleMultilingualChange = (field: string, value: { ro: string; en: string; ru: string }) => {
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

  const handleEditItem = (item: typeof currentItem) => {
    setCurrentItem({ ...item! });
    setDialogOpen(true);
  };

  const handleAddItem = () => {
    // Găsim cel mai mare ID curent și adăugăm 1
    const maxId = formData.items.reduce((max, item) => Math.max(max, item.id), 0);
    
    setCurrentItem({
      id: maxId + 1,
      title: { ro: '', en: '', ru: '' },
      description: { ro: '', en: '', ru: '' },
      imageSrc: '',
      category: { ro: '', en: '', ru: '' },
      date: '',
    });
    setDialogOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleSaveItem = () => {
    if (!currentItem) return;

    if (formData.items.some(item => item.id === currentItem.id)) {
      // Editare
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === currentItem.id ? currentItem : item
        )
      }));
    } else {
      // Adăugare
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, currentItem]
      }));
    }

    setCurrentItem(null);
    setDialogOpen(false);
  };

  // Helper to get language content for display
  const getLocalizedContent = (content: string | { ro: string; en: string; ru: string }) => {
    if (typeof content === 'string') return content;
    return content.ro || content.en || content.ru || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Editare Secțiune Proiecte</h2>
          <p className="text-sm text-gray-500 mt-1">
            Aceste proiecte vor apărea în slider-ul de pe pagina principală și pe pagina dedicată proiectelor. 
            Folosiți imagini mari, de calitate, pentru cele mai bune rezultate.
          </p>
        </div>
        <a 
          href="/proiecte" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-construction-accent hover:text-construction-accent/80 text-sm flex items-center gap-1"
        >
          <span>Vezi pagina proiecte</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Proiecte</h3>
          <Button 
            type="button"
            variant="outline"
            onClick={handleAddItem}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Adaugă proiect
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {formData.items.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border rounded-md bg-gray-50 relative hover:shadow-md transition-shadow"
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
              
              <h4 className="font-medium text-lg mt-4">{getLocalizedContent(item.title)}</h4>
              {item.category && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {getLocalizedContent(item.category)}
                </span>
              )}
              <p className="text-sm text-gray-600 mt-1">{getLocalizedContent(item.description)}</p>
              {item.date && <p className="text-xs text-gray-500 mt-1">{item.date}</p>}
              <div className="mt-3 h-32 rounded-md bg-gray-200 overflow-hidden">
                {item.imageSrc && (
                  <img 
                    src={item.imageSrc} 
                    alt={getLocalizedContent(item.title)} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-construction-accent hover:bg-construction-accent/90 transition-colors">
          Salvează modificările
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentItem && formData.items.some(item => item.id === currentItem.id) 
                ? 'Editare proiect' 
                : 'Adăugare proiect'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <MultilingualInput
              id="edit-title"
              label="Titlu"
              value={currentItem?.title || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleMultilingualChange("title", value)}
              required={true}
              className="animate-fade-in"
            />
            
            <MultilingualInput
              id="edit-description"
              label="Descriere"
              value={currentItem?.description || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleMultilingualChange("description", value)}
              multiline={true}
              required={true}
              className="animate-fade-in animate-delay-100"
            />
            
            <MultilingualInput
              id="edit-category"
              label="Categorie"
              value={currentItem?.category || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleMultilingualChange("category", value)}
              placeholder="Rezidențial, Industrial, etc."
              className="animate-fade-in animate-delay-150"
            />
            
            <div>
              <Label htmlFor="edit-date">Data proiectului</Label>
              <Input
                id="edit-date"
                name="date"
                value={currentItem?.date || ''}
                onChange={handleSimpleItemChange}
                placeholder="Octombrie 2023"
                className="animate-fade-in animate-delay-150"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-imageSrc">URL imagine</Label>
              <Input
                id="edit-imageSrc"
                name="imageSrc"
                value={currentItem?.imageSrc || ''}
                onChange={handleSimpleItemChange}
                placeholder="https://example.com/image.jpg"
                required
                className="animate-fade-in animate-delay-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pentru cele mai bune rezultate, folosiți imagini landscape (orizontale) de înaltă rezoluție
              </p>
              {currentItem?.imageSrc && (
                <div className="mt-2 rounded-md overflow-hidden h-32 animate-fade-in">
                  <img 
                    src={currentItem.imageSrc}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Anulează</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleSaveItem}
              className="bg-construction-accent hover:bg-construction-accent/90 transition-colors"
            >
              Salvează
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default ProjectsEditor;
