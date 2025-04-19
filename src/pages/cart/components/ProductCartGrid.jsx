//import { LoadingGrid } from "./Loading";
import ProductCart from "./ProductCart";

export default function ProductCartGrid({ data, /*isLoading*/ }) {
  /*
  if (isLoading) {
    return (
      <div className="w-full mr-8">
        <LoadingGrid />
      </div>
    );
  }*/

  const products = data?.products || [];

  return (
    <div className="flex flex-col gap-4 w-2/4">
      {products?.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
}
