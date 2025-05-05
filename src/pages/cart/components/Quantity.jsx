import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { useProductQuantity } from "../../../hooks/useProductQuantity";
import { useEffect } from "react";

export default function Quantity({ quantity, setQuantity, stock, varietyId, isCartPage}) {
  const { handleDecrementQuantity, handleIncrementQuantity, resetQuantity, isUpdating } =
    useProductQuantity(quantity, setQuantity, stock, varietyId, isCartPage);

    useEffect(() => {
      if(!isCartPage){
      resetQuantity(1);
      }
    }, [varietyId, resetQuantity, isCartPage]);

  return (
    <main>
      <Card className="flex-row justify-center items-center gap-4 h-0.5">
        <Button variant="ghost" onClick={handleDecrementQuantity} disabled={isUpdating}>
          -
        </Button>
        <p>{quantity}</p>
        <Button variant="ghost" onClick={handleIncrementQuantity} disabled={isUpdating}>
          +
        </Button>
      </Card>
    </main>
  );
}
