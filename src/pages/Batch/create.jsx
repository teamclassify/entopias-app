import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";
import AdminBreadcrumb from "../../components/base/AdminBreadcrumb";
//import { register } from "../../services/api/Auth";
//import { toast } from "sonner";

function CreateBatchPage() {
  const handleSubmit = async (data) => {
    /* Conectarlo con la api


    const response = await register({
      ...data,
    });

    
    if (response?.error) {
      toast.error(response.error?.message);
      return;
    }

    toast.success("Productor creado correctamente");
    */
    console.log("Esta es la data", data);
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb currentPage="Crear Productor" />
      <Form onSubmit={handleSubmit} />
    </AdminLayout>
  );
}

export default CreateBatchPage;
