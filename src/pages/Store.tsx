
import { useState } from "react";
import { ShoppingCart, Server, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Dummy product data
const products = {
  mta: [
    {
      id: "mta-basic",
      name: "MTA Básico",
      description: "Servidor MTA ideal para comunidades pequenas",
      price: 25,
      cpu: "2 vCPU",
      ram: "2GB RAM",
      disk: "15GB SSD",
      slots: "50 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS"]
    },
    {
      id: "mta-standard",
      name: "MTA Standard",
      description: "Servidor MTA com bom desempenho para comunidades médias",
      price: 45,
      cpu: "4 vCPU",
      ram: "4GB RAM",
      disk: "30GB SSD",
      slots: "100 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS", "Domínio grátis"]
    },
    {
      id: "mta-premium",
      name: "MTA Premium",
      description: "Servidor MTA de alto desempenho para comunidades grandes",
      price: 80,
      cpu: "6 vCPU",
      ram: "8GB RAM",
      disk: "50GB SSD",
      slots: "200 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS", "Domínio grátis", "IP dedicado"]
    }
  ],
  samp: [
    {
      id: "samp-basic",
      name: "SAMP Básico",
      description: "Servidor SAMP ideal para projetos iniciantes",
      price: 20,
      cpu: "1 vCPU",
      ram: "1GB RAM",
      disk: "10GB SSD",
      slots: "50 slots",
      features: ["Painel de controle", "Backups semanais", "Suporte básico", "Proteção básica"]
    },
    {
      id: "samp-standard",
      name: "SAMP Standard",
      description: "Servidor SAMP para projetos estabelecidos",
      price: 40,
      cpu: "2 vCPU",
      ram: "2GB RAM",
      disk: "20GB SSD",
      slots: "100 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS"]
    },
    {
      id: "samp-premium",
      name: "SAMP Premium",
      description: "Servidor SAMP de alto desempenho para grandes comunidades",
      price: 70,
      cpu: "4 vCPU",
      ram: "4GB RAM",
      disk: "40GB SSD",
      slots: "200 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS", "IP dedicado"]
    }
  ],
  minecraft: [
    {
      id: "mc-basic",
      name: "Minecraft Básico",
      description: "Servidor Minecraft para jogar com amigos",
      price: 15,
      cpu: "2 vCPU",
      ram: "2GB RAM",
      disk: "10GB SSD",
      slots: "10 slots",
      features: ["Painel de controle", "Backups diários", "Plugins básicos", "Proteção básica"]
    },
    {
      id: "mc-standard",
      name: "Minecraft Standard",
      description: "Servidor Minecraft para pequenas comunidades",
      price: 30,
      cpu: "3 vCPU",
      ram: "4GB RAM",
      disk: "20GB SSD",
      slots: "20 slots",
      features: ["Painel de controle", "Backups diários", "Suporte 24/7", "Anti-DDoS", "Plugins premium"]
    },
    {
      id: "mc-premium",
      name: "Minecraft Premium",
      description: "Servidor Minecraft de alto desempenho para servidores populares",
      price: 60,
      cpu: "4 vCPU",
      ram: "8GB RAM",
      disk: "50GB SSD",
      slots: "50 slots",
      features: ["Painel de controle", "Backups diários", "Suporte prioritário", "Anti-DDoS", "Domínio grátis", "Plugins premium"]
    }
  ]
};

export default function Store() {
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = (productId: string) => {
    setPurchasing(productId);
    
    // Simulate API call
    setTimeout(() => {
      setPurchasing(null);
      toast.success("Servidor comprado com sucesso! Acesse-o na seção 'Meus Servidores'.");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Loja de Servidores</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Escolha o tipo de servidor que melhor atende às suas necessidades. Todos os servidores incluem painel de controle, backups e proteção contra DDoS.
      </p>
      
      <Tabs defaultValue="mta" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="mta">MTA:SA</TabsTrigger>
          <TabsTrigger value="samp">SA:MP</TabsTrigger>
          <TabsTrigger value="minecraft">Minecraft</TabsTrigger>
        </TabsList>
        
        {/* MTA Servers */}
        <TabsContent value="mta">
          <div className="grid gap-6 md:grid-cols-3">
            {products.mta.map((product) => (
              <Card key={product.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="destructive" className="bg-red-600">MTA:SA</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold mb-4">
                    R$ {product.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mês</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.ram}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.disk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.slots}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={!!purchasing}
                    onClick={() => handlePurchase(product.id)}
                  >
                    {purchasing === product.id ? "Processando..." : "Comprar agora"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* SAMP Servers */}
        <TabsContent value="samp">
          <div className="grid gap-6 md:grid-cols-3">
            {products.samp.map((product) => (
              <Card key={product.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="destructive" className="bg-red-600">SA:MP</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold mb-4">
                    R$ {product.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mês</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.ram}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.disk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.slots}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={!!purchasing}
                    onClick={() => handlePurchase(product.id)}
                  >
                    {purchasing === product.id ? "Processando..." : "Comprar agora"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Minecraft Servers */}
        <TabsContent value="minecraft">
          <div className="grid gap-6 md:grid-cols-3">
            {products.minecraft.map((product) => (
              <Card key={product.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="destructive" className="bg-red-600">Minecraft</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold mb-4">
                    R$ {product.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mês</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.ram}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.disk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-gray-500" />
                      <span>{product.slots}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={!!purchasing}
                    onClick={() => handlePurchase(product.id)}
                  >
                    {purchasing === product.id ? "Processando..." : "Comprar agora"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Informações adicionais</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Todos os servidores incluem painel de gerenciamento Pterodactyl para controle total</li>
              <li>Pagamentos são realizados com seu saldo na plataforma</li>
              <li>Suporte técnico disponível 24/7 para todos os planos</li>
              <li>Proteção contra DDoS incluída em todos os servidores</li>
              <li>Backups automáticos conforme especificações de cada plano</li>
              <li>Possibilidade de upgrade para planos superiores a qualquer momento</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
