import { Table, TableBody, TableRow, TableCell, } from "@/components/ui/table";

function TableOrder({ order }) {

    return (
        <div className="w-full">
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p>N° de pedido</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{order.id}</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default TableOrder;