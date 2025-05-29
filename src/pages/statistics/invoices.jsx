import { useEffect, useState } from "react";
import InvoicesService from "../../services/api/Invoices";
import BarChart from "./components/BarChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DefaultLayout from "../../components/layouts/AdminLayout";

export default function SalesStatsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await InvoicesService.getTopSelling({ limit: 5 });
      setData(result.map(p => ({
        name: p.productName,
        cantidad: Number(p.totalSold),
      })));
    }

    fetchData();
  }, []);

  return (
    <DefaultLayout>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Estadísticas de Ventas</h2>
      <Card>
        <CardHeader>
          <CardTitle>Productos más vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={data} />
        </CardContent>
      </Card>
    </div>
    </DefaultLayout>
  );
}
