import CardProduct from "../../catalog/components/CardProduct";
import { Error } from "../../../components/ui/error";
import { Loading } from "../../../components/ui/loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductsService from "../../../services/api/Products";

function ListProducts() {
  const [page, ] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => ProductsService.getAll({ page }),
  });

  if (isError || data?.error) {
    return <Error message={data?.msg || "An unexpected error occurred"} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {isLoading ? (
        <Loading />
      ) : data?.data.count > 0 ? (
        data.data.products.map((infoProduct, i) => (
          <CardProduct key={i} infoProduct={infoProduct} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
export default ListProducts;
