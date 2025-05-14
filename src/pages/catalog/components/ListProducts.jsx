import { Loading } from "@/components/ui/loading";
import CardProduct from "./CardProduct";
import useProduct from "@/hooks/useProducts";

export default function ListProducts() {
  const { data, isLoading } = useProduct();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
