import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CheckboxProduct from "./CheckboxProduct";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Button asChild variant="link" className="p-0">
          <Link to={`/admin/productos/${id}`}>{row.getValue("name")}</Link>
        </Button>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },

  {
    accessorKey: "type",
    header: "Tipo",
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const id = row.original.id;
      const status = row.getValue("status");

      return <CheckboxProduct productId={id} initialStatus={status} />;
    },
  },
];
