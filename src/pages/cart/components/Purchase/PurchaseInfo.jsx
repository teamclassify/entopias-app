import InformationGeneralProducts from "./InformationGeneralProducts";
import InformationPurchase from "./InformationPurchase";

export default function PurchaseInfo({ lengthProducts, totalPrice }) {
  return (
    <div>
      <InformationPurchase
        name={"Subtotal"}
        value={`$${new Intl.NumberFormat().format(totalPrice || 0)}`}
      />
      {/* <InformationPurchase
        name={"Cupón de descuento"}
        value={"Aplicar cupón"}
      /> */}
      <InformationPurchase name={"Envío"} value={"$0.00"} />
      <InformationGeneralProducts
        lengthProducts={lengthProducts}
        totalPrice={totalPrice}
      />
    </div>
  );
}
