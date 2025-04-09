import useUser from "@/hooks/useUser";
import { Table, TableBody, TableRow, TableCel, } from "@/components/ui/table";

function InfoUser() {

    const { user, logout } = useUser();

    return (
        <div className="flex flex-col w-[70%]">
            <div className="flex flex-row justify-between">
                <p>Perfil</p>
                <button>Editar</button>
            </div>
            <div className="flex flex-row w-full">
                <div className="w-[100px] h-[100px] bg-fuchsia-200">
                    <img src={user?.photo} alt="" />
                </div>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCel>
                                <p>{user.name}</p>
                                </TableCel>
                                
                            </TableRow>
                        </TableBody>
                    </Table>
                    <p>{user.name}</p>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    <p>{user.gender}</p>
                </div>
            </div>

        </div>
    );
}

export default InfoUser;