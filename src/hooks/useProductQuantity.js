import { useCallback } from "react";
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import CartServices from "../services/api/Cart";

export function useProductQuantity(
  quantity,
  setQuantity,
  stock,
  weightSelected,
  isCartPage
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (delta) => {
      return CartServices.add(weightSelected, delta);
    },
    onSuccess: (data, delta) => {
      if (data.data.error) {
        toast.error(
          `Error al ${
            delta > 0 ? "aumentar" : "disminuir"
          } la cantidad del producto`
        );
      } else {
        toast.success(
          `Producto ${
            delta > 0 ? "aumentó" : "disminuyó"
          } la cantidad exitosamente`
        );
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Ocurrió un error";

      toast.error(message);
    },
  });

  const handleDecrementQuantity = () => {
    const newQuantity = quantity - 1;

    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      if (!isCartPage) return;
      mutate(-1);
    } else {
      toast.error("Has alcanzado el mínimo permitido");
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (!isCartPage) return;
      mutate(1);
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
