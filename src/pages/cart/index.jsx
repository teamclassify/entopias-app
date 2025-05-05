import DefaultLayout from "@/components/layouts/DefaultLayout";
import Purchase from "./components/Purchase/Purchase";
import ProductCart from "./components/ProductCart";

function Cart() {
  return (
    <DefaultLayout>
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <ProductCart />
        <Purchase buy={false} />
      </div>
    </DefaultLayout>
  );
}

export default Cart;
