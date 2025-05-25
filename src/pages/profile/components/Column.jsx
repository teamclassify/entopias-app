import { CircleArrowDown, CircleArrowRight, Dot } from "lucide-react";
import { Translation } from "react-i18next";

export const columns = ({ expandedRowId, onToggleExpand }) => [
  {
    header: " ",
    cell: ({ row }) => {
      const isExpanded = row.original.id === expandedRowId;

      return (
        <button
          onClick={() => onToggleExpand(row.original.id)}
          className="cursor-pointer"
        >
          {isExpanded ? (
            <CircleArrowDown className="stroke-[#464646] stroke-1" />
          ) : (
            <CircleArrowRight className="stroke-[#464646] stroke-1" />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.orders.columns.date")}
          </span>
        )}
      </Translation>
    ),
    cell: ({ row }) => {
      const fechaISO = row.getValue("createdAt");
      const fecha = new Date(fechaISO);

      const dia = String(fecha.getDate()).padStart(2, "0");
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anio = fecha.getFullYear();

      const formato = `${dia}/${mes}/${anio}`;

      return <span className="w-fit">{formato}</span>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const valor = row.getValue("total");

      const valorReal = valor / 100;

      const formatoCOP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(valorReal);

      return <span className="w-fit">{formatoCOP}</span>;
    },
  },
  {
    accessorKey: "address",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.orders.columns.address")}
          </span>
        )}
      </Translation>
    ),
    cell: ({ row }) => {
      const address = row.getValue("address");

      return (
        <span className="capitalize">
          {address.address} - {address.city}, {address.country}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: (
      <Translation>
        {(t) => (
          <span className="text-center">
            {t("tables.orders.columns.status")}
          </span>
        )}
      </Translation>
    ),
    cell: ({ row }) => {
      const state = row.getValue("status");

      if (state === "paid") {
        return (
          <div className="bg-[#defeec] py-1 px-5 rounded-2xl w-fit flex flex-row items-center">
            <Dot className="text-[#037847] stroke-3" />
            <span className=" text-[#037847]">Pagado</span>
          </div>
        );
      } else if (state === "pending") {
        return (
          <div className="bg-[#ffffe1] py-1 px-5 rounded-2xl w-fit flex flex-row items-center">
            <Dot className="text-[#e3b52d] stroke-3" />
            <span className=" text-[#e3b52d]">Pendiente</span>
          </div>
        );
      } else if (state === "canceled") {
        return (
          <div className="bg-[#F2F4F7] py-1 px-5 rounded-2xl w-fit flex flex-row items-center">
            <Dot className="text-[#364254] stroke-3" />
            <span className=" text-[#364254]">Cancelado</span>
          </div>
        );
      } else if (state === "failed") {
        return (
          <div className="bg-[#ffd6d6] py-1 px-5 rounded-2xl w-fit flex flex-row items-center">
            <Dot className="text-[#671d1d] stroke-3" />
            <span className=" text-[#671d1d]">Fallido</span>
          </div>
        );
      } else if (state === "expired") {
        return (
          <div className="bg-[#ffe7d4] py-1 px-5 rounded-2xl w-fit flex flex-row items-center">
            <Dot className="text-[#eb7a18] stroke-3" />
            <span className=" text-[#eb7a18]">Expirado</span>
          </div>
        );
      }
    },
  },
];
