
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Pencil, Trash, Plus, ImagePlus } from 'lucide-react';
import { SiteData } from "@/contexts/SiteContext";
import MultilingualInput from "./MultilingualInput";

interface ServicesEditorProps {
  data: SiteData["services"];
  onSave: (data: SiteData["services"]) => void;
}

const ServicesEditor = ({ data, onSave }: ServicesEditorProps) => {
  const [formData, setFormData] = useState({ ...data });
  const [currentItem, setCurrentItem] = useState<{
    id: string;
    title: string | { ro: string; en: string; ru: string };
    description: string | { ro: string; en: string; ru: string };
    imageSrc: string;
    galleryImages: string[];
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMultilingualChange = (field: string, value: { ro: string; en: string; ru: string }) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemMultilingualChange = (field: string, value: { ro: string; en: string; ru: string }) => {
    if (!currentItem) return;
    
    setCurrentItem((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSimpleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      title: { ro: '', en: '', ru: '' },
      description: { ro: '', en: '', ru: '' },
      imageSrc: '',
      galleryImages: [],
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

  const handleAddGalleryImage = () => {
    if (!currentItem) return;
    
    setCurrentItem(prev => ({
      ...prev!,
      galleryImages: [...prev!.galleryImages, ""]
    }));
  };

  const handleGalleryImageChange = (index: number, value: string) => {
    if (!currentItem) return;
    
    setCurrentItem(prev => {
      const newImages = [...prev!.galleryImages];
      newImages[index] = value;
      return {
        ...prev!,
        galleryImages: newImages
      };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (!currentItem) return;
    
    setCurrentItem(prev => {
      const newImages = [...prev!.galleryImages];
      newImages.splice(index, 1);
      return {
        ...prev!,
        galleryImages: newImages
      };
    });
  };

  // Helper to get language content for display
  const getLocalizedContent = (content: string | { ro: string; en: string; ru: string }) => {
    if (typeof content === 'string') return content;
    return content.ro || content.en || content.ru || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Editare Secțiune Servicii</h2>

      <div className="space-y-4">
        <MultilingualInput
          id="services-title"
          label="Titlu secțiune"
          value={formData.title}
          onChange={(value) => handleMultilingualChange("title", value)}
          required={true}
        />

        <MultilingualInput
          id="services-description"
          label="Descriere secțiune"
          value={formData.description}
          onChange={(value) => handleMultilingualChange("description", value)}
          multiline={true}
          required={true}
        />

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
                
                <h4 className="font-medium text-lg mt-4">{getLocalizedContent(item.title)}</h4>
                <p className="text-sm text-gray-600 mt-1">{getLocalizedContent(item.description)}</p>
                <div className="mt-3 h-24 rounded-md bg-gray-200 overflow-hidden">
                  {item.imageSrc && (
                    <img 
                      src={item.imageSrc} 
                      alt={getLocalizedContent(item.title)} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ImagePlus className="h-3 w-3 mr-1" />
                    <span>{item.galleryImages.length} imagini în galerie</span>
                  </div>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentItem && formData.items.some(item => item.id === currentItem.id) 
                ? 'Editare serviciu' 
                : 'Adăugare serviciu'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultilingualInput
                id="edit-service-title"
                label="Titlu"
                value={currentItem?.title || { ro: '', en: '', ru: '' }}
                onChange={(value) => handleItemMultilingualChange("title", value)}
                required={true}
              />
              
              <div>
                <Label htmlFor="edit-imageSrc">URL imagine principală</Label>
                <Input
                  id="edit-imageSrc"
                  name="imageSrc"
                  value={currentItem?.imageSrc || ''}
                  onChange={handleSimpleItemChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            
            <MultilingualInput
              id="edit-service-description"
              label="Descriere"
              value={currentItem?.description || { ro: '', en: '', ru: '' }}
              onChange={(value) => handleItemMultilingualChange("description", value)}
              multiline={true}
              required={true}
            />
            
            {currentItem?.imageSrc && (
              <div className="rounded-md overflow-hidden h-32">
                <img 
                  src={currentItem.imageSrc}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Galerie imagini</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddGalleryImage}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Adaugă imagine
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentItem?.galleryImages.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                        placeholder="URL imagine"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {image && (
                      <div className="h-24 rounded-md overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
