import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../../utils/formatPrice";
import InformationGeneralProducts from "./InformationGeneralProducts";
import InformationPurchase from "./InformationPurchase";

export default function PurchaseInfo({
  lengthProducts,
  totalPrice,
  shipmentPrice,
}) {
  const { t } = useTranslation();

  const price = formatPrice(totalPrice);
  const shipping = formatPrice(shipmentPrice || 0);
  return (
    <div>
      <InformationPurchase name={t("cart.subtotal")} value={price} />
      <InformationPurchase
        name={t("cart.shipping")}
        value={shipping ?? "$0.00"}
      />
      <InformationGeneralProducts
        lengthProducts={lengthProducts}
        totalPrice={Number(totalPrice) + (Number(shipmentPrice) || 0)}
      />
    </div>
  );
}
