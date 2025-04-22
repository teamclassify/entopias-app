import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { useProductQuantity } from "../../../hooks/useProductQuantity";
import { useEffect } from "react";

export default function Quantity({ num, stock, weightSelected }) {
  const { handleDecrementQuantity, handleIncrementQuantity, quantity, resetQuantity } =
    useProductQuantity(num, stock);

    useEffect(() => {
      resetQuantity(1);
    }, [weightSelected, resetQuantity]);

  return (
    <main>
      <Card className="flex-row justify-center items-center gap-4 h-0.5">
        <Button variant="ghost" onClick={handleDecrementQuantity}>
          -
        </Button>
        <p>{quantity}</p>
        <Button variant="ghost" onClick={handleIncrementQuantity}>
          +
        </Button>
      </Card>
    </main>
  );
}
