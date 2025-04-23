import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "wouter";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useUser from "@/hooks/useUser";
import paymentsService from "@/services/api/Payments";
import formatDate from "@/utils/formatDate";
import { Loading } from "../../components/ui/loading";

function PaymentsSuccessPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const session_id = searchParams.get("session_id");

  const { data: payment, isLoading } = useQuery({
    queryKey: ["payment", session_id],
    queryFn: () => paymentsService.getPayment(session_id),
  });

  console.log(payment);
  console.log(session_id);

  return (
    <DefaultLayout className="py-30">
      <div className=" h-full">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!session_id || !payment?.data ? (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {t("errors.notFound.title")}
                </h2>
                <p>{t("errors.notFound.description")}</p>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {t("payments.success.title")}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    {t("payments.success.description", { name: user?.name })}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    {t("payments.success.content")}
                  </p>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-md font-bold">Detalles de la compra</h3>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-bold">ID:</span> {payment.data.id}
                      </p>

                      <p className="text-sm text-gray-500">
                        <span className="font-bold">Fecha:</span>{" "}
                        {formatDate(payment.data.created)}
                      </p>

                      <p className="text-sm text-gray-500">
                        <span className="font-bold">Total:</span>{" "}
                        {payment.data.amount_total / 100}{" "}
                        {payment.data.currency}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}

export default PaymentsSuccessPage;
