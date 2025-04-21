export const columnsBatch = [
  {
    accessorKey: "id",
    header: "Lote",
  },
  {
    accessorKey: "producer.farm",
    header: "Finca",
  },
  {
    accessorKey: "producer.name",
    header: "Productor",
  },
  {
    accessorKey: "initialWeight",
    header: "Peso Inicial",
    cell: ({ getValue }) => {
      const weight = getValue();
      return `${weight} gr`; 
    },
  },
  {
    accessorKey: "finalWeight",
    header: "Peso Final",
    cell: ({ getValue }) => {
      const weight = getValue();
      return `${weight} gr`; 
    },
  },
  {
    accessorKey: "roastDate",
    header: "Fecha de tostado",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString('es-CO'); 
    },
  },
  {
    accessorKey: "roastType",
    header: "Tipo de tostado",
  },
  {
    accessorKey: "expirationDate",
    header: "Fecha de vencimiento",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString('es-CO');
    }
  },
  {
    accessorKey: "aromaNotes",
    header: "Notas Olfativas",
  },
  {
    accessorKey: "purchasePrice",
    header: "Precio",
    cell: ({ getValue }) => {
      const price = getValue();
      return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    },
  },
];