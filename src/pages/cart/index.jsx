import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductCartGrid from "./components/ProductCartGrid";
import Purchase from "./components/Purchase/Purchase";
import { Loading } from "../../components/ui/loading";
import ProductCart from "./components/ProductCart";

function Cart() {
  return (
    <DefaultLayout>
      <div className="flex flex-row justify-between ">
        <ProductCart />
        {/* <Purchase buy={false} /> */}
      </div>
    </DefaultLayout>
  );
}

export default Cart;
