import { useQuery } from "@tanstack/react-query";

import { Loading } from "../../components/ui/loading";
import AddressService from "../../services/api/Address";
import AdressCard from "./components/AdressCard";

function UserAddress({ onChange }) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getAddress(),
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row justify-between py-4">
        <p className="font-bold text-[20px]">Mis Direcciones</p>
        <button
          className="border-2 border-[#1C0B08] p-1 w-48 cursor-pointer"
          onClick={() => onChange("nueva-direccion")}
        >
          Agregar Dirección
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isLoading || isFetching ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          <>
            {data?.data?.map((address) => (
              <AdressCard
                key={address.id}
                id={address.id}
                address={address.address}
                postalCode={address.postalCode}
                country={address.country}
                city={address.city}
                onChange={onChange}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default UserAddress;
