import { columns } from "../../../components/tables/Columns";
import DataTable from "../../../components/tables/DataTable";
import PaginationComponent from "../../catalog/components/Pagination";
import UsersService from "../../../services/api/Users";
import { Loading } from "../../../components/ui/loading";
import { Error } from "../../../components/ui/error";
import { useQuery } from "@tanstack/react-query";

function ListOfClients() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.getAll,
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
        <DataTable columns={columns} data={data.data || []} />
      </div>
      <PaginationComponent />
    </div>
  );
}

export default ListOfClients;
