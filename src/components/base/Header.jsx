import { Link } from "wouter";

import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div>
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

              <Link href="/perfil/pedidos">
                <DropdownMenuItem>Pedidos</DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={logout}>
                Cerrar sesion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/registrarse">Crea tu cuenta</Link>
          <Link href="/iniciar-sesion">Ingresa</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
