import {
  Home,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Server,
  Ticket,
  PackagePlus,
} from "lucide-react";
import { CreditCard } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-gray-200 dark:border-gray-800 bg-black">
      <div className="px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Painel de Controle</h1>
      </div>
      <nav className="flex flex-col gap-2 mt-8">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <LayoutDashboard className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Dashboard</span>
        </a>
        <a
          href="/store"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <ShoppingBag className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Loja</span>
        </a>
        <a
          href="/servers"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <Server className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Servidores</span>
        </a>
        <a
          href="/transactions"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <PackagePlus className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Transações</span>
        </a>
        <a
          href="/tickets"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <Ticket className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Tickets</span>
        </a>

        {/* Adicionar saldo */}
        <a
          href="/saldo"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <CreditCard className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Adicionar saldo</span>
        </a>
        <a
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-700 transition rounded group"
        >
          <Settings className="w-5 h-5 text-red-400 group-hover:text-white" />
          <span>Configurações</span>
        </a>
      </nav>
      <div className="mt-auto p-4">
        <p className="text-xs text-gray-500 dark:text-gray-600">
          &copy; {new Date().getFullYear()} Sua Empresa
        </p>
      </div>
    </aside>
  );
}
