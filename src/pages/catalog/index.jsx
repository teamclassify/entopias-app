import DefaultLayout from "@/components/layouts/DefaultLayout";
import CardProduct from "./components/CardProduct";
import Filter from "./components/Filter";

function Index() {
  return (
    <DefaultLayout>
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 p-4">
        <div className="lg:w-[300px] lg:sticky lg:top-4 lg:self-start">
          <Filter />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(8)].map((_, i) => (
              <CardProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Index;
