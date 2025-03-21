
import { useState, useEffect } from 'react';
import { PanelRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useSite } from '@/contexts/SiteContext';
import { useNavigate } from 'react-router-dom';

const AdminLink = () => {
  const { isAuthenticated } = useSite();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button 
          aria-label="Admin"
          className="p-2 text-white/60 hover:text-white transition-colors opacity-70 hover:opacity-100"
        >
          <PanelRight size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-medium">Panou de administrare</h3>
            <p className="text-sm text-gray-500">
              {isAuthenticated 
                ? 'Gestionează conținutul site-ului' 
                : 'Autentifică-te pentru a gestiona conținutul'}
            </p>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => {
              navigate(isAuthenticated ? '/admin/dashboard' : '/admin/login');
              setIsOpen(false);
            }}
          >
            {isAuthenticated ? 'Accesează panoul' : 'Autentificare'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminLink;
