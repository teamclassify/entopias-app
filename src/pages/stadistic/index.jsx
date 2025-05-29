import DefaultLayout from "../../components/layouts/AdminLayout";
import StatsProductsService from "../../services/api/StatsProducts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Graphic from "./components/Graphic";
import { Loading } from "@/components/ui/loading";
import StadisticTopVarieties from "./components/StadisticTopVarieties";

export default function Stadistic() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [granularity, setGranularity] = useState("day");
  const [limit, setLimit] = useState(10);

  const {
    data: dataTopVarieties,
    isLoading,
  } = useQuery({
    queryKey: ["stadistic-products"],
    queryFn: () =>
      StatsProductsService.getTopSalesVarieties({
        startDate,
        endDate,
        granularity,
        limit,
      }),
  });

  const {
    data: dataProfitVarieties,
    isLoading: isLoadingProfitVarieties,
  } = useQuery({
    queryKey: ["stadistic-profitable-products"],
    queryFn: () =>
      StatsProductsService.getTopProfitableVarieties({
        startDate,
        endDate,
        granularity,
        limit,
      }),
  });

   const {
    data: dataTopSales,
    isLoading: isLoadingTopSales,
  } = useQuery({
    queryKey: ["stadistic-top-sales-products"],
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
      <div className="grid md:grid-cols-2 gap-5">
        {isLoading || isLoadingProfitVarieties ? (
          <Loading />
        ) : (
          <>
          <StadisticTopVarieties data={dataTopVarieties} dataKey={["soldCount", "product"]} title={"Variedades más vendidas"}/>
          <StadisticTopVarieties data={dataProfitVarieties} dataKey={["revenue", "product"]} title={"Variedades más rentables"} />
          <StadisticTopVarieties data={dataTopSales} dataKey={["soldCount", "product"]} title={"Productos más vendidos"} />
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
