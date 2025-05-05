import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import AddressService from "../../services/api/Address";
import { Button } from "@/components/ui/button";    

export default function Address() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getAddress(),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las direcciones</p>;

  return (
    <DefaultLayout>
      <h1>Elige una dirección</h1>
      <div>
        {data.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {data?.data?.map((address) => (
              <div key={address.id} className="border p-4">
                <p>{address.address}</p>
                <p>{address.postalCode}</p>
                <p>{address.country}</p>
                <p>{address.city}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p>No tienes direcciones guardadas</p>
            <Button>Crear una dirección</Button>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
