import { formatPrice } from "../../../../utils/formatPrice";
import InformationGeneralProducts from "./InformationGeneralProducts";
import InformationPurchase from "./InformationPurchase";

export default function PurchaseInfo({ lengthProducts, totalPrice }) {
  const price = formatPrice(totalPrice);
  return (
    <div>
      <InformationPurchase name={"Subtotal"} value={price} />
      <InformationPurchase name={"Envío"} value={"$0.00"} />
      <InformationGeneralProducts
        lengthProducts={lengthProducts}
        totalPrice={totalPrice}
      />
    </div>
  );
}
