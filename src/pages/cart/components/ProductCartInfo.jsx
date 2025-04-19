import Quantity from "./Quantity";

export default function ProductCartInfo({ product }) {
  return (
    <div className="flex">
      <img src={product.photos[0].url} className="w-5/12 m-4 rounded-2xl" />
      <div className="flex flex-col pt-5 gap-2">
        <p>{product.name}</p>
        <p className="text-sm">Gramos: {product.varieties[0].weight} gr</p>
        <Quantity id={product.id} num={1} />
      </div>
    </div>
  );
}
