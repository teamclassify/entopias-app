import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Receipt, User, DollarSign } from "lucide-react";
import OrdersService from "../../services/api/Orders";
import InvoicesService from "../../services/api/Invoices";
import UsersService from "../../services/api/Users";

function AdminPage() {
  const [orderCount, setOrderCount] = useState(null);
  const [clientsCount, setClientsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [earningsCOP, setEarningsCOP] = useState(0);
  const [loadingSales, setLoadingSales] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoadingSales(true);

        const [ordersRes, invoicesRes, usersRes] = await Promise.all([
          OrdersService.countAll(),
          InvoicesService.getAllInvoices({
            page: 1,
            search: null,
            status: "paid",
          }),
          UsersService.getAll({ page: 1, role: "user" }),
        ]);

        setOrderCount(ordersRes.data.count);

        const invoices = invoicesRes.data.invoices;
        const total = invoices.reduce(
          (sum, inv) => sum + Number(inv.amount),
          0
        );
        setEarningsCOP(total);
        setSalesCount(invoices.length);

        setClientsCount(usersRes.data.count);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoadingSales(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "Total de Pedidos",
      value: loadingSales ? "..." : orderCount,
      icon: <Truck className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Ventas",
      value: loadingSales ? "..." : salesCount,
      icon: <Receipt className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Clientes",
      value: loadingSales ? "..." : clientsCount,
      icon: <User className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Ganancias",
      value: loadingSales ? (
        "..."
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
