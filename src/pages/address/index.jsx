import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Loading } from "../../components/ui/loading";
import useUser from "../../hooks/useUser";
import AddressService from "../../services/api/Address";
import Message from "./components/Message";

export default function Address() {
  const { t } = useTranslation();
  const { selectedAddress, setSelectedAddress } = useUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getAddress(),
  });

  if (isError) return <p>Error al cargar las direcciones</p>;

  const handleSelect = (address) => {
    setSelectedAddress(address.id === selectedAddress?.id ? null : address);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold pt-6 pb-6">
        {t("address.select_address")}
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data?.map((address) => {
                const isSelected = selectedAddress?.id === address.id;

                return (
                  <div
                    key={address.id}
                    className={clsx(
                      "relative border rounded-xl p-6 shadow-md transition-all duration-300",
                      {
                        "border-primary bg-primary/5": isSelected,
                        "hover:shadow-lg": true,
                      }
                    )}
                  >
                    <div className="absolute top-3 right-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelect(address)}
                      />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">
                          {t("address.form.address")}:
                        </span>{" "}
                        {address.address}
                      </p>
                      <p>
                        <span className="font-semibold">
                          {t("address.form.postalCode")}:
                        </span>{" "}
                        {address.postalCode}
                      </p>
                      <p>
                        <span className="font-semibold">
                          {t("address.form.country")}:
                        </span>{" "}
                        {address.country}
                      </p>
                      <p>
                        <span className="font-semibold">
                          {t("address.form.city")}:
                        </span>{" "}
                        {address.city}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Message />
          )}

          <div className="flex flex-col md:flex-row justify-end mt-8 gap-4">
            <Link to="/carrito/direccion/nueva">
              <Button variant="outline">{t("address.create_address")}</Button>
            </Link>

            <Button onClick={handleContinue} disabled={!selectedAddress}>
              <Link to="/pagos">{t("payments.continue")}</Link>
            </Button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
