import { getProductInfoConfig } from "../../../data/getProductInfoConfig";
import Quantity from "./Quantity";

export default function ProductCartInfo({ product }) {
  const coffeInfo = getProductInfoConfig(product);
  return (
    <div className="flex">
      <img src={product.photos[0].url} className="w-5/12 m-4 rounded-2xl" />
      <div className="flex flex-col pt-5 gap-2">
        {coffeInfo.map((item, index) => (
          <p key={index} className={item.className || ""}>
            {item.label ? `${item.label}: ` : ""}
            {item.value}
          </p>
        ))}
        <Quantity id={product.id} num={1} />
      </div>
    </div>
  );
}
