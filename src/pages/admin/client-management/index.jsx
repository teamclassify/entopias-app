import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ListOfClients from "./ListOfClients";

function ClientManagment() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Clientes</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input placeholder="Buscar" />
          <Button variant="outline">Buscar</Button>
        </section>

        <ListOfClients />
      </main>
    </AdminLayout>
  );
}
export default ClientManagment;
