import { Table, TableBody, TableRow, TableCell, } from "@/components/ui/table";

function TableClient({ client }) {

    return (
        <div className="w-full">
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p>Nombre</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{client.name}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>Correo Electrónico</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{client.email}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>Teléfono</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{client.phone}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <p>Dirección</p>
                        </TableCell>
                        <TableCell>
                            <p className="text-[#737373]">{}</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default TableClient;