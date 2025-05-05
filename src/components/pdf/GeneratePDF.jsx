import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function formatCOP(value) {

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
}

export function generatePDF(invoiceData) {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(24);
  doc.text("FACTURA", 204, 20, { align: "right",  fontStyle: "bold" });

  // Línea
  doc.setDrawColor(245, 245, 245);
  doc.setLineWidth(3);
  doc.line(14, 39, 118, 39);

  // Datos d ela factura
  doc.setFontSize(11);
  doc.text(`N° de Factura: ${invoiceData.id}`, 120, 40);
  doc.text(`Fecha de Emisión: ${new Date(invoiceData.date).toLocaleDateString()}`, 155, 40);


  // Datos del cliente
  const user = invoiceData.order.user;
  doc.text("Cliente:", 14, 55);

  doc.setTextColor(142, 142, 142);

  doc.text(`Nombre: ${user.name}`, 14, 62);
  doc.text(`Email: ${user.email}`, 14, 69);
  doc.text("Dirección: Dirección", 14, 76);
  doc.text("Ciudad: Ciudad", 14, 83);
  doc.text("País: País", 14, 90);

  doc.setTextColor(0, 0, 0);

  // Tabla de productos
  const tableBody = invoiceData.order.items.map((item, index) => {
    const producto = item.variety.product.name;
    const precio = item.variety.price;
    const cantidad = item.quantity;
    const total = precio * cantidad;

    return [
      index + 1,
      producto,
      `${formatCOP(precio)}`,
      cantidad,
      `${formatCOP(total)}`,
    ];
  });

  autoTable(doc, {
    startY: 100,
    head: [["Item", "Producto", "Precio Unitario", "Cantidad", "Total"]],
    body: tableBody,
    styles: {
      fontSize: 11,
      textColor: [142, 142, 142],
      halign: "center",
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  const valorReal = invoiceData.amount / 100;

  // Total
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total:        ${formatCOP(valorReal)}`, 190, finalY, {
    align: "right", fontStyle: "bold"
});

  // Descargar
  doc.save(`factura-${invoiceData.id}.pdf`);
}
