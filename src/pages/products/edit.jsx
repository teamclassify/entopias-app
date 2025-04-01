import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

import AdminLayout from "@/components/layouts/AdminLayout";
import ProductsService from "../../services/api/Products";
import Form from "./components/Form";

function ProductsEditPage() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => ProductsService.getById(id),
    enabled: !!id,
  });

  const handleOnSubmit = (values) => {
    console.log("Submit", values);
    console.log(values);
  };

  if (isLoading) {
    return (
      <AdminLayout className="flex flex-col gap-4">
        <h1 className="mb-4 text-lg font-bold">Editar producto #{id}</h1>

        <Skeleton className="w-full h-[50px] rounded-sm" />
        <Skeleton className="w-full h-[50px] rounded-sm" />
        <Skeleton className="w-full h-[50px] rounded-sm" />
        <Skeleton className="w-full h-[50px] rounded-sm" />
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <h1 className="mb-4 text-lg font-bold">Editar producto #{id}</h1>

        <p className="text-red-500">Error al cargar el producto</p>
      </AdminLayout>
    );
  }

  if (!data?.data) {
    return (
      <AdminLayout>
        <h1 className="mb-4 text-lg font-bold">Editar producto #{id}</h1>

        <p className="text-red-500">Producto no encontrado</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-4 text-lg font-bold">Editar producto #{id}</h1>

      <Form onSubmit={handleOnSubmit} product={data?.data} />
    </AdminLayout>
  );
}

export default ProductsEditPage;
