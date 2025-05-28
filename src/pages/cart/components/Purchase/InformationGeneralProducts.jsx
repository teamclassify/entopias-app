export default function InformationGeneralProducts({ totalPrice }) {
  return (
    <div className="flex justify-between font-semibold">
      Total
      <p>${totalPrice || 0}</p>
    </div>
  );
}
