
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Server,
  CreditCard,
  LifeBuoy,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, isActive, isCollapsed }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
        isActive
          ? "bg-red-600/10 text-red-600 dark:bg-red-600/20 dark:text-red-500 font-medium"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        isCollapsed && "justify-center py-3"
      )}
    >
      <Icon size={isCollapsed ? 20 : 18} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLinkActive = (path: string) => {
    return location.pathname === path || 
      (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">GameHost</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mx-auto">
            <Server className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Add credit button */}
      <div className="px-3 mb-2 mt-2">
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white" 
          size={collapsed ? "icon" : "default"}
        >
          <Plus className="h-4 w-4 mr-1" />
          {!collapsed && "Adicionar Saldo"}
        </Button>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <nav className="space-y-1">
          <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" isActive={isLinkActive("/")} isCollapsed={collapsed} />
          <SidebarLink to="/servers" icon={Server} label="Meus Servidores" isActive={isLinkActive("/servers")} isCollapsed={collapsed} />
          <SidebarLink to="/store" icon={ShoppingCart} label="Loja" isActive={isLinkActive("/store")} isCollapsed={collapsed} />
          <SidebarLink to="/transactions" icon={CreditCard} label="Transações" isActive={isLinkActive("/transactions")} isCollapsed={collapsed} />
          <SidebarLink to="/tickets" icon={LifeBuoy} label="Suporte" isActive={isLinkActive("/tickets")} isCollapsed={collapsed} />
          <SidebarLink to="/settings" icon={Settings} label="Configurações" isActive={isLinkActive("/settings")} isCollapsed={collapsed} />
        </nav>
      </div>

      {/* User and logout */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3">
        <div className="flex items-center gap-3 mb-3">
          {!collapsed && (
            <>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white truncate">Usuário</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">user@example.com</p>
              </div>
            </>
          )}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth/login");
            }}
            className={cn(
              "flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500",
              collapsed && "mx-auto"
            )}
          >
            <LogOut size={20} />
          </button>
        </div>
        
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="ml-2 text-sm">Recolher</span>}
        </button>
      </div>
    </div>
  );
}
