import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileX, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <FileX className="h-16 w-16 text-red-600 dark:text-red-500" />
          </div>
        </div>
        <h1 className="text-7xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Página não encontrada</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button 
          asChild 
          className="bg-red-600 hover:bg-red-700"
        >
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Voltar para o Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
