import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CheckboxProduct from "./CheckboxProduct";

export const columnsBatch = [
  {
    accessorKey: "cafe",
    header: "Nombre del Lote",
    cell: ({ row }) => {
      const id = row.original.cafe.nombre;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "cafe",
    header: "Origen",
    cell: ({ row }) => {
      const id = row.original.cafe.origen;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "finca",
    header: "Finca",
    cell: ({ row }) => {
      const id = row.original.cafe.finca;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "productor",
    header: "Productor",
    cell: ({ row }) => {
      const id = row.original.cafe.productor;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "cantidad",
    header: "Disponible",
    cell: ({ row }) => {
      const id = row.original.cafe.cantidad;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "proceso",
    header: "Proceso",
    cell: ({ row }) => {
      const id = row.original.cafe.proceso;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "notasOlfativas",
    header: "Notas Olfativas",
    cell: ({ row }) => {
      const id = row.original.cafe.notasOlfativas;

      return (
        <span>{id}</span>
      );
    },
  },
  {
    accessorKey: "precioGranoVerde",
    header: "Precio Grano Verde",
    cell: ({ row }) => {
      const id = row.original.cafe.precioGranoVerde;

      return (
        <span>{id} COP$</span>
      );
    },
  },
];
