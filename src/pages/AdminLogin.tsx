
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "@/contexts/SiteContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useSite();
  const navigate = useNavigate();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("admin_username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

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
        // Save credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem("admin_username", username);
        } else {
          localStorage.removeItem("admin_username");
        }
        
        toast.success("Autentificare reușită!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Autentificare eșuată. Verificați credențialele.");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-construction-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <ShieldCheck className="h-12 w-12 mx-auto text-construction-accent mb-2" />
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
                placeholder="Introduceți numele de utilizator"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-construction-700">
                Parolă
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 pr-10"
                  placeholder="Introduceți parola"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-construction-500 hover:text-construction-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-construction-600">
                Ține-mă minte
              </label>
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
