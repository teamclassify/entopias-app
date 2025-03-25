import { Badge } from "@/components/ui/badge";

/**Columnas de Perfil Usuario */
export const columns = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return row.getValue("status") === "delivered" ? (
        <Badge className="bg-green-700">Entregado</Badge>
      ) : row.getValue("status") === "waiting_shipment" ? (
        <Badge className="bg-yellow-600">Esperando envio</Badge>
      ) : (
        <Badge className="bg-blue-800">{row.getValue("status")}</Badge>
      );
    },
  },
];
