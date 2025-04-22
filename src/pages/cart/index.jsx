import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductCartGrid from "./components/ProductCartGrid";
import Purchase from "./components/Purchase/Purchase";
import CartServices from "../../services/api/Cart";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/ui/loading";

function Cart() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => CartServices.getAll(),
  });

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row justify-between ">
          <ProductCartGrid
            data={data.data.items}
            isLoading={isLoading} 
          />
          <Purchase
            buy={false}
            data={data} /*isLoading={isLoading || isFetching}*/
          />
        </div>
      )}
    </DefaultLayout>
  );
}

export default Cart;
