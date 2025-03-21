
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
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Pencil, Trash, Plus } from 'lucide-react';
import { SiteData } from "@/contexts/SiteContext";

interface ServicesEditorProps {
  data: SiteData["services"];
  onSave: (data: SiteData["services"]) => void;
}

const ServicesEditor = ({ data, onSave }: ServicesEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [currentItem, setCurrentItem] = useState<{
    id: string;
    title: string;
    description: string;
    imageSrc: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    setCurrentItem({
      id: `service-${Date.now()}`,
      title: '',
      description: '',
      imageSrc: '',
    });
    setDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
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
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Servicii</h2>

      <div className="space-y-4">
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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Servicii</h3>
            <Button 
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adaugă serviciu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.items.map((item) => (
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
                
                <h4 className="font-medium text-lg mt-4">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="mt-3 h-24 rounded-md bg-gray-200 overflow-hidden">
                  {item.imageSrc && (
                    <img 
                      src={item.imageSrc} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
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
              {currentItem && formData.items.some(item => item.id === currentItem.id) 
                ? 'Editare serviciu' 
                : 'Adăugare serviciu'}
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
              />
              {currentItem?.imageSrc && (
                <div className="mt-2 rounded-md overflow-hidden h-32">
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

export default ServicesEditor;
