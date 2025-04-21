
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Determines if user is logged in (simulated for this example)
  const isLoggedIn = false; // In a real app, would check auth state here
  
  useEffect(() => {
    // Redirect to dashboard or login
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [navigate, isLoggedIn]);

  // This is just a fallback while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Carregando...</h1>
        <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
