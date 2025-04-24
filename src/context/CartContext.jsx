import { useMutation } from "@tanstack/react-query";
//import { createContext } from "react";
import { toast } from "sonner";
import CartServices from "../services/api/Cart";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { createContext } from "react";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  /**
   * Get all the products in Cart
   */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => CartServices.getAll(),
  });

  /**
   * Update the product in Cart
   */
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (delta, weightSelected) => {
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

  const handleUpdateData = (data) => {
    return mutate(data);
  };

  return (
    <CartContext.Provider value={{ data, isLoading, isError, error, handleUpdateData }}>
      {children}
    </CartContext.Provider>
  );
};
