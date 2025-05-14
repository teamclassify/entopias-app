import { createContext, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../services/api/Products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  /**
   * Get all the products
   */

  const [page, setPage] = useState(1);
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ["products", page],
      queryFn: () =>
        ProductsService.getAll({
          page,
          status: true,
        }),
    });

  return (
    <ProductContext.Provider value={{data, isLoading, isError, page, setPage}}>
      {children}
    </ProductContext.Provider>
  );  
}