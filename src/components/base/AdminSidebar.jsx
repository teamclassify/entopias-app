import {
  FilePlus,
  Home,
  List,
  Package,
  UserRound,
  UserRoundPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

const itemsADMIN = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
    subitems: [],
  },
  {
    title: "Clientes",
    url: "/admin/clientes",
    icon: UserRound,
    subitems: [
      {
        title: "Ver Clientes",
        url: "/admin/clientes",
        icon: List,
      },
    ],
  },
  {
    title: "Productos",
    url: "/admin/productos",
    icon: Package,
    subitems: [
      {
        title: "Ver Productos",
        url: "/admin/productos",
        icon: List,
      },
      {
        title: "Agregar Producto",
        url: "/admin/productos/agregar",
        icon: FilePlus,
      },
    ],
  },
  {
    title: "Asistentes",
    url: "/admin/asistentes",
    icon: UserRoundPen,
    subitems: [
      {
        title: "Ver Asistentes",
        url: "/admin/asistentes",
        icon: List,
      },
      {
        title: "Agregar Asistente",
        url: "/admin/asistentes/agregar",
        icon: FilePlus,
      },
    ],
  },
];

const itemsSALES = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
    subitems: [],
  },
  {
    title: "Clientes",
    url: "/admin/clientes",
    icon: UserRound,
    subitems: [
      {
        title: "Ver Clientes",
        url: "/admin/clientes",
        icon: List,
      },
    ],
  },
  {
    title: "Produtos",
    url: "/admin/productos",
    icon: Package,
    subitems: [
      {
        title: "Ver Produtos",
        url: "/admin/productos",
        icon: List,
      },
    ],
  },
];

function AdminSidebar() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [location] = useLocation();
  const { user } = useUser();

  const items = user?.roles.includes("admin") ? itemsADMIN : itemsSALES;

  useEffect(() => {
    const path = location.split("/")[2];

    if (path) {
      const item = items.find((item) => item.title.toLowerCase() === path);
      if (item) {
        setActivePage(item.title);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Sidebar className="border-none">
      <SidebarHeader className="bg-secondary h-16">
        <img
          src="/logo.png"
          alt="Logo Entopias Cafe"
          className="w-full max-w-[120px] mx-auto"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === activePage}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item.subitems.length > 0 && (
                    <SidebarMenuSub>
                      {item.subitems.map((subitem) => (
                        <SidebarMenuSubItem key={subitem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subitem.url}>
                              <subitem.icon />
                              <span>{subitem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AdminSidebar;
