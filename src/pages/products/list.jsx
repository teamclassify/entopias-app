import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import AdminLayout from "@/components/layouts/AdminLayout";
import ListOfProducts from "./components/ListOfProducts";

function ProductsListPage() {
  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);

  return (
    <AdminLayout>
      <main>
      <h1 className="text-2xl font-bold pt-6">Productos</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
        </section>

        <ListOfProducts searchByName={text} />
      </main>
    </AdminLayout>
  );
}

export default ProductsListPage;
