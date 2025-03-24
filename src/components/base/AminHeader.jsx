import { SidebarTrigger } from "@/components/ui/sidebar";

import useUser from "@/hooks/useUser";
import AvatarUser from "./AvatarUser";

function AdminHeader() {
  const { user, logout } = useUser();

  const userIsAdminOrSales =
    user?.roles.includes("admin") || user?.roles.includes("sales");

  return (
    <header className="h-16 px-4 bg-primary w-full text-primary-foreground flex items-center justify-between">
      <SidebarTrigger />

      <AvatarUser
        user={user}
        logout={logout}
        userIsAdminOrSales={userIsAdminOrSales}
      />
    </header>
  );
}

export default AdminHeader;
