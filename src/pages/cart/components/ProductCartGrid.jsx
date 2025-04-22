import ProductCart from "./ProductCart";

export default function ProductCartGrid({ data }) {
  return (
    <div className="flex flex-col gap-4 w-2/4">
      {data?.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
}
