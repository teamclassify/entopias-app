import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Error } from "@/components/ui/error";
import { Loading } from "@/components/ui/loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductsService from "../../services/api/Products";
import CardProduct from "./components/CardProduct";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

function Index() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      ProductsService.getAll({
        page,
        status: true,
      }),
  });

  if (isError || data?.error) {
    return <Error message={data?.msg || "An unexpected error occurred"} />;
  }

  console.log(data);

  const { count, products } = data?.data || {};

  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4 mr-5">
            <Filters />
          </aside>
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {isLoading ? (
                <Loading />
              ) : count > 0 ? (
                products.map((infoProduct, i) => (
                  <CardProduct key={i} infoProduct={infoProduct} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </main>
        </div>
        <Pagination
          currentPage={page}
          totalItems={data?.data.count || 0}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      </div>
    </DefaultLayout>
  );
}

export default Index;
