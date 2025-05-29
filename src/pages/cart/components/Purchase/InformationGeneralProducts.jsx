import { formatPrice } from "../../../../utils/formatPrice";

export default function InformationGeneralProducts({ totalPrice }) {
  return (
    <div className="flex justify-between font-semibold">
      Total
      <p>{formatPrice(totalPrice) || 0}</p>
    </div>
  );
}
