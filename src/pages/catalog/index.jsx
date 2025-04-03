import DefaultLayout from "@/components/layouts/DefaultLayout";
import CardProduct from "./components/CardProduct";
import Filters from "./components/Filters";
import ProductsService from "../../services/api/Products";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "./components/Pagination";
import { Loading } from "@/components/ui/loading";
import { Error } from "@/components/ui/error";

function Index() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => ProductsService.getAll({ page }),
  });


  if (isError || data?.error) {
    return <Error message={data?.msg || "An unexpected error occurred"} />;
  }

  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4 mr-5">
            <Filters />
          </aside>
          <main className="w-full md:w-3/4">
            <div>
              <p className="font-bold pb-3">
                Mostrando {(page - 1) * 10 + 1} -{" "}
                {Math.min(page * 10, data?.count || 0)} de {data?.count || 0}{" "}
                resultados
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {isLoading ? (
                <Loading />
              ) : (
                console.log(data.products)
              )}
            </div>
          </main>
        </div>
        <Pagination
          currentPage={page}
          totalItems={data?.count || 0}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      </div>
    </DefaultLayout>
  );
}

export default Index;
