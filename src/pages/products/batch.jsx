import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import AdminLayout from "@/components/layouts/AdminLayout";
import ListOfBatchProducts from "./components/ListOfBatchProducts";


function ProductsBatchListPage() {
  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);

  return (
    <AdminLayout>
      <main>
      <h1 className="text-2xl font-bold pt-6">Lotes</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
        </section>

        <ListOfBatchProducts searchByName={text} />
      </main>
    </AdminLayout>
  );
}

export default ProductsBatchListPage;
