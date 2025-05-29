import { useEffect, useState } from "react";
import InvoicesService from "../../services/api/Invoices";
import BarChart from "./components/BarChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DefaultLayout from "../../components/layouts/AdminLayout";
import { columnsVentasPorCliente } from "./components/columnsSalesPerClient";
import DataTable from "../../components/tables/DataTable";

function agruparVentasPorCliente(facturas) {
  const resumen = {};

  facturas.forEach((factura) => {
    const cliente = factura.order?.user?.name || "Desconocido";
    const monto = factura.amount || 0;

    if (!resumen[cliente]) {
      resumen[cliente] = { cliente, totalCompras: 0, totalGastado: 0 };
    }

    resumen[cliente].totalCompras += 1;
    resumen[cliente].totalGastado += monto;
  });

  return Object.values(resumen).sort((a, b) => b.totalGastado - a.totalGastado);
}

export default function SalesStatsPage() {
  const [data, setData] = useState([]);
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await InvoicesService.getTopSelling({ limit: 5 });
      setData(
        result.map((p) => ({
          name: p.productName,
          cantidad: Number(p.totalSold),
        }))
      );
    }

    async function fetchTopSelling() {
      const result = await InvoicesService.getTopSelling({ limit: 5 });
      setData(
        result.map((p) => ({
          name: p.productName,
          cantidad: Number(p.totalSold),
        }))
      );
    }

    async function fetchFacturas() {
      const res = await InvoicesService.getAllInvoices({ page: 1 });
      if (Array.isArray(res?.data?.invoices)) {
        setFacturas(res.data.invoices);
      }
    }

    fetchData();
    fetchTopSelling();
    fetchFacturas();
  }, []);

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Estadísticas de Ventas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos más vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={data} />
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle>Ventas por cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columnsVentasPorCliente}
                  data={agruparVentasPorCliente(facturas)}
                />
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
