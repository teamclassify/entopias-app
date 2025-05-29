export const columnsUsuariosRecientes = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Registro",
    cell: ({ row }) => {
      const raw = row.getValue("createdAt");
      return new Date(raw).toLocaleDateString("es-CO");
    },
  },
];
