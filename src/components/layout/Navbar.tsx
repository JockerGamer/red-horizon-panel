
import { useState } from "react";
import { Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-black">
      <div className="flex-1">
        {/* Space for breadcrumbs or page title */}
      </div>
      
      <div className="flex items-center gap-3">
        {/* Balance */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saldo:</span>
          <span className="text-sm font-bold text-green-600 dark:text-green-500">R$ 0,00</span>
        </div>
        
        {/* Theme toggle */}
        <Button
          variant="outline"
          size="icon"
          className="border-gray-200 dark:border-gray-800"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative border-gray-200 dark:border-gray-800"
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-400">
              Nenhuma notificação no momento
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-gray-800"
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-500">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
