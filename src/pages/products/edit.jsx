import { useParams } from "wouter";

import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./components/Form";

// TODO: Implementar la lógica para obtener los datos del producto a editar
// y mostrarlos en el formulario

function ProductsEditPage() {
  const params = useParams();
  const { id } = params;

  const handleOnSubmit = (values) => {
    console.log("Submit", values);
    console.log(values);
  };

  return (
    <AdminLayout>
      <h1 className="mb-4 text-lg font-bold">Editar producto #{id}</h1>

      <Form onSubmit={handleOnSubmit} />
    </AdminLayout>
  );
}

export default ProductsEditPage;
