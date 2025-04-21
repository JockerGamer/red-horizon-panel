
import { ShoppingCart } from "lucide-react";

export default function Store() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <ShoppingCart className="w-12 h-12 text-red-500" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Loja</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        Em breve: aqui você poderá comprar servidores de MTA, SAMP e Minecraft! Selecione o tipo desejado, finalize a compra e veja as informações completas direto pelo painel.
      </p>
    </div>
  );
}
