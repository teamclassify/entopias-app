export const columnsVentasPorCliente = [
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "totalCompras",
    header: "Total Compras",
  },
  {
    accessorKey: "totalGastado",
    header: "Total Gastado",
    cell: ({ row }) => {
      const valor = row.getValue("totalGastado");
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(valor / 100); // si usas centavos
    },
  },
];
