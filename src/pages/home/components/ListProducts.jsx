import CardProduct from "../../catalog/components/CardProduct";

function ListProducts() {
  return (
    <div className="flex flex-col items-center mb-20">
      <h2 className="text-2xl font-bold pb-8">Nuestros Productos</h2>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <CardProduct key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ListProducts