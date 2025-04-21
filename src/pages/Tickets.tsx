
import { useState } from "react";
import { LifeBuoy, Plus, Send, Paperclip, Search, Clock, CheckCircle, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Sample ticket data
const ticketData = [
  {
    id: "TK-1001",
    title: "Problemas para iniciar MTA Server",
    category: "technical",
    status: "open",
    priority: "high",
    createdAt: "2025-04-15T14:30:00Z",
    updatedAt: "2025-04-16T10:22:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Você",
        content: "Estou tentando iniciar meu servidor MTA, mas está apresentando erro. A tela fica preta e depois fecha. Log de erro anexado.",
        timestamp: "2025-04-15T14:30:00Z",
        attachment: "error_log.txt"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Suporte",
        content: "Olá! Analisei o log de erro e parece que há um problema com um dos recursos que você está tentando iniciar. Desative o recurso 'custom_hud' e tente iniciar novamente.",
        timestamp: "2025-04-15T15:45:00Z"
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Você",
        content: "Desativei o recurso, mas continua apresentando erro. Agora a mensagem é diferente.",
        timestamp: "2025-04-16T09:15:00Z"
      },
      {
        id: "msg-4",
        sender: "support",
        senderName: "Suporte",
        content: "Vamos tentar outra abordagem. Por favor, forneça o novo log de erro e também verifique se há arquivos corrompidos na pasta do servidor.",
        timestamp: "2025-04-16T10:22:00Z"
      }
    ]
  },
  {
    id: "TK-1002",
    title: "Dúvida sobre renovação automática",
    category: "billing",
    status: "closed",
    priority: "medium",
    createdAt: "2025-04-10T09:15:00Z",
    updatedAt: "2025-04-10T14:20:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Você",
        content: "Gostaria de saber como funciona a renovação automática. Se eu ativar, o valor será debitado automaticamente do meu saldo?",
        timestamp: "2025-04-10T09:15:00Z"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Suporte",
        content: "Olá! Sim, a renovação automática utiliza o saldo disponível em sua conta. Se não houver saldo suficiente na data de renovação, você receberá uma notificação e o servidor não será renovado automaticamente. Você pode ativar ou desativar essa opção a qualquer momento nas configurações do servidor.",
        timestamp: "2025-04-10T10:30:00Z"
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Você",
        content: "Entendi, muito obrigado pela explicação!",
        timestamp: "2025-04-10T11:45:00Z"
      },
      {
        id: "msg-4",
        sender: "support",
        senderName: "Suporte",
        content: "Disponha! Se tiver mais alguma dúvida, estamos à disposição. Vou encerrar este ticket, mas você pode reabri-lo se precisar de mais informações.",
        timestamp: "2025-04-10T14:20:00Z"
      }
    ]
  },
  {
    id: "TK-1003",
    title: "Solicitação de reembolso",
    category: "billing",
    status: "pending",
    priority: "high",
    createdAt: "2025-04-18T16:10:00Z",
    updatedAt: "2025-04-19T11:30:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Você",
        content: "Comprei um servidor Minecraft por engano, gostaria de solicitar reembolso. Ainda não utilizei o servidor.",
        timestamp: "2025-04-18T16:10:00Z"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Suporte",
        content: "Olá! Podemos processar seu reembolso, já que o servidor não foi utilizado. Por favor, confirme o ID do servidor e a data da compra para que possamos prosseguir.",
        timestamp: "2025-04-18T17:25:00Z"
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Você",
        content: "O ID do servidor é MC-2543 e a compra foi realizada hoje, dia 18/04/2025.",
        timestamp: "2025-04-19T10:05:00Z"
      },
      {
        id: "msg-4",
        sender: "support",
        senderName: "Suporte",
        content: "Obrigado pelas informações. Solicitei o reembolso ao departamento financeiro e estamos aguardando aprovação. Assim que for processado, você receberá o valor de volta em seu saldo. Aguarde nossa confirmação, por favor.",
        timestamp: "2025-04-19T11:30:00Z"
      }
    ]
  }
];

export default function Tickets() {
  const [tickets, setTickets] = useState(ticketData);
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newTicketData, setNewTicketData] = useState({
    title: "",
    category: "technical",
    message: "",
    file: null
  });
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  
  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const currentTicket = tickets.find(ticket => ticket.id === activeTicket);
  
  // Handle creating a new ticket
  const handleCreateTicket = () => {
    if (!newTicketData.title || !newTicketData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    const newTicket = {
      id: `TK-${1000 + tickets.length + 1}`,
      title: newTicketData.title,
      category: newTicketData.category,
      status: "open",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-1`,
          sender: "user",
          senderName: "Você",
          content: newTicketData.message,
          timestamp: new Date().toISOString(),
          attachment: newTicketData.file ? (newTicketData.file as File).name : null
        }
      ]
    };
    
    setTickets([newTicket, ...tickets]);
    setNewTicketData({
      title: "",
      category: "technical",
      message: "",
      file: null
    });
    setNewTicketOpen(false);
    toast.success("Ticket criado com sucesso!");
  };
  
  // Handle sending a reply
  const handleSendReply = () => {
    if (!replyMessage) {
      toast.error("Por favor, digite uma mensagem");
      return;
    }
    
    setSendingReply(true);
    
    // Simulate API call
    setTimeout(() => {
      setSendingReply(false);
      
      setTickets(prev => prev.map(ticket => {
        if (ticket.id === activeTicket) {
          const updatedTicket = { ...ticket };
          updatedTicket.messages = [
            ...updatedTicket.messages,
            {
              id: `msg-${updatedTicket.messages.length + 1}`,
              sender: "user",
              senderName: "Você",
              content: replyMessage,
              timestamp: new Date().toISOString()
            }
          ];
          updatedTicket.updatedAt = new Date().toISOString();
          updatedTicket.status = "pending";
          
          return updatedTicket;
        }
        return ticket;
      }));
      
      setReplyMessage("");
      toast.success("Resposta enviada com sucesso!");
      
      // Simulate support reply after 3 seconds
      setTimeout(() => {
        setTickets(prev => prev.map(ticket => {
          if (ticket.id === activeTicket) {
            const updatedTicket = { ...ticket };
            updatedTicket.messages = [
              ...updatedTicket.messages,
              {
                id: `msg-${updatedTicket.messages.length + 1}`,
                sender: "support",
                senderName: "Suporte",
                content: "Recebemos sua mensagem e estamos analisando. Em breve retornaremos com mais informações.",
                timestamp: new Date().toISOString()
              }
            ];
            updatedTicket.updatedAt = new Date().toISOString();
            
            return updatedTicket;
          }
          return ticket;
        }));
      }, 3000);
    }, 1000);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Get appropriate badge color for ticket status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Aberto</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Aguardando</Badge>;
      case "closed":
        return <Badge className="bg-gray-500">Fechado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LifeBuoy className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Suporte</h2>
        </div>
        <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Abrir novo ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Abrir novo ticket de suporte</DialogTitle>
              <DialogDescription>
                Preencha o formulário abaixo para abrir um novo ticket. Nossa equipe responderá o mais rápido possível.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Assunto
                </label>
                <Input 
                  id="title" 
                  placeholder="Descreva o assunto do seu ticket"
                  value={newTicketData.title}
                  onChange={(e) => setNewTicketData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Categoria
                </label>
                <Select 
                  value={newTicketData.category} 
                  onValueChange={(value) => setNewTicketData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Problema técnico</SelectItem>
                    <SelectItem value="billing">Pagamento/Financeiro</SelectItem>
                    <SelectItem value="account">Conta/Acesso</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva seu problema em detalhes"
                  rows={5}
                  value={newTicketData.message}
                  onChange={(e) => setNewTicketData(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">
                  Anexo (opcional)
                </label>
                <Input 
                  id="file" 
                  type="file" 
                  onChange={(e) => setNewTicketData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                />
                <p className="text-xs text-gray-500">
                  Você pode anexar screenshots ou logs de erro que ajudem a resolver seu problema.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewTicketOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateTicket}>
                Enviar ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket list */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Meus tickets</CardTitle>
              <Select 
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="open">Abertos</SelectItem>
                  <SelectItem value="pending">Aguardando</SelectItem>
                  <SelectItem value="closed">Fechados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar tickets..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            {filteredTickets.length > 0 ? (
              <div className="space-y-3">
                {filteredTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      activeTicket === ticket.id 
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveTicket(ticket.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium truncate">{ticket.title}</h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>#{ticket.id}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <LifeBuoy className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">Nenhum ticket encontrado</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {searchQuery || filterStatus !== "all" 
                    ? "Tente ajustar seus filtros de busca" 
                    : "Você ainda não abriu nenhum ticket de suporte"}
                </p>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setNewTicketOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Abrir ticket
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ticket conversation */}
        <Card className="lg:col-span-2">
          {activeTicket && currentTicket ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentTicket.title}
                      {getStatusBadge(currentTicket.status)}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      #{currentTicket.id} · Aberto em {formatDate(currentTicket.createdAt)}
                    </CardDescription>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                      {currentTicket.category === "technical" ? "Problema técnico" :
                       currentTicket.category === "billing" ? "Pagamento/Financeiro" :
                       currentTicket.category === "account" ? "Conta/Acesso" : "Outros"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto" style={{ maxHeight: "40vh" }}>
                <div className="space-y-4">
                  {currentTicket.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`
                        max-w-[80%] p-3 rounded-lg
                        ${message.sender === "user" 
                          ? "bg-red-100 dark:bg-red-900/30 text-gray-900 dark:text-gray-100" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}
                      `}>
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {message.sender === "user" ? "VÊ" : "Su"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{message.senderName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.attachment && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <Paperclip className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                {message.attachment}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t">
                {currentTicket.status !== "closed" ? (
                  <div className="flex gap-2 w-full">
                    <Textarea 
                      placeholder="Digite sua resposta..." 
                      className="flex-1"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      disabled={sendingReply}
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={sendingReply}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={!replyMessage || sendingReply}
                        onClick={handleSendReply}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Este ticket foi fechado. Se você precisa de mais ajuda, pode reabri-lo ou criar um novo ticket.
                      </p>
                      <Button size="sm" variant="outline" onClick={() => {
                        setTickets(prev => prev.map(ticket => {
                          if (ticket.id === activeTicket) {
                            return { ...ticket, status: "open" };
                          }
                          return ticket;
                        }));
                        toast.success("Ticket reaberto com sucesso!");
                      }}>
                        Reabrir
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 h-full">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Selecione um ticket
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                Selecione um ticket da lista para visualizar a conversa ou abra um novo ticket para obter ajuda.
              </p>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setNewTicketOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Abrir novo ticket
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">FAQ - Perguntas frequentes</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-1">Como faço para renovar meu servidor?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode renovar seu servidor na página "Meus Servidores", clicando no botão "Renovar" ao lado do servidor desejado. Também é possível ativar a renovação automática.
                </p>
                
                <h4 className="font-medium mb-1">O que acontece se eu não renovar meu servidor?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Se você não renovar seu servidor até a data de vencimento, ele será suspenso automaticamente. Após 7 dias em suspensão, seus dados poderão ser apagados.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Como faço para adicionar saldo à minha conta?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode adicionar saldo clicando no botão "Adicionar Saldo" no menu lateral ou na barra superior do painel. Aceitamos pagamentos via MercadoPago.
                </p>
                
                <h4 className="font-medium mb-1">Qual é o tempo médio de resposta do suporte?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Nossa equipe de suporte trabalha 24/7 e se esforça para responder todos os tickets em até 2 horas. Tickets críticos são priorizados.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                Ver todas as perguntas frequentes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
