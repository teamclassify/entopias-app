import DefaultLayout from "../../components/layouts/AdminLayout";
import StatsProductsService from "../../services/api/StatsProducts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import Statistics from "./components/Statistics";

export default function StatisticsProducts() {
  const [startDate] = useState("2025-01-01");
  const [endDate] = useState("2025-12-31");
  const [granularity] = useState("day");
  const [limit] = useState(10);

  const { data: dataTopVarieties, isLoading } = useQuery({
    queryKey: ["statistic-products"],
    queryFn: () =>
      StatsProductsService.getTopSalesVarieties({
        startDate,
        endDate,
        granularity,
        limit,
      }),
  });

  const { data: dataProfitVarieties, isLoading: isLoadingProfitVarieties } =
    useQuery({
      queryKey: ["statistic-profitable-products"],
      queryFn: () =>
        StatsProductsService.getTopProfitableVarieties({
          startDate,
          endDate,
          granularity,
          limit,
        }),
    });

  const { data: dataTopSales, isLoading: isLoadingTopSales } = useQuery({
    queryKey: ["statistic-top-sales-products"],
    queryFn: () =>
      StatsProductsService.getTotalSales({
        startDate,
        endDate,
        granularity,
        limit,
      }),
  });

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold pt-6 pb-6">Estadisticas de Productos</h1>
      <div className="grid md:grid-cols-2 gap-5">
        {isLoading || isLoadingProfitVarieties || isLoadingTopSales ? (
          <Loading />
        ) : (
          <>
            <Statistics
              data={dataTopSales}
              dataKey={["soldCount", "product"]}
              title={"Productos más vendidos"}
            />
            <Statistics
              data={dataTopVarieties}
              dataKey={["soldCount", "product"]}
              title={"Variedades más vendidas"}
            />
            <Statistics
              data={dataProfitVarieties}
              dataKey={["revenue", "product"]}
              title={"Variedades más rentables"}
            />
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
