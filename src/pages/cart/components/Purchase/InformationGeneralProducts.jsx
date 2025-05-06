export default function InformationGeneralProducts({
  lengthProducts,
  totalPrice,
}) {
  return (
    <div className="flex justify-between font-semibold">
      {lengthProducts > 0 ? (
        <p>Total general ({`${lengthProducts}`} articulo)</p>
      ) : (
        <p>Total general ({lengthProducts} articulos)</p>
      )}
      <p>${new Intl.NumberFormat().format(totalPrice || 0)}</p>
    </div>
  );
}
