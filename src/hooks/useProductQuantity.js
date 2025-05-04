import { useCallback } from "react";
import { toast } from "sonner";
import useCart from "./useCart";

export function useProductQuantity(
  quantity,
  setQuantity,
  stock,
  varietyId,
  isCartPage
) {
  const { handleUpdateData } = useCart();

  const handleDecrementQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      if (!isCartPage) return;
      handleUpdateData(varietyId, -1)
    } else {
      toast.error("Has alcanzado el mínimo permitido");
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (!isCartPage) return;
      handleUpdateData(varietyId, 1)
    } else {
      toast.error("Has alcanzado el límite disponible de este producto");
    }
  };

  const resetQuantity = useCallback(
    (value = 1) => {
      setQuantity(value);
    },
    [setQuantity]
  );

  return {
    quantity,
    handleDecrementQuantity,
    handleIncrementQuantity,
    resetQuantity,
  };
}
