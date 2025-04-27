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

    return (
        <AdminLayout>
            <main>
                <div className="grid grid-cols-2 ">
                    <div>
                        <div className="mb-8">
                            <p className="mb-4">Detalles de la factura</p>
                            <TableInvoice invoice={data} />
                        </div>
                        <div>
                            <p>Información del cliente</p>
                            <TableClient client={data.order.user}/>
                        </div>
                    </div>
                    <div>
                        <DataTable columns={columns} data={data.order.items || []}/>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
};

export default ViewDetails;