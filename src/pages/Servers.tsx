
import { useState } from "react";
import { Server, Plus, RefreshCw, Play, Pause, AlertTriangle, ChevronDown, ChevronUp, Command, Settings, Trash, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Sample server data
const serverData = [
  {
    id: "srv-1",
    name: "MTA Roleplay",
    type: "mta",
    typeLabel: "MTA:SA",
    status: "online",
    cpu: 35,
    ram: 42,
    disk: 28,
    ip: "45.123.45.67",
    port: "22003",
    expiresIn: 18,
    autoRenew: true
  },
  {
    id: "srv-2",
    name: "Minecraft SMP",
    type: "minecraft",
    typeLabel: "Minecraft",
    status: "online",
    cpu: 60,
    ram: 75,
    disk: 52,
    ip: "45.123.45.68",
    port: "25565",
    expiresIn: 7,
    autoRenew: false
  },
  {
    id: "srv-3",
    name: "SAMP RPG",
    type: "samp",
    typeLabel: "SA:MP",
    status: "offline",
    cpu: 0,
    ram: 0,
    disk: 25,
    ip: "45.123.45.69",
    port: "7777",
    expiresIn: 3,
    autoRenew: false
  },
  {
    id: "srv-4",
    name: "MTA DM",
    type: "mta",
    typeLabel: "MTA:SA",
    status: "suspended",
    cpu: 0,
    ram: 0,
    disk: 30,
    ip: "45.123.45.70",
    port: "22004",
    expiresIn: 0,
    autoRenew: false
  }
];

export default function Servers() {
  const [servers, setServers] = useState(serverData);
  const [loading, setLoading] = useState<string | null>(null);
  const [expandedServer, setExpandedServer] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  
  const filteredServers = servers.filter(server => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return server.status === "online";
    if (selectedTab === "offline") return server.status === "offline";
    if (selectedTab === "suspended") return server.status === "suspended";
    return true;
  });

  const handleServerAction = (serverId: string, action: string) => {
    setLoading(serverId);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(null);
      
      setServers(prev => prev.map(server => {
        if (server.id === serverId) {
          let updatedServer = { ...server };
          
          if (action === "start") {
            updatedServer.status = "online";
            updatedServer.cpu = 10;
            updatedServer.ram = 15;
            toast.success(`${server.name} iniciado com sucesso!`);
          } else if (action === "stop") {
            updatedServer.status = "offline";
            updatedServer.cpu = 0;
            updatedServer.ram = 0;
            toast.success(`${server.name} parado com sucesso!`);
          } else if (action === "restart") {
            toast.success(`${server.name} reiniciado com sucesso!`);
          } else if (action === "renew") {
            updatedServer.expiresIn = 30;
            toast.success(`${server.name} renovado por mais 30 dias!`);
          } else if (action === "autorenew") {
            updatedServer.autoRenew = !server.autoRenew;
            toast.success(`Renovação automática ${updatedServer.autoRenew ? 'ativada' : 'desativada'} para ${server.name}!`);
          } else if (action === "reactivate") {
            updatedServer.status = "online";
            updatedServer.expiresIn = 30;
            toast.success(`${server.name} reativado com sucesso!`);
          }
          
          return updatedServer;
        }
        return server;
      }));
      
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <Server className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Servidores</h2>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Comprar novo servidor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comprar novo servidor</DialogTitle>
              <DialogDescription>
                Escolha o tipo de servidor que deseja comprar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <Button className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => window.location.href = "/store?type=mta"}>
                  <Server className="h-8 w-8" />
                  <span>MTA:SA</span>
                </Button>
                <Button className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => window.location.href = "/store?type=samp"}>
                  <Server className="h-8 w-8" />
                  <span>SA:MP</span>
                </Button>
                <Button className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => window.location.href = "/store?type=minecraft"}>
                  <Server className="h-8 w-8" />
                  <span>Minecraft</span>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => window.location.href = "/store"}>
                Ver todos os planos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        defaultValue="all"
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
          <TabsTrigger value="suspended">Suspensos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="space-y-4">
          {filteredServers.length > 0 ? (
            filteredServers.map((server) => (
              <Card key={server.id} className={
                server.status === "suspended" ? "border-red-200 dark:border-red-900" : 
                server.expiresIn <= 3 ? "border-yellow-200 dark:border-yellow-900" : ""
              }>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <CardTitle>{server.name}</CardTitle>
                      <Badge 
                        variant={server.type === "mta" ? "destructive" : 
                                server.type === "samp" ? "outline" : "default"}
                      >
                        {server.typeLabel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          server.status === "online" ? "bg-green-500" : 
                          server.status === "offline" ? "bg-gray-500" : 
                          "bg-red-500"
                        }
                      >
                        {server.status === "online" ? "Online" : 
                         server.status === "offline" ? "Offline" : 
                         "Suspenso"}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setExpandedServer(expandedServer === server.id ? null : server.id)}
                      >
                        {expandedServer === server.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    IP: {server.ip}:{server.port}
                    {server.expiresIn <= 3 && server.status !== "suspended" && (
                      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                        <AlertTriangle className="h-4 w-4" />
                        Expira em {server.expiresIn} dias
                      </span>
                    )}
                    {server.status === "suspended" && (
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-500">
                        <AlertTriangle className="h-4 w-4" />
                        Servidor suspenso por falta de pagamento
                      </span>
                    )}
                  </CardDescription>
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
                    <div className="h-10 flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {server.status === "offline" ? "Servidor offline" : "Servidor suspenso"}
                      </span>
                    </div>
                  )}

                  {expandedServer === server.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Detalhes do servidor</h4>
                          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <li>ID: {server.id}</li>
                            <li>IP: {server.ip}</li>
                            <li>Porta: {server.port}</li>
                            <li>Tipo: {server.typeLabel}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Estado</h4>
                          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <li>Status: {server.status === "online" ? "Online" : server.status === "offline" ? "Offline" : "Suspenso"}</li>
                            <li>Expira em: {server.expiresIn} dias</li>
                            <li>Renovação automática: {server.autoRenew ? "Ativada" : "Desativada"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Links rápidos</h4>
                          <div className="flex gap-2 flex-wrap">
                            <Button variant="outline" size="sm" className="h-8">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              Painel
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              <Command className="h-3.5 w-3.5 mr-1" />
                              Console
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    {server.expiresIn <= 7 && server.status !== "suspended" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mr-2"
                        disabled={loading === server.id}
                        onClick={() => handleServerAction(server.id, "renew")}
                      >
                        {loading === server.id ? "Processando..." : "Renovar agora"}
                      </Button>
                    )}
                    {server.status === "suspended" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mr-2"
                        disabled={loading === server.id}
                        onClick={() => handleServerAction(server.id, "reactivate")}
                      >
                        {loading === server.id ? "Processando..." : "Reativar servidor"}
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" disabled={loading === server.id}>
                          <Settings className="h-4 w-4 mr-2" />
                          Gerenciar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações do servidor</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.open(`https://panel.example.com/server/${server.id}`, "_blank")}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Acessar painel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleServerAction(server.id, "autorenew")}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {server.autoRenew ? "Desativar auto-renovação" : "Ativar auto-renovação"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info("Abrindo janela de upgrade...")}>
                          Fazer upgrade
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Abrindo configurações...")}>
                          Configurações
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Deletar servidor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex gap-2">
                    {server.status !== "suspended" && (
                      server.status === "online" ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={loading === server.id}
                            onClick={() => handleServerAction(server.id, "restart")}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reiniciar
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                            disabled={loading === server.id}
                            onClick={() => handleServerAction(server.id, "stop")}
                          >
                            <Pause className="h-4 w-4 mr-2" />
                            Parar
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={loading === server.id}
                          onClick={() => handleServerAction(server.id, "start")}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Iniciar
                        </Button>
                      )
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <Server className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum servidor encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                    {selectedTab === "all" 
                      ? "Você ainda não possui nenhum servidor. Compre seu primeiro servidor agora." 
                      : `Você não possui servidores com status "${selectedTab}".`}
                  </p>
                  <Button 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.location.href = "/store"}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Comprar servidor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
