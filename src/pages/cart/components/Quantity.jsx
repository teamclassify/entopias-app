//import { useMutation, useQueryClient } from "react-query";
//import CartService from "../../services/api/CartService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx"
import { useState } from "react";

export default function Quantity({ id, num }) {
  const [quantity, setQuantity] = useState(num);
  /*
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(num);

  const { mutate, isLoading } = useMutation(
    (data) => {
      return CartService.update({
        id: data.id,
        quantity: data.quantity,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products-cart");
      },
    }
  );
*/
  const handleDecrementQuantity = () => {
    if (num === 1) return;

    //mutate({ id: id, quantity: num - 1 });
    setQuantity(num - 1);
  };

  const handleIncrementQuantity = () => {
    //mutate({ id: id, quantity: num + 1 });
    setQuantity(num + 1);
  };

  /*
  if (isLoading) {
    return <p>Cargando...</p>;
  }*/

  return (
    <main>
      <Card className="flex-row justify-center items-center gap-4 h-0.5">
        <Button
          variant="ghost"
          className="p-0"
          onClick={handleDecrementQuantity}
        >
          -
        </Button>

        <p>{quantity}</p>

        <Button
          variant="ghost"
          className="p-0"
          onClick={handleIncrementQuantity}
        >
          +
        </Button>
      </Card>
    </main>
  );
}
