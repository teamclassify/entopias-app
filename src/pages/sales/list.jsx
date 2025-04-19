import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "wouter";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";

function ListSalesPage() {
  return (
    <AdminLayout>
      <main>
        <header className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold pt-6">Asistentes</h1>

          <div className="flex flex-row gap-3">
            <Link href="/admin/asistentes/agregar">
              <Button>Crear asistente</Button>
            </Link>
          </div>
        </header>

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
