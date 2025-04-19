import DefaultLayout from "@/components/layouts/DefaultLayout";
import { mockProducts } from "../../mocks/product";
import ProductCartGrid from "./components/ProductCartGrid";
//import Purchase from "./components/Purchase"

function Cart() {

  const data = mockProducts
  
  return (
    <DefaultLayout>
      <div className="flex flex-row justify-between ">
        <ProductCartGrid data={data} /*isLoading={isLoading || isFetching}*/ />
        {/* <Purchase buy={false} data={data} /*isLoading={isLoading || isFetching} /> */}
      </div>
    </DefaultLayout>
  );
}

export default Cart;
