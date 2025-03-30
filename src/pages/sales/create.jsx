import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";
import { register } from "../../services/api/Auth";
import { toast } from "sonner";

function CreateSalesPage() {
  const handleSubmit = async (data) => {
    const response = await register({
      ...data,
      roles: ["sales"],
    });

    if (response?.error) {
      toast.error(response.error?.message);
      return;
    }

    toast.success("Vendedor creado correctamente");
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Asistente" />
      <Form onSubmit={handleSubmit} />
    </AdminLayout>
  );
}

export default CreateSalesPage;
