import { useEffect, useState } from "react";
import InvoicesService from "../../services/api/Invoices";
import BarChart from "./components/BarChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DefaultLayout from "../../components/layouts/AdminLayout";
import { columnsVentasRecientes } from "../admin/components/columnsRecentSales";
import DataTable from "../../components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import DashboardService from "../../services/api/Dashboard";

export default function SalesStatsPage() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [facturas, setFacturas] = useState([]);

  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
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

    async function loadRecentInvoices() {
      try {
        const res = await DashboardService.getRecentInvoices();
        setRecentInvoices(res.data);
      } catch (error) {
        console.error("Error al obtener ventas recientes:", error);
      }
    }

    fetchTopSelling();
    fetchFacturas();
    loadRecentInvoices();
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

          <Card className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Ventas recientes</h3>
              <DataTable
                columns={columnsVentasRecientes}
                data={recentInvoices}
              />
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
      </div>
    </DefaultLayout>
  );
}
