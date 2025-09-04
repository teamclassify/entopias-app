import useProduct from "../../../hooks/useProducts";
import { useTranslation } from "react-i18next";

export default function PaginationSummary() {
  const { data, page } = useProduct();
  const { t } = useTranslation();

  const start = (page - 1) * 10 + 1;
  const end = Math.min(page * 10, data?.data?.count ? data.data.count : 0);
  const total = data?.data?.count ? data.data.count : 0;

  return (
    <div>
      <p className="font-bold pb-3">
        {t("catalog.page_summary", { start, end, total })}
      </p>
    </div>
  );
}
