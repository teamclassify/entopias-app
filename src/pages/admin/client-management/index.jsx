import { useState } from "react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ListOfClients from "./ListOfClients";

function ClientManagment() {
  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);
 
  return (
    <AdminLayout>
      <main>
      <p className="text-2xl font-bold pt-6">Clientes</p>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
          <Button variant="outline">Buscar</Button>
        </section>

        <ListOfClients searchByName={text} />
      </main>
    </AdminLayout>
  );
}
export default ClientManagment;
