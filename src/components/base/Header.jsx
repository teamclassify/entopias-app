import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

import useUser from "@/hooks/useUser";
import AvatarUser from "./AvatarUser";

function Menu({ user, logout, userIsAdminOrSales }) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerClose className="absolute top-4 right-4">
          <XIcon />
        </DrawerClose>

        <DialogTitle className="mb-4">
          <DrawerDescription>Menú de navegación</DrawerDescription>
        </DialogTitle>

        <nav>
          <ul className="grid gap-2">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/tienda">Tienda</Link>
            </li>

            {user ? (
              <AvatarUser
                user={user}
                logout={logout}
                userIsAdminOrSales={userIsAdminOrSales}
              />
            ) : (
              <>
                <li>
                  <Link href="/registrarse">Crea tu cuenta</Link>
                </li>
                <li>
                  <Link href="/iniciar-sesion">Ingresa</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}

function Header() {
  const { user, loading, logout } = useUser();
  const [userIsAdminOrSales, setUserIsAdminOrSales] = useState(false);

  useEffect(() => {
    if (!loading)
      setUserIsAdminOrSales(
        user?.roles?.includes("admin") || user?.roles?.includes("sales")
      );
  }, [user, loading]);

  return (
    <header className="relative z-10 bg-primary text-primary-foreground px-4 h-16 flex justify-between items-center">
      <nav className="hidden md:block w-[220px]">
        <ul className="flex gap-4 font-medium">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/tienda">Tienda</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Link href="/">
          <img src="/logo-alt.png" alt="Logo de la tienda" className="h-12" />
        </Link>
      </div>

      {user ? (
        <AvatarUser
          user={user}
          logout={logout}
          userIsAdminOrSales={userIsAdminOrSales}
        />
      ) : (
        <div>
          <div className="font-medium hidden md:flex gap-4 w-[220px] justify-end">
            <Link href="/registrarse">Crea tu cuenta</Link>
            <Link href="/iniciar-sesion">Ingresa</Link>
          </div>

          <div className="md:hidden">
            <Menu
              user={user}
              logout={logout}
              userIsAdminOrSales={userIsAdminOrSales}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
