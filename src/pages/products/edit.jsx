import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "wouter";

import AdminLayout from "@/components/layouts/AdminLayout";
import ProductsService from "../../services/api/Products";
import Form from "./components/Form";

function ProductsEditPage() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-page", id],
    queryFn: () => ProductsService.getById(id),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ProductsService.update(data.id, data.data);
    },
    onSuccess: (data) => {
      if (data.data.error) {
        toast.error("Error al editar el producto");
      } else {
        toast.success("Producto editado correctamente");
        queryClient.invalidateQueries(["products", 1, ""]);
        // queryClient.invalidateQueries(["products-page", id]);
      }
    },
  });

  const handleOnSubmit = (values) => {
    mutate({
      id,
      data: values,
    });
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

      <Form
        onSubmit={handleOnSubmit}
        product={data?.data}
        isPending={isPending}
      />
    </AdminLayout>
  );
}

export default ProductsEditPage;
