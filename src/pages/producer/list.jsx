import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Link } from "wouter";

import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfProducers from "./components/ListOfProducers";

function ProducersListPage() {
  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);

  return (
    <AdminLayout>
       <main>
        <header className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold pt-6">Productores</h1>

          <div className="flex flex-row gap-3">
            <Link href="/admin/productores/agregar">
              <Button>Crear Productor</Button>
            </Link>
          </div>
        </header>

        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
        </section>

        <ListOfProducers searchByName={text} />
      </main>
    </AdminLayout>
  );
}

export default ProducersListPage;
