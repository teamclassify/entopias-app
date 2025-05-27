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
    type: [],
    weight: [],
    price: [],
    aroma: [],
  });

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

    Object.values(data.data.products).forEach((product) => {
      typeSet.add(product.type);
      product.varieties.forEach((variety) => {
        weightSet.add(variety.weight);
      });
      product.batches.forEach((batch) => {
        aromaSet.add(batch.aromaticNotes);
      });
    });

    setTypeCoffe(Array.from(typeSet));
    setPriceCoffe(Array.from(priceSet));
    setWeightCoffe(Array.from(weightSet));
    setAromaCoffe(Array.from(aromaSet));
  }, [data?.data?.products]);

  const [dataFilter, setDataFilter] = useState(data);

  const applyFilter = (category, option, checked) => {
    const key = {
      "Tipo": "type",
      "Peso": "weight",
      "Precio": "price",
      "Aroma": "aroma",
    }[category];

    let updatedValues = [...filter[key]];

    if(category === "weight" || category === "Peso") option = parseInt(option)
    if (checked) {
      if (!updatedValues.includes(option)) {
        updatedValues.push(option);
      }
    } else {
      updatedValues = updatedValues.filter((item) => item !== option);
    }

    const newFilter = {
      ...filter,
      [key]: updatedValues,
    };

    setFilter(newFilter);
    return newFilter;
  };

  const handleSelect = (category, option, checked) => {
    const newData = {
      data: {
        products: [],
        count: 0,
      },
    };

    const newFilter = applyFilter(category, option, checked);

    let newCoffeFilter = data.data.products;

    if (newFilter.type.length > 0) {
      newCoffeFilter = newCoffeFilter.filter((product) =>
        newFilter.type.includes(product.type)
      );
    }

    if (newFilter.weight.length > 0) {
      newCoffeFilter = newCoffeFilter.filter((product) =>
        product.varieties.some((variety) => 
          newFilter.weight.includes(variety.weight)
        )
      );
    }

    if (newFilter.price.length > 0) {
      newCoffeFilter = newCoffeFilter.filter((product) =>
        product.varieties.some((variety) =>
          newFilter.price.some((priceRange) => {
            if (priceRange === "Hasta 15.000$") return variety.price <= 15000;
            if (priceRange === "Desde 15.000$ hasta 30.000$")
              return variety.price > 15000 && variety.price <= 30000;
            if (priceRange === "Más de 30.000$") return variety.price > 30000;
            return false;
          })
        )
      );
    }

    if (newFilter.aroma.length > 0) {
      newCoffeFilter = newCoffeFilter.filter((product) =>
        product.batches.some((batch) =>
          newFilter.aroma.includes(batch.aromaticNotes)
        )
      );
    }

    newData.data.products.push(...newCoffeFilter);
    newData.data.count = newCoffeFilter.length;
    setDataFilter(newData);
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
