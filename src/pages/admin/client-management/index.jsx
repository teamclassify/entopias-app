import AdminLayout from "../../../components/layouts/AdminLayout";
import { columns } from "../../../components/tables/Columns";
import { data } from "../../../mocks/clients.json";
import DataTable from "../../../components/tables/DataTable";
import PaginationComponent from "../../catalog/components/Pagination";

function ClientManagment() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Clientes</h1>
        <div className="pt-3">
          <DataTable columns={columns} data={data || []} />
        </div>
        <PaginationComponent />
      </main>
    </AdminLayout>
  );
}
export default ClientManagment;
