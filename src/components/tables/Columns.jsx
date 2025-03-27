import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "edad",
    header: "Edad",
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      return row.getValue("estado") === "Activo" ? (
        <Badge className="bg-green-600">Activo</Badge>
      ): (
        <Badge className="bg-red-700">Inactivo</Badge>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Productos comprados",
  },
];
