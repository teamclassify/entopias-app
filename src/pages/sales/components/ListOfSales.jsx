import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataTable from "../../../components/tables/DataTable";
import { Error } from "../../../components/ui/error";
import { Loading } from "../../../components/ui/loading";
import UsersService from "../../../services/api/Users";
import Pagination from "../../catalog/components/Pagination";
import { columns } from "./columns";

function ListOfSales() {
  const [page, setPage] = useState(1);

  const { isPending, isError, data } = useQuery({
    queryKey: ["sales", page],
    queryFn: () => UsersService.getAll({ page, role: "sales" }),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }


  return (
    <div>
      <div className="pt-3">
        <DataTable columns={columns} data={data.data.users || []} />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalItems={data.data.count || 0}
          itemsPerPage={10}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}

export default ListOfSales;
