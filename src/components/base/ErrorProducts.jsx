import { Search } from "lucide-react"
import { useTranslation } from "react-i18next";

function ErrorProduct(){
  const { t }= useTranslation();

  return (
  <div className="flex flex-col items-center justify-center text-center py-20">
        <Search size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">{t("errorProduct.title")}</h2>
        <p className="text-gray-500 max-w-md">
        {t("errorProduct.description")}
        </p>
      </div>
)
}

export default ErrorProduct;