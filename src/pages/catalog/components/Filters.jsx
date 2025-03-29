import CategoryCoffe from "./CategoryCoffe";
import PriceFilter from "./PriceFilter";
import QuantityFilter from "./QuantityFilter";

function Filters() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="h-[24px] pb-3"></p>
      </div>
      <PriceFilter />
      <QuantityFilter />
      <CategoryCoffe />
    </div>
  );
}

export default Filters;
