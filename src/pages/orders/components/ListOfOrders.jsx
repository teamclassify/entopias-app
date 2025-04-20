import { useState } from "react";
import { Loading } from "../../../components/ui/loading";
import { Error } from "../../../components/ui/error";
import DataTable from "../../../components/tables/DataTable";
import { columns } from "./Column";

const pedidos = [
    {
        id: "FAC-2023-001",
        nombre: "Martina Perez",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 80.000",
        status: "Entregado"
      },
      {
        id: "FAC-2023-001",
        nombre: "Juan Morales",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 25.000",
        status: "Entregado"
      },
      {
        id: "FAC-2023-001",
        nombre: "Esteban Medina",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 80.000",
        status: "Pendiente"
      },
      {
        id: "FAC-2023-001",
        nombre: "Lina Beltran",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 80.000",
        status: "Entregado"
      },
      {
        id: "FAC-2023-001",
        nombre: "Sara Angarita",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 80.000",
        status: "Pendiente"
      },
      {
        id: "FAC-2023-001",
        nombre: "Brayan Menezes",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 100.000",
        status: "Pendiente"
      },
      {
        id: "FAC-2023-001",
        nombre: "Isabel Peñaranda",
        ubicacion: "Casa 25 av77",
        fechaEmision: "02/01/2025",
        montoTotal: "$ 100.000",
        status: "Entregado"
      },
];

function ListOfOrders(){
    const [page, setPage] = useState(1);

    /**
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
    */

    return (
        <div>
            <div className="pt-3">
                <DataTable columns={columns} data={pedidos || []} />
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

export default ListOfOrders;