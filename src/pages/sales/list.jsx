import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";

function ListSalesPage() {
  return (
    <AdminLayout>
      <main>
      <p className="text-2xl font-bold pt-6">Asistentes</p>
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
