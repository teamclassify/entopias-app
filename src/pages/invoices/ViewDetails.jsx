import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import AdminLayout from "../../components/layouts/AdminLayout";
import DataTable from "../../components/tables/DataTable";
import { Error } from "../../components/ui/error";
import { Loading } from "../../components/ui/loading";
import InvoicesService from "../../services/api/Invoices";
import { columns } from "./components/ColumnItem";
import TableClient from "./components/TableClient";
import TableInvoice from "./components/TableInvoice";

function ViewDetails() {
  const { id } = useParams();
  console.log("Este es el id", id);

  const { isPending, isError, data } = useQuery({
    queryKey: ["invoices", id],
    queryFn: () => InvoicesService.getInvoiceByID({ id }),
  });

  const valor = data?.amount / 100;

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
                <p className="mb-4 font-bold">Detalles de la factura</p>
                <TableInvoice invoice={data} />
              </div>
              <div>
                <p className="mb-4 font-bold">Información del cliente</p>
                <TableClient client={data.order.user} />

                <div className="mt-8">
                  <p className="mb-4 font-bold">Dirección de entrega</p>
                  <p className="text-sm capitalize">
                    {data.order.address?.address} - {data.order.address?.city},{" "}
                    {data.order.address?.country} -{" "}
                    {data.order.address?.postalCode}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-8 h-[340px] overflow-y-auto">
                <p className="mb-4 font-bold">Productos</p>
                <DataTable columns={columns} data={data.order.items || []} />
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

export default ViewDetails;
