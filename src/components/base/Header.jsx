import { Link } from "wouter";

import useUser from "@/hooks/useUser";
import AvatarUser from "./AvatarUser";

function Header() {
  const { user, logout } = useUser();

  const userIsAdminOrSales =
    user?.roles.includes("admin") || user?.roles.includes("sales");

  return (
    <header>
      {user ? (
        <AvatarUser
          user={user}
          logout={logout}
          userIsAdminOrSales={userIsAdminOrSales}
        />
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
