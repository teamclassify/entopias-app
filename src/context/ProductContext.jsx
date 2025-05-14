import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../services/api/Products";
import { useDebounce } from "use-debounce";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  /**
   * Get all the products
   */

  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, text],
    queryFn: () =>
      ProductsService.getAll({
        page,
        status: true,
        search: text
      }),
  });

  return (
    <ProductContext.Provider
      value={{ data, isLoading, isError, page, setPage, setSearchByName }}
    >
      {children}
    </ProductContext.Provider>
  );
};
