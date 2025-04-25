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

  const { mutate: mutateAdd } = useMutation({
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

  /**
   * Delete the product in cart
   */
  const { mutate : mutateRemove} = useMutation({
    mutationFn: (varietyId) => {
      return CartServices.remove(varietyId);
    },
    onSuccess: () => {
      toast.success("Se ha eliminado el producto del carrito de compras");
      queryClient.invalidateQueries({ queryKey: ["products-cart"] });
    },
  });

  const handleUpdateData = (data) => {
    return mutateAdd(data);
  };

  const handleConfirmDelete = (product) => {
    mutateRemove(product.variety.id);
    toast.success("Eliminando..");
  };
  return (
    <CartContext.Provider
      value={{ data, isLoading, isError, error, handleUpdateData, handleConfirmDelete}}
    >
      {children}
    </CartContext.Provider>
  );
};
