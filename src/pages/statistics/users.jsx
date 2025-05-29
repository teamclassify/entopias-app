import DefaultLayout from "../../components/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import CustomerStatsService from "../../services/api/CustomerStats";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Statistics from "./components/Statistics";

export default function UsersStatsPage() {
  const { data: totalCustomers, isLoading: loadingTotal } = useQuery({
    queryKey: ["total-customers"],
    queryFn: CustomerStatsService.getTotalCustomers,
  });

  const { data: customersWithOrders, isLoading: loadingWithOrders } = useQuery({
    queryKey: ["customers-with-orders"],
    queryFn: CustomerStatsService.getCustomersWithOrders,
  });

  const { data: topSpenders, isLoading: loadingTopSpenders } = useQuery({
    queryKey: ["top-spenders"],
    queryFn: () => CustomerStatsService.getTopSpenders(5),
  });

  const formatData = {
    data: topSpenders,
  };

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Estadísticas de Clientes</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA IZQUIERDA - ocupa 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjetas Totales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Total de clientes</p>
                  {loadingTotal ? (
                    <Skeleton className="w-20 h-6" />
                  ) : (
                    <p className="text-2xl font-bold text-gray-800">
                      {totalCustomers?.total}
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Clientes con compras</p>
                  {loadingWithOrders ? (
                    <Skeleton className="w-20 h-6" />
                  ) : (
                    <p className="text-2xl font-bold text-gray-800">
                      {customersWithOrders?.count ?? customersWithOrders?.total}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Top Clientes */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Top Clientes por Gasto
                </h3>
                {loadingTopSpenders ? (
                  <Skeleton className="w-full h-10" />
                ) : Array.isArray(topSpenders) && topSpenders.length > 0 ? (
                  <div className="space-y-3">
                    {topSpenders.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center uppercase font-bold">
                            {user.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 font-semibold">
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 0,
                          }).format(user.totalSpent / 100)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay datos disponibles.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* COLUMNA DERECHA - GRÁFICA */}
          <div className="flex items-center justify-center">
            {loadingTopSpenders ? (
              <Skeleton className="w-full h-64" />
            ) : (
              <Statistics
                data={formatData}
                dataKey={["totalSpent", "name"]}
                title={"Grafica de clientes que más compran"}
              />
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
