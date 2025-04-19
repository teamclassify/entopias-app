import { Badge } from "@/components/ui/badge";
import { calculateAge } from "../../utils/calculateAge";

export const columns = [
  { 
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "birthday",
    header: "Edad",
    cell: ({ row }) => {
      return row.getValue("birthday") ? (
        calculateAge(row.getValue("birthday"))
      ) : (
        <span className="text-gray-400">No aplica</span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Telefono",
    cell: ({ row }) => {
      return (
        row.getValue("phone") || (
          <span className="text-gray-400">No aplica</span>
        )
      );
    },
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  // {
  //   accessorKey: "direccion",
  //   header: "Dirección",
  // },
  // {
  //   accessorKey: "estado",
  //   header: "Estado",
  //   cell: ({ row }) => {
  //     return row.getValue("estado") === "Activo" ? (
  //       <Badge className="bg-green-600">Activo</Badge>
  //     ): (
  //       <Badge className="bg-red-700">Inactivo</Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "products",
    header: "Productos comprados",
    cell: ({ row }) => {
      const products = row.getValue("products");

      if (!products || products.length === 0) {
        return <span className="text-gray-400">No aplica</span>;
      }

      return (
        <div className="flex flex-col gap-1">
          {products.slice(0, 3).map((product) => (
            <Badge key={product.id} className="bg-blue-600">
              {product.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
];
