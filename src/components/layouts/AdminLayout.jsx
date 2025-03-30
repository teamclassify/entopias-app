import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AdminSidebar from "../base/AdminSidebar";
import useUser from "../../hooks/useUser";
import NotAuthPage from "../../pages/not-auth";
import AdminHeader from "../base/AminHeader";

function DefaultLayout({ children, className = "" }) {
  const { user } = useUser();

  if (!user) {
    return <NotAuthPage />; 
  }

  if (
    user.roles &&
    !user.roles.includes("admin") &&
    !user.roles.includes("sales")
  ) {
    return <NotAuthPage />;
  }

  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full">
          <AdminHeader />
          <main className={`p-10 ${className}`}>{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default DefaultLayout;
