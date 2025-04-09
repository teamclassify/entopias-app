import useUser from "@/hooks/useUser";
import { Table, TableBody, TableRow, TableCell, } from "@/components/ui/table";

function InfoUser() {

    const { user, logout } = useUser();

    return (
        <div className="flex flex-col w-[70%] gap-6">
            <div className="flex flex-row justify-between py-4">
                <p className="font-bold text-[20px]">Perfil</p>
                <button className="border-2 border-[#1C0B08] p-1 w-32 cursor-pointer">Editar</button>
            </div>
            <div className="flex flex-row w-full justify-between">
                <div className="w-[130px] h-[130px] bg-fuchsia-200">
                    <img src={user?.photo} alt="" />
                </div>
                <div className="w-[80%]">
                    <Table >
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <p>Nombre</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-[#737373]">{user.name}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <p>Correo Electrónico</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-[#737373]">{user.email}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <p>Número de Teléfono</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-[#737373]">{user.phone}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <p>Género</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-[#737373]">{user.gender}</p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    );
}

export default InfoUser;