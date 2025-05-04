export const columns = [
    {
        accessorKey: "variety.product.name",
        header: "Producto",
    },
    {
        accessorKey: "quantity",
        header: "Unidades",
    },
    {
        accessorFn: row => row.variety.price,
        id: "variety.price",
        header: "Precio Unitario",
        cell: ({ row }) => {
            const valor = row.getValue("variety.price");

            const total = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(valor);

            return (
                <span className='w-fit'>{total}</span>
            );
        }
    },
    {
        header: "Total",
        cell: ({ row }) => {

            const cantidad = row.getValue("quantity");
            const precio = row.getValue("variety.price");

            const total = (cantidad) * (precio);

            const formatoCOP = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(String(total));

            return (<span className='w-fit'>{formatoCOP}</span>);
        }
    },

];