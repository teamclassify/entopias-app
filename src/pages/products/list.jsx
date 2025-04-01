import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AdminLayout from "@/components/layouts/AdminLayout";
import ListOfProducts from "./components/ListOfProducts";

function ProductsListPage() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Productos</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input placeholder="Buscar" />
          <Button variant="outline">Buscar</Button>
        </section>

        <ListOfProducts />
      </main>
    </AdminLayout>
  );
}

export default ProductsListPage;
