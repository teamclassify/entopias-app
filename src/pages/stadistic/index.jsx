import DefaultLayout from "../../components/layouts/AdminLayout";
import StatsProductsService from "../../services/api/StatsProducts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Graphic from "./components/Graphic";
import { Loading } from "@/components/ui/loading";

export default function Stadistic() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [granularity, setGranularity] = useState("day");
  const [limit, setLimit] = useState(10);

  const {
    data: dataTopVarieties,
    isLoading,
    isError,
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

  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 gap-5">
        {isLoading ? (
          <Loading />
        ) : (
          <Graphic
            title={"Variedades más vendidas"}
            data={dataTopVarieties.data}
            total={dataTopVarieties?.data?.length || 0}
            value={"productos"}
          />
        )}
      </div>
    </DefaultLayout>
  );
}
