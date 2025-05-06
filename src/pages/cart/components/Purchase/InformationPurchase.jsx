export default function InformationPurchase({ name, value }) {
  return (
    <div className="flex justify-between">
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}
