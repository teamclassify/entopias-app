import CategoryCoffe from "./CategoryCoffe";
import PriceFilter from "./PriceFilter";
import QuantityFilter from "./QuantityFilter";

function Filters() {
  return (
    <div className="flex flex-col gap-3">
      <PriceFilter />
      <QuantityFilter />
      <CategoryCoffe />
    </div>
  );
}

export default Filters;
