import { Translation } from "react-i18next";

export const columnsItems = [
  {
    accessorKey: "variety.product.name",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.products.columns.name")}
          </span>
        )}
      </Translation>
    ),
  },
  {
    accessorKey: "quantity",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.products.columns.units")}
          </span>
        )}
      </Translation>
    ),
  },
  {
    accessorFn: (row) => row.variety.price,
    id: "variety.price",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.products.columns.price")}
          </span>
        )}
      </Translation>
    ),
    cell: ({ row }) => {
      const valor = row.getValue("variety.price");

      const total = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(valor);

      return <span className="w-fit">{total}</span>;
    },
  },
  {
    header: "Total",
    cell: ({ row }) => {
      const cantidad = row.getValue("quantity");
      const precio = row.getValue("variety.price");

      const total = cantidad * precio;

      const formatoCOP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(String(total));

      return <span className="w-fit">{formatoCOP}</span>;
    },
  },
];
