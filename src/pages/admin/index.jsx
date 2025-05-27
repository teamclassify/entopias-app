import { useEffect, useState, useRef } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Receipt, User, DollarSign } from "lucide-react";
import DashboardService from "../../services/api/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";

function AdminPage() {
  const [orderCount, setOrderCount] = useState(null);
  const [clientsCount, setClientsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [earningsCOP, setEarningsCOP] = useState(0);
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
        setEarningsCOP(data.earningsCOP);
        setClientsCount(data.clientsCount);
      } catch (err) {
        console.error("Error al cargar el dashboard:", err);
      } finally {
        setLoadingSales(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "Total de Pedidos",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300" />
      ) : (
        orderCount
      ),
      icon: <Truck className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Ventas",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300" />
      ) : (
        salesCount
      ),
      icon: <Receipt className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Clientes",
      value: loadingSales ? (
        <Skeleton className="h-6 w-16 bg-neutral-300" />
      ) : (
        clientsCount
      ),
      icon: <User className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Ganancias",
      value: loadingSales ? (
        <Skeleton className="h-6 w-24 bg-neutral-300" />
      ) : (
        <div className="text-base font-semibold text-gray-800">
          {earningsCOP.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      ),
      icon: <DollarSign className="h-10 w-10 text-red-500" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-100">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <div className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </div>
                </div>
                {stat.icon}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPage;
