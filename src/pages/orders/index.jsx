import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfOrders from "./components/ListOfOrders";

function OrdersManagment() {
  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Ver Pedidos</h1>
        {/* <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
          <Button variant="outline">Buscar</Button>
        </section> */}
        <ListOfOrders />
      </main>
    </AdminLayout>
  );
}
export default OrdersManagment;
