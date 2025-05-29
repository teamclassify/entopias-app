import { Table, TableBody, TableRow, TableCell, } from "@/components/ui/table";
import formatearFechaIso from "../../../services/dateFormat";

function TableInvoice({ invoice }) {

    const fecha = new Date(invoice.date);

    const formato = formatearFechaIso(fecha);


    return (
        <div className="w-full">
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p>N° de factura</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{invoice.id}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>N° de pedido</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{invoice.order.id}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>Banco</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{invoice.bank}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>Fecha de expedición</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{formato}</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default TableInvoice;