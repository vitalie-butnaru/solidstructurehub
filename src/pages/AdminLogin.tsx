
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "@/contexts/SiteContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useSite();
  const navigate = useNavigate();

  // Dacă utilizatorul este autentificat, redirecționăm către dashboard
  if (isAuthenticated) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast.success("Autentificare reușită!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Autentificare eșuată. Verificați credențialele.");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-construction-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-construction-900">Admin Login</h1>
          <p className="mt-2 text-construction-600">Introduceți credențialele pentru a accesa panoul de administrare</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-construction-700">
                Utilizator
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-construction-700">
                Parolă
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-construction-accent hover:bg-construction-accent/90"
          >
            {isLoading ? "Se autentifică..." : "Autentificare"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-construction-accent hover:underline">
            Înapoi la site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
