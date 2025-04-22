import { useEffect, useState } from "react";
import PayButton from "./PayButton";
import PurchaseInfo from "./PurchaseInfo";
// import PurchaseProduct from "./PurchaseProduct";

export default function Purchase({ buy, data }) {
  const [totalPrice, setTotalPrice] = useState("100.000");

  useEffect(() => {
    const total = data.reduce((acc, product) => {
      return acc + product.variety.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }, [data]);

  return (
    <main className="w-2/5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold pt-6">Resumen de la compra</h1>
        {/* <PurchaseProduct open={buy} /> */}
        <PurchaseInfo totalPrice={totalPrice} />
      </div>
      <PayButton buy={buy} totalPrice={totalPrice} />
    </main>
  );
}
