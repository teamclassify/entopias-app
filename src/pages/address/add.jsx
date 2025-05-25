import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useLocation } from "wouter";
import AddressService from "../../services/api/Address";
import Form from "./components/Form";

export default function AddAddress() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      return AddressService.createAddress(data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al crear la dirección");
      } else {
        queryClient.invalidateQueries(["direccion", 1, ""]);
        toast.success("Dirección creada correctamente");
        setLocation(`/carrito/direccion`);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Error al crear la dirección";

      toast.error(message);
    },
  });

  const handleSubmit = (data) => {
    return mutate(data);
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-4">{t("address.add_address")}</h1>
      <Form onSubmit={handleSubmit} isLoading={isLoading} />
    </DefaultLayout>
  );
}
