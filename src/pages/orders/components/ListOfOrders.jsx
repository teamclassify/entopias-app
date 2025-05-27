import { useState } from "react";
import { Loading } from "../../../components/ui/loading";
import { Error } from "../../../components/ui/error";
import DataTable from "../../../components/tables/DataTable";
import { columns } from "./Column";
import OrdersService from "../../../services/api/Orders";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../catalog/components/Pagination";

function ListOfOrders() {
  const [page, setPage] = useState(1);

  const { isPending, isError, data } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => OrdersService.getAllOrders({ page }),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || data?.error) {
    return <Error message={data?.msg} />;
  }

  return (
    <div>
      <div className="pt-3">
        <DataTable columns={columns} data={data.data?.orders || []} />
      </div>
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

export default ListOfOrders;
