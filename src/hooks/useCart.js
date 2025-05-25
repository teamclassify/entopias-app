import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function useCart() {
  const context = useContext(CartContext);
  //console.log("Datos que se reciben:", context);

  return {
    ...context,
  };
}

export default useCart;
