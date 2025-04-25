import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button.tsx";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

function InfoUser({ onChange }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col w-full gap-6 overflow-hidden">
      <div className="flex items-center justify-between pt-6 pb-3">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <Button onClick={() => onChange("editar")}>Editar</Button>
      </div>
      <div className="flex flex-col sm:flex-row w-full md:justify-between justify-center items-center gap-8">
        
          <img src={user?.photo} alt="Imagen de foto de perfil de usuario" className="w-32 h-32 rounded-full object-cover" />
        
        <div className="w-full overflow-auto">
          <Table className="min-w-full">
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
