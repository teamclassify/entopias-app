import AdminLayout from "../../components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Receipt, User, DollarSign } from "lucide-react"

function AdminPage() {
  const stats = [
    {
      label: "Total de Pedidos",
      value: "210",
      icon: <Truck className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Ventas",
      value: "205",
      icon: <Receipt className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Total de Clientes",
      value: "152",
      icon: <User className="h-10 w-10 text-red-500" />,
    },
    {
      label: "Ganancias",
      value: "852k",
      icon: <DollarSign className="h-10 w-10 text-red-500" />,
    },
  ]

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
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
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