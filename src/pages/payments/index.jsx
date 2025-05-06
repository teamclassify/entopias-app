import { useTranslation } from "react-i18next";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import CheckoutForm from "@/components/payments/CheckoutForm";
import useUser from "@/hooks/useUser";

function Payments() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className=" h-full">
        <h2 className="text-xl font-bold mb-4">{t("payments.title")}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {t("payments.description", { name: user?.name })}
        </p>

        <div className="w-full">
          <CheckoutForm />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Payments;
