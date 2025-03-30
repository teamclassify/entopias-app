import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";

function ProductsCreatePage() {
  const handleOnSubmit = (values) => {
    console.log("Submit", values);
    console.log(values);
  };

  return (
    <AdminLayout>
      <h1 className="mb-4 text-lg font-bold">Crear producto</h1>
      <Form onSubmit={handleOnSubmit} />
    </AdminLayout>
  );
}

export default ProductsCreatePage;
