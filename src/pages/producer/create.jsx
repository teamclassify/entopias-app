import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";
import { register } from "../../services/api/Auth";
import { toast } from "sonner";

function CreateProducerPage() {
  const handleSubmit = async (data) => {
    const response = await register({
      ...data,
      roles: ["producer"],
    });

    if (response?.error) {
      toast.error(response.error?.message);
      return;
    }

    toast.success("Productor creado correctamente");
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Productor" />
      <Form onSubmit={handleSubmit} />
    </AdminLayout>
  );
}

export default CreateProducerPage;
