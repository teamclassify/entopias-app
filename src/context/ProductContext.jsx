import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../services/api/Products";
import { useDebounce } from "use-debounce";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [searchByName, setSearchByName] = useState("");
  const [text] = useDebounce(searchByName, 500);
  const [page, setPage] = useState(1);
  const [typeCoffe, setTypeCoffe] = useState([]);
  const [weightCoffe, setWeightCoffe] = useState([]);
  const [priceCoffe, setPriceCoffe] = useState([]);
  const [aromaCoffe, setAromaCoffe] = useState([]);
  const [filter, setFilter] = useState({
    type: "",
    weight: "",
    price: "",
    aroma: "",
  });

  /**
   * Get all the products
   */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, text],
    queryFn: () =>
      ProductsService.getAll({
        page,
        status: true,
        search: text,
      }),
  });

  useEffect(() => {
    if (!data?.data?.products) return;

    const typeSet = new Set();
    const weightSet = new Set();
    const priceSet = new Set();
    const aromaSet = new Set();
    priceSet.add("Hasta 15.000$");
    priceSet.add("Desde 15.000$ hasta 30.000$");
    priceSet.add("Más de 30.000$");

    Object.entries(data.data.products).forEach(([, value]) => {
      typeSet.add(value.type);
      value.varieties.forEach((variety) => {
        weightSet.add(variety.weight);
        //priceSet.add(variety.price);
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

  const [dataFilter, setDataFilter] = useState(data);

  const handleSelect = (category, option, checked) => {
    const newData = {
      data: {
        products: [],
        count: 0,
      },
    };

    //TO-Do
    //Toca jugar con el filter, si el filtro ya existe y el checked es false lo quito
    //Si el filtro no existe y el checked es true lo agrego


    if (category === "Tipo") {
      const newTypeCoffe = data.data.products.filter(
        (product) => product.type === option
      );
      newData.data.count = newTypeCoffe.length ? newTypeCoffe.length : 0;
      newData.data.products.push(...newTypeCoffe);
      setDataFilter(newData);
    }else{
      console.log("Esto es lo que llega cuando no hay filtro", filter)
    }
  };

  return (
    <ProductContext.Provider
      value={{
        data: dataFilter ? dataFilter : data,
        isLoading,
        isError,
        page,
        setPage,
        setSearchByName,
        handleSelect,
        typeCoffe,
        weightCoffe,
        priceCoffe,
        aromaCoffe,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
