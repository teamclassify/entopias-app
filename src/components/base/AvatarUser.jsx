import { Link } from "wouter";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AvatarUser({ user, logout, userIsAdminOrSales }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-[30px] mt-1 p-0 w-[30px]">
          <AvatarImage src={user?.photo} />
          <AvatarFallback>{user.firstName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/perfil/inicio">
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </Link>

        {userIsAdminOrSales && (
          <Link href="/admin">
            <DropdownMenuItem>Administración</DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem onClick={logout}>Cerrar sesion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarUser;
