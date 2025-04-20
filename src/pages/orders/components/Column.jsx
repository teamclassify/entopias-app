import { FileDown, Eye, Dot } from 'lucide-react';

export const columns = [
    {
        accessorKey: "id",
        header: "Número",
    },
    {
        accessorKey: "nombre",
        header: "Cliente",
    },
    {
        accessorKey: "ubicacion",
        header: "Ubicación",
    },
    {
        accessorKey: "fechaEmision",
        header: "Fecha de Emisión",
    },
    {
        accessorKey: "montoTotal",
        header: "Monto Total",
    },
    {
        accessorKey: "status",
        header: "Estado de Pago",
        cell: ({ row }) => {
            const state = row.getValue("status");

            if (state === "Entregado") {
                return (
                    <div className='bg-[#ECFDF3] py-1 px-5 rounded-2xl w-fit flex flex-row items-center'>
                        <Dot className='text-[#037847] stroke-3' />
                        <span className=" text-[#037847]">{state}</span>
                    </div>
                );
            } else if (state === "Pendiente") {
                return (
                    <div className='bg-[#F2F4F7] py-1 px-5 rounded-2xl w-fit flex flex-row items-center'>
                        <Dot className='text-[#364254] stroke-3' />
                        <span className=" text-[#364254]">{state}</span>
                    </div>
                );
            }
        },
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: () => {
            return (
                <button className='cursor-pointer'>
                    <Eye />
                </button>
            );
        },
    },
];