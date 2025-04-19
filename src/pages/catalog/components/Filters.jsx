import { Skeleton } from "@/components/ui/skeleton";
//import { useQuery } from "react-query";
//import AttributesService from "../../services/api/AttributesService";
import AccordionOption from "./AccordionOptions";
import { mockProducts } from "../../../mocks/product";


function Filters() {
  
  const data = mockProducts
/*
  const { data, isLoading } = useQuery("colors", () =>
    AttributesService.getAll({
      type: "color",
    })
  );
  

  if (isLoading) {
    return <Skeleton className="h-[125px] w-full rounded-xl mb-4" />;
  }

  
  const handleSelect = (option) => {
    setColors((prev) => {
      if (prev.includes(option)) {
        return prev.filter((color) => color !== option);
      }
      return [...prev, option];
    });
  };*/

  return (
    <>
      {data && (
        <AccordionOption
          name="Tipo de cafe"
          options={data.products}
          //handleSelect={handleSelect}
        />
      )}
    </>
  );
}

export default Filters;
