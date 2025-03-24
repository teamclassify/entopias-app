import DefaultLayout from "@/components/layouts/DefaultLayout";
import CardProduct from "./components/CardProduct";

function Index() {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </DefaultLayout>
  );
}

export default Index;
