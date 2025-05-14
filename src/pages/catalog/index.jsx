import DefaultLayout from "@/components/layouts/DefaultLayout";
import AccordionFilter from "./components/AccordionFilter";
import ProductsService from "../../services/api/Products";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "./components/Pagination";
import { Loading } from "@/components/ui/loading";
import { Error } from "@/components/ui/error";
import ListProducts from "./components/ListProducts";
import PaginationSummary from "./components/PaginationSummary";

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

  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4 mr-5">
            <AccordionFilter />
          </aside>
          <main className="w-full md:w-3/4">
            <PaginationSummary data={data} page={page} />
            <ListProducts data={data} isLoading={isLoading} />
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
