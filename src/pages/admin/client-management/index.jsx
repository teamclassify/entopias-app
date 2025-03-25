import AdminLayout from "../../../components/layouts/AdminLayout";
import { columns } from "../../../components/tables/Columns";
import { data } from "../../../mocks/clients.json";
import DataTable from "../../../components/tables/DataTable";
import PaginationComponent from "../../catalog/components/Pagination";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

function ClientManagment() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Clientes</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input placeholder="Buscar" />
          <Button variant="outline">Buscar</Button>
        </section>
        <div className="pt-3">
          <DataTable columns={columns} data={data || []} />
        </div>
        <PaginationComponent />
      </main>
    </AdminLayout>
  );
}
export default ClientManagment;
