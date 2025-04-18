import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductsBatchService from "../../services/api/ProductsBatch";
import { toast } from "sonner";

function CreateBatchPage() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ProductsBatchService.create(data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al crear lote");
      } else {
        toast.success("Lote creado correctamente");
        queryClient.invalidateQueries(["lotes", 1, ""]);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Error al crear el lote";

      toast.error(message);
    },
  });

  const handleSubmit = (data) => {
    return mutate(data);
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Lote" />
      <Form onSubmit={handleSubmit} isLoading={isPending}/>
    </AdminLayout>
  );
}

export default CreateBatchPage;
