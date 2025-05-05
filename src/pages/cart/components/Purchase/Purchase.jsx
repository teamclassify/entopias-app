import { useEffect, useState } from "react";
import PayButton from "./PayButton";
import PurchaseInfo from "./PurchaseInfo";
import useCart from "../../../../hooks/useCart";
import { Loading } from "../../../../components/ui/loading";

export default function Purchase({ buy }) {
  const [totalPrice, setTotalPrice] = useState("");
  const { data, isLoading, isError } = useCart();

  const products = data?.data.items || [];

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      return acc + product.variety.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }, [products]);

  if (isLoading) return <Loading />;
  if (isError) return <h1>Ocurrió un error al cargar el carrito.</h1>;

  return (
    <main className="md:w-2/5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold pt-6">Resumen de la compra</h1>
        <PurchaseInfo totalPrice={totalPrice} />
      </div>
      <PayButton buy={buy} totalPrice={totalPrice} />
    </main>
  );
}
