
import { useState } from "react";
import { CreditCard, Download, Search, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample transaction data
const transactions = [
  {
    id: "TX123456",
    date: "2025-04-15",
    type: "deposit",
    description: "Adição de saldo via MercadoPago",
    amount: 100.00,
    status: "completed"
  },
  {
    id: "TX123457",
    date: "2025-04-16",
    type: "purchase",
    description: "Compra de servidor MTA Premium",
    amount: -80.00,
    status: "completed"
  },
  {
    id: "TX123458",
    date: "2025-04-17",
    type: "purchase",
    description: "Compra de servidor Minecraft Standard",
    amount: -30.00,
    status: "completed"
  },
  {
    id: "TX123459",
    date: "2025-04-18",
    type: "deposit",
    description: "Adição de saldo via MercadoPago",
    amount: 50.00,
    status: "pending"
  },
  {
    id: "TX123460",
    date: "2025-04-19",
    type: "renewal",
    description: "Renovação automática - MTA Premium",
    amount: -80.00,
    status: "completed"
  },
  {
    id: "TX123461",
    date: "2025-04-20",
    type: "refund",
    description: "Reembolso de servidor SAMP Basic",
    amount: 20.00,
    status: "completed"
  },
  {
    id: "TX123462",
    date: "2025-04-21",
    type: "renewal",
    description: "Renovação automática - Minecraft Standard",
    amount: -30.00,
    status: "failed"
  }
];

export default function Transactions() {
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply type filter
    const matchesType = filterType === "all" || transaction.type === filterType;
    
    // Apply status filter
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    // Apply sorting
    if (sortField === "date") {
      return sortDirection === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === "amount") {
      return sortDirection === "asc" 
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
    return 0;
  });

  // Format date to local format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transações</h2>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar transações..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="deposit">Depósito</SelectItem>
              <SelectItem value="purchase">Compra</SelectItem>
              <SelectItem value="renewal">Renovação</SelectItem>
              <SelectItem value="refund">Reembolso</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="failed">Falhou</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Transactions table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("id")}
              >
                ID
                {sortField === "id" && (
                  sortDirection === "asc" ? <ChevronUp className="inline h-4 w-4 ml-1" /> : <ChevronDown className="inline h-4 w-4 ml-1" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("date")}
              >
                Data
                {sortField === "date" && (
                  sortDirection === "asc" ? <ChevronUp className="inline h-4 w-4 ml-1" /> : <ChevronDown className="inline h-4 w-4 ml-1" />
                )}
              </TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("amount")}
              >
                Valor
                {sortField === "amount" && (
                  sortDirection === "asc" ? <ChevronUp className="inline h-4 w-4 ml-1" /> : <ChevronDown className="inline h-4 w-4 ml-1" />
                )}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono">{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                    {transaction.amount >= 0 ? "+" : ""}{transaction.amount.toFixed(2)} R$
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        transaction.status === "completed" ? "bg-green-500" : 
                        transaction.status === "pending" ? "bg-yellow-500" : 
                        "bg-red-500"
                      }
                    >
                      {transaction.status === "completed" ? "Concluído" : 
                       transaction.status === "pending" ? "Pendente" : 
                       "Falhou"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Gerar recibo</DropdownMenuItem>
                        {transaction.status === "pending" && (
                          <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando {filteredTransactions.length} de {transactions.length} transações
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button variant="outline" size="sm" disabled>Próximo</Button>
        </div>
      </div>
    </div>
  );
}
