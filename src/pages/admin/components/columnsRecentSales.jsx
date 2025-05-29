export const columnsVentasRecientes = [
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(amount / 100);
    },
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const raw = row.getValue("date");
      return new Date(raw).toLocaleDateString("es-CO");
    },
  },
];
