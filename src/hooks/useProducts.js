import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function useProduct() {
  const context = useContext(ProductContext);
  //console.log("Datos que se reciben:", context);

  return {
    ...context,
  };
}

export default useProduct;
