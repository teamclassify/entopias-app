import AdminLayout from "@/components/layouts/AdminLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ProductsService from "../../services/api/Products";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";

function ProductsCreatePage() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ProductsService.create(data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al crear el producto");
      } else {
        toast.success("Producto creado correctamente");
        queryClient.invalidateQueries(["products", 1, ""]);
      }
    },
  });

  const handleOnSubmit = (values) => {
    mutate(values);
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Producto" />
      <Form onSubmit={handleOnSubmit} isPending={isPending} />
    </AdminLayout>
  );
}

export default ProductsCreatePage;
