import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { useProductQuantity } from "../../../hooks/useProductQuantity";
import { useEffect } from "react";

export default function Quantity({ quantity, setQuantity, stock, weightSelected, isCartPage}) {
  const { handleDecrementQuantity, handleIncrementQuantity, resetQuantity } =
    useProductQuantity(quantity, setQuantity, stock);

    useEffect(() => {
      if(!isCartPage){
      resetQuantity(1);
      }
    }, [weightSelected, resetQuantity, isCartPage]);

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
