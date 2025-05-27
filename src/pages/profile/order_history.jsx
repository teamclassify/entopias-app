import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataTable from "../../components/tables/DataTable";
import { Error } from "../../components/ui/error";
import { Loading } from "../../components/ui/loading";
import OrdersService from "../../services/api/Orders";
import Pagination from "../catalog/components/Pagination";
import { columns } from "./components/Column";
import { columnsItems } from "./components/ColumnItems";
import { useTranslation } from "react-i18next";

function OrderHistory({ searchByName }) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const { user } = useUser();
  const [expandedRowId, setExpandedRowId] = useState(null);

  const userId = user?.id;

  const { isPending, isError, data } = useQuery({
    queryKey: ["orders", page, searchByName],
    queryFn: () =>
      OrdersService.getOrderByUserId({ page, search: searchByName, userId }),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || data?.error) {
    return <Error message={data?.msg} />;
  }

  const handleToggleExpand = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const getColumns = columns({
    expandedRowId,
    onToggleExpand: handleToggleExpand,
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row justify-between py-4">
        <p className="font-bold text-[20px]">{t("profile.orders.title")}</p>
      </div>
      <DataTable
        columns={getColumns}
        data={data.data?.orders || []}
        expandedRowId={expandedRowId}
        onToggleExpand={handleToggleExpand}
        ExpandedComponent={({ row }) => (
          <DataTable columns={columnsItems} data={row.original.items} />
        )}
      />
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalItems={data?.data.count || 0}
          itemsPerPage={10}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}

export default OrderHistory;
