import { useCallback } from "react";
import { toast } from "sonner";

export function useProductQuantity(quantity, setQuantity, stock) {

  const handleDecrementQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        toast.error("Has alcanzado el minimo permitido");
        return prev;
      }
    });
  };

  const handleIncrementQuantity = () => {
    setQuantity((prev) => {
      if (prev < stock) {
        console.log(prev)
        return prev + 1;
      } else {
        toast.error("Has alcanzado el límite disponible de este producto");
        return prev;
      }
    });
  };

  const resetQuantity = useCallback((value = 1) => {
    setQuantity(value);
  }, [setQuantity]);

  return { quantity, handleDecrementQuantity, handleIncrementQuantity, resetQuantity };
}
