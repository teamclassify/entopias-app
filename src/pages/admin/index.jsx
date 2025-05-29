import { useEffect, useState, useRef } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Receipt, User, DollarSign } from "lucide-react";
import DashboardService from "../../services/api/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import DataTable from "../../components/tables/DataTable";
import { columnsVentasRecientes } from "./components/columnsRecentSales";
import { Button } from "@/components/ui/button";

function AdminPage() {
  const [orderCount, setOrderCount] = useState(null);
  const [clientsCount, setClientsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [earningsCOP, setEarningsCOP] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);
  const cacheRef = useRef(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (cacheRef.current) {
        const cached = cacheRef.current;
        setOrderCount(cached.ordersCount);
        setSalesCount(cached.salesCount);
        setEarningsCOP(cached.earningsCOP);
        setClientsCount(cached.clientsCount);
        return;
      }

      try {
        setLoadingSales(true);
        const res = await DashboardService.getAdminSummary();
        const data = res.data;

        cacheRef.current = data;

        setOrderCount(data.ordersCount);
        setSalesCount(data.salesCount);
        const usd = data.earningsCOP / 100;
        const tasaCambio = 4465;
        const cop = Math.round((usd * tasaCambio) / 1000) * 1000;

        setEarningsCOP(cop);

        setClientsCount(data.clientsCount);
      } catch (err) {
        console.error("Error al cargar el dashboard:", err);
      } finally {
        setLoadingSales(false);
      }
    };

    const loadRecentUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await DashboardService.getRecentUsers();
        setRecentUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error al obtener usuarios recientes:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    const loadRecentInvoices = async () => {
      try {
        const res = await DashboardService.getRecentInvoices();
        setRecentInvoices(res.data);
      } catch (error) {
        console.error("Error al obtener ventas recientes:", error);
      }
    };

    loadRecentUsers();
    loadRecentInvoices();
    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "Total de Pedidos",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300 rounded" />
      ) : (
        orderCount
      ),
      icon: <Truck className="h-10 w-10 text-red-500" />,
      link: "/admin/pedidos",
    },
    {
      label: "Total de Ventas",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300 rounded" />
      ) : (
        salesCount
      ),
      icon: <Receipt className="h-10 w-10 text-red-500" />,
      link: "/admin/facturas",
    },
    {
      label: "Total de Clientes",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300 rounded" />
      ) : (
        clientsCount
      ),
      icon: <User className="h-10 w-10 text-red-500" />,
      link: "/admin/clientes",
    },
    {
      label: "Total Facturas Pagadas",
      value: loadingSales ? (
        <Skeleton className="h-6 w-24 bg-neutral-300 rounded" />
      ) : (
        <div className="text-base font-semibold text-white">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(earningsCOP)}
        </div>
      ),
      icon: <DollarSign className="h-10 w-10 text-red-500" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="px-6 pt-4">
        <h2 className="font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const isEarnings = stat.label === "Total Facturas Pagadas";
            const cardContent = (
              <Card
                key={index}
                className={
                  isEarnings ? "bg-black-50" : "bg-gray-100 transition"
                }
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="text-1xl font-semibold text-gray-800">
                      {stat.value}
                    </div>
                  </div>
                  {stat.icon}
                </CardContent>
              </Card>
            );

            if (isEarnings) {
              return (
                <Card key={index} className="bg-black text-white">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm text-white">{stat.label}</p>
                      <div className="text-1xl font-semibold text-white">
                        {stat.value}
                      </div>
                    </div>
                    <DollarSign className="h-10 w-10 text-white" />
                  </CardContent>
                </Card>
              );
            } else {
              return (
                <Link key={index} href={stat.link} className="block">
                  {cardContent}
                </Link>
              );
            }
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-4">
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-1">Usuarios recientes</h3>
          <div className="space-y-2">
            {loadingUsers ? (
              <p>Cargando...</p>
            ) : recentUsers.length === 0 ? (
              <p className="text-gray-500">Sin resultados.</p>
            ) : (
              recentUsers.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center uppercase">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("es-CO")}
                  </p>
                </div>
              ))
            )}
          </div>
          {recentUsers.length > 4 && (
            <div className=" flex justify-center">
              <Link href="/admin/clientes">
                <Button className="bg-black text-white rounded-l-xs hover:bg-gray-900">
                  Ver más
                </Button>
              </Link>
            </div>
          )}
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Ventas recientes</h3>
            <DataTable columns={columnsVentasRecientes} data={recentInvoices} />
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/admin/facturas">
              <Button className="bg-black hover:bg-gray-900 text-white">
                Ver más
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default AdminPage;
