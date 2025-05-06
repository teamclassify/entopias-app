import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataTable from "../../../components/tables/DataTable";
import { Error } from "../../../components/ui/error";
import { Loading } from "../../../components/ui/loading";
import ProducersServices from "../../../services/api/Producers";
import Pagination from "../../catalog/components/Pagination";
import { columnsProducers } from "./columnsProducers";


function ListOfProducers({ searchByName }) {
  const [page, setPage] = useState(1);

  const { isPending, isError, data } = useQuery({
    queryKey: ["producers", page, searchByName],
    queryFn: () => ProducersServices.getAll({ page, search: searchByName }),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || data?.error) {
    return <Error message={data?.msg} />;
  }

  if (!data?.data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <p>
          No hay productores registrados en la base de datos
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-3">
      <DataTable columns={columnsProducers} data={data.data?.producers || []} />
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

export default ListOfProducers;
