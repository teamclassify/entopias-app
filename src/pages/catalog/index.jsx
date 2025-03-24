import DefaultLayout from "@/components/layouts/DefaultLayout";
import CardProduct from "./components/CardProduct";
import Filters from "./components/Filters";

function Index() {
  return (
    <DefaultLayout>
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          <aside className="w-full md:w-1/4">
            <Filters />
          </aside>
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <CardProduct key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Index;
