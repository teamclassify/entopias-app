import DefaultLayout from "@/components/layouts/DefaultLayout";
import CardProduct from "./components/CardProduct";
import Filters from "./components/Filters";
import PaginationComponent from "./components/Pagination";

function Index() {
  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4">
            <Filters />
          </aside>
          <main className="w-full md:w-3/4">
            <div>
              <p className="font-bold pb-3">Mostrando 8-12 de 15 resultados</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <CardProduct key={i} />
              ))}
            </div>
          </main>
        </div>
        <PaginationComponent />
      </div>
    </DefaultLayout>
  );
}

export default Index;
