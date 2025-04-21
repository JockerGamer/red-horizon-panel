
import { useState } from "react";
import { Settings as SettingsIcon, Save, Key, Mail, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Perfil atualizado com sucesso!");
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Senha alterada com sucesso!");
    }, 1000);
  };

  return (
    <div className="container max-w-5xl mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h2>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <Mail className="h-4 w-4" />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Key className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            <span>Preferências</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" defaultValue="João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" defaultValue="joao@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Seu endereço completo" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar alterações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleChangePassword}>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Gerenciar sua senha e segurança da conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Autenticação em dois fatores</Label>
                    <Switch id="two-factor" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ative a autenticação em dois fatores para maior segurança da sua conta.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar senha"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Escolha como deseja receber notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba atualizações sobre seus servidores por email.
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertas de Renovação</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba lembretes quando um servidor estiver prestes a expirar.
                    </p>
                  </div>
                  <Switch id="renewal-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações de Suporte</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba notificações quando um ticket de suporte for respondido.
                    </p>
                  </div>
                  <Switch id="support-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações Promocionais</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba ofertas especiais e promoções.
                    </p>
                  </div>
                  <Switch id="promo-notifications" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast.success("Preferências de notificações salvas!")}>
                Salvar preferências
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Preferências</CardTitle>
              <CardDescription>
                Personalize sua experiência na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Renovação Automática</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Renovar servidores automaticamente quando estiverem prestes a expirar (se houver saldo).
                    </p>
                  </div>
                  <Switch id="auto-renewal" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Idioma Preferido</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha o idioma padrão da plataforma.
                    </p>
                  </div>
                  <select className="rounded-md border border-gray-300 bg-transparent p-2 text-sm dark:border-gray-700">
                    <option value="pt-br">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast.success("Preferências salvas com sucesso!")}>
                Salvar preferências
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
