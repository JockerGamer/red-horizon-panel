
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const valores = [10, 25, 50, 100, 250];

export default function AddBalance() {
  const [value, setValue] = useState<number>(50);
  const [loading, setLoading] = useState(false);

  // Quando integrado: disparar chamada para gerar link de pagamento MercadoPago
  const handleAddBalance = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        "Redirecionando para MercadoPago... (integração será feita no backend)"
      );
      // Aqui, futuramente, fazer o redirect para o link recebido do backend!
      // window.location.href = data.init_point
    }, 1200);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <CreditCard className="w-7 h-7 text-red-500" />
            <CardTitle>Adicionar saldo</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              Selecione um valor para adicionar ao seu saldo:
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {valores.map((v) => (
                <Button
                  variant={v === value ? "red" : "outline"}
                  key={v}
                  className="w-full"
                  onClick={() => setValue(v)}
                  disabled={loading}
                  type="button"
                >
                  R$ {v},00
                </Button>
              ))}
            </div>
            <div className="text-sm text-gray-500 mb-1">
              O pagamento é realizado via MercadoPago em ambiente seguro.
            </div>
            <Badge variant="outline">Saldo será liberado após aprovação!</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="red"
            size="lg"
            disabled={loading}
            onClick={handleAddBalance}
          >
            {loading ? "Aguarde..." : "Ir para pagamento"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
