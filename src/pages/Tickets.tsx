
import { LifeBuoy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Tickets() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex items-center gap-3">
        <LifeBuoy className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Suporte</h2>
        <Button 
          className="ml-auto bg-red-600 hover:bg-red-700 gap-2" 
          onClick={() => navigate("/tickets/new")}
        >
          <Plus className="h-4 w-4" />
          Abrir novo ticket
        </Button>
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-4">
        Em breve: acompanhe aqui todos os seus tickets de suporte, veja status e interaja com o suporte técnico!
      </div>
    </div>
  );
}
