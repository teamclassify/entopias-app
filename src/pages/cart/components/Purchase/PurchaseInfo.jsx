import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../../utils/formatPrice";
import InformationGeneralProducts from "./InformationGeneralProducts";
import InformationPurchase from "./InformationPurchase";

export default function PurchaseInfo({ lengthProducts, totalPrice }) {
  const { t } = useTranslation();

  const price = formatPrice(totalPrice);
  return (
    <div>
      <InformationPurchase name={t("cart.subtotal")} value={price} />
      <InformationPurchase name={t("cart.shipping")} value={"$0.00"} />
      <InformationGeneralProducts
        lengthProducts={lengthProducts}
        totalPrice={totalPrice}
      />
    </div>
  );
}
