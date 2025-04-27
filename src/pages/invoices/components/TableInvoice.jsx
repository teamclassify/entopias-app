import { Table, TableBody, TableRow, TableCell, } from "@/components/ui/table";

function TableInvoice({ invoice }) {

    const fecha = new Date(invoice.date);

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    const formato = `${dia}/${mes}/${anio}`;


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