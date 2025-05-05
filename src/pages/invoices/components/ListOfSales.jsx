import { useState } from "react";
import { Loading } from "../../../components/ui/loading";
import { Error } from "../../../components/ui/error";
import DataTable from "../../../components/tables/DataTable";
import { columns } from "./Column";
import InvoicesService from "../../../services/api/Invoices";
import { useQuery } from "@tanstack/react-query";

function ListOfSales({ searchByName }) {
    const [page, setPage] = useState(1);

    const { isPending, isError, data } = useQuery({
        queryKey: ["invoices", page, searchByName],
        queryFn: () => InvoicesService.getAllInvoices({ page, search: searchByName }),
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
                <DataTable columns={columns} data={data.data?.invoices || []} />
            </div>
            {/** 
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
          */}
        </div>
    );
}

export default ListOfSales;