import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductCartGrid from "./components/ProductCartGrid";
import Purchase from "./components/Purchase/Purchase";
import { Loading } from "../../components/ui/loading";
import useCart from "../../hooks/useCart";

function Cart() {
  const { data, isLoading, error, isError } = useCart()

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
