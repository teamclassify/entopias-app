import { useState } from "react";
import { Loading } from "../../components/ui/loading";
import { Error } from "../../components/ui/error";
import DataTable from "../../components/tables/DataTable";
import { columns } from "./Column";
import InvoicesService from "../../services/api/Invoices";
import { useQuery } from "@tanstack/react-query";

const facturas = [
    {
        number: "F-1001",
        date_sale: "2025-04-01",
        client: "Ana Torres",
        total: 1200.50,
        state: "Pagado"
    },
    {
        number: "F-1002",
        date_sale: "2025-04-03",
        client: "Carlos Gómez",
        total: 850.00,
        state: "Pendiente"
    },
    {
        number: "F-1003",
        date_sale: "2025-04-05",
        client: "Lucía Fernández",
        total: 430.75,
        state: "Pagado"
    },
    {
        number: "F-1004",
        date_sale: "2025-04-08",
        client: "Diego Pérez",
        total: 2220.00,
        state: "Cancelado"
    },
    {
        number: "F-1005",
        date_sale: "2025-04-10",
        client: "Mariana Silva",
        total: 765.20,
        state: "Pendiente"
    },
    {
        number: "F-1006",
        date_sale: "2025-04-12",
        client: "Julián Ríos",
        total: 1580.90,
        state: "Pagado"
    }
];


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