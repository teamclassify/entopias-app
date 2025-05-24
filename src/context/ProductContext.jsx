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

  const applyFilter = (category, option, checked) => {
    switch (category) {
      case "Tipo":
        category = "type";
        break;
      case "Peso":
        category = "weight";
        break;
      case "Precio":
        category = "price";
        break;
      case "Aroma":
        category = "aroma";
        break;
      default:
        break;
    }

    if (!filter[category]) {
      const newFilter = {
        ...filter,
        [category]: option,
      };
      setFilter(newFilter);
      return newFilter;
    } else {
      if (!checked) {
        const newFilter = {
          ...filter,
          [category]: "",
        };
        setFilter(newFilter);
        return newFilter;
      }
    }
  };

  const handleSelect = (category, option, checked) => {
    const newData = {
      data: {
        products: [],
        count: 0,
      },
    };

    const newFilter = applyFilter(category, option, checked);
    let newCoffeFilter = [];

    if (
      !newFilter.price &&
      !newFilter.type &&
      !newFilter.weight &&
      !newFilter.aroma
    ) {
      setDataFilter(data);
      return;
    }

    if (newFilter.type) {
      newCoffeFilter = data.data.products.filter(
        (product) => product.type === newFilter.type
      );
    } else {
      newCoffeFilter = data.data.products;
    }

    if (newFilter.weight) {
      const auxCoffeFilter = [];
      newCoffeFilter.forEach((product) => {
        product.varieties.filter((variety) => {
          variety.weight === parseInt(newFilter.weight)
            ? auxCoffeFilter.push(product)
            : null;
        });
      });
      newCoffeFilter = auxCoffeFilter;
    }

    if (newFilter.aroma) {
      const auxCoffeFilter = [];
      newCoffeFilter.forEach((product) => {
        let added = false;
        product.batches.filter((variety) => {
          if (variety.aromaticNotes === newFilter.aroma && !added) {
            auxCoffeFilter.push(product);
            added = true;
          }else {
            return null;
          }
        });
      });
      newCoffeFilter = auxCoffeFilter;
    }
    newData.data.products.push(...newCoffeFilter);
    newData.data.count = newCoffeFilter.length;
    setDataFilter(newData);
    // console.log("Si llega hasta aca", newData);
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
