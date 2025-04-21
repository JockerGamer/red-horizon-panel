
import { CreditCard, Server, ShoppingCart, LifeBuoy, ArrowUpRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Dummy server data for demonstration
  const servers = [
    {
      id: 1,
      name: "MTA Server #1",
      type: "MTA:SA",
      status: "online",
      cpu: 23,
      ram: 45,
      disk: 17,
    },
    {
      id: 2,
      name: "Minecraft SMP",
      type: "Minecraft",
      status: "offline",
      cpu: 0,
      ram: 0,
      disk: 32,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bem-vindo ao seu Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Veja suas estatísticas e gerencie seus servidores
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/store")}
            className="flex gap-2 items-center"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar servidor</span>
          </Button>
          <Button 
            onClick={() => {/* Add credit logic */}}
            className="bg-red-600 hover:bg-red-700 flex gap-2 items-center"
          >
            <CreditCard className="w-4 h-4" />
            <span>Adicionar saldo</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Saldo atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              R$ 0,00
            </div>
            <Button variant="link" className="p-0 h-auto text-xs text-red-600 dark:text-red-500">
              Adicionar saldo <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Servidores ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              1/2
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              50% de seus servidores estão ativos
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Próximo pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              7 dias
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              23/04/2025
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tickets abertos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              0
            </div>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs text-red-600 dark:text-red-500"
              onClick={() => navigate("/tickets/new")}
            >
              Abrir novo ticket <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Servers section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Seus servidores
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/servers")}
          >
            Ver todos
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {servers.map((server) => (
            <Card key={server.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <CardTitle>{server.name}</CardTitle>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    server.status === "online" 
                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500" 
                      : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-500"
                  }`}>
                    {server.status === "online" ? "Online" : "Offline"}
                  </div>
                </div>
                <CardDescription>{server.type}</CardDescription>
              </CardHeader>
              <CardContent>
                {server.status === "online" ? (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">CPU</span>
                        <span className="text-xs font-medium">{server.cpu}%</span>
                      </div>
                      <Progress value={server.cpu} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">RAM</span>
                        <span className="text-xs font-medium">{server.ram}%</span>
                      </div>
                      <Progress value={server.ram} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Disco</span>
                        <span className="text-xs font-medium">{server.disk}%</span>
                      </div>
                      <Progress value={server.disk} className="h-1" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Servidor desligado</span>
                  </div>
                )}
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm">Gerenciar</Button>
                  {server.status === "offline" ? (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Iniciar</Button>
                  ) : (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">Parar</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty server card - for demonstration */}
          <Card className="border-dashed border-2 border-gray-200 dark:border-gray-800 bg-transparent">
            <CardContent className="flex flex-col items-center justify-center h-[215px] text-center p-6">
              <ShoppingCart className="h-8 w-8 text-gray-400 dark:text-gray-600 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Adicione mais servidores
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Expanda sua infraestrutura com mais servidores
              </p>
              <Button 
                onClick={() => navigate("/store")}
                className="bg-red-600 hover:bg-red-700"
              >
                Comprar servidor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support tickets */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Suporte
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/tickets")}
          >
            Ver todos
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center text-center p-6 py-8">
            <LifeBuoy className="h-8 w-8 text-gray-400 dark:text-gray-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Precisa de ajuda?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
              Nossa equipe de suporte está disponível 24/7 para ajudar você com qualquer problema ou dúvida.
            </p>
            <Button 
              onClick={() => navigate("/tickets/new")}
              className="bg-red-600 hover:bg-red-700"
            >
              Abrir ticket
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
