import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";
import { toast } from "sonner";
import ProducersServices from "../../services/api/Producers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateProducerPage() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ProducersServices.create(data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al crear productor");
      } else {
        toast.success("Productor creado correctamente");
        queryClient.invalidateQueries(["producers", 1, ""]);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Ya existe un productor con ese email o teléfono";

      toast.error(message);
    }
  });

  const handleSubmit = (data) => {
    return mutate(data);
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Productor" />
      <Form onSubmit={handleSubmit} isLoading={isPending} />
    </AdminLayout>
  );
}

export default CreateProducerPage;
