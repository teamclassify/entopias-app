import AccordionOption from "./AccordionOptions";
import useProduct from "../../../hooks/useProducts";
import { Loading } from "@/components/ui/loading";
import { useFilterOption } from "../../../hooks/useFilterOption";

export default function Filters() {
  const { isLoading, handleSelect } = useProduct();
  const filtersOptions = useFilterOption();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filtersOptions.map((filter, index) => (
            <AccordionOption
              key={`${filter.name}-${index}`}
              nameFilter={filter.name}
              options={filter.options}
              handleSelect={handleSelect}
            />
          ))}
        </>
      )}
    </>
  );
}
