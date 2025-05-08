import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export default function PayButton({ buy, totalPrice }) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end pt-5">
      {!buy &&
        (totalPrice === 0 ? (
          <Button disabled={totalPrice === 0}>{t("cart.checkout")}</Button>
        ) : (
          <Link to="/carrito/direccion">
            <Button>{t("cart.checkout")}</Button>
          </Link>
        ))}
    </div>
  );
}
