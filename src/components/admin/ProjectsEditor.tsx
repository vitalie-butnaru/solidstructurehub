
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

interface ProjectsEditorProps {
  data: SiteData["projects"];
  onSave: (data: SiteData["projects"]) => void;
}

const ProjectsEditor = ({ data, onSave }: ProjectsEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [currentItem, setCurrentItem] = useState<{
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    category?: string;
    date?: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentItem) return;
    
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev!,
      [name]: value,
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
      title: '',
      description: '',
      imageSrc: '',
      category: '',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Editare Secțiune Proiecte</h2>
          <p className="text-sm text-gray-500 mt-1">
            Aceste proiecte vor apărea în slider-ul de pe pagina principală. 
            Folosiți imagini mari, de calitate, pentru cele mai bune rezultate.
          </p>
        </div>
        <a 
          href="#proiecte" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-construction-accent hover:text-construction-accent/80 text-sm flex items-center gap-1"
        >
          <span>Vezi secțiunea pe site</span>
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
              
              <h4 className="font-medium text-lg mt-4">{item.title}</h4>
              {item.category && <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{item.category}</span>}
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              {item.date && <p className="text-xs text-gray-500 mt-1">{item.date}</p>}
              <div className="mt-3 h-32 rounded-md bg-gray-200 overflow-hidden">
                {item.imageSrc && (
                  <img 
                    src={item.imageSrc} 
                    alt={item.title} 
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentItem && formData.items.some(item => item.id === currentItem.id) 
                ? 'Editare proiect' 
                : 'Adăugare proiect'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-title">Titlu</Label>
              <Input
                id="edit-title"
                name="title"
                value={currentItem?.title || ''}
                onChange={handleItemChange}
                required
                className="animate-fade-in"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Descriere</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={currentItem?.description || ''}
                onChange={handleItemChange}
                required
                className="animate-fade-in animate-delay-100"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-category">Categorie</Label>
              <Input
                id="edit-category"
                name="category"
                value={currentItem?.category || ''}
                onChange={handleItemChange}
                placeholder="Rezidențial, Industrial, etc."
                className="animate-fade-in animate-delay-150"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-date">Data proiectului</Label>
              <Input
                id="edit-date"
                name="date"
                value={currentItem?.date || ''}
                onChange={handleItemChange}
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
                onChange={handleItemChange}
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
