import DefaultLayout from "@/components/layouts/DefaultLayout";
import Form from "./components/Form";
import { toast } from "sonner";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import AddressService from "../../services/api/Address";


export default function AddAddress() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return AddressService.createAddress(data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al crear la dirección");
      } else {
        toast.success("Dirección creada correctamente");
        queryClient.invalidateQueries(["direccion", 1, ""]);
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
      <h1 className="text-2xl font-bold mb-4">Agregar Dirección</h1>
      <Form onSubmit={handleSubmit} isLoading={isPending} />
    </DefaultLayout>
  );
}
