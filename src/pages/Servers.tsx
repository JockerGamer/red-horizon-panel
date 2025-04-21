
import { Server, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Servers() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-3 items-center">
          <Server className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Servidores</h2>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          Comprar novo servidor
        </Button>
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-4">
        Você ainda não possui nenhum servidor ativo nesta conta.<br/>
        Use o botão acima para adquirir seu primeiro servidor de MTA, SAMP ou Minecraft!
      </div>
    </div>
  );
}
