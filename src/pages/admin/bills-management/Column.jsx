import { FileDown, Eye, Dot } from 'lucide-react';

export const columns = [
    {
        accessorKey: "number",
        header: "Número",
    },
    {
        accessorKey: "date_sale",
        header: "Fecha de Emisión",
    },
    {
        accessorKey: "client",
        header: "Cliente",
    },
    {
        accessorKey: "total",
        header: "Monto Total",
    },
    {
        accessorKey: "state",
        header: "Estado de Pago",
        cell: ({ row }) => {
            const state = row.getValue("state");

            if (state === "Pagado") {
                return (
                    <div className='bg-[#ECFDF3] py-1 px-5 rounded-2xl w-fit flex flex-row items-center'>
                        <Dot className='text-[#037847] stroke-3'/>
                        <span className=" text-[#037847]">{state}</span>
                    </div>
                );
            }else if(state === "Pendiente"){
                return (
                    <div className='bg-[#F2F4F7] py-1 px-5 rounded-2xl w-fit flex flex-row items-center'>
                        <Dot className='text-[#364254] stroke-3'/>
                        <span className=" text-[#364254]">{state}</span>
                    </div>
                );
            }else if(state === "Cancelado"){
                return (
                    <div className='bg-[#ffd6d6] py-1 px-5 rounded-2xl w-fit flex flex-row items-center'>
                        <Dot className='text-[#671d1d] stroke-3'/>
                        <span className=" text-[#671d1d]">{state}</span>
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
                <div className='flex flex-row gap-4 w-full'>
                    <button className='cursor-pointer'>
                        <Eye />
                    </button>
                    <button className='cursor-pointer'>
                        <FileDown />
                    </button>
                </div>
            );
        },
    },
];