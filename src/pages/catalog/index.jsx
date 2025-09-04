import DefaultLayout from "@/components/layouts/DefaultLayout";
import AccordionFilter from "./components/AccordionFilter";
import Pagination from "./components/Pagination";
import ListProducts from "./components/ListProducts";
import PaginationSummary from "./components/PaginationSummary";
import useProduct from "../../hooks/useProducts";
import { Input } from "@/components/ui/input";
import ErrorProduct from "@/components/base/ErrorProducts";
import { useTranslation } from "react-i18next";

function Index() {
  const { data, isError, page, setPage, setSearchByName } = useProduct();
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4 mr-5">
            <AccordionFilter />
          </aside>
          <main className="w-full md:w-3/4">
            <Input
              placeholder={t("catalog.search_placeholder")}
              onChange={(e) => setSearchByName(e.target.value)}
              className="mb-4"
            />
            <PaginationSummary />
            {isError || data?.error ? (
              <ErrorProduct />
            ) : (
              <ListProducts />
            )}
          </main>
        </div>
        <Pagination
          currentPage={page}
          totalItems={data?.data?.count ? data.data.count : 0}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      </div>
    </DefaultLayout>
  );
}

export default Index;
