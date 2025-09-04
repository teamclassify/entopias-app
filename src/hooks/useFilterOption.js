import useProduct from "./useProducts";
import { useTranslation } from "react-i18next";

export function useFilterOption() {
  const { priceCoffe, typeCoffe, weightCoffe, aromaCoffe } = useProduct();
  const {t } = useTranslation();

  return [
    { name: `${t("catalog.price")}`, options: priceCoffe },
    { name: `${t("catalog.type")}`, options: typeCoffe },
    { name: `${t("catalog.weight")}`, options: weightCoffe },
    { name: `${t("catalog.aroma")}`, options: aromaCoffe },
  ];
}
