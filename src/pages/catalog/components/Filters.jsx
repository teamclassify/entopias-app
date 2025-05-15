import AccordionOption from "./AccordionOptions";
import useProduct from "../../../hooks/useProducts";
import { Loading } from "@/components/ui/loading";
import { useEffect, useState } from "react";

export default function Filters() {
  const { data, isLoading } = useProduct();
  const [typeCoffe, setTypeCoffe] = useState([]);
  const [weightCoffe, setWeightCoffe] = useState([]);
  const [priceCoffe, setPriceCoffe] = useState([]);
  const [aromaCoffe, setAromaCoffe] = useState([]);

  useEffect(() => {
    if (!data?.data?.products) return;

    const typeSet = new Set();
    const weightSet = new Set();
    const priceSet = new Set();
    const aromaSet = new Set();
    
    Object.entries(data.data.products).forEach(([, value]) => {
      typeSet.add(value.type);
      value.varieties.forEach((variety) => {
        weightSet.add(variety.weight);
        priceSet.add(variety.price);
      });
      value.batches.forEach((aroma) => {
        aromaSet.add(aroma.aromaticNotes);
      });
    });
    setTypeCoffe(typeSet);
    setPriceCoffe(priceSet);
    setWeightCoffe(weightSet);
    setAromaCoffe(aromaSet);
  }, [data?.data?.products]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AccordionOption name="Precio" options={priceCoffe} />
          <AccordionOption name="Tipo" options={typeCoffe} />
          <AccordionOption name="Peso" options={weightCoffe} />
          <AccordionOption name="Aroma" options={aromaCoffe} />
        </>
      )}
    </>
  );
}
