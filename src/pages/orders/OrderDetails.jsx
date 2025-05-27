import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import AdminLayout from "../../components/layouts/AdminLayout";
import DataTable from "../../components/tables/DataTable";
import { Error } from "../../components/ui/error";
import { Loading } from "../../components/ui/loading";
import OrdersService from "../../services/api/Orders";
import { columns } from "../invoices/components/ColumnItem";
import TableClient from "../invoices/components/TableClient";
import TableOrder from "./components/TableOrder";

function OrderDetails() {
  const { id } = useParams();
  console.log("Este es el id", id);

  const { isPending, isError, data } = useQuery({
    queryKey: ["invoices", id],
    queryFn: () => OrdersService.getOrderByID({ id }),
  });

  const valor = data?.total / 100;

  const total = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);

  return (
    <AdminLayout>
      {isPending ? (
        <Loading />
      ) : isError || !data || data?.error ? (
        <Error message={data?.msg} />
      ) : (
        <main>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <p className="mb-4 font-bold">Detalles del pedido</p>
                <TableOrder order={data} />
              </div>
              <div>
                <p className="mb-4 font-bold">Información del cliente</p>
                <TableClient client={data.user} />

                <div className="mt-8">
                  <p className="mb-4 font-bold">Dirección de entrega</p>
                  <p className="text-sm capitalize">
                    {data.address?.address} - {data.address?.city},{" "}
                    {data.address?.country} - {data.address?.postalCode}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-8 h-[340px] overflow-y-auto">
                <p className="mb-4 font-bold">Productos</p>
                <DataTable columns={columns} data={data.items || []} />
              </div>
              <div className="flex flex-row justify-between ">
                <p className="mb-4 font-bold">Total</p>
                <p className="text-xl font-bold">{total}</p>
              </div>
            </div>
          </div>
        </main>
      )}
    </AdminLayout>
  );
}

export default OrderDetails;
