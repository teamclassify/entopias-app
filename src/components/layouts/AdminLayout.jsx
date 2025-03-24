import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AdminSidebar from "../base/AdminSidebar";
import useUser from "../../hooks/useUser";
import NotAuthPage from "../../pages/not-auth";

function DefaultLayout({ children }) {
  const { user } = useUser();

  if (!user) {
    return <NotAuthPage />;
  }

  if (user.roles && !user.roles.includes("admin")) {
    return <NotAuthPage />;
  }

  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full">
          <header className="h-16 px-4 bg-primary w-full text-primary-foreground flex items-center justify-between">
            <SidebarTrigger />
          </header>
          <main className="p-4">{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default DefaultLayout;
