import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../components/layouts/AdminLayout";
import InvoicesService from "../../services/api/Invoices";
import { Loading } from "../../components/ui/loading";
import { Error } from "../../components/ui/error";
import { useParams } from "wouter";
import TableInvoice from "./components/TableInvoice";
import TableClient from "./components/TableClient";
import DataTable from "../../components/tables/DataTable";
import { columns } from "./components/ColumnItem";

function ViewDetails() {
    const { id } = useParams();
    console.log("Este es el id", id);

    const { isPending, isError, data } = useQuery({
        queryKey: ["invoices", id],
        queryFn: () => InvoicesService.getInvoiceByID({ id }),
    });

    if (isPending) {
        return <Loading />;
    }

    if (isError || data?.error) {
        return <Error message={data?.msg} />;
    }

    const valor = data.amount / 100;

    const total = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);

    return (
        <AdminLayout>
            <main>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-8">
                            <p className="mb-4">Detalles de la factura</p>
                            <TableInvoice invoice={data} />
                        </div>
                        <div>
                            <p className="mb-4">Información del cliente</p>
                            <TableClient client={data.order.user} />
                        </div>
                    </div>
                    <div>
                        <div className="mb-8 h-[340px] overflow-y-auto">
                            <p className="mb-4">Productos</p>
                            <DataTable columns={columns} data={data.order.items || []} />
                        </div>
                        <div className="flex flex-row justify-between ">
                            <p className="mb-4">Total</p>
                            <p className="text-xl font-bold">{total}</p>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
};

export default ViewDetails;