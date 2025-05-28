import useProduct from "./useProducts";

export function useFilterOption() {
  const { priceCoffe, typeCoffe, weightCoffe, aromaCoffe } = useProduct();

  return [
    { name: "Precio", options: priceCoffe },
    { name: "Tipo", options: typeCoffe },
    { name: "Peso", options: weightCoffe },
    { name: "Aroma", options: aromaCoffe },
  ];
}
