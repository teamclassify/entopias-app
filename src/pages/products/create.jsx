import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";

function ProductsCreatePage() {
  return (
    <AdminLayout>
      <h1 className="mb-4 text-lg font-bold">Crear producto</h1>

      <Form />
    </AdminLayout>
  );
}

export default ProductsCreatePage;
