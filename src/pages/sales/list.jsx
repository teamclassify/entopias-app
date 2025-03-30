import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";

function ListSalesPage() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Asistentes</h1>
        <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input placeholder="Buscar" />
          <Button variant="outline">Buscar</Button>
        </section>

        <ListOfSales />
      </main>
    </AdminLayout>
  );
}

export default ListSalesPage;
