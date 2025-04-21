
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <SettingsIcon className="w-12 h-12 text-red-500" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        Gerencie suas configurações de conta, senha e preferências neste espaço. Conteúdo em breve!
      </p>
    </div>
  );
}
