import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CheckboxProduct from "./CheckboxProduct";

export const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Button asChild variant="link">
          <Link to={`/admin/productos/${id}`}>{row.getValue("name")}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "precio",
    header: "Precio",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "loteId",
    header: "Lote",
    cell: ({ row }) => {
      const id = row.getValue("loteId");
      return (
        <Button asChild variant="link">
          <Link to={`/admin/lote/${id}`}>{id}</Link>
        </Button>
      );
    },
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
