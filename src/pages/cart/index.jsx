import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductCartGrid from "./components/ProductCartGrid";
import Purchase from "./components/Purchase/Purchase";
import CartServices from "../../services/api/Cart";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/ui/loading";

function Cart() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => CartServices.getAll(),
  });

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="w-full p-4 text-red-600">
          Error al cargar el carrito:{" "}
          {error?.message || "Servidor no disponible"}
        </div>
      ) : (
        <div className="flex flex-row justify-between ">
          <ProductCartGrid data={data?.data?.items} />
          <Purchase buy={false} data={data?.data?.items} />
        </div>
      )}
    </DefaultLayout>
  );
}

export default Cart;
