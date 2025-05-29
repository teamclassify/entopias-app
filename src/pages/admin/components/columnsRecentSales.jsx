export const columnsVentasRecientes = [
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = row.getValue("amount"); // viene en centavos de dólar
      const usd = amount / 100;
      const tasaCambio = 4465;
      const cop = Math.round((usd * tasaCambio) / 1000) * 1000;

      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(cop);
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
