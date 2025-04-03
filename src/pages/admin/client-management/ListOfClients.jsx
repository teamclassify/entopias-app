import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "../../../components/tables/Columns";
import DataTable from "../../../components/tables/DataTable";
import { Error } from "../../../components/ui/error";
import { Loading } from "../../../components/ui/loading";
import UsersService from "../../../services/api/Users";
import Pagination from "../../catalog/components/Pagination";

function ListOfClients({ searchByName }) {
  const [page, setPage] = useState(1);

  const { isPending, isError, data } = useQuery({
    queryKey: ["users", page, searchByName],
    queryFn: () =>
      UsersService.getAll({ page, role: "user", search: searchByName }),
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

export default ListOfClients;
