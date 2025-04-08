import CheckboxRole from "./CheckboxRole";

export const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "age",
    header: "Edad",
    cell: ({ row }) => {
      return (
        row.getValue("age") || <span className="text-gray-400">No aplica</span>
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
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <CheckboxRole roles={row.original.roles} userId={row.original.id} />
      );
    },
  },
];
