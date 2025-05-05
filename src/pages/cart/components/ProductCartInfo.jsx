import { getProductInfoConfig } from "../../../data/getProductInfoConfig";
import Quantity from "./Quantity";

export default function ProductCartInfo({ product, quantity, setQuantity }) {
  const coffeInfo = getProductInfoConfig(product);
  //const defaultImage = "/cafe.webp";

  return (
    <div className="flex">
      <img src={product.variety.product.photos[0].url} className="w-5/12 m-4 rounded-2xl" />
      <div className="flex flex-col pt-5 gap-2">
        {coffeInfo.map((item, index) => (
          <p key={index} className={item.className || ""}>
            {item.label ? `${item.label}: ` : ""}
            {item.value}
          </p>
        ))}
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          stock={product.variety.stock}
          varietyId={product.variety.id}
          isCartPage={true}
        />
      </div>
    </div>
  );
}
