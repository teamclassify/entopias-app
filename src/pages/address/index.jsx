import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Loading } from "../../components/ui/loading";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";
import AddressService from "../../services/api/Address";
import ShipmentService from "../../services/api/Shipment";
import PurchaseInfo from "../cart/components/Purchase/PurchaseInfo";
import Message from "./components/Message";

export default function Address() {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState("");
  const [shipmentPrice, setShipmentPrice] = useState(0);

  const { selectedAddress, setSelectedAddress } = useUser();
  const { data: cart } = useCart();
  const products = cart?.data.items || [];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getAddress(),
  });

  const mutateShip = useMutation({
    mutationFn: (data) => {
      return ShipmentService.add(data);
    },
    onSuccess: (data) => {
      console.log("Ciudades obtenidas:", data);
      if (data.Code === 1) {
        setShipmentPrice(data.Results[0].tarifa);
      }
    },
    onError: () => {},
  });

  if (isError) return <p>Error al cargar las direcciones</p>;

  const handleSelect = (address) => {
    setSelectedAddress(address.id === selectedAddress?.id ? null : address);
    mutateShip.mutate({ ciudadDestinoId: address.city });
  };

  const handleContinue = () => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  };

  console.log(cart);

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      return acc + product.variety.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }, [products]);

  return (
    <DefaultLayout className="flex flex-col md:flex-row gap-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold pt-6 pb-6">
          {t("address.select_address")}
        </h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Precio de envío calculado al momento de la compra.
            </p>

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
      </div>

      <div className="md:w-2/8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold pt-6">{t("cart.summary_title")}</h1>
          {mutateShip.isPending ? (
            <Loading />
          ) : (
            <PurchaseInfo
              totalPrice={totalPrice}
              shipmentPrice={shipmentPrice}
              products={products}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
