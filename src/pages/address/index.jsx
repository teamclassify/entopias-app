import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import AddressService from "../../services/api/Address";
import { Button } from "@/components/ui/button";
import Message from "./components/Message";
import { Link } from "wouter";
import { Loading } from "../../components/ui/loading";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

export default function Address() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getAddress(),
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  if (isError) return <p>Error al cargar las direcciones</p>;

  const handleSelect = (id) => {
    setSelectedAddressId(id === selectedAddressId ? null : id);
  };

  const handleContinue = () => {
    if (selectedAddressId) {
      localStorage.setItem("selectedAddressId", data.data.find((address) => address.id === selectedAddressId));
    }
  }

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold pt-6 pb-6">Elige una dirección</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data?.map((address) => {
                const isSelected = selectedAddressId === address.id;

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
                        onCheckedChange={() => handleSelect(address.id)}
                      />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">Dirección:</span>{" "}
                        {address.address}
                      </p>
                      <p>
                        <span className="font-semibold">Código postal:</span>{" "}
                        {address.postalCode}
                      </p>
                      <p>
                        <span className="font-semibold">País:</span>{" "}
                        {address.country}
                      </p>
                      <p>
                        <span className="font-semibold">Ciudad:</span>{" "}
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
              <Button variant="outline">Crear una dirección</Button>
            </Link>
            <Button asChild disabled={!selectedAddressId} onClick={handleContinue}>
              <Link to="/pagos">Continuar con el pago</Link>
            </Button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
